import { db } from "@/lib/db";
import type { Paciente } from "@prisma/client";

export async function getPacientes(tenantId: string) {
  return db.paciente.findMany({
    where: {
      tenantId,
    },
    orderBy: {
      nome: "asc",
    },
  });
}

export async function getPacienteById(id: string, tenantId: string) {
  return db.paciente.findFirst({
    where: {
      id,
      tenantId,
    },
    include: {
      consultas: {
        orderBy: {
          data: "desc",
        },
      },
      prontuario: true,
    },
  });
}

export async function createPaciente(
  data: Omit<Paciente, "id" | "createdAt" | "updatedAt">
) {
  return db.paciente.create({
    data,
  });
}

export async function updatePaciente(
  id: string,
  data: Partial<Paciente>,
  tenantId: string
) {
  return db.paciente.update({
    where: {
      id,
      tenantId,
    },
    data,
  });
}

export async function deletePaciente(id: string, tenantId: string) {
  return db.paciente.delete({
    where: {
      id,
      tenantId,
    },
  });
}

export async function getPacientesAtivos(tenantId: string) {
  return db.paciente.findMany({
    where: {
      tenantId,
      ativo: true,
    },
    orderBy: {
      nome: "asc",
    },
  });
}

export async function getPacientesComConsultas(tenantId: string) {
  return db.paciente.findMany({
    where: {
      tenantId,
    },
    include: {
      consultas: {
        orderBy: {
          data: "desc",
        },
        take: 1, // Apenas a última consulta
      },
    },
    orderBy: {
      nome: "asc",
    },
  });
}

export async function buscarPacientes(tenantId: string, termo: string) {
  return db.paciente.findMany({
    where: {
      tenantId,
      OR: [
        {
          nome: {
            contains: termo,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: termo,
            mode: "insensitive",
          },
        },
        {
          telefone: {
            contains: termo,
          },
        },
      ],
    },
    orderBy: {
      nome: "asc",
    },
  });
}
