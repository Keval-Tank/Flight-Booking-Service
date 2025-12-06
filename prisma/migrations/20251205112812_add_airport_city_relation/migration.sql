-- AlterTable
ALTER TABLE "Airport" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Airport_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Airport" ADD CONSTRAINT "Airport_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
