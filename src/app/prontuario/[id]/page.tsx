"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import {
  Download,
  Printer,
  Lock,
  FileText,
  Clock,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function ProntuarioPage({ params }: { params: { id: string } }) {
  const pacienteId = params.id;
  const [activeTab, setActiveTab] = useState("identificacao");
  const [editMode, setEditMode] = useState(false);
  const [showConfidentialInfo, setShowConfidentialInfo] = useState(false);

  // Em um sistema real, você buscaria os dados do paciente com base no ID
  const paciente = {
    id: pacienteId,
    nome: "João Silva",
    cpf: "123.456.789-00",
    dataNascimento: "15/03/1985",
    idade: 40,
    genero: "Masculino",
    estadoCivil: "Casado",
    profissao: "Engenheiro de Software",
    escolaridade: "Ensino Superior Completo",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    telefone: "(11) 98765-4321",
    email: "joao.silva@example.com",
    dataInicioAtendimento: "10/01/2025",
    psicologo: {
      nome: "Dra. Ana Beatriz Oliveira",
      crp: "06/12345",
      email: "ana.oliveira@psiaten.com",
      telefone: "(11) 97654-3210",
    },
    demandaInicial:
      "Paciente buscou atendimento relatando sintomas de ansiedade, dificuldades para dormir e preocupação excessiva com questões de trabalho.",
    encaminhamento: "Demanda espontânea",
    contatoEmergencia: {
      nome: "Maria Silva",
      parentesco: "Esposa",
      telefone: "(11) 97654-3210",
    },
    convenio: "Particular",
    registroSessoes: [
      {
        id: "1",
        data: "10/01/2025",
        horario: "14:00",
        duracao: 50,
        tipo: "Avaliação Inicial",
        modalidade: "Presencial",
        compareceu: true,
        conteudo:
          "Sessão inicial para coleta de dados e estabelecimento do contrato terapêutico. Paciente relatou histórico dos sintomas e contexto de surgimento. Explicados os princípios da TCC e estabelecidos objetivos iniciais.",
        observacoes:
          "Paciente demonstrou boa receptividade à proposta terapêutica.",
      },
      {
        id: "2",
        data: "17/01/2025",
        horario: "14:00",
        duracao: 50,
        tipo: "Psicoterapia",
        modalidade: "Presencial",
        compareceu: true,
        conteudo:
          "Aprofundamento da história de vida do paciente. Identificados padrões de pensamento perfeccionista e crenças disfuncionais relacionadas ao desempenho no trabalho.",
        observacoes:
          "Paciente trouxe relatos de situações de estresse no trabalho durante a semana.",
      },
      {
        id: "3",
        data: "24/01/2025",
        horario: "14:00",
        duracao: 50,
        tipo: "Psicoterapia",
        modalidade: "Presencial",
        compareceu: true,
        conteudo:
          "Introduzidas técnicas de respiração diafragmática e relaxamento muscular progressivo. Iniciado registro de pensamentos automáticos.",
        observacoes:
          "Paciente relatou episódio de ansiedade intensa durante reunião de trabalho.",
      },
    ],
    avaliacaoInicial: {
      queixaPrincipal:
        "Ansiedade, insônia e preocupação excessiva com o trabalho",
      historiaClinica:
        "Paciente relata que os sintomas começaram há aproximadamente 6 meses, após uma promoção no trabalho que aumentou suas responsabilidades. Sem histórico de tratamentos psicológicos anteriores. Nega uso de medicação psiquiátrica.",
      historicoFamiliar:
        "Mãe e irmã com histórico de transtornos de ansiedade. Pai teve episódios de depressão na juventude.",
      exameEstadoMental:
        "Paciente apresenta-se orientado auto e alopsiquicamente, comunicativo e colaborativo. Humor eutímico com afeto congruente. Pensamento lógico e coerente. Sem alterações sensoperceptivas. Memória e atenção preservadas. Juízo crítico mantido. Nega ideação suicida.",
      hipoteseDiagnostica: "Transtorno de Ansiedade Generalizada (F41.1)",
      impressaoGeral:
        "Paciente demonstra boa capacidade de insight e motivação para o processo terapêutico.",
    },
    planoTerapeutico: {
      abordagem: "Terapia Cognitivo-Comportamental (TCC)",
      objetivos: [
        "Redução dos sintomas de ansiedade",
        "Desenvolvimento de estratégias de enfrentamento para situações estressoras",
        "Melhoria da qualidade do sono",
        "Reestruturação de crenças disfuncionais relacionadas ao trabalho",
      ],
      frequencia: "Semanal",
      duracao: "50 minutos",
      reavaliacao: "A cada 3 meses",
    },
    evolucao: [
      {
        data: "31/01/2025",
        registro:
          "Após 3 sessões, paciente relata leve redução na intensidade das crises de ansiedade. Tem praticado as técnicas de respiração diafragmática com bons resultados.",
      },
      {
        data: "28/02/2025",
        registro:
          "Após 8 sessões, observa-se melhora significativa no padrão de sono. Paciente consegue identificar pensamentos automáticos e está começando a questioná-los.",
      },
    ],
    encaminhamentos: [
      {
        data: "15/02/2025",
        profissional: "Dr. Roberto Mendes",
        especialidade: "Psiquiatria",
        motivo: "Avaliação para possível tratamento medicamentoso complementar",
        retorno:
          "Paciente iniciou uso de Escitalopram 10mg/dia em 20/02/2025. Relata boa adaptação à medicação.",
      },
    ],
    documentosEmitidos: [
      {
        data: "15/02/2025",
        tipo: "Declaração de Comparecimento",
        finalidade: "Justificativa de ausência no trabalho",
        destinatario: "Empregador",
      },
      {
        data: "28/02/2025",
        tipo: "Relatório Psicológico",
        finalidade:
          "Solicitação do paciente para apresentação ao médico psiquiatra",
        destinatario: "Dr. Roberto Mendes",
      },
    ],
    anexos: [
      {
        data: "15/02/2025",
        tipo: "Termo de Consentimento Livre e Esclarecido",
        descricao: "Documento assinado pelo paciente autorizando o tratamento",
      },
      {
        data: "15/02/2025",
        tipo: "Contrato Terapêutico",
        descricao: "Documento estabelecendo as condições do atendimento",
      },
      {
        data: "20/02/2025",
        tipo: "Receituário Médico",
        descricao:
          "Prescrição de Escitalopram 10mg/dia pelo Dr. Roberto Mendes",
      },
    ],
  };

  const dataAtual = format(new Date(), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Prontuário Psicológico"
        text="Registro completo conforme exigências do CFP"
      >
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => setEditMode(!editMode)}>
            {editMode ? "Cancelar Edição" : "Editar Prontuário"}
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" />
            Imprimir
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Exportar PDF
          </Button>
        </div>
      </DashboardHeader>

      {/* Cabeçalho do Prontuário */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-6 md:flex-row">
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
                <Badge>Prontuário Ativo</Badge>
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">
                    CPF: {paciente.cpf}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Data de Nascimento: {paciente.dataNascimento} (
                    {paciente.idade} anos)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Início do Atendimento: {paciente.dataInicioAtendimento}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Psicólogo(a): {paciente.psicologo.nome}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    CRP: {paciente.psicologo.crp}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Data de Atualização: {dataAtual}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => setShowConfidentialInfo(!showConfidentialInfo)}
              >
                <Lock className="h-4 w-4" />
                {showConfidentialInfo
                  ? "Ocultar Informações Sigilosas"
                  : "Mostrar Informações Sigilosas"}
              </Button>
              <Badge variant="outline" className="justify-center">
                <FileText className="mr-2 h-4 w-4" />
                Registro CFP Nº {pacienteId}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Abas do Prontuário */}
      <Tabs
        defaultValue="identificacao"
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7">
          <TabsTrigger value="identificacao">Identificação</TabsTrigger>
          <TabsTrigger value="avaliacao">Avaliação Inicial</TabsTrigger>
          <TabsTrigger value="plano">Plano Terapêutico</TabsTrigger>
          <TabsTrigger value="evolucao">Evolução</TabsTrigger>
          <TabsTrigger value="sessoes">Registro de Sessões</TabsTrigger>
          <TabsTrigger value="encaminhamentos">Encaminhamentos</TabsTrigger>
          <TabsTrigger value="documentos">Documentos</TabsTrigger>
        </TabsList>

        {/* Aba de Identificação */}
        <TabsContent value="identificacao">
          <Card>
            <CardHeader>
              <CardTitle>Dados de Identificação</CardTitle>
              <CardDescription>
                Informações pessoais e de contato do paciente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  {editMode ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome Completo</Label>
                        <Input id="nome" defaultValue={paciente.nome} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cpf">CPF</Label>
                        <Input id="cpf" defaultValue={paciente.cpf} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="dataNascimento">
                          Data de Nascimento
                        </Label>
                        <Input
                          id="dataNascimento"
                          defaultValue={paciente.dataNascimento}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="genero">Gênero</Label>
                        <Select defaultValue={paciente.genero}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o gênero" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Masculino">Masculino</SelectItem>
                            <SelectItem value="Feminino">Feminino</SelectItem>
                            <SelectItem value="Não-binário">
                              Não-binário
                            </SelectItem>
                            <SelectItem value="Outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="estadoCivil">Estado Civil</Label>
                        <Select defaultValue={paciente.estadoCivil}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o estado civil" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Solteiro">
                              Solteiro(a)
                            </SelectItem>
                            <SelectItem value="Casado">Casado(a)</SelectItem>
                            <SelectItem value="Divorciado">
                              Divorciado(a)
                            </SelectItem>
                            <SelectItem value="Viúvo">Viúvo(a)</SelectItem>
                            <SelectItem value="União Estável">
                              União Estável
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Nome Completo
                        </h3>
                        <p>{paciente.nome}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          CPF
                        </h3>
                        <p>{paciente.cpf}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Data de Nascimento
                        </h3>
                        <p>
                          {paciente.dataNascimento} ({paciente.idade} anos)
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Gênero
                        </h3>
                        <p>{paciente.genero}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Estado Civil
                        </h3>
                        <p>{paciente.estadoCivil}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="space-y-4">
                  {editMode ? (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="profissao">Profissão</Label>
                        <Input
                          id="profissao"
                          defaultValue={paciente.profissao}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="escolaridade">Escolaridade</Label>
                        <Select defaultValue={paciente.escolaridade}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a escolaridade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Ensino Fundamental Incompleto">
                              Ensino Fundamental Incompleto
                            </SelectItem>
                            <SelectItem value="Ensino Fundamental Completo">
                              Ensino Fundamental Completo
                            </SelectItem>
                            <SelectItem value="Ensino Médio Incompleto">
                              Ensino Médio Incompleto
                            </SelectItem>
                            <SelectItem value="Ensino Médio Completo">
                              Ensino Médio Completo
                            </SelectItem>
                            <SelectItem value="Ensino Superior Incompleto">
                              Ensino Superior Incompleto
                            </SelectItem>
                            <SelectItem value="Ensino Superior Completo">
                              Ensino Superior Completo
                            </SelectItem>
                            <SelectItem value="Pós-graduação">
                              Pós-graduação
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="endereco">Endereço</Label>
                        <Input id="endereco" defaultValue={paciente.endereco} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="telefone">Telefone</Label>
                        <Input id="telefone" defaultValue={paciente.telefone} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" defaultValue={paciente.email} />
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Profissão
                        </h3>
                        <p>{paciente.profissao}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Escolaridade
                        </h3>
                        <p>{paciente.escolaridade}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Endereço
                        </h3>
                        <p>{paciente.endereco}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Telefone
                        </h3>
                        <p>{paciente.telefone}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">
                          Email
                        </h3>
                        <p>{paciente.email}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">
                  Informações do Atendimento
                </h3>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    {editMode ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="dataInicio">
                            Data de Início do Atendimento
                          </Label>
                          <Input
                            id="dataInicio"
                            defaultValue={paciente.dataInicioAtendimento}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="encaminhamento">Encaminhamento</Label>
                          <Input
                            id="encaminhamento"
                            defaultValue={paciente.encaminhamento}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="convenio">Convênio/Particular</Label>
                          <Select defaultValue={paciente.convenio}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo de atendimento" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Particular">
                                Particular
                              </SelectItem>
                              <SelectItem value="Convênio">Convênio</SelectItem>
                              <SelectItem value="Plano de Saúde">
                                Plano de Saúde
                              </SelectItem>
                              <SelectItem value="Serviço Social">
                                Serviço Social
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Data de Início do Atendimento
                          </h3>
                          <p>{paciente.dataInicioAtendimento}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Encaminhamento
                          </h3>
                          <p>{paciente.encaminhamento}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Convênio/Particular
                          </h3>
                          <p>{paciente.convenio}</p>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="space-y-4">
                    {editMode ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="contatoNome">
                            Nome do Contato de Emergência
                          </Label>
                          <Input
                            id="contatoNome"
                            defaultValue={paciente.contatoEmergencia.nome}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contatoParentesco">
                            Relação/Parentesco
                          </Label>
                          <Input
                            id="contatoParentesco"
                            defaultValue={paciente.contatoEmergencia.parentesco}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="contatoTelefone">
                            Telefone de Emergência
                          </Label>
                          <Input
                            id="contatoTelefone"
                            defaultValue={paciente.contatoEmergencia.telefone}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Contato de Emergência
                          </h3>
                          <p>{paciente.contatoEmergencia.nome}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Relação/Parentesco
                          </h3>
                          <p>{paciente.contatoEmergencia.parentesco}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">
                            Telefone de Emergência
                          </h3>
                          <p>{paciente.contatoEmergencia.telefone}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Demanda Inicial</h3>
                {editMode ? (
                  <div className="space-y-2">
                    <Label htmlFor="demandaInicial">
                      Descrição da Demanda Inicial
                    </Label>
                    <Textarea
                      id="demandaInicial"
                      defaultValue={paciente.demandaInicial}
                      rows={4}
                    />
                  </div>
                ) : (
                  <div className="rounded-md border bg-muted/20 p-4">
                    <p>{paciente.demandaInicial}</p>
                  </div>
                )}
              </div>
            </CardContent>
            {editMode && (
              <CardFooter>
                <Button className="ml-auto">Salvar Alterações</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Aba de Avaliação Inicial */}
        <TabsContent value="avaliacao">
          <Card>
            <CardHeader>
              <CardTitle>Avaliação Inicial</CardTitle>
              <CardDescription>
                Registro da avaliação psicológica inicial
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editMode ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="queixaPrincipal">Queixa Principal</Label>
                    <Textarea
                      id="queixaPrincipal"
                      defaultValue={paciente.avaliacaoInicial.queixaPrincipal}
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="historiaClinica">História Clínica</Label>
                    <Textarea
                      id="historiaClinica"
                      defaultValue={paciente.avaliacaoInicial.historiaClinica}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="historicoFamiliar">
                      Histórico Familiar
                    </Label>
                    <Textarea
                      id="historicoFamiliar"
                      defaultValue={paciente.avaliacaoInicial.historicoFamiliar}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="exameEstadoMental">
                      Exame do Estado Mental
                    </Label>
                    <Textarea
                      id="exameEstadoMental"
                      defaultValue={paciente.avaliacaoInicial.exameEstadoMental}
                      rows={4}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hipoteseDiagnostica">
                      Hipótese Diagnóstica
                    </Label>
                    <Input
                      id="hipoteseDiagnostica"
                      defaultValue={
                        paciente.avaliacaoInicial.hipoteseDiagnostica
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="impressaoGeral">Impressão Geral</Label>
                    <Textarea
                      id="impressaoGeral"
                      defaultValue={paciente.avaliacaoInicial.impressaoGeral}
                      rows={2}
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Queixa Principal
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <p>{paciente.avaliacaoInicial.queixaPrincipal}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      História Clínica
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <p>{paciente.avaliacaoInicial.historiaClinica}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Histórico Familiar
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <p>{paciente.avaliacaoInicial.historicoFamiliar}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Exame do Estado Mental
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <p>{paciente.avaliacaoInicial.exameEstadoMental}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Hipótese Diagnóstica
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <p>{paciente.avaliacaoInicial.hipoteseDiagnostica}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Impressão Geral
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <p>{paciente.avaliacaoInicial.impressaoGeral}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {editMode && (
              <CardFooter>
                <Button className="ml-auto">Salvar Alterações</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Aba de Plano Terapêutico */}
        <TabsContent value="plano">
          <Card>
            <CardHeader>
              <CardTitle>Plano Terapêutico</CardTitle>
              <CardDescription>
                Definição da abordagem e objetivos do tratamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editMode ? (
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="abordagem">Abordagem Terapêutica</Label>
                    <Select defaultValue={paciente.planoTerapeutico.abordagem}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a abordagem" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Terapia Cognitivo-Comportamental (TCC)">
                          Terapia Cognitivo-Comportamental (TCC)
                        </SelectItem>
                        <SelectItem value="Psicanálise">Psicanálise</SelectItem>
                        <SelectItem value="Psicologia Analítica">
                          Psicologia Analítica
                        </SelectItem>
                        <SelectItem value="Gestalt-terapia">
                          Gestalt-terapia
                        </SelectItem>
                        <SelectItem value="Terapia Sistêmica">
                          Terapia Sistêmica
                        </SelectItem>
                        <SelectItem value="Abordagem Centrada na Pessoa">
                          Abordagem Centrada na Pessoa
                        </SelectItem>
                        <SelectItem value="Análise do Comportamento">
                          Análise do Comportamento
                        </SelectItem>
                        <SelectItem value="Psicodrama">Psicodrama</SelectItem>
                        <SelectItem value="EMDR">EMDR</SelectItem>
                        <SelectItem value="Outra">Outra</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="objetivos">Objetivos Terapêuticos</Label>
                    <div className="space-y-2">
                      {paciente.planoTerapeutico.objetivos.map(
                        (objetivo, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input defaultValue={objetivo} />
                            <Button variant="ghost" size="icon" type="button">
                              <AlertCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      )}
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                      >
                        Adicionar Objetivo
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="frequencia">Frequência</Label>
                      <Select
                        defaultValue={paciente.planoTerapeutico.frequencia}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a frequência" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Semanal">Semanal</SelectItem>
                          <SelectItem value="Quinzenal">Quinzenal</SelectItem>
                          <SelectItem value="Mensal">Mensal</SelectItem>
                          <SelectItem value="Duas vezes por semana">
                            Duas vezes por semana
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duracao">Duração da Sessão</Label>
                      <Select defaultValue={paciente.planoTerapeutico.duracao}>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione a duração" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="30 minutos">30 minutos</SelectItem>
                          <SelectItem value="45 minutos">45 minutos</SelectItem>
                          <SelectItem value="50 minutos">50 minutos</SelectItem>
                          <SelectItem value="60 minutos">60 minutos</SelectItem>
                          <SelectItem value="90 minutos">90 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reavaliacao">
                      Período para Reavaliação
                    </Label>
                    <Select
                      defaultValue={paciente.planoTerapeutico.reavaliacao}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Mensal">Mensal</SelectItem>
                        <SelectItem value="Bimestral">Bimestral</SelectItem>
                        <SelectItem value="Trimestral">Trimestral</SelectItem>
                        <SelectItem value="Semestral">Semestral</SelectItem>
                        <SelectItem value="Anual">Anual</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Abordagem Terapêutica
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <p>{paciente.planoTerapeutico.abordagem}</p>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Objetivos Terapêuticos
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <ul className="list-disc space-y-1 pl-5">
                        {paciente.planoTerapeutico.objetivos.map(
                          (objetivo, index) => (
                            <li key={index}>{objetivo}</li>
                          )
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div>
                      <h3 className="mb-2 text-lg font-medium">Frequência</h3>
                      <div className="rounded-md border bg-muted/20 p-4">
                        <p>{paciente.planoTerapeutico.frequencia}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-2 text-lg font-medium">
                        Duração da Sessão
                      </h3>
                      <div className="rounded-md border bg-muted/20 p-4">
                        <p>{paciente.planoTerapeutico.duracao}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-2 text-lg font-medium">
                      Período para Reavaliação
                    </h3>
                    <div className="rounded-md border bg-muted/20 p-4">
                      <p>{paciente.planoTerapeutico.reavaliacao}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
            {editMode && (
              <CardFooter>
                <Button className="ml-auto">Salvar Alterações</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Aba de Evolução */}
        <TabsContent value="evolucao">
          <Card>
            <CardHeader>
              <CardTitle>Evolução do Caso</CardTitle>
              <CardDescription>
                Registro cronológico da evolução do tratamento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editMode ? (
                <div className="space-y-4">
                  {paciente.evolucao.map((item, index) => (
                    <div
                      key={index}
                      className="space-y-2 rounded-md border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`data-${index}`}>Data</Label>
                        <Button variant="ghost" size="sm">
                          Remover
                        </Button>
                      </div>
                      <Input id={`data-${index}`} defaultValue={item.data} />
                      <Label htmlFor={`registro-${index}`}>Registro</Label>
                      <Textarea
                        id={`registro-${index}`}
                        defaultValue={item.registro}
                        rows={3}
                      />
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Adicionar Novo Registro de Evolução
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paciente.evolucao.map((item, index) => (
                    <div key={index} className="rounded-md border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{item.data}</p>
                      </div>
                      <p className="text-sm">{item.registro}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {editMode && (
              <CardFooter>
                <Button className="ml-auto">Salvar Alterações</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Aba de Registro de Sessões */}
        <TabsContent value="sessoes">
          <Card>
            <CardHeader>
              <CardTitle>Registro de Sessões</CardTitle>
              <CardDescription>
                Histórico detalhado das sessões realizadas
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editMode ? (
                <div className="space-y-4">
                  <Button variant="outline" className="w-full">
                    Adicionar Nova Sessão
                  </Button>
                  {paciente.registroSessoes.map((sessao, index) => (
                    <div
                      key={index}
                      className="space-y-4 rounded-md border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium">Sessão #{sessao.id}</h3>
                        <Button variant="ghost" size="sm">
                          Remover
                        </Button>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor={`data-${index}`}>Data</Label>
                          <Input
                            id={`data-${index}`}
                            defaultValue={sessao.data}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`horario-${index}`}>Horário</Label>
                          <Input
                            id={`horario-${index}`}
                            defaultValue={sessao.horario}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`duracao-${index}`}>
                            Duração (min)
                          </Label>
                          <Input
                            id={`duracao-${index}`}
                            defaultValue={sessao.duracao}
                            type="number"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`tipo-${index}`}>
                            Tipo de Sessão
                          </Label>
                          <Select defaultValue={sessao.tipo}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione o tipo" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Avaliação Inicial">
                                Avaliação Inicial
                              </SelectItem>
                              <SelectItem value="Psicoterapia">
                                Psicoterapia
                              </SelectItem>
                              <SelectItem value="Avaliação Psicológica">
                                Avaliação Psicológica
                              </SelectItem>
                              <SelectItem value="Orientação">
                                Orientação
                              </SelectItem>
                              <SelectItem value="Devolutiva">
                                Devolutiva
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`modalidade-${index}`}>
                            Modalidade
                          </Label>
                          <Select defaultValue={sessao.modalidade}>
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a modalidade" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Presencial">
                                Presencial
                              </SelectItem>
                              <SelectItem value="Online">Online</SelectItem>
                              <SelectItem value="Híbrida">Híbrida</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id={`compareceu-${index}`}
                            defaultChecked={sessao.compareceu}
                          />
                          <Label htmlFor={`compareceu-${index}`}>
                            Paciente compareceu à sessão
                          </Label>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`conteudo-${index}`}>
                          Conteúdo da Sessão
                        </Label>
                        <Textarea
                          id={`conteudo-${index}`}
                          defaultValue={sessao.conteudo}
                          rows={4}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`observacoes-${index}`}>
                          Observações
                        </Label>
                        <Textarea
                          id={`observacoes-${index}`}
                          defaultValue={sessao.observacoes}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {paciente.registroSessoes.map((sessao, index) => (
                    <div key={index} className="rounded-md border p-4">
                      <div className="mb-4 flex flex-col md:flex-row md:items-center md:justify-between">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              sessao.compareceu ? "default" : "destructive"
                            }
                          >
                            {sessao.compareceu ? "Realizada" : "Não Compareceu"}
                          </Badge>
                          <h3 className="font-medium">Sessão #{sessao.id}</h3>
                        </div>
                        <div className="mt-2 flex items-center gap-4 md:mt-0">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {sessao.data}
                            </span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {sessao.horario} ({sessao.duracao} min)
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Tipo de Sessão
                          </h4>
                          <p>{sessao.tipo}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Modalidade
                          </h4>
                          <p>{sessao.modalidade}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Conteúdo da Sessão
                          </h4>
                          <div className="mt-1 rounded-md bg-muted/20 p-3">
                            <p className="text-sm">{sessao.conteudo}</p>
                          </div>
                        </div>
                        {sessao.observacoes && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">
                              Observações
                            </h4>
                            <div className="mt-1 rounded-md bg-muted/20 p-3">
                              <p className="text-sm">{sessao.observacoes}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {editMode && (
              <CardFooter>
                <Button className="ml-auto">Salvar Alterações</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Aba de Encaminhamentos */}
        <TabsContent value="encaminhamentos">
          <Card>
            <CardHeader>
              <CardTitle>Encaminhamentos</CardTitle>
              <CardDescription>
                Registro de encaminhamentos realizados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {editMode ? (
                <div className="space-y-4">
                  {paciente.encaminhamentos.map((encaminhamento, index) => (
                    <div
                      key={index}
                      className="space-y-2 rounded-md border p-4"
                    >
                      <div className="flex items-center justify-between">
                        <Label htmlFor={`data-enc-${index}`}>Data</Label>
                        <Button variant="ghost" size="sm">
                          Remover
                        </Button>
                      </div>
                      <Input
                        id={`data-enc-${index}`}
                        defaultValue={encaminhamento.data}
                      />
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor={`profissional-${index}`}>
                            Profissional
                          </Label>
                          <Input
                            id={`profissional-${index}`}
                            defaultValue={encaminhamento.profissional}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`especialidade-${index}`}>
                            Especialidade
                          </Label>
                          <Input
                            id={`especialidade-${index}`}
                            defaultValue={encaminhamento.especialidade}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`motivo-${index}`}>Motivo</Label>
                        <Textarea
                          id={`motivo-${index}`}
                          defaultValue={encaminhamento.motivo}
                          rows={2}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`retorno-${index}`}>
                          Retorno/Feedback
                        </Label>
                        <Textarea
                          id={`retorno-${index}`}
                          defaultValue={encaminhamento.retorno}
                          rows={2}
                        />
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">
                    Adicionar Novo Encaminhamento
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {paciente.encaminhamentos.map((encaminhamento, index) => (
                    <div key={index} className="rounded-md border p-4">
                      <div className="mb-2 flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <p className="font-medium">{encaminhamento.data}</p>
                      </div>
                      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Profissional
                          </h4>
                          <p>{encaminhamento.profissional}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Especialidade
                          </h4>
                          <p>{encaminhamento.especialidade}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium text-muted-foreground">
                            Motivo
                          </h4>
                          <p className="text-sm">{encaminhamento.motivo}</p>
                        </div>
                        {encaminhamento.retorno && (
                          <div>
                            <h4 className="text-sm font-medium text-muted-foreground">
                              Retorno/Feedback
                            </h4>
                            <p className="text-sm">{encaminhamento.retorno}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {editMode && (
              <CardFooter>
                <Button className="ml-auto">Salvar Alterações</Button>
              </CardFooter>
            )}
          </Card>
        </TabsContent>

        {/* Aba de Documentos */}
        <TabsContent value="documentos">
          <Card>
            <CardHeader>
              <CardTitle>Documentos e Anexos</CardTitle>
              <CardDescription>
                Documentos emitidos e anexos relacionados ao caso
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Documentos Emitidos</h3>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left">Data</th>
                        <th className="p-2 text-left">Tipo</th>
                        <th className="p-2 text-left">Finalidade</th>
                        <th className="p-2 text-left">Destinatário</th>
                        <th className="p-2 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paciente.documentosEmitidos.map((doc, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{doc.data}</td>
                          <td className="p-2">{doc.tipo}</td>
                          <td className="p-2">{doc.finalidade}</td>
                          <td className="p-2">{doc.destinatario}</td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Ver</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Baixar</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {editMode && (
                  <Button variant="outline" className="w-full">
                    Adicionar Novo Documento
                  </Button>
                )}
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Anexos</h3>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left">Data</th>
                        <th className="p-2 text-left">Tipo</th>
                        <th className="p-2 text-left">Descrição</th>
                        <th className="p-2 text-left">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paciente.anexos.map((anexo, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{anexo.data}</td>
                          <td className="p-2">{anexo.tipo}</td>
                          <td className="p-2">{anexo.descricao}</td>
                          <td className="p-2">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <FileText className="h-4 w-4" />
                                <span className="sr-only">Ver</span>
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Baixar</span>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {editMode && (
                  <Button variant="outline" className="w-full">
                    Adicionar Novo Anexo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Rodapé do Prontuário */}
      <Card className="mt-6">
        <CardContent className="p-4">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div className="text-sm text-muted-foreground">
              <p>
                Este prontuário segue as diretrizes da Resolução CFP Nº 13/2022
                e do Código de Ética Profissional do Psicólogo.
              </p>
              <p>Última atualização: {dataAtual}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Lock className="mr-2 h-4 w-4" />
                Histórico de Acessos
              </Button>
              <Button variant="outline" size="sm">
                <FileText className="mr-2 h-4 w-4" />
                Gerar Relatório
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardShell>
  );
}
