import { z } from 'zod';

const phoneRegex = new RegExp(
  /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
);

export const leadSchema = z.object({
	name: z.string().min(2),
	email: z.string().min(1).email('e-mail invalido.'),
	phone: z.string().regex(phoneRegex, 'Numero invalido!'),
	description: z.string(),
	status: z.string().optional()
});
