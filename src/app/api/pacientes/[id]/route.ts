import { NextResponse } from "next/server"
import { z } from "zod"
import { getTenantIdFromRequest } from "@/lib/auth"
import { getPacienteById, updatePaciente, deletePaciente } from "@/lib/services/paciente-service"

// Esquema de validação para atualização de pacientes
const pacienteUpdateSchema = z.object({
  nome: z.string().min(3).optional(),
  email: z.string().email().optional().nullable(),
  telefone: z.string().min(10).optional().nullable(),
  dataNascimento: z.string().optional(),
  genero: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
})

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const tenantId = getTenantIdFromRequest(req)

    if (!tenantId) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    const paciente = await getPacienteById(id, tenantId)

    if (!paciente) {
      return NextResponse.json({ success: false, message: "Paciente não encontrado" }, { status: 404 })
    }

    return NextResponse.json({
      success: true,
      data: paciente,
    })
  } catch (error) {
    console.error("Erro ao buscar paciente:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await req.json()
    const tenantId = getTenantIdFromRequest(req)

    if (!tenantId) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    // Validar os dados de entrada
    const validatedData = pacienteUpdateSchema.parse(body)

    // Converter dataNascimento para Date se estiver presente
    const dataToUpdate = {
      ...validatedData,
      ...(validatedData.dataNascimento && { dataNascimento: new Date(validatedData.dataNascimento) }),
    }

    const pacienteAtualizado = await updatePaciente(id, dataToUpdate, tenantId)

    return NextResponse.json({
      success: true,
      data: pacienteAtualizado,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Dados de entrada inválidos", errors: error.errors },
        { status: 400 },
      )
    }

    console.error("Erro ao atualizar paciente:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const tenantId = getTenantIdFromRequest(req)

    if (!tenantId) {
      return NextResponse.json({ success: false, message: "Não autorizado" }, { status: 401 })
    }

    await deletePaciente(id, tenantId)

    return NextResponse.json({
      success: true,
      message: "Paciente excluído com sucesso",
    })
  } catch (error) {
    console.error("Erro ao excluir paciente:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
