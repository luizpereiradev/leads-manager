
import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { parse } from "url";

const getId = (url: string) => {
  const urlObj = parse(url, true).pathname;
  if (!urlObj) {
    return 999999999; // caso não encontre o id, retorna um id inválido
  }
  const id = urlObj.split("/")[3];
  return +id;
};

const getLead = async (id: number) => {
  if(isNaN(id)) return { error: { message: "Id inválido" }, cod: 400 };
  const lead = await prisma.lead.findUnique({
    where: {
      id,
    },
  });
  if (!lead) return { error: { message: "Lead não encontrada" }, cod: 404 };
    return lead;
};

export async function GET(request: Request) {
  const id = getId(request.url);
  const lead = await getLead(id);
  if ('error' in lead) {
    return NextResponse.json(lead.error, { status: lead.cod });
  }
  return NextResponse.json({ message: lead });
}

export async function DELETE(request: Request) {
  const id = getId(request.url);
  const lead = await getLead(id);
  if ('error' in lead) {
    return NextResponse.json(lead.error, { status: lead.cod });
  }
  await prisma.lead.update({
    where: {
      id,
    },
    data: {
      status: "Arquivado",
    }, 
  });
  return NextResponse.json({ message: "Lead Arquivado" });
}