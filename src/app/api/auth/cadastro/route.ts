import { NextRequest, NextResponse } from "next/server";
import { registroSchema } from "@/lib/validations/auth";
import {
  findUserByEmail,
  findUserByCrp,
  createUser,
} from "@/lib/services/user-service";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar dados de entrada
    const validatedData = registroSchema.parse(body);

    // Verificar se o email já existe
    const existingUser = await findUserByEmail(validatedData.email);
    if (existingUser) {
      return NextResponse.json(
        { error: "Este email já está cadastrado" },
        { status: 400 }
      );
    }

    // Verificar se o CRP já existe (se fornecido)
    if (validatedData.crp) {
      const existingCrp = await findUserByCrp(validatedData.crp);
      if (existingCrp) {
        return NextResponse.json(
          { error: "Este CRP já está cadastrado" },
          { status: 400 }
        );
      }
    }

    // Criar usuário
    const user = await createUser({
      nome: validatedData.nome,
      email: validatedData.email,
      senha: validatedData.senha,
      crp: validatedData.crp,
    });

    // Remover senha da resposta
    const { senha: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Usuário cadastrado com sucesso",
        user: userWithoutPassword,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erro no cadastro:", error);

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json(
        { error: "Dados inválidos fornecidos" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
