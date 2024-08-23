import { NextResponse } from "next/server";
import prisma from "../../../../lib/db";
import { Availability } from "../../../overview/columns";

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
// export async function POST(request: any, params: Params) {
//   const {
//     name,
//     surname,
//     age,
//     availability,
//     ladenAufgemacht,
//     ladenGeschlossen,
//     transitAufgemacht,
//     transitGeschlossen,
//     pitstopAufgemacht,
//     pitstopGeschlossen,
//   } = params;
//   try {
//     const addedEmployee = await prisma.employee.create({
//       data: {
//         name,
//         surname,
//         age,
//         availability: {
//           create: {
//             Montag: availability.Montag,
//             Dienstag: availability.Dienstag,
//             Mittwoch: availability.Mittwoch,
//             Donnerstag: availability.Donnerstag,
//             Freitag: availability.Freitag,
//             Samstag: availability.Samstag,
//             Sonntag: availability.Sonntag,
//           },
//         },
//         ladenAufgemacht,
//         ladenGeschlossen,
//         transitAufgemacht,
//         transitGeschlossen,
//         pitstopAufgemacht,
//         pitstopGeschlossen,
//       },
//     });
//     return NextResponse.json(addedEmployee);
//   } catch (error) {
//     console.error("Error deleting employee:", error);
//     return NextResponse.json(
//       { error: "Failed to delete employee" },
//       { status: 500 }
//     );
//   }
// }
