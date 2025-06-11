import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export async function POST() {
  // Remover o cookie de autenticação
  cookies().delete("auth-token")

  return NextResponse.json({
    success: true,
    message: "Logout realizado com sucesso",
  })
}
