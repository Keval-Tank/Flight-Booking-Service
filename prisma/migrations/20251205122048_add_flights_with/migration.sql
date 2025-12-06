-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "airplaneId" INTEGER NOT NULL,
    "departureAirportId" INTEGER NOT NULL,
    "arrivalAirportId" INTEGER NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "price" INTEGER NOT NULL,
    "boardingGate" TEXT,
    "totalSeats" INTEGER NOT NULL,

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplane"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_departureAirportId_fkey" FOREIGN KEY ("departureAirportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flight" ADD CONSTRAINT "Flight_arrivalAirportId_fkey" FOREIGN KEY ("arrivalAirportId") REFERENCES "Airport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
