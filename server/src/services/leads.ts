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

export default {
	insert
};
