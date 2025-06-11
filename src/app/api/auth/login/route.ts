import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { sign } from "@/lib/auth"
import { compare } from "bcrypt"
import { cookies } from "next/headers"

const loginSchema = z.object({
  email: z.string().email(),
  senha: z.string().min(6),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, senha } = loginSchema.parse(body)

    // Buscar usuário pelo email
    const usuario = await db.usuario.findUnique({
      where: { email },
      include: {
        tenant: true,
      },
    })

    if (!usuario) {
      return NextResponse.json({ success: false, message: "Credenciais inválidas" }, { status: 401 })
    }

    // Verificar se a senha está correta
    const senhaCorreta = await compare(senha, usuario.senha)

    if (!senhaCorreta) {
      return NextResponse.json({ success: false, message: "Credenciais inválidas" }, { status: 401 })
    }

    // Verificar se o tenant está ativo
    if (!usuario.tenant.ativo) {
      return NextResponse.json(
        { success: false, message: "Conta desativada. Entre em contato com o suporte." },
        { status: 403 },
      )
    }

    // Gerar token JWT
    const token = await sign({
      userId: usuario.id,
      email: usuario.email,
      nome: usuario.nome,
      role: usuario.role,
      tenantId: usuario.tenantId,
    })

    // Definir cookie com o token
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 7 dias
    })

    // Retornar dados do usuário (sem a senha)
    const { senha: _, ...usuarioSemSenha } = usuario

    return NextResponse.json({
      success: true,
      message: "Login realizado com sucesso",
      data: {
        usuario: usuarioSemSenha,
      },
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, message: "Dados de entrada inválidos", errors: error.errors },
        { status: 400 },
      )
    }

    console.error("Erro ao fazer login:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
