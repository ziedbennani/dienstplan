// populateDatabase.js

const { PrismaClient } = require("@prisma/client");
const { employees } = require("./data"); // Adjust the path as necessary

type Emp = {
  name: String;
  surname: String;
  age: number;
  contract: String;
  availability: {
    Montag: string;
    Dienstag: string;
    Mittwoch: string;
    Donnerstag: string;
    Freitag: string;
    Samstag: string;
    Sonntag: string;
  };
  ladenAufgemacht: number;
  ladenAufmachen: Boolean;
  ladenGeschlossen: number;
  ladenSchliessen: Boolean;
  transitAufgemacht: number;
  transitAufmachen: Boolean;
  transitGeschlossen: number;
  transitSchliessen: Boolean;
  pitstopAufgemacht: number;
  pitstopAufmachen: Boolean;
  pitstopGeschlossen: number;
  pitstopSchliessen: Boolean;
};

const prisma = new PrismaClient();

async function main() {
  try {
    await Promise.all(
      employees.map(async (employee: Emp) => {
        // Create the Employee first
        const createdEmployee = await prisma.employee.create({
          data: {
            name: employee.name,
            surname: employee.surname,
            age: employee.age,
            contract: employee.contract,
            ladenAufgemacht: employee.ladenAufgemacht,
            ladenAufmachen: employee.ladenAufmachen,
            ladenGeschlossen: employee.ladenGeschlossen,
            ladenSchliessen: employee.ladenSchliessen,
            transitAufgemacht: employee.transitAufgemacht,
            transitAufmachen: employee.transitAufmachen,
            transitGeschlossen: employee.transitGeschlossen,
            transitSchliessen: employee.transitSchliessen,
            pitstopAufgemacht: employee.pitstopAufgemacht,
            pitstopAufmachen: employee.pitstopAufmachen,
            pitstopGeschlossen: employee.pitstopGeschlossen,
            pitstopSchliessen: employee.pitstopSchliessen,
          },
        });

        // Then create the Availability related to the Employee
        await prisma.availability.create({
          data: {
            employeeId: createdEmployee.id,
            Montag: employee.availability.Montag,
            Dienstag: employee.availability.Dienstag,
            Mittwoch: employee.availability.Mittwoch,
            Donnerstag: employee.availability.Donnerstag,
            Freitag: employee.availability.Freitag,
            Samstag: employee.availability.Samstag,
            Sonntag: employee.availability.Sonntag,
          },
        });
      })
    );
    console.log("Data successfully imported");
  } catch (error) {
    console.error("Error importing data:", error);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma Client
  }
}

main().catch((error) => {
  console.error("Error in script:", error);
  process.exit(1);
});
