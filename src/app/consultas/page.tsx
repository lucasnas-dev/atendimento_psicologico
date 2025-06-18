import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Clock, Plus, Video } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default function ConsultasPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Consultas"
        text="Gerencie sua agenda de consultas"
      >
        <Button asChild>
          <Link href="/consultas/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Consulta
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Calendário</CardTitle>
            <CardDescription>
              Selecione uma data para ver as consultas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={new Date()}
              className="rounded-md border"
            />
          </CardContent>
        </Card>
        <Card className="md:col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>28 de Abril, 2025</CardTitle>
            <CardDescription>
              Segunda-feira - 4 consultas agendadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {consultasDiarias.map((consulta) => (
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
                      <AvatarFallback>
                        {consulta.iniciaisPaciente}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">
                        {consulta.nomePaciente}
                      </p>
                      <div className="flex items-center pt-2">
                        <Clock className="mr-1 h-3 w-3 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          {consulta.horario}
                        </p>
                      </div>
                      <div className="flex items-center pt-1">
                        <Badge
                          variant={
                            consulta.status === "Confirmada"
                              ? "default"
                              : "outline"
                          }
                          className="mt-1"
                        >
                          {consulta.status}
                        </Badge>
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
                    <Button size="sm">Iniciar Sessão</Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  );
}

const consultasDiarias = [
  {
    id: "1",
    nomePaciente: "João Silva",
    iniciaisPaciente: "JS",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    horario: "09:00 - 10:00",
    status: "Confirmada",
    virtual: false,
  },
  {
    id: "2",
    nomePaciente: "Maria Oliveira",
    iniciaisPaciente: "MO",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    horario: "11:00 - 12:00",
    status: "Confirmada",
    virtual: true,
  },
  {
    id: "3",
    nomePaciente: "Carlos Santos",
    iniciaisPaciente: "CS",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    horario: "14:00 - 15:00",
    status: "Pendente",
    virtual: false,
  },
  {
    id: "4",
    nomePaciente: "Ana Ferreira",
    iniciaisPaciente: "AF",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    horario: "16:00 - 17:00",
    status: "Confirmada",
    virtual: true,
  },
];
