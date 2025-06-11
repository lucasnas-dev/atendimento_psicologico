import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CalendarIcon,
  Clock,
  Users,
  FileText,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { PacientesRecentes } from "@/components/pacientes-recentes";
import { ConsultasAgendadas } from "@/components/consultas-agendadas";

export default function PainelPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Início"
        text="Visão geral da sua prática psicológica"
      >
        <Button asChild>
          <Link href="/agenda/nova">
            <CalendarIcon className="mr-2 h-4 w-4" />
            Nova Consulta
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Pacientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">
              +2 desde o mês passado
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Consultas Agendadas
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Próximos 7 dias</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Horas de Sessão
            </CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24,5</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Anotações Pendentes
            </CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Precisam ser concluídas
            </p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="proximas" className="space-y-4">
        <TabsList>
          <TabsTrigger value="proximas">Próximas Consultas</TabsTrigger>
          <TabsTrigger value="pacientes">Pacientes Recentes</TabsTrigger>
          <TabsTrigger value="alertas">Alertas</TabsTrigger>
        </TabsList>
        <TabsContent value="proximas" className="space-y-4">
          <ConsultasAgendadas />
        </TabsContent>
        <TabsContent value="pacientes" className="space-y-4">
          <PacientesRecentes />
        </TabsContent>
        <TabsContent value="alertas" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alertas e Lembretes</CardTitle>
              <CardDescription>
                Notificações importantes que requerem sua atenção
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-orange-500" />
                  <div>
                    <p className="font-medium">Anotações de sessão pendentes</p>
                    <p className="text-sm text-muted-foreground">
                      3 anotações de sessão da semana passada precisam ser
                      concluídas
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 rounded-md border p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Acompanhamento de paciente</p>
                    <p className="text-sm text-muted-foreground">
                      Maria Silva não agendou uma consulta de acompanhamento
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  );
}
