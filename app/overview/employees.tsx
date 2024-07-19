"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

interface Availability {
  Montag: string;
  Dienstag: string;
  Mittwoch: string;
  Donnerstag: string;
  Freitag: string;
  Samstag: string;
  Sonntag: string;
}
interface Emp {
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
}

export default function Employees() {
  const [employees, setEmployees] = useState<Emp[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [day, setDay] = useState("monday");

  // const availabilityFunction = (week:String[]) => {
  //   week.
  // }

  const func = (a: string) => {
    a == "green" ? a : (a = "green");
  };

  useEffect(() => {
    async function fetchEmployees() {
      const res = await fetch(`/api/employees`);
      console.log("res: ", res);
      const data = await res.json();
      console.log("data:", data);
      setEmployees(data);
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead>Laden Schliessen</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((e) => (
            <TableRow>
              <TableCell>{e.name}</TableCell>
              <TableCell>
                {e.availability
                  ? Object.values(e.availability)
                      .splice(2)
                      .map((v) => v)
                  : null}
              </TableCell>
              <TableCell>{e.ladenSchliessen && "Ja"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
