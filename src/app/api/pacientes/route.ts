import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // Usando /next para App Router
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import { createPaciente, getPacientes } from "@/lib/services/paciente-service";

// Esquema de validação para criação de pacientes
const createPacienteSchema = z.object({
  nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Formato de email inválido.").optional().nullable(),
  telefone: z
    .string()
    .min(10, "O telefone deve ter pelo menos 10 dígitos.")
    .optional()
    .nullable(),
  dataNascimento: z
    .string()
    .refine((date) => !isNaN(new Date(date).getTime()), {
      message: "Data de nascimento inválida.",
    }),
  genero: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.tenantId) {
      return NextResponse.json(
        {
          success: false,
          message: "Não autorizado ou Tenant ID não encontrado.",
        },
        { status: 401 }
      );
    }

    const pacientes = await getPacientes(session.user.tenantId);

    return NextResponse.json({
      success: true,
      data: pacientes,
    });
  } catch (error) {
    console.error("Erro ao buscar pacientes:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor ao buscar pacientes.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.tenantId || !session?.user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Não autorizado, informações de usuário ou tenant ausentes.",
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const validatedData = createPacienteSchema.parse(body);

    const normalizedData = {
      nome: validatedData.nome,
      email: validatedData.email ?? null,
      telefone: validatedData.telefone ?? null,
      genero: validatedData.genero ?? null,
      endereco: validatedData.endereco ?? null,
      observacoes: validatedData.observacoes ?? null,
      dataNascimento: new Date(validatedData.dataNascimento),
    };

    const novoPaciente = await createPaciente({
      ...normalizedData,
      usuarioId: session.user.id, // ID do usuário que está criando
      tenantId: session.user.tenantId,
      ativo: true, // Paciente criado como ativo por padrão
    });

    return NextResponse.json(
      {
        success: true,
        data: novoPaciente,
        message: "Paciente criado com sucesso.",
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: "Dados de entrada inválidos.",
          errors: error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    console.error("Erro ao criar paciente:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor ao criar paciente.",
      },
      { status: 500 }
    );
  }
}
