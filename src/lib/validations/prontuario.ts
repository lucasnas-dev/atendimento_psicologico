import * as z from "zod"

export const prontuarioSchema = z.object({
  pacienteId: z.string({
    required_error: "Paciente é obrigatório",
  }),
  dataAtendimento: z.date({
    required_error: "Data é obrigatória",
  }),
  queixaPrincipal: z.string().min(10, {
    message: "Queixa principal deve ter pelo menos 10 caracteres",
  }),
  historiaAtual: z.string().min(10, {
    message: "História atual deve ter pelo menos 10 caracteres",
  }),
  historiaPregressa: z.string().optional(),
  medicacoes: z.string().optional(),
  examesMedicos: z.string().optional(),
  observacoes: z.string().optional(),
})

export type ProntuarioFormValues = z.infer<typeof prontuarioSchema>
