import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { FileText, Plus, Search, Filter, Download } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function ProntuariosPage() {
  // Dados de exemplo
  const prontuarios = [
    {
      id: "P001",
      paciente: "João Silva",
      dataNascimento: "15/03/1985",
      dataInicio: "10/01/2025",
      ultimaAtualizacao: "28/02/2025",
      status: "Ativo",
    },
    {
      id: "P002",
      paciente: "Maria Oliveira",
      dataNascimento: "22/07/1990",
      dataInicio: "15/01/2025",
      ultimaAtualizacao: "25/02/2025",
      status: "Ativo",
    },
    {
      id: "P003",
      paciente: "Carlos Santos",
      dataNascimento: "10/11/1978",
      dataInicio: "05/12/2024",
      ultimaAtualizacao: "15/01/2025",
      status: "Inativo",
    },
    {
      id: "P004",
      paciente: "Ana Ferreira",
      dataNascimento: "03/04/2010",
      dataInicio: "20/01/2025",
      ultimaAtualizacao: "27/02/2025",
      status: "Ativo",
    },
    {
      id: "P005",
      paciente: "Pedro Costa",
      dataNascimento: "18/09/1995",
      dataInicio: "12/01/2025",
      ultimaAtualizacao: "26/02/2025",
      status: "Ativo",
    },
  ];

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Prontuários Psicológicos"
        text="Gerenciamento de prontuários conforme exigências do CFP"
      >
        <Button asChild>
          <Link href="/prontuario/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo Prontuário
          </Link>
        </Button>
      </DashboardHeader>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar prontuários..."
                className="w-[300px] pl-8"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filtrar por status</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Todos</DropdownMenuItem>
                <DropdownMenuItem>Ativos</DropdownMenuItem>
                <DropdownMenuItem>Inativos</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Exportar Lista
          </Button>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Paciente</TableHead>
                <TableHead>Data de Nascimento</TableHead>
                <TableHead>Início do Atendimento</TableHead>
                <TableHead>Última Atualização</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prontuarios.map((prontuario) => (
                <TableRow key={prontuario.id}>
                  <TableCell className="font-medium">{prontuario.id}</TableCell>
                  <TableCell>{prontuario.paciente}</TableCell>
                  <TableCell>{prontuario.dataNascimento}</TableCell>
                  <TableCell>{prontuario.dataInicio}</TableCell>
                  <TableCell>{prontuario.ultimaAtualizacao}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        prontuario.status === "Ativo" ? "default" : "outline"
                      }
                    >
                      {prontuario.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/prontuario/${prontuario.id}`}>
                          <FileText className="mr-2 h-4 w-4" />
                          Ver
                        </Link>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <span className="sr-only">Abrir menu</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="h-4 w-4"
                            >
                              <circle cx="12" cy="12" r="1" />
                              <circle cx="12" cy="5" r="1" />
                              <circle cx="12" cy="19" r="1" />
                            </svg>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Ações</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <Link href={`/prontuario/${prontuario.id}/tcle`}>
                              Ver TCLE
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/prontuario/${prontuario.id}/contrato`}
                            >
                              Ver Contrato
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Arquivar</DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            Excluir
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </DashboardShell>
  );
}
