-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_arrivalAirportId_fkey";

-- DropForeignKey
ALTER TABLE "Flight" DROP CONSTRAINT "Flight_departureAirportId_fkey";

-- AlterTable
ALTER TABLE "Flight" ALTER COLUMN "departureAirportId" SET DATA TYPE TEXT,
ALTER COLUMN "arrivalAirportId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_arrivalAirportId_fkey" FOREIGN KEY ("arrivalAirportId") REFERENCES "Airport"("code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("code") ON DELETE CASCADE ON UPDATE CASCADE;
