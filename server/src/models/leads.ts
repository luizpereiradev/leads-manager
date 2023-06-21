import prisma from "../libs/prisma";
import { ILead } from "../types";

async function insert(lead: ILead) {
  const newLead = await prisma.lead.create({
    data: lead,
  });
  return newLead;
}

async function getId(id: number) {
  const leads = await prisma.lead.findUnique({
    where: {
      id,
    },
  });
  return leads;
}

async function getAll() {
  const leads = await prisma.lead.findMany();
  return leads;
}

async function updateLead(id: number, data: ILead) {
  const leads = await prisma.lead.update({
    where: {
      id,
    },
    data,
  });
  return leads;
}

async function getByName(name: string) {
  const leads = await prisma.lead.findMany({
    where: {
      name,
    },
  });
  return leads;
}

async function getByStatus(status: string) {
  const leads = await prisma.lead.findMany({
    where: {
      status,
    },
  });
  return leads;
}

export default {
  insert,
  getId,
  getAll,
  updateLead,
  getByName,
  getByStatus,
};
