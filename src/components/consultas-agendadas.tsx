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
import { CalendarIcon, Clock, Video } from "lucide-react";

export function ConsultasAgendadas() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Próximas Consultas</CardTitle>
        <CardDescription>
          Suas consultas agendadas para os próximos 7 dias
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {proximasConsultas.map((consulta) => (
            <div
              key={consulta.id}
              className="flex items-start justify-between space-x-4 rounded-md border p-4"
            >
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage
                    src={consulta.avatarPaciente || "/placeholder.svg"}
                    alt={consulta.nomePaciente}
                  />
                  <AvatarFallback>{consulta.iniciaisPaciente}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {consulta.nomePaciente}
                  </p>
                  <div className="flex items-center pt-2">
                    <CalendarIcon className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {consulta.data}
                    </p>
                  </div>
                  <div className="flex items-center pt-1">
                    <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">
                      {consulta.horario}
                    </p>
                  </div>
                  {consulta.virtual && (
                    <div className="flex items-center pt-1">
                      <Video className="mr-1 h-3 w-3 text-muted-foreground" />
                      <p className="text-xs text-muted-foreground">
                        Sessão Virtual
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  Reagendar
                </Button>
                <Button variant="outline" size="sm">
                  Cancelar
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          Ver Todas as Consultas
        </Button>
      </CardFooter>
    </Card>
  );
}

const proximasConsultas = [
  {
    id: "1",
    nomePaciente: "João Silva",
    iniciaisPaciente: "JS",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "28 de Abril, 2025",
    horario: "09:00 - 10:00",
    virtual: false,
  },
  {
    id: "2",
    nomePaciente: "Maria Oliveira",
    iniciaisPaciente: "MO",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "28 de Abril, 2025",
    horario: "11:00 - 12:00",
    virtual: true,
  },
  {
    id: "3",
    nomePaciente: "Carlos Santos",
    iniciaisPaciente: "CS",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "28 de Abril, 2025",
    horario: "14:00 - 15:00",
    virtual: false,
  },
  {
    id: "4",
    nomePaciente: "Ana Ferreira",
    iniciaisPaciente: "AF",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "29 de Abril, 2025",
    horario: "10:00 - 11:00",
    virtual: true,
  },
  {
    id: "5",
    nomePaciente: "Pedro Costa",
    iniciaisPaciente: "PC",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "30 de Abril, 2025",
    horario: "15:00 - 16:00",
    virtual: false,
  },
];
