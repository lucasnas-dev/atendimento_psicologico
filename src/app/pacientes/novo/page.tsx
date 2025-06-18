"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner"; // ✅ Importar o Sonner
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

const pacienteSchema = z.object({
  nome: z.string().min(3, {
    message: "Nome deve ter pelo menos 3 caracteres",
  }),
  email: z
    .string()
    .email({
      message: "Email inválido",
    })
    .optional()
    .nullable(),
  telefone: z
    .string()
    .min(10, {
      message: "Telefone deve ter pelo menos 10 dígitos",
    })
    .optional()
    .nullable(),
  dataNascimento: z.date({
    required_error: "Data de nascimento é obrigatória",
  }),
  genero: z.string().optional().nullable(),
  endereco: z.string().optional().nullable(),
  observacoes: z.string().optional().nullable(),
});

type PacienteFormValues = z.infer<typeof pacienteSchema>;

export default function NovoPacientePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PacienteFormValues>({
    resolver: zodResolver(pacienteSchema),
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      genero: "",
      endereco: "",
      observacoes: "",
    },
  });

  async function onSubmit(data: PacienteFormValues) {
    if (!user) {
      toast.error("Você precisa estar autenticado para cadastrar um paciente");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/pacientes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          dataNascimento: data.dataNascimento.toISOString(),
        }),
      });

      const responseData = await response.json();

      if (!response.ok || !responseData.success) {
        // ✅ Tratar erros de validação específicos
        if (responseData.errors) {
          Object.entries(responseData.errors).forEach(
            ([field, messages]: [string, any]) => {
              const fieldNames: Record<string, string> = {
                nome: "Nome",
                email: "Email",
                telefone: "Telefone",
                dataNascimento: "Data de Nascimento",
                genero: "Gênero",
                endereco: "Endereço",
                observacoes: "Observações",
              };

              messages.forEach((message: string) => {
                toast.error(`${fieldNames[field] || field}: ${message}`);
              });
            }
          );
        } else {
          // Erro genérico
          toast.error(responseData.message || "Erro ao cadastrar paciente");
        }
        return;
      }

      // ✅ Sucesso
      toast.success("Paciente cadastrado com sucesso!");

      // Limpar formulário
      form.reset();

      // Redirecionar após um pequeno delay para o usuário ver a mensagem
      setTimeout(() => {
        router.push("/pacientes");
        router.refresh();
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Erro de conexão. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  // Loading state
  if (status === "loading") {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center py-8">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
        </div>
      </DashboardShell>
    );
  }

  // Not authenticated
  if (!session) {
    return (
      <DashboardShell>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Acesso negado</h2>
            <p className="text-gray-600">
              Você precisa estar logado para acessar esta página.
            </p>
          </div>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      <DashboardHeader
        heading="Novo Paciente"
        text="Cadastre um novo paciente no sistema"
      />

      <Card>
        <CardHeader>
          <CardTitle>Informações do Paciente</CardTitle>
          <CardDescription>Preencha os dados do novo paciente</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome completo</FormLabel>
                      <FormControl>
                        <Input placeholder="Nome do paciente" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="email@exemplo.com"
                          type="email"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="telefone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="(11) 98765-4321"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="dataNascimento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data de nascimento</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input
                            type="date"
                            {...field}
                            value={
                              field.value
                                ? field.value.toISOString().split("T")[0]
                                : ""
                            }
                            onChange={(e) => {
                              if (e.target.value) {
                                const date = new Date(
                                  e.target.value + "T12:00:00"
                                );
                                field.onChange(date);
                              } else {
                                field.onChange(undefined);
                              }
                            }}
                            max={new Date().toISOString().split("T")[0]}
                            min="1900-01-01"
                            className="pr-10"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="genero"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gênero</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione um gênero" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="feminino">Feminino</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                          <SelectItem value="nao_informado">
                            Prefiro não informar
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="endereco"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Rua, número, bairro, cidade"
                          {...field}
                          value={field.value || ""}
                        />
                      </FormControl>
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
                        placeholder="Informações adicionais sobre o paciente"
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
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar"}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </DashboardShell>
  );
}
