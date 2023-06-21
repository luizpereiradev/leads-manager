import { z } from "zod";

export const leadSchema = z.object({
  nome: z.string(),
  mail: z.string().email("e-mail invalido."),
  telefone: z.string().min(10, "Numero invalido!"),
  descricao: z.string(),
  status: z.string().optional(),
});
