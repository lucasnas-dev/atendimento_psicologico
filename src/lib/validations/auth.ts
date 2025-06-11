import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Email inválido"),
  senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export const registroSchema = z
  .object({
    nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
    confirmarSenha: z.string(),
    crp: z.string().regex(/^\d{2}\/\d{5}$/, "CRP deve estar no formato XX/XXXXX"),
    termos: z.boolean().refine((val) => val === true, "Você deve aceitar os termos"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "Senhas não coincidem",
    path: ["confirmarSenha"],
  })

export const pacienteSchema = z.object({
  nome: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido").optional().or(z.literal("")),
  telefone: z.string().optional(),
  dataNascimento: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  genero: z.string().optional(),
  endereco: z.string().optional(),
  observacoes: z.string().optional(),
})

export const consultaSchema = z.object({
  pacienteId: z.string().min(1, "Paciente é obrigatório"),
  data: z.date({
    required_error: "Data é obrigatória",
  }),
  duracao: z.number().min(15, "Duração mínima de 15 minutos").default(50),
  observacoes: z.string().optional(),
  valor: z.number().optional(),
})

export type LoginFormValues = z.infer<typeof loginSchema>
export type RegistroFormValues = z.infer<typeof registroSchema>
export type PacienteFormValues = z.infer<typeof pacienteSchema>
export type ConsultaFormValues = z.infer<typeof consultaSchema>
