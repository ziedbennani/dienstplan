/*
  Warnings:

  - The `ladenAufmachen` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ladenSchliessen` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `transitAufmachen` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `transitSchliessen` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pitstopAufmachen` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `pitstopSchliessen` column on the `Employee` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "ladenAufmachen",
ADD COLUMN     "ladenAufmachen" BOOLEAN,
DROP COLUMN "ladenSchliessen",
ADD COLUMN     "ladenSchliessen" BOOLEAN,
DROP COLUMN "transitAufmachen",
ADD COLUMN     "transitAufmachen" BOOLEAN,
DROP COLUMN "transitSchliessen",
ADD COLUMN     "transitSchliessen" BOOLEAN,
DROP COLUMN "pitstopAufmachen",
ADD COLUMN     "pitstopAufmachen" BOOLEAN,
DROP COLUMN "pitstopSchliessen",
ADD COLUMN     "pitstopSchliessen" BOOLEAN;
