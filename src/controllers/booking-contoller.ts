import {response, type Request, type Response} from 'express'
import responses from '../utils/common'
import { StatusCodes } from 'http-status-codes'
import services from '../services'

const createBooking = async(req : Request, res : Response) => {
    try{
        const data = {
            flightId : parseInt(req.body.flightId),
            noOfSeats : parseInt(req.body.seats),
            userId : parseInt(req.body.userId)
        }
        const result = await services.BookingServices.createBooking(data);
        responses.SuccessResponse.data = result!;
        responses.SuccessResponse.message = "Booking created"
        return res.status(StatusCodes.CREATED).json(responses.SuccessResponse)
    }catch(err:any){
        responses.ErrorResponse.error = err;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}

const makePayment = async(req : Request, res : Response) => {
    try{
        const data = {
            id : parseInt(req.body.id),
            totalCost : parseInt(req.body.totalCost),
            userId : parseInt(req.body.userId)
        }
        const result = await services.BookingServices.makePayment(data)
        responses.SuccessResponse.data = result!;
        responses.SuccessResponse.message = "Payment Details"
        return res.status(StatusCodes.OK).json(responses.SuccessResponse)
    }catch(err:any){
        console.log(err)
        responses.ErrorResponse.error = err;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(responses.ErrorResponse)
    }
}
export default {
    createBooking,
    makePayment
}