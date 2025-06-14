import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"; // Usando /next para App Router
import { z } from "zod";
import { authOptions } from "@/lib/auth";
import {
  getPacienteById,
  updatePaciente,
  deletePaciente,
} from "@/lib/services/paciente-service";

// Esquema de validação para atualização de pacientes (campos opcionais)
const updatePacienteSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter pelo menos 3 caracteres.")
    .optional(),
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
    })
    .optional(),
  genero: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
  ativo: z.boolean().optional(),
});

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
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

    const pacienteId = params.id;
    const tenantId = session.user.tenantId;

    const paciente = await getPacienteById(pacienteId, tenantId);

    if (!paciente) {
      return NextResponse.json(
        { success: false, message: "Paciente não encontrado." },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: paciente });
  } catch (error) {
    console.error(`Erro ao buscar paciente ${params.id}:`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor ao buscar paciente.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
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

    const pacienteId = params.id;
    const tenantId = session.user.tenantId;

    const body = await request.json();
    const validatedData = updatePacienteSchema.parse(body);

    // Prepara os dados para atualização, convertendo dataNascimento se presente
    const dataToUpdate: { [key: string]: any } = { ...validatedData };
    if (validatedData.dataNascimento) {
      dataToUpdate.dataNascimento = new Date(validatedData.dataNascimento);
    }
    // Remove chaves com valor undefined para não sobrescrever com undefined no Prisma
    Object.keys(dataToUpdate).forEach(
      (key) => dataToUpdate[key] === undefined && delete dataToUpdate[key]
    );

    if (Object.keys(dataToUpdate).length === 0) {
      return NextResponse.json(
        { success: false, message: "Nenhum dado fornecido para atualização." },
        { status: 400 }
      );
    }

    const updatedPaciente = await updatePaciente(
      pacienteId,
      dataToUpdate,
      tenantId
    );

    return NextResponse.json({
      success: true,
      data: updatedPaciente,
      message: "Paciente atualizado com sucesso.",
    });
  } catch (error: any) {
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
    // Prisma error P2025: Record to update not found.
    if (error.code === "P2025") {
      return NextResponse.json(
        {
          success: false,
          message: "Paciente não encontrado para atualização.",
        },
        { status: 404 }
      );
    }
    console.error(`Erro ao atualizar paciente ${params.id}:`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor ao atualizar paciente.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
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

    const pacienteId = params.id;
    const tenantId = session.user.tenantId;

    await deletePaciente(pacienteId, tenantId);

    return NextResponse.json(
      { success: true, message: "Paciente deletado com sucesso." },
      { status: 200 }
    ); // status 200 ou 204
  } catch (error: any) {
    // Prisma error P2025: Record to delete not found.
    if (error.code === "P2025") {
      return NextResponse.json(
        { success: false, message: "Paciente não encontrado para exclusão." },
        { status: 404 }
      );
    }
    console.error(`Erro ao deletar paciente ${params.id}:`, error);
    return NextResponse.json(
      {
        success: false,
        message: "Erro interno do servidor ao deletar paciente.",
      },
      { status: 500 }
    );
  }
}
