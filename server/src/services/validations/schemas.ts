import { z } from "zod";

const phoneRegex = new RegExp(
  /^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$/
);

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).email("e-mail invalido."),
  phone: z.string().regex(phoneRegex, "Numero invalido!"),
  description: z.string(),
  status: z.string().optional(),
});

export const OptionalLeadSchema = z.object({
  name: z.string().min(2).optional(),
  email: z.string().min(1).email("e-mail invalido.").optional(),
  phone: z.string().regex(phoneRegex, "Numero invalido!").optional(),
  description: z.string().optional(),
  status: z.string().optional(),
});
