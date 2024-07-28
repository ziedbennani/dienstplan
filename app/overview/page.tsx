import { Mitarbeiter, columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchEmployees } from "../../lib/prismaFunctions";

export default async function DemoPage() {
  const data = await fetchEmployees();

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
