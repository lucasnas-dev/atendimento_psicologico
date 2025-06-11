"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

export default function NovaAnotacaoPage() {
  return (
    <DashboardShell>
      <DashboardHeader
        heading="Nova Anotação de Sessão"
        text="Crie uma nova anotação clínica"
      />
      <Card>
        <CardHeader>
          <CardTitle>Informações da Sessão</CardTitle>
          <CardDescription>
            Registre detalhes sobre a sessão de terapia
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="paciente">Paciente</Label>
                <Select>
                  <SelectTrigger id="paciente">
                    <SelectValue placeholder="Selecione o paciente" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao-silva">João Silva</SelectItem>
                    <SelectItem value="maria-oliveira">
                      Maria Oliveira
                    </SelectItem>
                    <SelectItem value="carlos-santos">Carlos Santos</SelectItem>
                    <SelectItem value="ana-ferreira">Ana Ferreira</SelectItem>
                    <SelectItem value="pedro-costa">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo-sessao">Tipo de Sessão</Label>
                <Select>
                  <SelectTrigger id="tipo-sessao">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="individual">
                      Terapia Individual
                    </SelectItem>
                    <SelectItem value="casal">Terapia de Casal</SelectItem>
                    <SelectItem value="familia">Terapia Familiar</SelectItem>
                    <SelectItem value="grupo">Terapia em Grupo</SelectItem>
                    <SelectItem value="avaliacao">Avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="data">Data</Label>
                <Input type="date" id="data" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duracao">Duração (minutos)</Label>
                <Input type="number" id="duracao" placeholder="50" />
              </div>
            </div>
            <Tabs defaultValue="soap">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="soap">SOAP</TabsTrigger>
                <TabsTrigger value="dap">DAP</TabsTrigger>
                <TabsTrigger value="birp">BIRP</TabsTrigger>
                <TabsTrigger value="livre">Formato Livre</TabsTrigger>
              </TabsList>
              <TabsContent value="soap" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="subjetivo">Subjetivo</Label>
                  <Textarea
                    id="subjetivo"
                    placeholder="Declarações, queixas e sintomas do paciente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="objetivo">Objetivo</Label>
                  <Textarea
                    id="objetivo"
                    placeholder="Dados observáveis, observações clínicas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avaliacao">Avaliação</Label>
                  <Textarea
                    id="avaliacao"
                    placeholder="Avaliação clínica, diagnóstico, interpretações"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plano">Plano</Label>
                  <Textarea
                    id="plano"
                    placeholder="Plano de tratamento, intervenções, tarefas"
                  />
                </div>
              </TabsContent>
              <TabsContent value="dap" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="dados">Dados</Label>
                  <Textarea
                    id="dados"
                    placeholder="Informações subjetivas e objetivas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="avaliacao-dap">Avaliação</Label>
                  <Textarea
                    id="avaliacao-dap"
                    placeholder="Avaliação clínica e interpretações"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plano-dap">Plano</Label>
                  <Textarea
                    id="plano-dap"
                    placeholder="Plano de tratamento e próximos passos"
                  />
                </div>
              </TabsContent>
              <TabsContent value="birp" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="comportamento">Comportamento</Label>
                  <Textarea
                    id="comportamento"
                    placeholder="Comportamentos e declarações do paciente"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="intervencao">Intervenção</Label>
                  <Textarea
                    id="intervencao"
                    placeholder="Intervenções terapêuticas utilizadas"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resposta">Resposta</Label>
                  <Textarea
                    id="resposta"
                    placeholder="Resposta do paciente às intervenções"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="plano-birp">Plano</Label>
                  <Textarea
                    id="plano-birp"
                    placeholder="Plano de tratamento futuro"
                  />
                </div>
              </TabsContent>
              <TabsContent value="livre" className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="formato-livre">Anotações da Sessão</Label>
                  <Textarea
                    id="formato-livre"
                    placeholder="Digite suas anotações da sessão em formato livre"
                    className="min-h-[300px]"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Salvar como Rascunho</Button>
          <Button>Concluir Anotação</Button>
        </CardFooter>
      </Card>
    </DashboardShell>
  );
}
