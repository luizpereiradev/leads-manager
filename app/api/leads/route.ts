
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

const getLeads = () => {
  return prisma.lead.findMany();
};

export async function GET() {
  const data = await getLeads();
  return NextResponse.json(data);
}