import { db } from "@/lib/db";
import type { Prontuario, Documento } from "@prisma/client";

export async function getProntuarioByPacienteId(
  pacienteId: string,
  tenantId: string
) {
  return db.prontuario.findFirst({
    where: {
      pacienteId,
      tenantId,
    },
    include: {
      paciente: true,
      documentos: true,
    },
  });
}

export async function createProntuario(
  data: Omit<Prontuario, "id" | "createdAt" | "updatedAt">
) {
  return db.prontuario.create({
    data,
  });
}

export async function updateProntuario(
  id: string,
  data: Partial<Prontuario>,
  tenantId: string
) {
  return db.prontuario.update({
    where: {
      id,
      tenantId,
    },
    data,
  });
}

export async function createDocumento(
  data: Omit<Documento, "id" | "createdAt" | "updatedAt">
) {
  return db.documento.create({
    data,
  });
}

export async function updateDocumento(id: string, data: Partial<Documento>) {
  return db.documento.update({
    where: {
      id,
    },
    data,
  });
}
