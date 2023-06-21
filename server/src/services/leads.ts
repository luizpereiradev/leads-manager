import { leads } from '../models';
import { ILead } from '../types';
import { validateLead } from './validations/validateInputValues';

async function insert(lead: ILead) {
	const error = validateLead(lead);
	if (error.type){
		return error;
	}
	const newLead = await leads.insert(lead);
	return {
		type: null,
		message: newLead
	};
}

async function getId(id: number) {
	const lead = await leads.getId(id);
	if (!lead) {
		return {
			type: 'ID_NOT_FOUND',
			message: 'Lead not found'
		};
	}
	return {
		type: null,
		message: lead
	};
}

async function getAll() {
	const lead = await leads.getAll();
	if (!lead) {
		return {
			type: 'ID_NOT_FOUND',
			message: 'Lead not found'
		};
	}
	return {
		type: null,
		message: lead
	};
}

async function updateLead(id: number, data: ILead) {
	const error = validateLead(data, true);
	if (error.type){
		return error;
	}
	const lead = await leads.updateLead(id, data);
	if (!lead) {
		return {
			type: 'ID_NOT_FOUND',
			message: 'Lead not found'
		};
	}
	return {
		type: null,
		message: lead
	};
}

async function getByName(name: string) {
	const allLeads = await leads.getAll();
	const leadsNames = allLeads.filter((lead) => {
		const leadName = lead.name.toLowerCase();
		return leadName.includes(name.toLowerCase());
	});
	if (leadsNames.length === 0) {
		return {
			type: 'NAME_NOT_FOUND',
			message: 'Leads not found'
		};
	}
	return {
		type: null,
		message: leadsNames
}
}

async function getByStatus(status: string) {
	const allLeads = await leads.getAll();
	const leadsStatus = allLeads.filter((lead) => {
		const leadStatus = lead.status?.toLowerCase();
		return leadStatus?.includes(status.toLowerCase());
	});

	if (!leadsStatus || leadsStatus.length === 0) {
		return {
			type: 'STATUS_NOT_FOUND',
			message: 'Status not found'
		};
	}
	return {
		type: null,
		message: leadsStatus
	};
}


export default {
	insert,
	getId,
	getAll,
	updateLead,
	getByName,
	getByStatus
};
