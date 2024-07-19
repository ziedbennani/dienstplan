"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Availability = {
  Montag: string;
  Dienstag: string;
  Mittwoch: string;
  Donnerstag: string;
  Freitag: string;
  Samstag: string;
  Sonntag: string;
};
export type Mitarbeiter = {
  id: number;
  name: String;
  surname: String;
  age: number;
  contract: String;
  availability: Availability | null;
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
export const columns: ColumnDef<Mitarbeiter>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Age",
    accessorKey: "age",
  },
  {
    header: "availability",
    accessorKey: "availability",
    cell: ({ row }) => {
      const days = row.getValue("availability") as Availability;
      return (
        <div className="flex -space-x-1">
          {Object.values(days)
            .splice(2)
            .map((d, idx) => {
              const bgColor = d === "red" ? "bg-red-400" : "bg-green-400";
              const text =
                idx === 0
                  ? "Mo"
                  : idx === 1
                  ? "Di"
                  : idx === 2
                  ? "Mi"
                  : idx === 3
                  ? "Do"
                  : idx === 4
                  ? "Fr"
                  : idx === 5
                  ? "Sa"
                  : "So";
              return (
                <div
                  key={idx}
                  className={`${bgColor} rounded-full border-2 text-[11px] font-semibold w-9 h-9 flex items-center justify-center `}>
                  {text}
                </div>
              );
            })}
        </div>
      );
    },
  },
];
