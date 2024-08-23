"use server";

import { NextResponse } from "next/server";
import prisma from "../../../lib/db";
import { Availability } from "../../overview/columns";

interface Params {
  name: string;
  surname: string;
  age: number;
  availability: Availability;
  ladenAufgemacht: number;
  ladenGeschlossen: number;
  transitAufgemacht: number;
  transitGeschlossen: number;
  pitstopAufgemacht: number;
  pitstopGeschlossen: number;
}

// export async function POST(request: Request) {
//   try {
//     const res = await request.json();
//     console.log({ res });
//     return NextResponse.json({ data: res });
//   } catch (error) {
//     console.error("Error in POST request:", error);
//     return NextResponse.json(
//       { error: "Failed to process request" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request: Request, params: Params) {
  const res = await request.json();
  const {
    name,
    surname,
    age,
    availability,
    ladenAufgemacht,
    ladenAufmachen,
    ladenGeschlossen,
    ladenSchliessen,
    transitAufgemacht,
    transitAufmachen,
    transitGeschlossen,
    transitSchliessen,
    pitstopAufgemacht,
    pitstopAufmachen,
    pitstopGeschlossen,
    pitstopSchliessen,
  } = res;

  try {
    const addedEmployee = await prisma.employee.create({
      data: {
        name,
        surname,
        age,
        availability: {
          create: {
            Montag: availability.Montag,
            Dienstag: availability.Dienstag,
            Mittwoch: availability.Mittwoch,
            Donnerstag: availability.Donnerstag,
            Freitag: availability.Freitag,
            Samstag: availability.Samstag,
            Sonntag: availability.Sonntag,
          },
        },
        ladenAufgemacht,
        ladenAufmachen,
        ladenSchliessen,
        ladenGeschlossen,
        transitAufgemacht,
        transitAufmachen,
        transitGeschlossen,
        transitSchliessen,
        pitstopAufgemacht,
        pitstopAufmachen,
        pitstopGeschlossen,
        pitstopSchliessen,
      },
    });
    return NextResponse.json({ addedEmployee });
  } catch (error) {
    console.error("Error posting employee:", error);
    return NextResponse.json(
      { error: "Failed to post employee" },
      { status: 500 }
    );
  }
}
