import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import type { Usuario } from "@prisma/client";

export async function findUserByEmail(email: string) {
  return db.usuario.findUnique({
    where: { email },
  });
}

export async function findUserByCrp(crp: string) {
  return db.usuario.findFirst({
    where: { crp },
  });
}

export async function createUser(data: {
  nome: string;
  email: string;
  senha: string;
  crp?: string;
}) {
  const hashedPassword = await hash(data.senha, 12);

  // Criar tenant
  const tenant = await db.tenant.create({
    data: {
      nome: `Consultório - ${data.nome}`,
      ativo: true,
    },
  });

  // Criar usuário
  return db.usuario.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha: hashedPassword,
      crp: data.crp,
      role: "psicologo",
      tenantId: tenant.id,
      ativo: true,
    },
  });
}
