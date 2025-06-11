import { db } from "@/lib/db"
import type { Paciente } from "@prisma/client"

export async function getPacientes(tenantId: string) {
  return db.paciente.findMany({
    where: {
      tenantId,
    },
    orderBy: {
      nome: "asc",
    },
  })
}

export async function getPacienteById(id: string, tenantId: string) {
  return db.paciente.findFirst({
    where: {
      id,
      tenantId,
    },
    include: {
      consultas: true,
      prontuario: true,
    },
  })
}

export async function createPaciente(data: Omit<Paciente, "id" | "createdAt" | "updatedAt">) {
  return db.paciente.create({
    data,
  })
}

export async function updatePaciente(id: string, data: Partial<Paciente>, tenantId: string) {
  return db.paciente.update({
    where: {
      id,
      tenantId,
    },
    data,
  })
}

export async function deletePaciente(id: string, tenantId: string) {
  return db.paciente.delete({
    where: {
      id,
      tenantId,
    },
  })
}
