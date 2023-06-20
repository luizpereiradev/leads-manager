import { ILead } from '../../types';
import { leadSchema, OptionalLeadSchema } from './schemas';

export const validateLead = (lead: ILead, optional?: boolean) => {
	const validate = optional ?
		OptionalLeadSchema.safeParse(lead):
		leadSchema.safeParse(lead);

	if (!validate.success) {
		const { errors } = validate.error;

		return {

			type: 'VALIDATION_ERROR',
			message: {
				message: 'lead validation error',
				errors: errors.map((error) => ({
					message: error.message,
					path: error.path
				}))
			}
		};
	}

	return {
		type: null
	};
};
