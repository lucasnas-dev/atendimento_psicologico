import { useState, useEffect, useMemo } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { Paciente } from "@/types/paciente";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

type PacientesResponse = ApiResponse<Paciente[]>;

export type StatusFilter = "todos" | "ativo" | "inativo";

export function usePacientes() {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<StatusFilter>("todos");
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [itensPorPagina, setItensPorPagina] = useState(10);

  // ✅ NOVO: Estados para paginação responsiva
  const [usarResponsivo, setUsarResponsivo] = useState(true);
  const [alturaDisponivel, setAlturaDisponivel] = useState(0);

  const { data: session, status } = useSession();

  // ✅ NOVO: Hook para calcular altura disponível
  // ✅ AJUSTAR: Dentro do useEffect que calcula altura disponível
  useEffect(() => {
    const calcularAlturaDisponivel = () => {
      const alturaJanela = window.innerHeight;
      const alturaHeader = 100; // ✅ REDUZIDO: de 120 para 100
      const alturaBusca = 50; // ✅ REDUZIDO: de 60 para 50
      const alturaFooter = 70; // ✅ REDUZIDO: de 80 para 70
      const alturaTabela = 45; // ✅ REDUZIDO: de 50 para 45
      const margem = 30; // ✅ REDUZIDO: de 40 para 30

      const alturaUtil =
        alturaJanela -
        alturaHeader -
        alturaBusca -
        alturaFooter -
        alturaTabela -
        margem;
      setAlturaDisponivel(alturaUtil);
    };

    calcularAlturaDisponivel();
    window.addEventListener("resize", calcularAlturaDisponivel);

    return () => window.removeEventListener("resize", calcularAlturaDisponivel);
  }, []);

  // ✅ AJUSTAR: O cálculo de itens também
  const itensPorPaginaCalculado = useMemo(() => {
    if (!usarResponsivo) {
      return itensPorPagina;
    }

    const alturaLinha = 65; // ✅ REDUZIDO: de 70 para 65 pixels por linha
    const itensQueCapem = Math.floor(alturaDisponivel / alturaLinha);

    // Mínimo de 5, máximo de 50
    return Math.max(5, Math.min(50, itensQueCapem));
  }, [alturaDisponivel, usarResponsivo, itensPorPagina]);

  // Função para filtrar pacientes (busca + status)
  const pacientesFiltrados = useMemo(() => {
    let resultado = pacientes;

    // Primeiro aplicar filtro de status
    if (filtroStatus !== "todos") {
      resultado = resultado.filter((paciente) => {
        return filtroStatus === "ativo" ? paciente.ativo : !paciente.ativo;
      });
    }

    // Depois aplicar busca por texto
    if (termoBusca.trim()) {
      const termo = termoBusca.toLowerCase();
      resultado = resultado.filter(
        (paciente) =>
          paciente.nome.toLowerCase().includes(termo) ||
          paciente.email?.toLowerCase().includes(termo) ||
          paciente.telefone?.includes(termo)
      );
    }

    return resultado;
  }, [pacientes, termoBusca, filtroStatus]);

  // ✅ ATUALIZADA: Função para calcular paginação com responsividade
  const dadosPaginados = useMemo(() => {
    const itensUsados = usarResponsivo
      ? itensPorPaginaCalculado
      : itensPorPagina;
    const inicio = (paginaAtual - 1) * itensUsados;
    const fim = inicio + itensUsados;
    const pacientesPagina = pacientesFiltrados.slice(inicio, fim);

    const totalPaginas = Math.ceil(pacientesFiltrados.length / itensUsados);

    return {
      pacientes: pacientesPagina,
      totalItens: pacientesFiltrados.length,
      totalPaginas,
      paginaAtual,
      inicio: inicio + 1,
      fim: Math.min(fim, pacientesFiltrados.length),
      temProxima: paginaAtual < totalPaginas,
      temAnterior: paginaAtual > 1,
    };
  }, [
    pacientesFiltrados,
    paginaAtual,
    itensPorPagina,
    itensPorPaginaCalculado,
    usarResponsivo,
  ]);

  // Função para resetar página quando filtros mudam
  useEffect(() => {
    setPaginaAtual(1);
  }, [termoBusca, filtroStatus]);

  // Função para contar pacientes por status
  const contadores = useMemo(() => {
    const total = pacientes.length;
    const ativos = pacientes.filter((p) => p.ativo).length;
    const inativos = pacientes.filter((p) => !p.ativo).length;

    return { total, ativos, inativos };
  }, [pacientes]);

  const fetchPacientes = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/pacientes");
      const data: PacientesResponse = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Erro ao carregar pacientes");
      }

      setPacientes(data.data || []);
    } catch (err) {
      console.error("Erro ao buscar pacientes:", err);
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      toast.error("Erro ao carregar lista de pacientes");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchPacientes();
    } else if (status === "unauthenticated") {
      setIsLoading(false);
    }
  }, [status]);

  return {
    pacientes: dadosPaginados.pacientes,
    pacientesOriginais: pacientes,
    isLoading,
    error,
    session,
    status,
    fetchPacientes,
    termoBusca,
    setTermoBusca,
    filtroStatus,
    setFiltroStatus,
    contadores,
    // ✅ ATUALIZADA: Paginação com responsividade
    paginacao: {
      totalItens: dadosPaginados.totalItens,
      totalPaginas: dadosPaginados.totalPaginas,
      paginaAtual: dadosPaginados.paginaAtual,
      inicio: dadosPaginados.inicio,
      fim: dadosPaginados.fim,
      temProxima: dadosPaginados.temProxima,
      temAnterior: dadosPaginados.temAnterior,
      itensPorPagina: usarResponsivo ? itensPorPaginaCalculado : itensPorPagina,
      usarResponsivo,
      itensPorPaginaCalculado,
    },
    controlesPaginacao: {
      irParaPagina: setPaginaAtual,
      proximaPagina: () => setPaginaAtual((prev) => prev + 1),
      paginaAnterior: () => setPaginaAtual((prev) => prev - 1),
      alterarItensPorPagina: (qtd: number) => {
        setItensPorPagina(qtd);
        setPaginaAtual(1);
      },
      // ✅ NOVO: Toggle responsivo
      toggleResponsivo: () => {
        setUsarResponsivo(!usarResponsivo);
        setPaginaAtual(1);
      },
    },
  };
}
