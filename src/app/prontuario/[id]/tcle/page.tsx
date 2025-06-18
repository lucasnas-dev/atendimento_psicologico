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
import { Download, Printer } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function TCLEPage({ params }: { params: { id: string } }) {
  const pacienteId = params.id;

  // Em um sistema real, você buscaria os dados do paciente com base no ID
  const paciente = {
    id: pacienteId,
    nome: "João Silva",
    cpf: "123.456.789-00",
    dataNascimento: "15/03/1985",
    idade: 40,
    genero: "Masculino",
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
  };

  const dataAtual = format(new Date(), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Termo de Consentimento Livre e Esclarecido"
        text="Conforme exigências do CFP"
      >
        <div className="flex space-x-2">
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

      <Card className="border-2">
        <CardHeader className="border-b text-center">
          <CardTitle className="text-2xl">
            TERMO DE CONSENTIMENTO LIVRE E ESCLARECIDO
          </CardTitle>
          <CardDescription>
            Documento elaborado conforme Resolução CFP Nº 13/2022 e Código de
            Ética Profissional do Psicólogo
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <p>
              Eu, <span className="font-bold">{paciente.nome}</span>,
              portador(a) do CPF nº{" "}
              <span className="font-bold">{paciente.cpf}</span>, declaro, por
              meio deste termo, que concordei em receber atendimento psicológico
              oferecido pela psicóloga
              <span className="font-bold"> {paciente.psicologo.nome}</span>, CRP{" "}
              <span className="font-bold">{paciente.psicologo.crp}</span>.
            </p>

            <p>
              Fui informado(a) de que o serviço será prestado da seguinte forma:
            </p>

            <ol className="list-decimal space-y-2 pl-6">
              <li>
                <strong>Modalidade de atendimento:</strong> Psicoterapia
                individual, com sessões semanais de 50 minutos de duração.
              </li>
              <li>
                <strong>Objetivos do atendimento:</strong> Oferecer suporte
                psicológico, promover autoconhecimento, desenvolver estratégias
                de enfrentamento para as dificuldades apresentadas e contribuir
                para a melhoria da qualidade de vida.
              </li>
              <li>
                <strong>Procedimentos:</strong> Serão utilizadas técnicas e
                intervenções baseadas na abordagem Cognitivo-Comportamental,
                conforme as necessidades identificadas durante o processo.
              </li>
              <li>
                <strong>Honorários e condições de pagamento:</strong> Valor por
                sessão de R$ 200,00, a ser pago ao final de cada sessão ou
                mensalmente, conforme acordado.
              </li>
              <li>
                <strong>Faltas e cancelamentos:</strong> Cancelamentos devem ser
                comunicados com pelo menos 24 horas de antecedência, caso
                contrário, a sessão será cobrada integralmente.
              </li>
            </ol>

            <p>Estou ciente de que:</p>

            <ul className="list-disc space-y-2 pl-6">
              <li>
                O sigilo profissional será mantido pela psicóloga, conforme
                previsto no Código de Ética Profissional do Psicólogo, exceto
                nas situações previstas em lei, como risco de vida para mim ou
                para terceiros, ou por determinação judicial.
              </li>
              <li>
                A psicóloga realizará registros escritos sobre o atendimento,
                que serão guardados em local seguro e confidencial, conforme
                exigido pelo Conselho Federal de Psicologia.
              </li>
              <li>
                Tenho o direito de receber informações sobre o andamento do
                processo terapêutico e esclarecer quaisquer dúvidas a respeito
                das técnicas e procedimentos utilizados.
              </li>
              <li>
                Posso interromper o atendimento a qualquer momento, comunicando
                previamente à psicóloga.
              </li>
              <li>
                A psicóloga poderá realizar encaminhamentos para outros
                profissionais quando julgar necessário para o meu benefício.
              </li>
              <li>
                Autorizo a psicóloga a entrar em contato com meu contato de
                emergência em situações que envolvam risco à minha integridade
                física ou psicológica.
              </li>
            </ul>

            <p>
              Declaro que fui informado(a) dos objetivos do atendimento
              psicológico de forma clara e detalhada, e que recebi uma cópia
              deste Termo de Consentimento Livre e Esclarecido.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start border-t p-6">
          <p className="mb-8">São Paulo, {dataAtual}</p>
          <div className="flex w-full flex-col justify-between gap-8 md:flex-row">
            <div className="w-64 border-t border-black pt-2 text-center">
              <p>{paciente.nome}</p>
              <p>CPF: {paciente.cpf}</p>
            </div>
            <div className="w-64 border-t border-black pt-2 text-center">
              <p>{paciente.psicologo.nome}</p>
              <p>CRP {paciente.psicologo.crp}</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </DashboardShell>
  );
}
