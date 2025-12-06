-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('BOOKED', 'CANCELLED', 'INITIATED', 'PENDING');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "flightId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'INITIATED',
    "noOfSeats" INTEGER NOT NULL DEFAULT 1,
    "totalCost" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);
