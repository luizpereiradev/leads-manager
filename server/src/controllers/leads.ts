import { Request, Response } from 'express';
import { leads } from '../services';
import { mapError } from '../utils/errorMap';

async function insert(req: Request, res: Response) {
	const { type, message } = await leads.insert(req.body);
	if (type) {
		return res.status(mapError(type)).json({message});
	}

	return res.status(201).json(message);
}

async function getId(req: Request, res: Response) {
	const { id } = req.params;
	const { type, message} = await leads.getId(Number(id));
	if (type) {
		return res.status(mapError(type)).json({message});
	}

	return res.status(200).json(message);
}

async function getAll(req: Request, res: Response) {
	const { type, message} = await leads.getAll();
	if (type) {
		return res.status(mapError(type)).json({message});
	}

	return res.status(200).json(message);
}

async function updateLead(req: Request, res: Response) {
	const { id } = req.params;
	const { type, message} = await leads.updateLead(Number(id), req.body);
	if (type) {
		return res.status(mapError(type)).json({message});
	}

	return res.status(200).json(message);
}

async function getByName(req: Request, res: Response) {
	const { name } = req.params;
	const { type, message} = await leads.getByName(name);
	if (type) {
		return res.status(mapError(type)).json({message});
	}

	return res.status(200).json(message);
}

export default {
	insert,
	getId,
	getAll,
	updateLead,
	getByName
};
