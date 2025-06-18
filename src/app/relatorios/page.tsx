"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart, LineChart, PieChart, Download, Filter } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function RelatoriosPage() {
  const [periodoSelecionado, setPeriodoSelecionado] = useState("mes");
  const [tipoGrafico, setTipoGrafico] = useState<"barras" | "linhas" | "pizza">(
    "barras"
  );

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Relatórios"
        text="Análise e estatísticas do seu atendimento"
      >
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Exportar Dados
        </Button>
      </DashboardHeader>

      <div className="flex flex-col gap-6">
        {/* Filtros */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Personalize a visualização dos seus relatórios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="w-full sm:w-auto">
                <label className="mb-1 block text-sm font-medium">
                  Período
                </label>
                <Select
                  value={periodoSelecionado}
                  onValueChange={setPeriodoSelecionado}
                >
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Selecione o período" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semana">Última Semana</SelectItem>
                    <SelectItem value="mes">Último Mês</SelectItem>
                    <SelectItem value="trimestre">Último Trimestre</SelectItem>
                    <SelectItem value="ano">Último Ano</SelectItem>
                    <SelectItem value="personalizado">
                      Período Personalizado
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="w-full sm:w-auto">
                <label className="mb-1 block text-sm font-medium">
                  Tipo de Gráfico
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={tipoGrafico === "barras" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipoGrafico("barras")}
                  >
                    <BarChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={tipoGrafico === "linhas" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipoGrafico("linhas")}
                  >
                    <LineChart className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={tipoGrafico === "pizza" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTipoGrafico("pizza")}
                  >
                    <PieChart className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="ml-auto w-full sm:w-auto">
                <label className="mb-1 block text-sm font-medium">
                  Mais Filtros
                </label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                      <Filter className="mr-2 h-4 w-4" />
                      Filtros Avançados
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Tipo de Atendimento</DropdownMenuItem>
                    <DropdownMenuItem>Faixa Etária</DropdownMenuItem>
                    <DropdownMenuItem>Gênero</DropdownMenuItem>
                    <DropdownMenuItem>Indicadores Clínicos</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Limpar Filtros</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abas de Relatórios */}
        <Tabs defaultValue="atendimentos" className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="atendimentos">Atendimentos</TabsTrigger>
            <TabsTrigger value="pacientes">Pacientes</TabsTrigger>
            <TabsTrigger value="indicadores">Indicadores</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
          </TabsList>

          {/* Aba de Atendimentos */}
          <TabsContent value="atendimentos">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Total de Atendimentos</CardTitle>
                  <CardDescription>
                    {periodoSelecionado === "mes"
                      ? "Abril 2025"
                      : periodoSelecionado === "semana"
                        ? "Última Semana"
                        : periodoSelecionado === "trimestre"
                          ? "Último Trimestre"
                          : "Último Ano"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">78</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-green-500">↑ 12%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Taxa de Presença</CardTitle>
                  <CardDescription>
                    Porcentagem de consultas realizadas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">92%</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-green-500">↑ 3%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Duração Média</CardTitle>
                  <CardDescription>Tempo médio por sessão</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">52 min</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-gray-500">→ 0%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Distribuição de Atendimentos</CardTitle>
                  <CardDescription>
                    {periodoSelecionado === "mes"
                      ? "Por dia da semana"
                      : periodoSelecionado === "semana"
                        ? "Por dia"
                        : periodoSelecionado === "trimestre"
                          ? "Por semana"
                          : "Por mês"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full w-full items-center justify-center rounded-md bg-muted/20">
                    {tipoGrafico === "barras" && (
                      <div className="text-center">
                        <BarChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Barras - Atendimentos por Período
                        </p>
                      </div>
                    )}
                    {tipoGrafico === "linhas" && (
                      <div className="text-center">
                        <LineChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Linhas - Atendimentos por Período
                        </p>
                      </div>
                    )}
                    {tipoGrafico === "pizza" && (
                      <div className="text-center">
                        <PieChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Pizza - Atendimentos por Período
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba de Pacientes */}
          <TabsContent value="pacientes">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Novos Pacientes</CardTitle>
                  <CardDescription>
                    {periodoSelecionado === "mes"
                      ? "Abril 2025"
                      : periodoSelecionado === "semana"
                        ? "Última Semana"
                        : periodoSelecionado === "trimestre"
                          ? "Último Trimestre"
                          : "Último Ano"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">8</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-green-500">↑ 33%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Pacientes Ativos</CardTitle>
                  <CardDescription>
                    Total de pacientes em atendimento regular
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">42</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-green-500">↑ 5%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Tempo Médio de Tratamento</CardTitle>
                  <CardDescription>
                    Duração média do acompanhamento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">
                    7.2 <span className="text-2xl">meses</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-gray-500">→ 0%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Distribuição de Pacientes</CardTitle>
                  <CardDescription>Por faixa etária e gênero</CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full w-full items-center justify-center rounded-md bg-muted/20">
                    {tipoGrafico === "barras" && (
                      <div className="text-center">
                        <BarChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Barras - Distribuição de Pacientes
                        </p>
                      </div>
                    )}
                    {tipoGrafico === "linhas" && (
                      <div className="text-center">
                        <LineChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Linhas - Evolução de Pacientes
                        </p>
                      </div>
                    )}
                    {tipoGrafico === "pizza" && (
                      <div className="text-center">
                        <PieChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Pizza - Distribuição por Gênero
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba de Indicadores */}
          <TabsContent value="indicadores">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Indicadores Mais Utilizados</CardTitle>
                  <CardDescription>
                    Top 3 indicadores registrados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <span>Nível de Ansiedade</span>
                      <span className="font-medium">87%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Qualidade do Sono</span>
                      <span className="font-medium">72%</span>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Humor</span>
                      <span className="font-medium">65%</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Melhoria Média</CardTitle>
                  <CardDescription>
                    Evolução média dos indicadores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">28%</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-green-500">↑ 7%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Indicadores Registrados</CardTitle>
                  <CardDescription>
                    Total de registros de indicadores
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">312</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-green-500">↑ 18%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Evolução dos Indicadores</CardTitle>
                  <CardDescription>
                    Média de evolução por indicador
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full w-full items-center justify-center rounded-md bg-muted/20">
                    {tipoGrafico === "barras" && (
                      <div className="text-center">
                        <BarChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Barras - Evolução por Indicador
                        </p>
                      </div>
                    )}
                    {tipoGrafico === "linhas" && (
                      <div className="text-center">
                        <LineChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Linhas - Evolução ao Longo do Tempo
                        </p>
                      </div>
                    )}
                    {tipoGrafico === "pizza" && (
                      <div className="text-center">
                        <PieChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Pizza - Distribuição de Indicadores
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Aba Financeira */}
          <TabsContent value="financeiro">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Faturamento Total</CardTitle>
                  <CardDescription>
                    {periodoSelecionado === "mes"
                      ? "Abril 2025"
                      : periodoSelecionado === "semana"
                        ? "Última Semana"
                        : periodoSelecionado === "trimestre"
                          ? "Último Trimestre"
                          : "Último Ano"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">R$ 15.600</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-green-500">↑ 12%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Valor Médio por Sessão</CardTitle>
                  <CardDescription>
                    Média de todos os atendimentos
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">R$ 200</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-green-500">↑ 5%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="col-span-1">
                <CardHeader>
                  <CardTitle>Taxa de Inadimplência</CardTitle>
                  <CardDescription>Pagamentos em atraso</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-4xl font-bold">3.2%</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    <span className="text-red-500">↑ 0.5%</span> em relação ao
                    período anterior
                  </p>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <CardTitle>Evolução Financeira</CardTitle>
                  <CardDescription>
                    Faturamento ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <div className="flex h-full w-full items-center justify-center rounded-md bg-muted/20">
                    {tipoGrafico === "barras" && (
                      <div className="text-center">
                        <BarChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Barras - Faturamento por Período
                        </p>
                      </div>
                    )}
                    {tipoGrafico === "linhas" && (
                      <div className="text-center">
                        <LineChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Linhas - Evolução do Faturamento
                        </p>
                      </div>
                    )}
                    {tipoGrafico === "pizza" && (
                      <div className="text-center">
                        <PieChart className="mx-auto h-16 w-16 text-muted-foreground" />
                        <p className="mt-2 text-sm text-muted-foreground">
                          Gráfico de Pizza - Distribuição de Receitas
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
