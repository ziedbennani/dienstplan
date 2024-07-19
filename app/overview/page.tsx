import { Mitarbeiter, columns } from "./columns";
import { DataTable } from "./data-table";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getData(): Promise<Mitarbeiter[]> {
  const employees = await prisma.employee.findMany({
    include: { availability: true },
  });
  // Fetch data from your API here.
  //   console.log("employ: ", employees);
  //   const res = await fetch(`/api/employees`);
  //   const data = await res.json();
  //   console.log("getData: ", data);
  return employees;
}

export default async function DemoPage() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
