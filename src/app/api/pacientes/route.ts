import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { createPaciente, getPacientes } from "@/lib/services/paciente-service";

// Esquema de validação para pacientes
const pacienteSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email().optional().nullable(),
  telefone: z.string().min(10).optional().nullable(),
  dataNascimento: z.string(),
  genero: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Não autorizado" },
        { status: 401 }
      );
    }

    // Obter pacientes do tenant específico
    const pacientes = await getPacientes(session.user.tenantId);

    return NextResponse.json({
      success: true,
      data: pacientes,
    });
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: "Não autorizado" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validar os dados de entrada
    const validatedData = pacienteSchema.parse(body);

    // Normalizar os dados opcionais para remover undefined
    const normalizedData = {
      nome: validatedData.nome,
      email: validatedData.email ?? null,
      telefone: validatedData.telefone ?? null,
      genero: validatedData.genero ?? null,
      endereco: validatedData.endereco ?? null,
      observacoes: validatedData.observacoes ?? null,
      dataNascimento: new Date(validatedData.dataNascimento),
    };

    // Criar novo paciente
    const novoPaciente = await createPaciente({
      ...normalizedData,
      usuarioId: session.user.id,
      tenantId: session.user.tenantId,
      ativo: true,
    });

    return NextResponse.json({
      success: true,
      data: novoPaciente,
      message: "Paciente criado com sucesso",
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados de entrada inválidos",
          errors: error.errors,
        },
        { status: 400 }
      );
    }

    console.error("Erro ao criar paciente:", error);
    return NextResponse.json(
      { success: false, message: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
