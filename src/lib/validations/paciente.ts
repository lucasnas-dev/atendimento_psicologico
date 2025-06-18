import * as z from "zod";

export const pacienteSchema = z.object({
  nome: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres",
  }),
  email: z.string().email({
    message: "Email inválido",
  }),
  telefone: z.string().min(10, {
    message: "Telefone deve ter pelo menos 10 dígitos",
  }),
  dataNascimento: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  genero: z.enum(["masculino", "feminino", "outro"], {
    required_error: "Gênero é obrigatório",
  }),
  endereco: z.object({
    rua: z.string().min(3, {
      message: "Rua deve ter pelo menos 3 caracteres",
    }),
    numero: z.string().min(1, {
      message: "Número é obrigatório",
    }),
    complemento: z.string().optional(),
    bairro: z.string().min(2, {
      message: "Bairro deve ter pelo menos 2 caracteres",
    }),
    cidade: z.string().min(2, {
      message: "Cidade deve ter pelo menos 2 caracteres",
    }),
    estado: z.string().length(2, {
      message: "Estado deve ter 2 caracteres",
    }),
    cep: z.string().length(8, {
      message: "CEP deve ter 8 dígitos",
    }),
  }),
});

export type PacienteFormValues = z.infer<typeof pacienteSchema>;
