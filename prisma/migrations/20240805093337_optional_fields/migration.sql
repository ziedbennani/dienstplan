-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "contract" DROP NOT NULL,
ALTER COLUMN "ladenAufmachen" DROP NOT NULL,
ALTER COLUMN "ladenSchliessen" DROP NOT NULL,
ALTER COLUMN "transitAufmachen" DROP NOT NULL,
ALTER COLUMN "transitSchliessen" DROP NOT NULL,
ALTER COLUMN "pitstopAufmachen" DROP NOT NULL,
ALTER COLUMN "pitstopSchliessen" DROP NOT NULL;
