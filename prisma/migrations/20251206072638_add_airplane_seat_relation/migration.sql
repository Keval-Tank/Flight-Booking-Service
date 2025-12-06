/*
  Warnings:

  - You are about to drop the column `class` on the `Seat` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('BUSINESS', 'ECONOMY', 'PREMIUM_ECONOMY', 'FIRST_CLASS');

-- AlterTable
ALTER TABLE "Seat" DROP COLUMN "class",
ADD COLUMN     "type" "SeatType" NOT NULL DEFAULT 'ECONOMY';

-- AddForeignKey
ALTER TABLE "Seat" ADD CONSTRAINT "Seat_airplaneId_fkey" FOREIGN KEY ("airplaneId") REFERENCES "Airplane"("id") ON DELETE CASCADE ON UPDATE CASCADE;
