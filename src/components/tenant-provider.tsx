"use client";

import type React from "react";

import { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // ✅ NextAuth
// ❌ import { useAuth } from "@/hooks/use-auth" // Removido

type TenantContextType = {
  tenantId: string | null;
  tenantName: string | null;
  tenantConfig: any | null;
  isLoading: boolean;
};

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession(); // ✅ NextAuth
  const user = session?.user; // ✅ User do NextAuth
  const isAuthenticated = !!session; // ✅ Check autenticação

  const [tenantId, setTenantId] = useState<string | null>(null);
  const [tenantName, setTenantName] = useState<string | null>(null);
  const [tenantConfig, setTenantConfig] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // ✅ Aguardar carregamento da sessão
    if (status === "loading") {
      setIsLoading(true);
      return;
    }

    if (isAuthenticated && user) {
      // ✅ Usar tenantId do NextAuth (definido no callback JWT)
      setTenantId(user.tenantId || null);

      // ✅ Usar tenant do NextAuth ou nome do usuário
      if (user.tenant?.nome) {
        setTenantName(user.tenant.nome);
      } else {
        // Fallback usando nome do usuário
        const firstName = user.name?.split(" ")[0] || "Clínica";
        setTenantName(`Clínica ${firstName}`);
      }

      // Configuração do tenant - pode vir da sessão ou da API
      setTenantConfig({
        logo: "/logo.png",
        primaryColor: "#3b82f6",
        allowPatientPortal: true,
        features: {
          appointments: true,
          billing: true,
          reports: true,
        },
        // ✅ Adicionar dados do tenant se disponível
        ...(user.tenant || {}),
      });
    } else {
      // Reset quando não autenticado
      setTenantId(null);
      setTenantName(null);
      setTenantConfig(null);
    }

    setIsLoading(false);
  }, [session, status, isAuthenticated, user]); // ✅ Dependências do NextAuth

  return (
    <TenantContext.Provider
      value={{
        tenantId,
        tenantName,
        tenantConfig,
        isLoading,
      }}
    >
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (context === undefined) {
    throw new Error("useTenant deve ser usado dentro de um TenantProvider");
  }
  return context;
}
