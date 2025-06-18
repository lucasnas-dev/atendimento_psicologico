import * as z from "zod";

export const consultaSchema = z.object({
  pacienteId: z.string({
    required_error: "Paciente é obrigatório",
  }),
  data: z.date({
    required_error: "Data é obrigatória",
  }),
  hora: z.string({
    required_error: "Hora é obrigatória",
  }),
  duracao: z
    .number({
      required_error: "Duração é obrigatória",
    })
    .min(15, {
      message: "Duração mínima é de 15 minutos",
    })
    .max(120, {
      message: "Duração máxima é de 120 minutos",
    }),
  tipo: z.enum(["presencial", "online"], {
    required_error: "Tipo é obrigatório",
  }),
  observacoes: z.string().optional(),
});

export type ConsultaFormValues = z.infer<typeof consultaSchema>;
