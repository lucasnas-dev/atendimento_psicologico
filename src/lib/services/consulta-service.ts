import { db } from "@/lib/db";
import type { Consulta } from "@prisma/client";

export async function getConsultas(tenantId: string) {
  return db.consulta.findMany({
    where: {
      tenantId,
    },
    include: {
      paciente: true,
      usuario: true,
    },
    orderBy: {
      data: "desc",
    },
  });
}

export async function getConsultaById(id: string, tenantId: string) {
  return db.consulta.findFirst({
    where: {
      id,
      tenantId,
    },
    include: {
      paciente: true,
      usuario: true,
      anotacoes: true,
    },
  });
}

export async function getConsultasByPacienteId(
  pacienteId: string,
  tenantId: string
) {
  return db.consulta.findMany({
    where: {
      pacienteId,
      tenantId,
    },
    orderBy: {
      data: "desc",
    },
  });
}

export async function createConsulta(
  data: Omit<Consulta, "id" | "createdAt" | "updatedAt">
) {
  return db.consulta.create({
    data,
  });
}

export async function updateConsulta(
  id: string,
  data: Partial<Consulta>,
  tenantId: string
) {
  return db.consulta.update({
    where: {
      id,
      tenantId,
    },
    data,
  });
}

export async function deleteConsulta(id: string, tenantId: string) {
  return db.consulta.delete({
    where: {
      id,
      tenantId,
    },
  });
}
