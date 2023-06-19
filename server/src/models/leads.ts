import prisma from '../libs/prisma';
import { ILead } from '../types';

async function insert(lead: ILead) {
	const newLead = await prisma.lead.create({
		data: lead
	});
	return newLead;
}

export default {
	insert
};
