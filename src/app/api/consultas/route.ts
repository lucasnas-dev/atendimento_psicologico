import { NextResponse } from "next/server"
import { z } from "zod"
import { getTenantIdFromRequest } from "@/lib/auth"
import { createConsulta, getConsultas } from "@/lib/services/consulta-service"

// Esquema de validação para consultas
const consultaSchema = z.object({
  data: z.string(),
  duracao: z.number().int().positive(),
  status: z.string(),
  observacoes: z.string().optional().nullable(),
  pacienteId: z.string(),
  usuarioId: z.string(),
  tenantId: z.string(),
})

export async function GET(req: Request) {
  try {
    const tenantId = getTenantIdFromRequest(req)

    if (!tenantId) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    const consultas = await getConsultas(tenantId)

    return NextResponse.json({
      success: true,
      data: consultas,
    })
  } catch (error) {
    console.error("Erro ao buscar consultas:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const tenantId = getTenantIdFromRequest(req)

    if (!tenantId) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    // Validar os dados de entrada
    const validatedData = consultaSchema.parse(body)

    // Criar nova consulta
    const novaConsulta = await createConsulta({
      ...validatedData,
      tenantId,
      data: new Date(validatedData.data),
    })

    return NextResponse.json({
      success: true,
      data: novaConsulta,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Dados de entrada inválidos", errors: error.errors },
        { status: 400 },
      )
    }

    console.error("Erro ao criar consulta:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
