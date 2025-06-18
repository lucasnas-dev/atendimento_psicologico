import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getTenantId() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  const user = await db.usuario.findUnique({
    where: {
      email: session.user.email,
    },
    select: {
      tenantId: true,
    },
  });

  return user?.tenantId || null;
}

export async function getTenantContext() {
  const tenantId = await getTenantId();

  if (!tenantId) {
    throw new Error("Tenant não encontrado");
  }

  return {
    tenantId,
  };
}
