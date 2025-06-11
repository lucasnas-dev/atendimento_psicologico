"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/src/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { DashboardHeader } from "@/components/dashboard-header";
import { DashboardShell } from "@/components/dashboard-shell";
import { useAuth } from "@/hooks/use-auth";

const consultaSchema = z.object({
  pacienteId: z.string({
    required_error: "Selecione um paciente",
  }),
  data: z.date({
    required_error: "Selecione uma data",
  }),
  hora: z.string({
    required_error: "Selecione um horário",
  }),
  duracao: z.number().int().positive().default(50),
  status: z.string().default("agendada"),
  observacoes: z.string().optional().nullable(),
});

type ConsultaFormValues = z.infer<typeof consultaSchema>;

export default function NovaConsultaPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();
  const [pacientes, setPacientes] = useState<{ id: string; nome: string }[]>(
    []
  );

  // Buscar pacientes ao carregar a página
  useState(() => {
    async function fetchPacientes() {
      try {
        const response = await fetch("/api/pacientes");
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            setPacientes(data.data);
          }
        }
      } catch (error) {
        console.error("Erro ao buscar pacientes:", error);
      }
    }

    fetchPacientes();
  });

  const form = useForm<ConsultaFormValues>({
    resolver: zodResolver(consultaSchema),
    defaultValues: {
      duracao: 50,
      status: "agendada",
      observacoes: "",
    },
  });

  async function onSubmit(data: ConsultaFormValues) {
    if (!user) {
      setError("Você precisa estar autenticado para agendar uma consulta");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Combinar data e hora
      const [hora, minuto] = data.hora.split(":").map(Number);
      const dataConsulta = new Date(data.data);
      dataConsulta.setHours(hora, minuto, 0);

      const response = await fetch("/api/consultas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pacienteId: data.pacienteId,
          data: dataConsulta.toISOString(),
          duracao: data.duracao,
          status: data.status,
          observacoes: data.observacoes,
          usuarioId: user.id,
          tenantId: user.tenantId,
        }),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Erro ao agendar consulta");
      }

      router.push("/consultas");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocorreu um erro ao tentar agendar a consulta"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  // Gerar opções de horários (de 8h às 20h, a cada 30 minutos)
  const horarios = [];
  for (let hora = 8; hora < 20; hora++) {
    horarios.push(`${hora.toString().padStart(2, "0")}:00`);
    horarios.push(`${hora.toString().padStart(2, "0")}:30`);
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Nova Consulta"
        text="Agende uma nova consulta"
      />

      <Card>
        <CardHeader>
          <CardTitle>Informações da Consulta</CardTitle>
          <CardDescription>
            Preencha os dados para agendar uma nova consulta
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="pacienteId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Paciente</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione um paciente" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {pacientes.map((paciente) => (
                          <SelectItem key={paciente.id} value={paciente.id}>
                            {paciente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="data"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Data</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full pl-3 text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value ? (
                                format(field.value, "dd/MM/yyyy", {
                                  locale: ptBR,
                                })
                              ) : (
                                <span>Selecione uma data</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date < new Date()}
                            initialFocus
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="hora"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Horário</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um horário" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {horarios.map((horario) => (
                            <SelectItem key={horario} value={horario}>
                              {horario}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="duracao"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duração (minutos)</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange(parseInt(value))
                        }
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a duração" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="30">30 minutos</SelectItem>
                          <SelectItem value="50">50 minutos</SelectItem>
                          <SelectItem value="60">60 minutos</SelectItem>
                          <SelectItem value="90">90 minutos</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="agendada">Agendada</SelectItem>
                          <SelectItem value="confirmada">Confirmada</SelectItem>
                          <SelectItem value="realizada">Realizada</SelectItem>
                          <SelectItem value="cancelada">Cancelada</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="observacoes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Observações</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Informações adicionais sobre a consulta"
                        className="min-h-[100px]"
                        {...field}
                        value={field.value || ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                type="button"
                onClick={() => router.back()}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Agendando..." : "Agendar Consulta"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </DashboardShell>
  );
}
