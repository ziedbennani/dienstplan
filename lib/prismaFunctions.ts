"use server";

// lib/prismaFunctions.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const fetchEmployees = async () => {
  const employees = await prisma.employee.findMany({
    include: { availability: true },
  });
  return employees;
};

export const fetchEmployeeById = async (id: number) => {
  const employee = await prisma.employee.findUnique({
    where: { id },
    include: { availability: true },
  });
  return employee;
};

// Function to delete an employee by ID
export const deleteEmployeeById = async (id: number) => {
  console.log("deleteEmp...");
  try {
    await prisma.employee.delete({
      where: { id },
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw new Error(`Failed to delete employee with ID ${id}`);
  }
};
