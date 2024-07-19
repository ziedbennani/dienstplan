import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // const { day, availability } = req.query;

  // if (!day || !availability) {
  //   return res.status(400).json({ message: "Missing query parameters" });
  // }

  try {
    const employees = await prisma.employee.findMany({
      include: { availability: true },
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  } finally {
    await prisma.$disconnect();
  }
}
