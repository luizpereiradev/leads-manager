import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { z } from "zod";

import { Ilead } from "@/types";

async function createLead(lead: Ilead) {
  const newLead = await prisma.lead.create({
    data: lead,
  });
  return newLead;
}

const phoneRegex = new RegExp(
  /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
);

const schema = z.object({
  nome: z.string(),
  mail: z.string().email("e-mail invalido."),
  telefone: z.string().regex(phoneRegex, "Numero invalido!"),
  status: z.string(),
  descricao: z.string(),
});

export async function POST(request: Request) {
  const body = await request.json();

  const response = schema.safeParse(body);

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
