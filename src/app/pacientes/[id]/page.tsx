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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Plus,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function PacientePage({ params }: { params: { id: string } }) {
  const pacienteId = params.id;
  const [activeTab, setActiveTab] = useState("informacoes");

  // Em um sistema real, você buscaria os dados do paciente com base no ID
  const paciente = {
    id: pacienteId,
    nome: "João Silva",
    email: "joao.silva@example.com",
    telefone: "(11) 98765-4321",
    dataNascimento: "15/03/1985",
    idade: 38,
    genero: "Masculino",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    profissao: "Engenheiro de Software",
    estadoCivil: "Casado",
    dataInicio: "10/01/2023",
    ultimaConsulta: "28/03/2023",
    proximaConsulta: "11/04/2023",
    status: "Ativo",
    consultas: [
      {
        id: "1",
        data: "10/01/2023",
        horario: "14:00",
        tipo: "Avaliação Inicial",
        compareceu: true,
      },
      {
        id: "2",
        data: "24/01/2023",
        horario: "14:00",
        tipo: "Psicoterapia",
        compareceu: true,
      },
      {
        id: "3",
        data: "07/02/2023",
        horario: "14:00",
        tipo: "Psicoterapia",
        compareceu: false,
      },
      {
        id: "4",
        data: "21/02/2023",
        horario: "14:00",
        tipo: "Psicoterapia",
        compareceu: true,
      },
      {
        id: "5",
        data: "07/03/2023",
        horario: "14:00",
        tipo: "Psicoterapia",
        compareceu: true,
      },
      {
        id: "6",
        data: "28/03/2023",
        horario: "14:00",
        tipo: "Psicoterapia",
        compareceu: true,
      },
    ],
    anotacoes: [
      {
        id: "1",
        data: "10/01/2023",
        titulo: "Primeira sessão",
        conteudo:
          "Paciente relata sintomas de ansiedade e dificuldade para dormir. Histórico familiar de transtornos de ansiedade.",
      },
      {
        id: "2",
        data: "24/01/2023",
        titulo: "Técnicas de respiração",
        conteudo:
          "Introduzidas técnicas de respiração diafragmática. Paciente relatou melhora nos sintomas de ansiedade após praticar as técnicas ensinadas na sessão anterior.",
      },
      {
        id: "3",
        data: "21/02/2023",
        titulo: "Progresso",
        conteudo:
          "Paciente relata melhora significativa na qualidade do sono. Continua praticando as técnicas de respiração diariamente.",
      },
      {
        id: "4",
        data: "07/03/2023",
        titulo: "Estressores no trabalho",
        conteudo:
          "Identificados principais estressores no ambiente de trabalho. Desenvolvido plano para lidar com situações de pressão.",
      },
      {
        id: "5",
        data: "28/03/2023",
        titulo: "Revisão do progresso",
        conteudo:
          "Revisão dos objetivos terapêuticos. Paciente demonstra progresso consistente. Redução significativa dos sintomas de ansiedade.",
      },
    ],
  };

  return (
    <DashboardShell>
      <DashboardHeader
        heading={paciente.nome}
        text="Detalhes do paciente e histórico de atendimento"
      >
        <div className="flex space-x-2">
          <Button variant="outline" asChild>
            <Link href={`/prontuario/${pacienteId}`}>
              <FileText className="mr-2 h-4 w-4" />
              Ver Prontuário
            </Link>
          </Button>
          <Button asChild>
            <Link href={`/agenda/nova?paciente=${pacienteId}`}>
              <Plus className="mr-2 h-4 w-4" />
              Agendar Consulta
            </Link>
          </Button>
        </div>
      </DashboardHeader>

      <div className="grid gap-6">
        {/* Cabeçalho do Paciente */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={`/placeholder.svg?height=96&width=96`}
                  alt={paciente.nome}
                />
                <AvatarFallback className="text-2xl">
                  {paciente.nome
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-bold">{paciente.nome}</h2>
                  <Badge>{paciente.status}</Badge>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <Mail className="mr-2 h-4 w-4" />
                      {paciente.email}
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <Phone className="mr-2 h-4 w-4" />
                      {paciente.telefone}
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <User className="mr-2 h-4 w-4" />
                      {paciente.idade} anos | {paciente.genero}
                    </p>
                  </div>
                  <div>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="mr-2 h-4 w-4" />
                      {paciente.endereco}
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-2 h-4 w-4" />
                      Início: {paciente.dataInicio}
                    </p>
                    <p className="flex items-center text-sm text-muted-foreground">
                      <Clock className="mr-2 h-4 w-4" />
                      Próxima consulta: {paciente.proximaConsulta}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Abas de Informações */}
        <Tabs
          defaultValue={activeTab}
          onValueChange={setActiveTab}
          className="space-y-4"
        >
          <TabsList className="grid grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="informacoes">Informações Pessoais</TabsTrigger>
            <TabsTrigger value="consultas">Histórico de Consultas</TabsTrigger>
            <TabsTrigger value="anotacoes">Anotações</TabsTrigger>
          </TabsList>

          {/* Conteúdo das abas */}
          <TabsContent value="informacoes">
            <Card>
              <CardHeader>
                <CardTitle>Informações Pessoais</CardTitle>
                <CardDescription>Detalhes sobre o paciente</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Nome Completo
                  </h3>
                  <p>{paciente.nome}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Email
                  </h3>
                  <p>{paciente.email}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Telefone
                  </h3>
                  <p>{paciente.telefone}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Data de Nascimento
                  </h3>
                  <p>{paciente.dataNascimento}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Idade
                  </h3>
                  <p>{paciente.idade} anos</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Gênero
                  </h3>
                  <p>{paciente.genero}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Endereço
                  </h3>
                  <p>{paciente.endereco}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Profissão
                  </h3>
                  <p>{paciente.profissao}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Estado Civil
                  </h3>
                  <p>{paciente.estadoCivil}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="consultas">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Consultas</CardTitle>
                <CardDescription>
                  Registro de todas as consultas do paciente
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Data</TableHead>
                      <TableHead>Horário</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Compareceu</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paciente.consultas.map((consulta) => (
                      <TableRow key={consulta.id}>
                        <TableCell>{consulta.data}</TableCell>
                        <TableCell>{consulta.horario}</TableCell>
                        <TableCell>{consulta.tipo}</TableCell>
                        <TableCell>
                          {consulta.compareceu ? "Sim" : "Não"}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="anotacoes">
            <Card>
              <CardHeader>
                <CardTitle>Anotações</CardTitle>
                <CardDescription>
                  Anotações sobre o progresso do paciente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {paciente.anotacoes.map((anotacao) => (
                  <div key={anotacao.id} className="border rounded-md p-4">
                    <h4 className="font-semibold">{anotacao.titulo}</h4>
                    <p className="text-sm text-muted-foreground">
                      {anotacao.data}
                    </p>
                    <p>{anotacao.conteudo}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardShell>
  );
}
