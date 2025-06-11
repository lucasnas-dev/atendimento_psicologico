import { NextResponse } from "next/server"
import { z } from "zod"
import { db } from "@/lib/db"
import { hash } from "bcrypt"

const registerSchema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  senha: z.string().min(6),
  crp: z.string().optional(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { nome, email, senha, crp } = registerSchema.parse(body)

    // Verificar se o email já está em uso
    const usuarioExistente = await db.usuario.findUnique({
      where: { email },
    })

    if (usuarioExistente) {
      return NextResponse.json({ success: false, message: "Email já está em uso" }, { status: 400 })
    }

    // Criar um novo tenant
    const tenant = await db.tenant.create({
      data: {
        nome: `Clínica ${nome}`,
        plano: "basico",
        ativo: true,
      },
    })

    // Criptografar a senha
    const senhaHash = await hash(senha, 10)

    // Criar um novo usuário
    const novoUsuario = await db.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        crp,
        tenantId: tenant.id,
        role: "psicologo",
      },
    })

    // Retornar dados do usuário (sem a senha)
    const { senha: _, ...usuarioSemSenha } = novoUsuario

    return NextResponse.json({
      success: true,
      message: "Cadastro realizado com sucesso",
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

    console.error("Erro ao cadastrar:", error)
    return NextResponse.json({ success: false, message: "Erro interno do servidor" }, { status: 500 })
  }
}
