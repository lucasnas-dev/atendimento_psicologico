import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db"

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        senha: { label: "Senha", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.senha) {
          return null
        }

        const usuario = await db.usuario.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            tenant: true,
          },
        })

        if (!usuario || !usuario.ativo) {
          return null
        }

        const senhaValida = await bcrypt.compare(credentials.senha, usuario.senha)

        if (!senhaValida) {
          return null
        }

        return {
          id: usuario.id,
          email: usuario.email,
          name: usuario.nome,
          role: usuario.role,
          tenantId: usuario.tenantId,
          tenant: usuario.tenant,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.tenantId = user.tenantId
        token.tenant = user.tenant
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
        session.user.tenantId = token.tenantId as string
        session.user.tenant = token.tenant as any
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}
