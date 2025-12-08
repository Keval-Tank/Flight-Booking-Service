import prisma from "../prismaClient";
import axios from "axios";
import { AppError } from "../utils/errors/AppError";
import { StatusCodes } from "http-status-codes";
import config from "../config";

const flightServiceUrl = config.ServerConfig.FLIGHT_SERVICE_URL
async function createBooking(booking_data : any){
    try{
        await prisma.$transaction(async (tx) => {
            const flights = await axios.get(`${flightServiceUrl}/api/v1/flight/${booking_data.flightId}`);
            if(flights.data.data.totalSeats < booking_data.seats){
                throw new AppError('Not enough seats available', StatusCodes.BAD_REQUEST)
            }
            const totalBillingCost = flights.data.data.price * booking_data.noOfSeats;
            const  bookingPayload = {...booking_data, totalCost : totalBillingCost}
            const booking = await tx.booking.create({
                data : bookingPayload
            })

            await axios.patch(`${config.ServerConfig.FLIGHT_SERVICE_URL}/api/v1/flight/${booking_data.flightId}/seats`, {
                id : booking_data.flightId,
                seats : booking_data.noOfSeats,
                dec : true
            })

            return booking;
        })
    }catch(err :any){
        throw err
    }
}

async function makePayment(booking_data : any){
    try{
        return prisma.$transaction(async(tx) => {
            const booking_details = await tx.booking.findFirst({
                where : {
                    id : booking_data.id
                }
            })
            if(booking_details?.status === 'CANCELLED'){
                throw new AppError("booking has been expired", StatusCodes.BAD_REQUEST)
            }
            const bookingTime = new Date(booking_details?.createdAt!);
            const currentTime = new Date();
            if((currentTime - bookingTime) > 60000){
                await cancelBooking({id :booking_data.id})
                throw new AppError("booking has been expired", StatusCodes.BAD_REQUEST)
            }
            if(booking_details?.totalCost !== booking_data.totalCost){
                throw new AppError("Amount mismatch", StatusCodes.BAD_REQUEST)
            }
            if(booking_details?.userId !== booking_data.userId){
                throw new AppError("User corresponding to booking doesn't match", StatusCodes.BAD_REQUEST)
            }
            const response = await tx.booking.update({
                where : {
                    id : booking_details?.id!
                },
                data : {
                    status : "BOOKED"
                }
            })
            return response;
        })
    }catch(err : any){
        throw err
    }
}

async function cancelBooking(booking_data :  any){
    try {
        return prisma.$transaction(async(tx) => {
            console.log(booking_data)
            const booking_detials = await tx.booking.findFirst({
                where : {
                    id : booking_data.id
                }
            })
            if(booking_detials?.status === 'CANCELLED'){
                return true;
            }
            await axios.patch(`${flightServiceUrl}/api/v1/flight/${booking_detials?.id}/seats`, {
                seats : booking_detials?.noOfSeats
            })
            await tx.booking.update({
                where : {
                    id : booking_detials?.id!,
                    status : 'INITIATED'
                },
                data : {
                    status : 'CANCELLED'
                }
            })
            return;
        })
    } catch (err : any) {
        throw err
    }
}

async function cancelOldBookings() {
    try{
        const old_bookings = await prisma.booking.findMany({
            where : {
                status : {
                    in : ["INITIATED", 'PENDING']
                }
            }
        })
        const currentTime = new Date();
        old_bookings.forEach(async(booking) => {
            const timeStamp : number = currentTime - booking.createdAt
            if(timeStamp > 300000){
                await prisma.booking.delete({
                    where : {
                        id : booking.id
                    }
                })
            }
        })
        return;
    }catch(err : any){
        console.log(err)
        throw err
    }
}

export default {
    createBooking,
    makePayment,
    cancelOldBookings
}