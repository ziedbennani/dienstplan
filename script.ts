// populateDatabase.js

const { PrismaClient } = require("@prisma/client");
const { employees } = require("./data"); // Adjust the path as necessary

type Emp = {
  name: String;
  surname: String;
  age: number;
  contract: String;
  availability: String[];
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
    // Insert employees into the database
    await Promise.all(
      employees.map(async (employee: Emp) => {
        await prisma.employee.create({
          data: {
            name: employee.name,
            surname: employee.surname,
            age: employee.age,
            contract: employee.contract,
            availability: employee.availability,
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
