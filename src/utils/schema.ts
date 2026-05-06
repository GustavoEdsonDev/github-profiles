import { z } from "zod";

// Schema de validação com Zod
export const profileSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  username: z.string()
    .min(3, "Username deve ter pelo menos 3 caracteres")
    .regex(/^[a-zA-Z0-9_]+$/, "Username só pode conter letras, números e underscore"),
  newsletter: z.boolean().optional(),
});

export type ProfileFormData = z.infer<typeof profileSchema>;

// Schema para busca com regras específicas
export const searchSchema = z.object({
  query: z.string()
    .min(1, "Digite algo para buscar")
    .max(39, "Máximo 39 caracteres")
    .refine(
      (val) => val.trim().length > 0,
      "Digite algo para buscar"
    )
    .refine(
      (val) => !val.includes(" "),
      "Espaços em branco não são permitidos"
    )
    .refine(
      (val) => /^[a-zA-Z0-9-]+$/.test(val),
      "Apenas letras (a-z), números (0-9) e hifens (-) são permitidos"
    )
    .refine(
      (val) => !val.startsWith("-"),
      "Não pode começar com hífen"
    )
    .refine(
      (val) => !val.endsWith("-"),
      "Não pode terminar com hífen"
    )
    .refine(
      (val) => !val.includes("--"),
      "Não pode conter hifens consecutivos"
    ),
});

export type SearchQuery = z.infer<typeof searchSchema>;

