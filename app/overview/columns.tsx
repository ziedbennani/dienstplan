"use client";

import axios, { AxiosError } from "axios";

import { ColumnDef } from "@tanstack/react-table";
import { CircleCheck, CircleX } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "./../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./../../components/ui/dropdown-menu";
import { deleteEmployeeById } from "../../lib/prismaFunctions";
import { useRouter } from "next/navigation";

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
  name: string;
  surname: string;
  age: number;
  contract: string | null;
  availability: Availability | null;
  ladenAufgemacht: number;
  ladenAufmachen: boolean | null;
  ladenGeschlossen: number;
  ladenSchliessen: boolean | null;
  transitAufgemacht: number;
  transitAufmachen: boolean | null;
  transitGeschlossen: number;
  transitSchliessen: boolean | null;
  pitstopAufgemacht: number;
  pitstopAufmachen: boolean | null;
  pitstopGeschlossen: number;
  pitstopSchliessen: boolean | null;
};

export const columns: ColumnDef<Mitarbeiter>[] = [
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Nachname",
    accessorKey: "surname",
  },
  {
    header: "Alter",
    accessorKey: "age",
  },
  {
    header: "Wünschzeiten",
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
  {
    header: "Laden",
    columns: [
      {
        header: "Aufmachen",
        accessorKey: "ladenAufmachen",
        cell: ({ row }) => {
          const value = row.getValue("ladenAufmachen");
          return value === true ? (
            <CircleCheck
              size={20}
              color="white"
              className="rounded-full bg-green-400 "
            />
          ) : (
            <CircleX
              size={20}
              color="white"
              className="rounded-full bg-red-400 "
            />
          );
        },
      },
      {
        header: "Schliessen",
        accessorKey: "ladenSchliessen",
        cell: ({ row }) => {
          const value = row.getValue("ladenSchliessen");
          return value === true ? (
            <CircleCheck
              size={20}
              color="white"
              className="rounded-full bg-green-400 "
            />
          ) : (
            <CircleX
              size={20}
              color="white"
              className="rounded-full bg-red-400 "
            />
          );
        },
      },
    ],
  },
  {
    header: "Transit",
    columns: [
      {
        header: "Aufmachen",
        accessorKey: "transitAufmachen",
        cell: ({ row }) => {
          const value = row.getValue("transitAufmachen");
          return value === true ? (
            <CircleCheck
              size={20}
              color="white"
              className="rounded-full bg-green-400 "
            />
          ) : (
            <CircleX
              size={20}
              color="white"
              className="rounded-full bg-red-400 "
            />
          );
        },
      },
      {
        header: "Schliessen",
        accessorKey: "transitSchliessen",
        cell: ({ row }) => {
          const value = row.getValue("transitSchliessen");
          return value === true ? (
            <CircleCheck
              size={20}
              color="white"
              className="rounded-full bg-green-400 "
            />
          ) : (
            <CircleX
              size={20}
              color="white"
              className="rounded-full bg-red-400 "
            />
          );
        },
      },
    ],
  },
  {
    header: "Pit Stop",
    columns: [
      {
        header: "Aufmachen",
        accessorKey: "pitstopAufmachen",
        cell: ({ row }) => {
          const value = row.getValue("pitstopAufmachen");
          return value === true ? (
            <CircleCheck
              size={20}
              color="white"
              className="rounded-full bg-green-400 "
            />
          ) : (
            <CircleX
              size={20}
              color="white"
              className="rounded-full bg-red-400 "
            />
          );
        },
      },
      {
        header: "Schliessen",
        accessorKey: "pitstopSchliessen",
        cell: ({ row }) => {
          const value = row.getValue("pitstopSchliessen");
          return value === true ? (
            <CircleCheck
              size={20}
              color="white"
              className="rounded-full bg-green-400 "
            />
          ) : (
            <CircleX
              size={20}
              color="white"
              className="rounded-full bg-red-400 "
            />
          );
        },
      },
    ],
  },
  {
    header: "",
    id: "actions",
    cell: ({ row }) => {
      const employeeId = row.original.id;
      const router = useRouter();

      const handleDelete = async () => {
        try {
          await fetch(`/api/employees/${employeeId}`, {
            method: "DELETE",
          });
          router.refresh();
        } catch (e) {
          console.log(e);
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handleDelete}>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
