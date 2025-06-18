"use client";

import { usePacientes } from "@/hooks/use-pacientes";
import { PacientesTable } from "@/components/pacientes/pacientes-table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function PacientesPage() {
  // ✅ ATUALIZADO: Adicionar novas props de paginação
  const {
    pacientes,
    isLoading,
    error,
    session,
    status,
    fetchPacientes,
    termoBusca,
    setTermoBusca,
    filtroStatus,
    setFiltroStatus,
    contadores,
    paginacao, // ✅ NOVO: Dados de paginação
    controlesPaginacao, // ✅ NOVO: Controles de paginação
  } = usePacientes();

  // Estados de carregamento permanecem iguais
  if (status === "loading" || isLoading) {
    return (
      <DashboardShell>
        <DashboardHeader
          heading="Pacientes"
          text="Gerencie seus pacientes e acesse seus prontuários"
        />
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <span className="ml-2">Carregando pacientes...</span>
        </div>
      </DashboardShell>
    );
  }

  if (status === "unauthenticated") {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Acesso negado</h2>
            <p className="text-gray-600">
              Você precisa estar logado para acessar esta página.
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Pacientes"
        text="Gerencie seus pacientes e acesse seus prontuários"
      >
        <Button asChild>
          <Link href="/pacientes/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Paciente
          </Link>
        </Button>
      </DashboardHeader>

      {/* ✅ ATUALIZADO: Passar props de paginação */}
      <PacientesTable
        pacientes={pacientes}
        error={error}
        onRetry={fetchPacientes}
        termoBusca={termoBusca}
        onBuscaChange={setTermoBusca}
        filtroStatus={filtroStatus}
        onFiltroChange={setFiltroStatus}
        contadores={contadores}
        paginacao={paginacao} // ✅ NOVO: Dados de paginação
        controlesPaginacao={controlesPaginacao} // ✅ NOVO: Controles
      />
    </DashboardShell>
  );
}
