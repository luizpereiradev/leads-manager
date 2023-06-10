import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { Ilead } from "@/types";
import { leadSchema } from "@/libs/validations";

async function createLead(lead: Ilead) {
  const newLead = await prisma.lead.create({
    data: lead,
  });
  return newLead;
}

export async function POST(request: Request) {
  const body = await request.json();

  const response = leadSchema.safeParse(body);

  if (!response.success) {
    const { errors } = response.error;

    return NextResponse.json(
      {
        error: { message: "Invalid request", errors },
      },
      {
        status: 400,
      }
    );
  }

  createLead(response.data);

  return NextResponse.json(response);
}

const getLeads = () => {
  return prisma.lead.findMany();
};

export async function GET() {
  const data = await getLeads();
  return NextResponse.json(data);
}
