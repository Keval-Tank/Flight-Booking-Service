-- CreateTable
CREATE TABLE "Seat" (
    "id" SERIAL NOT NULL,
    "airplaneId" INTEGER NOT NULL,
    "row" INTEGER NOT NULL,
    "col" TEXT NOT NULL,
    "class" TEXT NOT NULL,

    CONSTRAINT "Seat_pkey" PRIMARY KEY ("id")
);
