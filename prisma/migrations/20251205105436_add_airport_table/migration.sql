-- CreateTable
CREATE TABLE "Airport" (
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cityId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Airport_name_key" ON "Airport"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_code_key" ON "Airport"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Airport_address_key" ON "Airport"("address");
