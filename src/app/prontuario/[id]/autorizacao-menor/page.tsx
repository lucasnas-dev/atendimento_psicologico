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

export default function AutorizacaoMenorPage({
  params,
}: {
  params: { id: string };
}) {
  const pacienteId = params.id;

  // Em um sistema real, você buscaria os dados do paciente com base no ID
  const paciente = {
    id: pacienteId,
    nome: "Maria Silva",
    dataNascimento: "15/03/2010",
    idade: 15,
    genero: "Feminino",
    responsavel: {
      nome: "João Silva",
      cpf: "123.456.789-00",
      parentesco: "Pai",
      endereco: "Rua das Flores, 123 - São Paulo, SP",
      telefone: "(11) 98765-4321",
    },
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
        heading="Autorização para Atendimento de Menor"
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
            AUTORIZAÇÃO PARA ACOMPANHAMENTO PSICOTERAPÊUTICO DE
            CRIANÇA/ADOLESCENTE
          </CardTitle>
          <CardDescription>
            Documento elaborado conforme Resolução CFP Nº 13/2022 e Código de
            Ética Profissional do Psicólogo
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 p-6">
          <div className="space-y-4">
            <p>
              Eu, <span className="font-bold">{paciente.responsavel.nome}</span>
              , portador(a) do CPF nº{" "}
              <span className="font-bold">{paciente.responsavel.cpf}</span>,
              residente e domiciliado(a) à{" "}
              <span className="font-bold">{paciente.responsavel.endereco}</span>
              , na qualidade de{" "}
              <span className="font-bold">
                {paciente.responsavel.parentesco}
              </span>{" "}
              e responsável legal pela criança/adolescente{" "}
              <span className="font-bold">{paciente.nome}</span>, nascida em{" "}
              <span className="font-bold">{paciente.dataNascimento}</span> (
              {paciente.idade} anos), AUTORIZO a psicóloga{" "}
              <span className="font-bold">{paciente.psicologo.nome}</span>, CRP{" "}
              <span className="font-bold">{paciente.psicologo.crp}</span>, a
              realizar acompanhamento psicoterapêutico e os encaminhamentos
              cabíveis.
            </p>

            <p>Declaro estar ciente de que:</p>

            <ol className="list-decimal space-y-2 pl-6">
              <li>
                Todas as intervenções e documentos produzidos serão regidos
                pelos dispositivos legais vigentes, em especial pelo disposto no
                Código de Ética Profissional do Psicólogo, bem como pelas demais
                Resoluções da Psicologia relacionadas ao exercício da profissão.
              </li>
              <li>
                Serão garantidos à criança/adolescente o sigilo das informações
                e a preservação da dignidade e da intimidade durante a prestação
                dos serviços de que trata esta autorização.
              </li>
              <li>
                A psicóloga poderá realizar os encaminhamentos necessários para
                garantir a proteção integral da criança/adolescente.
              </li>
              <li>
                A psicóloga poderá comunicar às autoridades competentes
                situações de violência ou suspeita de violência contra a
                criança/adolescente, conforme previsto em lei.
              </li>
              <li>
                Serei informado(a) sobre o estritamente essencial para que sejam
                promovidas medidas em benefício da criança/adolescente.
              </li>
              <li>
                Minha participação no processo terapêutico poderá ser solicitada
                sempre que a psicóloga julgar necessário para o benefício da
                criança/adolescente.
              </li>
            </ol>

            <p>
              Por fim, declaro que recebi uma cópia desta autorização e que
              todas as minhas dúvidas foram esclarecidas.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start border-t p-6">
          <p className="mb-8">São Paulo, {dataAtual}</p>
          <div className="flex w-full flex-col justify-between gap-8 md:flex-row">
            <div className="w-64 border-t border-black pt-2 text-center">
              <p>{paciente.responsavel.nome}</p>
              <p>Responsável Legal pela Criança/Adolescente</p>
              <p>CPF: {paciente.responsavel.cpf}</p>
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
