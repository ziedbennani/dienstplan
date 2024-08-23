import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// export async function GET(request: Request) {
//   const res = await request.json();
//   console.log("RES : ", res);

//   return NextResponse.json({
//     hello: "world",
//   });
// }

export async function GET(request: Request) {
  // Parse the URL and log the query parameters
  const { searchParams } = new URL(request.url);
  const items = searchParams.getAll("items"); // Get all selected items

  console.log("filters :", items);

  try {
    let employees;

    if (items.length === 0) {
      // No filters applied, return all employees
      employees = await prisma.employee.findMany({
        include: { availability: true },
      });
    } else {
      // Filters applied, return filtered employees
      employees = await prisma.employee.findMany({
        include: { availability: true },
        where: {
          AND: items.map((item) => ({
            [item]: true,
          })),
        },
      });
    }

    return NextResponse.json({ employees });
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json(
      { error: "Failed to process GET request" },
      { status: 500 }
    );
  }
}
