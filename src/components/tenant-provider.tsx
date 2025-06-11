"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useAuth } from "@/hooks/use-auth"

type TenantContextType = {
  tenantId: string | null
  tenantName: string | null
  tenantConfig: any | null
  isLoading: boolean
}

const TenantContext = createContext<TenantContextType | undefined>(undefined)

export function TenantProvider({ children }: { children: React.ReactNode }) {
  const { user, isAuthenticated } = useAuth()
  const [tenantId, setTenantId] = useState<string | null>(null)
  const [tenantName, setTenantName] = useState<string | null>(null)
  const [tenantConfig, setTenantConfig] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (isAuthenticated && user) {
      setTenantId(user.tenantId)

      // Em um sistema real, você buscaria as configurações do tenant da API
      // Simulação para demonstração
      setTenantName(`Clínica ${user.name.split(" ")[0]}`)
      setTenantConfig({
        logo: "/logo.png",
        primaryColor: "#3b82f6",
        allowPatientPortal: true,
        features: {
          appointments: true,
          billing: true,
          reports: true,
        },
      })
    } else {
      setTenantId(null)
      setTenantName(null)
      setTenantConfig(null)
    }

    setIsLoading(false)
  }, [isAuthenticated, user])

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
  )
}

export function useTenant() {
  const context = useContext(TenantContext)
  if (context === undefined) {
    throw new Error("useTenant deve ser usado dentro de um TenantProvider")
  }
  return context
}
