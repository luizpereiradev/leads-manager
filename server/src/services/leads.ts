import { leads } from '../models';
import { ILead } from '../types';
import { validateLead } from './validations/validateInputValues';

async function insert(lead: ILead) {
	console.log('lead', lead);
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


export default {
	insert,
	getId,
	getAll
};
