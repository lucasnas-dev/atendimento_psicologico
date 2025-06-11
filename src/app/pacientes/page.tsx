import { Button } from "@/components/ui/button";
import { Input } from "@/src/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/src/components/ui/table";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Plus, Search, Filter, FileText } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/src/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function PacientesPage() {
  // Dados de exemplo
  const pacientes = [
    {
      id: "P001",
      nome: "João Silva",
      dataNascimento: "15/03/1985",
      telefone: "(11) 98765-4321",
      email: "joao.silva@example.com",
      ultimaConsulta: "28/03/2023",
      proximaConsulta: "11/04/2023",
      status: "Ativo",
    },
    {
      id: "P002",
      nome: "Maria Oliveira",
      dataNascimento: "22/07/1990",
      telefone: "(11) 97654-3210",
      email: "maria.oliveira@example.com",
      ultimaConsulta: "25/03/2023",
      proximaConsulta: "08/04/2023",
      status: "Ativo",
    },
    {
      id: "P003",
      nome: "Carlos Santos",
      dataNascimento: "10/11/1978",
      telefone: "(11) 96543-2109",
      email: "carlos.santos@example.com",
      ultimaConsulta: "15/02/2023",
      proximaConsulta: null,
      status: "Inativo",
    },
    {
      id: "P004",
      nome: "Ana Ferreira",
      dataNascimento: "03/04/2010",
      telefone: "(11) 95432-1098",
      email: "ana.ferreira@example.com",
      ultimaConsulta: "27/03/2023",
      proximaConsulta: "10/04/2023",
      status: "Ativo",
    },
    {
      id: "P005",
      nome: "Pedro Costa",
      dataNascimento: "18/09/1995",
      telefone: "(11) 94321-0987",
      email: "pedro.costa@example.com",
      ultimaConsulta: "26/03/2023",
      proximaConsulta: "09/04/2023",
      status: "Ativo",
    },
  ];

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

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar pacientes..."
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
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Data de Nascimento</TableHead>
                <TableHead>Telefone</TableHead>
                <TableHead>Última Consulta</TableHead>
                <TableHead>Próxima Consulta</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pacientes.map((paciente) => (
                <TableRow key={paciente.id}>
                  <TableCell className="font-medium">{paciente.nome}</TableCell>
                  <TableCell>{paciente.dataNascimento}</TableCell>
                  <TableCell>{paciente.telefone}</TableCell>
                  <TableCell>{paciente.ultimaConsulta}</TableCell>
                  <TableCell>
                    {paciente.proximaConsulta || "Não agendada"}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        paciente.status === "Ativo" ? "default" : "outline"
                      }
                    >
                      {paciente.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/pacientes/${paciente.id}`}>
                          Ver Detalhes
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/pacientes/${paciente.id}/prontuario`}>
                          <FileText className="mr-2 h-4 w-4" />
                          Prontuário
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
                            <Link href={`/agenda/nova?paciente=${paciente.id}`}>
                              Agendar Consulta
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link href={`/pacientes/${paciente.id}/editar`}>
                              Editar Paciente
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            Arquivar
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
