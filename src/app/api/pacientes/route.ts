import { NextResponse } from "next/server"
import { z } from "zod"
import { getTenantIdFromRequest } from "@/lib/auth"
import { createPaciente, getPacientes } from "@/lib/services/paciente-service"

// Esquema de validação para pacientes
const pacienteSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email().optional().nullable(),
  telefone: z.string().min(10).optional().nullable(),
  dataNascimento: z.string(),
  genero: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
  usuarioId: z.string(),
  tenantId: z.string(),
})

export async function GET(req: Request) {
  try {
    // Obter o ID do tenant do token JWT
    const tenantId = getTenantIdFromRequest(req)

    if (!tenantId) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    // Obter pacientes do tenant específico
    const pacientes = await getPacientes(tenantId)

    return NextResponse.json({
      success: true,
      data: pacientes,
    })
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validar os dados de entrada
    const validatedData = pacienteSchema.parse(body)

    // Obter o ID do tenant do token JWT
    const tenantId = getTenantIdFromRequest(req)

    if (!tenantId) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    // Criar novo paciente
    const novoPaciente = await createPaciente({
      ...validatedData,
      tenantId,
      dataNascimento: new Date(validatedData.dataNascimento),
    })

    return NextResponse.json({
      success: true,
      data: novoPaciente,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Dados de entrada inválidos", errors: error.errors },
        { status: 400 },
      )
    }

    console.error("Erro ao criar paciente:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
