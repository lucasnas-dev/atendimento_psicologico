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
} from "@/src/components/ui/card";
import { Label } from "@/components/ui/label";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Checkbox } from "@/src/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export default function NovaConsultaPage() {
  const [date, setDate] = useState<Date>();

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Nova Consulta"
        text="Agende uma nova consulta"
      />
      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Consulta</CardTitle>
          <CardDescription>
            Preencha os detalhes para agendar uma nova consulta
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
                <Label htmlFor="tipo-consulta">Tipo de Consulta</Label>
                <Select>
                  <SelectTrigger id="tipo-consulta">
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="consulta-inicial">
                      Consulta Inicial
                    </SelectItem>
                    <SelectItem value="sessao-terapia">
                      Sessão de Terapia
                    </SelectItem>
                    <SelectItem value="acompanhamento">
                      Acompanhamento
                    </SelectItem>
                    <SelectItem value="avaliacao">Avaliação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Data</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>Selecione a data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="horario">Horário</Label>
                <Select>
                  <SelectTrigger id="horario">
                    <SelectValue placeholder="Selecione o horário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="09:00">09:00 - 10:00</SelectItem>
                    <SelectItem value="10:00">10:00 - 11:00</SelectItem>
                    <SelectItem value="11:00">11:00 - 12:00</SelectItem>
                    <SelectItem value="14:00">14:00 - 15:00</SelectItem>
                    <SelectItem value="15:00">15:00 - 16:00</SelectItem>
                    <SelectItem value="16:00">16:00 - 17:00</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="virtual" />
                <Label htmlFor="virtual">Consulta virtual</Label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="observacoes">Observações</Label>
              <Textarea
                id="observacoes"
                placeholder="Adicione observações ou informações adicionais"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancelar</Button>
          <Button>Agendar Consulta</Button>
        </CardFooter>
      </Card>
    </DashboardShell>
  );
}
