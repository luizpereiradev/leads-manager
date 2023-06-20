import prisma from '../libs/prisma';
import { ILead } from '../types';

async function insert(lead: ILead) {
	const newLead = await prisma.lead.create({
		data: lead
	});
	return newLead;
}

async function getId (id: number) {
	const leads = await prisma.lead.findUnique({
		where: {
			id
			}
			});
	return leads;
}

async function getAll () {
	const leads = await prisma.lead.findMany();
	return leads;
}

export default {
	insert,
	getId,
	getAll
};
