"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Monitor,
} from "lucide-react";

interface PaginacaoProps {
  paginacao: {
    totalItens: number;
    totalPaginas: number;
    paginaAtual: number;
    inicio: number;
    fim: number;
    temProxima: boolean;
    temAnterior: boolean;
    itensPorPagina: number;
    usarResponsivo?: boolean;
    itensPorPaginaCalculado?: number;
  };
  controles: {
    irParaPagina: (pagina: number) => void;
    proximaPagina: () => void;
    paginaAnterior: () => void;
    alterarItensPorPagina: (qtd: number) => void;
    toggleResponsivo?: () => void;
  };
}

export function Paginacao({ paginacao, controles }: PaginacaoProps) {
  const {
    totalItens,
    totalPaginas,
    paginaAtual,
    inicio,
    fim,
    temProxima,
    temAnterior,
    itensPorPagina,
    usarResponsivo = false,
    itensPorPaginaCalculado = 10,
  } = paginacao;

  const {
    irParaPagina,
    proximaPagina,
    paginaAnterior,
    alterarItensPorPagina,
    toggleResponsivo,
  } = controles;

  // Não mostrar paginação se houver poucos itens e não for responsivo
  if (totalItens <= 10 && !usarResponsivo) {
    return null;
  }

  return (
    <div className="flex items-center justify-between px-2">
      {/* Informações da paginação */}
      <div className="flex items-center gap-6 text-sm text-muted-foreground">
        <div>
          Mostrando <strong>{inicio}</strong> a <strong>{fim}</strong> de{" "}
          <strong>{totalItens}</strong> paciente(s)
        </div>

        {/* ✅ Toggle para modo responsivo */}
        {toggleResponsivo && (
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4" />
            <span>Auto:</span>
            <Switch
              checked={usarResponsivo}
              onCheckedChange={toggleResponsivo}
            />
            {usarResponsivo && (
              <span className="text-xs text-blue-600">
                ({itensPorPaginaCalculado} itens)
              </span>
            )}
          </div>
        )}

        {/* Seletor de itens por página - só mostra se não for responsivo */}
        {!usarResponsivo && (
          <div className="flex items-center gap-2">
            <span>Itens por página:</span>
            <Select
              value={itensPorPagina.toString()}
              onValueChange={(value) => alterarItensPorPagina(Number(value))}
            >
              <SelectTrigger className="w-[70px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Controles de navegação */}
      <div className="flex items-center gap-2">
        {/* Primeira página */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => irParaPagina(1)}
          disabled={!temAnterior}
          className="h-8 w-8 p-0"
        >
          <ChevronsLeft className="h-4 w-4" />
          <span className="sr-only">Primeira página</span>
        </Button>

        {/* Página anterior */}
        <Button
          variant="outline"
          size="sm"
          onClick={paginaAnterior}
          disabled={!temAnterior}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">Página anterior</span>
        </Button>

        {/* Indicador de página atual */}
        <div className="flex items-center gap-1 text-sm font-medium">
          <span>Página</span>
          <span className="bg-primary text-primary-foreground px-2 py-1 rounded">
            {paginaAtual}
          </span>
          <span>de {totalPaginas}</span>
        </div>

        {/* Próxima página */}
        <Button
          variant="outline"
          size="sm"
          onClick={proximaPagina}
          disabled={!temProxima}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">Próxima página</span>
        </Button>

        {/* Última página */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => irParaPagina(totalPaginas)}
          disabled={!temProxima}
          className="h-8 w-8 p-0"
        >
          <ChevronsRight className="h-4 w-4" />
          <span className="sr-only">Última página</span>
        </Button>
      </div>
    </div>
  );
}
