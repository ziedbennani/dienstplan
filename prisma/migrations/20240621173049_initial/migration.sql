-- CreateTable
CREATE TABLE "Employee" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "surname" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "contract" TEXT NOT NULL,
    "availability" TEXT[],
    "ladenAufgemacht" INTEGER NOT NULL,
    "ladenAufmachen" BOOLEAN NOT NULL,
    "ladenGeschlossen" INTEGER NOT NULL,
    "ladenSchliessen" BOOLEAN NOT NULL,
    "transitAufgemacht" INTEGER NOT NULL,
    "transitAufmachen" BOOLEAN NOT NULL,
    "transitGeschlossen" INTEGER NOT NULL,
    "transitSchliessen" BOOLEAN NOT NULL,
    "pitstopAufgemacht" INTEGER NOT NULL,
    "pitstopAufmachen" BOOLEAN NOT NULL,
    "pitstopGeschlossen" INTEGER NOT NULL,
    "pitstopSchliessen" BOOLEAN NOT NULL,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("id")
);
