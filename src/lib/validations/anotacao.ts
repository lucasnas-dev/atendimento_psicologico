import * as z from "zod";

export const anotacaoSchema = z.object({
  pacienteId: z.string({
    required_error: "Paciente é obrigatório",
  }),
  data: z.date({
    required_error: "Data é obrigatória",
  }),
  titulo: z.string().min(3, {
    message: "Título deve ter pelo menos 3 caracteres",
  }),
  conteudo: z.string().min(10, {
    message: "Conteúdo deve ter pelo menos 10 caracteres",
  }),
  tipo: z.enum(["sessao", "evolucao", "encaminhamento", "outro"], {
    required_error: "Tipo é obrigatório",
  }),
});

export type AnotacaoFormValues = z.infer<typeof anotacaoSchema>;
