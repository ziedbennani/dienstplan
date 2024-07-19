/*
  Warnings:

  - You are about to drop the column `availability` on the `Employee` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "availability";

-- CreateTable
CREATE TABLE "Availability" (
    "id" SERIAL NOT NULL,
    "employeeId" INTEGER NOT NULL,
    "Montag" TEXT NOT NULL,
    "Dienstag" TEXT NOT NULL,
    "Mittwoch" TEXT NOT NULL,
    "Donnerstag" TEXT NOT NULL,
    "Freitag" TEXT NOT NULL,
    "Samstag" TEXT NOT NULL,
    "Sonntag" TEXT NOT NULL,

    CONSTRAINT "Availability_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Availability_employeeId_key" ON "Availability"("employeeId");

-- AddForeignKey
ALTER TABLE "Availability" ADD CONSTRAINT "Availability_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
