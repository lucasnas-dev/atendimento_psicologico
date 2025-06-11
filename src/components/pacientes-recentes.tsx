import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CalendarIcon, Clock, FileText } from "lucide-react";

export function PacientesRecentes() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacientes Recentes</CardTitle>
        <CardDescription>
          Pacientes que você atendeu recentemente
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pacientes.map((paciente) => (
            <div
              key={paciente.id}
              className="flex items-center justify-between space-x-4 rounded-md border p-4"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage
                    src={paciente.avatar || "/placeholder.svg"}
                    alt={paciente.nome}
                  />
                  <AvatarFallback>{paciente.iniciais}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {paciente.nome}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {paciente.email}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Última sessão: {paciente.ultimaSessao}
                    </p>
                  </div>
                  <div className="flex items-center pt-1">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      Sessões: {paciente.numeroSessoes}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  <FileText className="h-4 w-4" />
                  <span className="sr-only">Ver anotações</span>
                </Button>
                <Button variant="outline" size="sm">
                  Agendar
                </Button>
                <Button size="sm">Ver Perfil</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Ver Todos os Pacientes
        </Button>
      </CardFooter>
    </Card>
  );
}

const pacientes = [
  {
    id: "1",
    nome: "Ana Ferreira",
    iniciais: "AF",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "ana.ferreira@example.com",
    ultimaSessao: "25 de Abril, 2025",
    numeroSessoes: 8,
    status: "Ativo",
  },
  {
    id: "2",
    nome: "Pedro Costa",
    iniciais: "PC",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "pedro.costa@example.com",
    ultimaSessao: "24 de Abril, 2025",
    numeroSessoes: 12,
    status: "Ativo",
  },
  {
    id: "3",
    nome: "Lucia Mendes",
    iniciais: "LM",
    avatar: "/placeholder.svg?height=32&width=32",
    email: "lucia.mendes@example.com",
    ultimaSessao: "22 de Abril, 2025",
    numeroSessoes: 5,
    status: "Ativo",
  },
];
