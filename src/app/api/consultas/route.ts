import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
// ❌ REMOVER esta linha:
// import { getTenantIdFromRequest } from "@/lib/auth";

const prisma = new PrismaClient();

export async function GET(_request: NextRequest) {
  try {
    // ✅ TEMPORÁRIO: usar tenantId fixo até implementar autenticação
    const tenantId = "temp-tenant-id";

    const consultas = await prisma.consulta.findMany({
      where: {
        tenantId: tenantId,
      },
      include: {
        paciente: true,
      },
      orderBy: {
        data: "desc",
      },
    });

    return NextResponse.json(consultas);
  } catch (error) {
    console.error("Erro ao buscar consultas:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // ✅ TEMPORÁRIO: usar tenantId fixo até implementar autenticação
    const tenantId = "temp-tenant-id";

    // Validação básica
    const validatedData = {
      pacienteId: body.pacienteId,
      usuarioId: body.usuarioId || "temp-user-id",
      data: body.data,
      duracao: body.duracao || 60,
      status: body.status || "agendada",
      observacoes: body.observacoes || null,
      // ✅ ADICIONAR campos obrigatórios que estavam faltando:
      valor: body.valor || null,
      pago: body.pago || false,
    };

    const novaConsulta = await prisma.consulta.create({
      data: {
        tenantId: tenantId,
        data: new Date(validatedData.data),
        usuarioId: validatedData.usuarioId,
        pacienteId: validatedData.pacienteId,
        duracao: validatedData.duracao,
        status: validatedData.status,
        observacoes: validatedData.observacoes,
        valor: validatedData.valor,
        pago: validatedData.pago,
      },
      include: {
        paciente: true,
      },
    });

    return NextResponse.json(novaConsulta);
  } catch (error) {
    console.error("Erro ao criar consulta:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor ao criar consulta" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
