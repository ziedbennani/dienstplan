"use client"; // Add this at the top of your component file

import { useState, useEffect } from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import { fetchEmployees } from "../../lib/prismaFunctions";

import React from "react";
import { useFilterStore } from "../../store/store";

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
      <DataTable columns={columns} data={data} />
    </div>
  );
}
