"use client";

import { Paciente } from "@/types/paciente";
import { StatusFilter } from "@/hooks/use-pacientes";
import { calcularIdade, formatarData } from "@/lib/utils/date";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  FileText,
  Eye,
  Edit,
  Archive,
  ArchiveRestore,
} from "lucide-react";
import Link from "next/link";
import { Paginacao } from "./paginacao";
import { toast } from "sonner";

interface PacientesTableProps {
  pacientes: Paciente[];
  error: string | null;
  onRetry: () => void;
  termoBusca: string;
  onBuscaChange: (termo: string) => void;
  filtroStatus: StatusFilter;
  onFiltroChange: (filtro: StatusFilter) => void;
  contadores: { total: number; ativos: number; inativos: number };
  paginacao: {
    totalItens: number;
    totalPaginas: number;
    paginaAtual: number;
    inicio: number;
    fim: number;
    temProxima: boolean;
    temAnterior: boolean;
    itensPorPagina: number;
    usarResponsivo?: boolean;
    itensPorPaginaCalculado?: number;
  };
  controlesPaginacao: {
    irParaPagina: (pagina: number) => void;
    proximaPagina: () => void;
    paginaAnterior: () => void;
    alterarItensPorPagina: (qtd: number) => void;
    toggleResponsivo?: () => void;
  };
}

export function PacientesTable({
  pacientes,
  error,
  onRetry,
  termoBusca,
  onBuscaChange,
  filtroStatus,
  onFiltroChange,
  contadores,
  paginacao,
  controlesPaginacao,
}: PacientesTableProps) {
  // Função para arquivar/desarquivar paciente
  const handleArquivarPaciente = async (paciente: Paciente) => {
    try {
      const novoStatus = !paciente.ativo;
      const acao = novoStatus ? "ativado" : "arquivado";

      // TODO: Implementar chamada para API
      console.log(`${acao} paciente:`, paciente.id);

      toast.success(`Paciente ${paciente.nome} foi ${acao} com sucesso!`);

      // Recarregar a lista
      onRetry();
    } catch (error) {
      toast.error("Erro ao alterar status do paciente");
    }
  };

  return (
    <div className="space-y-4">
      {/* Barra de busca e filtros */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por nome, email ou telefone..."
              className="w-[300px] pl-8"
              value={termoBusca}
              onChange={(e) => onBuscaChange(e.target.value)}
            />
          </div>

          <Select value={filtroStatus} onValueChange={onFiltroChange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filtrar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">
                <div className="flex w-full items-center justify-between">
                  <span>Todos</span>
                  <Badge
                    variant={filtroStatus === "todos" ? "default" : "secondary"}
                    className="ml-2 text-xs"
                  >
                    {contadores.total}
                  </Badge>
                </div>
              </SelectItem>

              <SelectItem value="ativo">
                <div className="flex w-full items-center justify-between">
                  <span>Ativos</span>
                  <Badge
                    variant={filtroStatus === "ativo" ? "default" : "secondary"}
                    className="ml-2 text-xs"
                  >
                    {contadores.ativos}
                  </Badge>
                </div>
              </SelectItem>

              <SelectItem value="inativo">
                <div className="flex w-full items-center justify-between">
                  <span>Arquivados</span>
                  <Badge
                    variant={
                      filtroStatus === "inativo" ? "default" : "secondary"
                    }
                    className="ml-2 text-xs"
                  >
                    {contadores.inativos}
                  </Badge>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filtros ativos */}
      {(termoBusca || filtroStatus !== "todos") && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>
            {paginacao.totalItens > 0
              ? `${paginacao.totalItens} paciente(s) encontrado(s)`
              : "Nenhum paciente encontrado"}
          </span>

          <div className="flex items-center gap-1">
            {termoBusca && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-xs"
              >
                Busca: "{termoBusca}"
                <button
                  onClick={() => onBuscaChange("")}
                  className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-xs hover:bg-gray-200"
                >
                  ×
                </button>
              </Badge>
            )}
            {filtroStatus !== "todos" && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-xs"
              >
                Status: {filtroStatus === "ativo" ? "Ativos" : "Arquivados"}
                <button
                  onClick={() => onFiltroChange("todos")}
                  className="ml-1 flex h-4 w-4 items-center justify-center rounded-full text-xs hover:bg-gray-200"
                >
                  ×
                </button>
              </Badge>
            )}
          </div>
        </div>
      )}

      {/* Exibir erro se houver */}
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-red-600">{error}</p>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={onRetry}
          >
            Tentar novamente
          </Button>
        </div>
      )}

      {/* ✅ ATUALIZADA: Tabela com linhas mais fortes */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="border-b-2 border-gray-200">
              <TableHead>Nome</TableHead>
              <TableHead>Idade</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pacientes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center">
                  <div className="text-center">
                    {termoBusca || filtroStatus !== "todos" ? (
                      <>
                        <p className="mb-2 text-gray-500">
                          Nenhum paciente encontrado com os filtros aplicados
                        </p>
                        <div className="flex justify-center gap-2">
                          {termoBusca && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onBuscaChange("")}
                            >
                              Limpar busca
                            </Button>
                          )}
                          {filtroStatus !== "todos" && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => onFiltroChange("todos")}
                            >
                              Mostrar todos
                            </Button>
                          )}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="mb-2 text-gray-500">
                          Nenhum paciente cadastrado
                        </p>
                        <Button asChild size="sm">
                          <Link href="/pacientes/novo">
                            <Plus className="mr-2 h-4 w-4" />
                            Cadastrar primeiro paciente
                          </Link>
                        </Button>
                      </>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              pacientes.map((paciente) => (
                <TableRow
                  key={paciente.id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <TableCell className="font-medium">{paciente.nome}</TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="text-sm font-medium">
                        {calcularIdade(paciente.dataNascimento)} anos
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {formatarData(paciente.dataNascimento)}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{paciente.telefone || "Não informado"}</TableCell>
                  <TableCell>{paciente.email || "Não informado"}</TableCell>
                  <TableCell>
                    <Badge variant={paciente.ativo ? "default" : "outline"}>
                      {paciente.ativo ? "Ativo" : "Arquivado"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/pacientes/${paciente.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          Detalhes
                        </Link>
                      </Button>

                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/pacientes/${paciente.id}/prontuario`}>
                          <FileText className="mr-2 h-4 w-4" />
                          Prontuário
                        </Link>
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleArquivarPaciente(paciente)}
                      >
                        {paciente.ativo ? (
                          <>
                            <Archive className="mr-2 h-4 w-4" />
                            Arquivar
                          </>
                        ) : (
                          <>
                            <ArchiveRestore className="mr-2 h-4 w-4" />
                            Restaurar
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <Paginacao paginacao={paginacao} controles={controlesPaginacao} />
    </div>
  );
}
