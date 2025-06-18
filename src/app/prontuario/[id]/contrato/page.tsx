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

export default function ContratoTerapeuticoPage({
  params,
}: {
  params: { id: string };
}) {
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
        heading="Contrato Terapêutico"
        text="Acordo de prestação de serviços psicológicos"
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
            CONTRATO DE PRESTAÇÃO DE SERVIÇOS PSICOLÓGICOS
          </CardTitle>
          <CardDescription>
            Documento elaborado conforme Resolução CFP Nº 13/2022 e Código de
            Ética Profissional do Psicólogo
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <p>
              <strong>CONTRATANTE:</strong> {paciente.nome}, CPF {paciente.cpf},
              residente e domiciliado(a) em {paciente.endereco}.
            </p>
            <p>
              <strong>CONTRATADA:</strong> {paciente.psicologo.nome}, Psicóloga,
              CRP {paciente.psicologo.crp}, com consultório na Rua dos
              Psicólogos, 456, São Paulo/SP.
            </p>

            <p>
              As partes acima identificadas têm, entre si, justo e acertado o
              presente Contrato de Prestação de Serviços Psicológicos, que se
              regerá pelas cláusulas seguintes e pelas condições descritas no
              presente.
            </p>

            <h3 className="text-lg font-medium">
              CLÁUSULA 1ª - DO OBJETO DO CONTRATO
            </h3>
            <p>
              O presente contrato tem como objeto a prestação de serviços de
              psicoterapia pela CONTRATADA ao CONTRATANTE, conforme as condições
              estabelecidas neste instrumento.
            </p>

            <h3 className="text-lg font-medium">CLÁUSULA 2ª - DAS SESSÕES</h3>
            <p>
              As sessões de psicoterapia terão duração de 50 (cinquenta)
              minutos, com frequência semanal, em dia e horário previamente
              acordados entre as partes.
            </p>
            <p>
              Parágrafo único: A frequência das sessões poderá ser alterada de
              acordo com a evolução do processo terapêutico e mediante acordo
              entre as partes.
            </p>

            <h3 className="text-lg font-medium">
              CLÁUSULA 3ª - DOS HONORÁRIOS
            </h3>
            <p>
              O valor de cada sessão será de R$ 200,00 (duzentos reais), a ser
              pago pelo CONTRATANTE ao final de cada sessão ou mensalmente,
              conforme acordado entre as partes.
            </p>
            <p>
              Parágrafo 1º: O valor dos honorários poderá ser reajustado
              anualmente, mediante comunicação prévia de 30 (trinta) dias.
            </p>
            <p>
              Parágrafo 2º: Em caso de sessões extras ou de emergência, será
              cobrado o mesmo valor estabelecido nesta cláusula.
            </p>

            <h3 className="text-lg font-medium">
              CLÁUSULA 4ª - DAS FALTAS E CANCELAMENTOS
            </h3>
            <p>
              O CONTRATANTE deverá comunicar o cancelamento da sessão com
              antecedência mínima de 24 (vinte e quatro) horas. Caso contrário,
              a sessão será cobrada integralmente.
            </p>
            <p>
              Parágrafo único: Em caso de impossibilidade de comparecimento da
              CONTRATADA, esta se compromete a avisar o CONTRATANTE com a maior
              antecedência possível e a oferecer reposição da sessão em horário
              acordado entre as partes.
            </p>

            <h3 className="text-lg font-medium">
              CLÁUSULA 5ª - DO SIGILO PROFISSIONAL
            </h3>
            <p>
              A CONTRATADA compromete-se a manter sigilo sobre todas as
              informações obtidas durante o processo terapêutico, conforme
              estabelecido no Código de Ética Profissional do Psicólogo.
            </p>
            <p>
              Parágrafo único: O sigilo poderá ser quebrado nas situações
              previstas em lei, como em casos de risco de vida para o
              CONTRATANTE ou terceiros, ou por determinação judicial.
            </p>

            <h3 className="text-lg font-medium">
              CLÁUSULA 6ª - DA DURAÇÃO DO CONTRATO
            </h3>
            <p>
              O presente contrato tem duração indeterminada, podendo ser
              rescindido por qualquer das partes mediante comunicação prévia.
            </p>

            <h3 className="text-lg font-medium">
              CLÁUSULA 7ª - DAS DISPOSIÇÕES GERAIS
            </h3>
            <p>
              O CONTRATANTE declara ter recebido todas as informações
              necessárias sobre o processo terapêutico e estar de acordo com as
              condições estabelecidas neste contrato.
            </p>
            <p>
              E por estarem assim justos e contratados, firmam o presente
              instrumento em duas vias de igual teor.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start border-t p-6">
          <p className="mb-8">São Paulo, {dataAtual}</p>
          <div className="flex w-full flex-col justify-between gap-8 md:flex-row">
            <div className="w-64 border-t border-black pt-2 text-center">
              <p>{paciente.nome}</p>
              <p>Contratante</p>
            </div>
            <div className="w-64 border-t border-black pt-2 text-center">
              <p>{paciente.psicologo.nome}</p>
              <p>CRP {paciente.psicologo.crp}</p>
              <p>Contratada</p>
            </div>
          </div>
        </CardFooter>
      </Card>
    </DashboardShell>
  );
}
