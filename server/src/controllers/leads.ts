import { Request, Response } from 'express';
import { leads } from '../services';
import { mapError } from '../utils/errorMap';

async function insert(req: Request, res: Response) {
	const { type, message } = await leads.insert(req.body);
	if (type) {
		return res.status(mapError(type)).json(message);
	}

	return res.status(201).json(message);
}

export default {
	insert
};
