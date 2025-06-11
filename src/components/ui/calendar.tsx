"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CalendarProps {
  selected?: Date;
  onSelect?: (date: Date) => void;
  className?: string;
  disabled?: (date: Date) => boolean;
  mode?: "single" | "multiple" | "range";
}

export function Calendar({
  selected,
  onSelect,
  className,
  disabled,
  mode = "single",
}: CalendarProps) {
  const [currentDate, setCurrentDate] = React.useState(() => {
    return selected
      ? new Date(selected.getFullYear(), selected.getMonth(), 1)
      : new Date();
  });

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Gerar anos (20 anos atrás até 10 anos à frente)
  const years = Array.from({ length: 31 }, (_, i) => currentYear - 20 + i);

  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const dayNames = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const today = new Date();

  const changeMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    } else {
      setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    }
  };

  const changeYear = (year: string) => {
    setCurrentDate(new Date(parseInt(year), currentMonth, 1));
  };

  const changeMonthSelect = (month: string) => {
    setCurrentDate(new Date(currentYear, parseInt(month), 1));
  };

  const selectDate = (day: number) => {
    const selectedDate = new Date(currentYear, currentMonth, day);
    if (disabled && disabled(selectedDate)) return;
    onSelect?.(selectedDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(new Date(today.getFullYear(), today.getMonth(), 1));
    onSelect?.(today);
  };

  const isToday = (day: number) => {
    return (
      today.getDate() === day &&
      today.getMonth() === currentMonth &&
      today.getFullYear() === currentYear
    );
  };

  const isSelected = (day: number) => {
    if (!selected) return false;
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentMonth &&
      selected.getFullYear() === currentYear
    );
  };

  const isDisabled = (day: number) => {
    if (!disabled) return false;
    const date = new Date(currentYear, currentMonth, day);
    return disabled(date);
  };

  return (
    <div className={cn("p-4 bg-white rounded-lg border shadow-sm", className)}>
      {/* Header com seletores */}
      <div className="flex items-center justify-between mb-4 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => changeMonth("prev")}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        <div className="flex items-center gap-2">
          {/* Seletor de Mês */}
          <Select
            value={currentMonth.toString()}
            onValueChange={changeMonthSelect}
          >
            <SelectTrigger className="w-[130px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Seletor de Ano */}
          <Select value={currentYear.toString()} onValueChange={changeYear}>
            <SelectTrigger className="w-[80px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="max-h-[200px] overflow-y-auto">
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Botão Hoje */}
          <Button
            variant="outline"
            size="sm"
            onClick={goToToday}
            className="h-8 px-2 text-xs"
          >
            Hoje
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => changeMonth("next")}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Grid do calendário */}
      <div className="grid grid-cols-7 gap-1">
        {/* Células vazias para o início do mês */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-9" />
        ))}

        {/* Dias do mês */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isSelectedDay = isSelected(day);
          const isTodayDay = isToday(day);
          const isDisabledDay = isDisabled(day);

          return (
            <Button
              key={day}
              variant="ghost"
              className={cn(
                "h-9 w-9 p-0 font-normal",
                isSelectedDay && "bg-blue-500 text-white hover:bg-blue-600",
                isTodayDay &&
                  !isSelectedDay &&
                  "bg-blue-100 text-blue-900 hover:bg-blue-200",
                isDisabledDay &&
                  "opacity-50 cursor-not-allowed hover:bg-transparent"
              )}
              onClick={() => !isDisabledDay && selectDate(day)}
              disabled={isDisabledDay}
            >
              {day}
            </Button>
          );
        })}
      </div>

      {/* Footer com data selecionada - só a data */}
      {selected && (
        <div className="mt-3 pt-3 border-t text-center">
          <p className="text-sm text-gray-600 font-medium">
            {selected.toLocaleDateString("pt-BR")}
          </p>
        </div>
      )}
    </div>
  );
}

Calendar.displayName = "Calendar";
