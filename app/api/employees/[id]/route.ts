import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";

export async function DELETE(request: any, { params }: any) {
  const id = parseInt(params.id, 10);

  try {
    const deletedEmployee = await prisma.employee.delete({
      where: { id },
    });
    return NextResponse.json(deletedEmployee);
  } catch (error) {
    console.error("Error deleting employee:", error);
    return NextResponse.json(
      { error: "Failed to delete employee" },
      { status: 500 }
    );
  }
}
