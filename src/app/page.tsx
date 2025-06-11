import Link from "next/link";
import { CalendarDays, Clock, Users, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">PsiAten</span>
            </Link>
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link
                href="/painel"
                className="transition-colors hover:text-foreground/80"
              >
                Início
              </Link>
              <Link
                href="/pacientes"
                className="transition-colors hover:text-foreground/80"
              >
                Pacientes
              </Link>
              <Link
                href="/agenda"
                className="transition-colors hover:text-foreground/80"
              >
                Agenda
              </Link>
              <Link
                href="/relatorios"
                className="transition-colors hover:text-foreground/80"
              >
                Relatórios
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/login">Entrar</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                  PsiAten - Sistema de Atendimento Psicológico
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Uma solução completa para gerenciar atendimentos psicológicos,
                  consultas e registros de pacientes.
                </p>
              </div>
              <div className="space-x-4">
                <Button asChild size="lg">
                  <Link href="/painel">Começar</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/sobre">Saiba Mais</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Gestão de Pacientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Users className="h-10 w-10 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Gerencie registros de pacientes, histórico e informações
                        de contato em um só lugar.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/pacientes">Ver Pacientes</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    Agendamento de Consultas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <CalendarDays className="h-10 w-10 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Agende, reagende e gerencie consultas com um calendário
                        intuitivo.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/agenda">Gerenciar Agenda</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">Controle de Sessões</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Clock className="h-10 w-10 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Acompanhe a duração das sessões, presença e status de
                        pagamento.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/sessoes">Ver Sessões</Link>
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl">
                    Relatórios e Análises
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <FileText className="h-10 w-10 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Visualize estatísticas e gere relatórios para acompanhar
                        sua prática.
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" asChild className="w-full">
                    <Link href="/relatorios">Ver Relatórios</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2025 PsiAten. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
