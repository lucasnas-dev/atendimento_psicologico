import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function CadastroSucessoPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">PsiAten</h1>
          <p className="text-muted-foreground">
            Sistema de Atendimento Psicológico
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="mb-4 flex justify-center">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-center text-2xl">
              Cadastro Realizado com Sucesso!
            </CardTitle>
            <CardDescription className="text-center">
              Sua conta foi criada e está pronta para uso.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground">
              Enviamos um email de confirmação para o endereço fornecido. Por
              favor, verifique sua caixa de entrada e confirme seu email para
              ativar todos os recursos da plataforma.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/login">Ir para o Login</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
