import { z } from 'zod';

export const leadSchema = z.object({
	nome: z.string().min(2),
	mail: z.string().min(1).email('e-mail invalido.'),
	telefone: z.string().min(10, 'Numero invalido!'),
	descricao: z.string(),
	status: z.string().optional()
});
