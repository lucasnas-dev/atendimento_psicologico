import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { FileText, Plus, Search } from "lucide-react";
import Link from "next/link";
import { Input } from "@/src/components/ui/input";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar";
import { Badge } from "@/src/components/ui/badge";

export default function AnotacoesPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Anotações de Sessão"
        text="Gerencie suas anotações clínicas e documentação"
      >
        <Button asChild>
          <Link href="/anotacoes/nova">
            <Plus className="mr-2 h-4 w-4" />
            Nova Anotação
          </Link>
        </Button>
      </DashboardHeader>
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar anotações..."
              className="pl-8"
            />
          </div>
          <Button variant="outline">Filtrar</Button>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {anotacoes.map((anotacao) => (
            <Card key={anotacao.id} className="flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4 space-y-0">
                <Avatar className="mt-1">
                  <AvatarImage
                    src={anotacao.avatarPaciente || "/placeholder.svg"}
                    alt={anotacao.nomePaciente}
                  />
                  <AvatarFallback>{anotacao.iniciaisPaciente}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <CardTitle>{anotacao.nomePaciente}</CardTitle>
                  <CardDescription>
                    <div className="flex items-center">
                      <FileText className="mr-1 h-3 w-3" />
                      {anotacao.data}
                    </div>
                  </CardDescription>
                </div>
                <Badge
                  variant={
                    anotacao.status === "Completa" ? "default" : "outline"
                  }
                >
                  {anotacao.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="line-clamp-3 text-sm text-muted-foreground">
                  {anotacao.conteudo}
                </p>
              </CardContent>
              <CardFooter className="mt-auto">
                <Button variant="outline" className="w-full" asChild>
                  <Link href={`/anotacoes/${anotacao.id}`}>Ver Anotação</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

const anotacoes = [
  {
    id: "1",
    nomePaciente: "João Silva",
    iniciaisPaciente: "JS",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "25 de Abril, 2025",
    status: "Completa",
    conteudo:
      "Paciente relatou sentir-se menos ansioso esta semana. O sono melhorou com as novas técnicas de relaxamento. Discutimos estressores do trabalho e desenvolvemos estratégias de enfrentamento. Continuaremos com o plano de tratamento atual e reavaliaremos em duas semanas.",
  },
  {
    id: "2",
    nomePaciente: "Maria Oliveira",
    iniciaisPaciente: "MO",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "24 de Abril, 2025",
    status: "Rascunho",
    conteudo:
      "Avaliação inicial concluída. Paciente apresenta sintomas de depressão leve após perda recente de emprego. Distúrbios do sono e redução do apetite relatados. Sem ideação suicida. Recomendada abordagem TCC com sessões semanais.",
  },
  {
    id: "3",
    nomePaciente: "Carlos Santos",
    iniciaisPaciente: "CS",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "15 de Março, 2025",
    status: "Completa",
    conteudo:
      "Sessão final antes da pausa planejada. Paciente fez progressos significativos no gerenciamento da ansiedade social. Revisamos estratégias de enfrentamento e plano de manutenção. Paciente se sente confiante para continuar independentemente, mas sabe que pode retornar se necessário.",
  },
  {
    id: "4",
    nomePaciente: "Ana Ferreira",
    iniciaisPaciente: "AF",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "22 de Abril, 2025",
    status: "Completa",
    conteudo:
      "Continuamos o trabalho de processamento de trauma usando EMDR. Paciente relatou diminuição da intensidade dos flashbacks. Praticamos técnicas de aterramento para uso entre as sessões. Paciente se envolveu bem e está mostrando bom progresso.",
  },
  {
    id: "5",
    nomePaciente: "Pedro Costa",
    iniciaisPaciente: "PC",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "21 de Abril, 2025",
    status: "Completa",
    conteudo:
      "Sessão de terapia de casal com parceiro. Exercícios de comunicação praticados com bons resultados. Ambos os parceiros expressaram se sentir ouvidos. Tarefa de casa atribuída para praticar escuta ativa em casa. Continuaremos com sessões semanais.",
  },
  {
    id: "6",
    nomePaciente: "Lucia Mendes",
    iniciaisPaciente: "LM",
    avatarPaciente: "/placeholder.svg?height=32&width=32",
    data: "20 de Abril, 2025",
    status: "Rascunho",
    conteudo:
      "Paciente relatou aumento da ansiedade após incidente no local de trabalho. Exploramos gatilhos e respostas emocionais. Introduzimos técnicas de mindfulness para gerenciamento imediato da ansiedade. Focaremos no treinamento de assertividade na próxima sessão.",
  },
];
