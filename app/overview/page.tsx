"use client"; // Add this at the top of your component file

import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchEmployees } from "../../lib/prismaFunctions";

import React from "react";
import { useFilterStore } from "../../store/store";
import Timetable from "./timeTable";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "./../../components/ui/alert";
import { ExclamationTriangleIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../../components/ui/button";

export default function OverviewPage() {
  const data = useFilterStore((state) => state.data);
  const setData = useFilterStore((state) => state.setData);
  console.log("page Data : ", data);

  const fetchData = async () => {
    let employees = await fetchEmployees();
    setData(employees);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <Alert className="my-7">
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>App-Entwicklung aufgrund von Prüfungen pausiert</AlertTitle>
        <AlertDescription>
          der erste Teil der Anwendung ist die Mitarbeitertabelle mit
          Filteroptionen und der zweite Teil, der sich noch in der Entwicklung
          befindet, soll mit nur einer Button einen Stundenplan für alle 3
          Filiale 'Laden, Transit und PitStop' entsprechend den Wünschzeiten und
          Fähigkeiten jedes Mitarbeiters erstellen
        </AlertDescription>
      </Alert>
      <DataTable columns={columns} data={data} />
      <Button variant="default">Plan generieren (coming soon)</Button>
    </div>
  );
}
