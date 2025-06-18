"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react"; // ✅ NextAuth
import {
  LayoutDashboard,
  Calendar,
  Users,
  ClipboardList,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
// ❌ import { useAuth } from "@/hooks/use-auth"; // Removido

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  const pathname = usePathname();
  const { data: session, status } = useSession(); // ✅ NextAuth
  const user = session?.user; // ✅ User do NextAuth

  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Função de logout com NextAuth
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => {
      window.removeEventListener("resize", checkIsMobile);
    };
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    if (isMobile) {
      setIsOpen(false);
    }
  };

  const navigation = [
    { name: "Painel", href: "/painel", icon: LayoutDashboard },
    { name: "Agenda", href: "/agenda", icon: Calendar },
    { name: "Pacientes", href: "/pacientes", icon: Users },
    { name: "Anotações", href: "/anotacoes", icon: ClipboardList },
    { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
  ];

  // ✅ Loading state
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // ✅ Not authenticated
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold">Acesso negado</h2>
          <p className="text-gray-600">
            Você precisa estar logado para acessar esta página.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-block text-blue-600 hover:underline"
          >
            Fazer login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Overlay para dispositivos móveis */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 transform bg-white shadow-lg transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center border-b px-4">
            <h2 className="text-xl font-bold text-gray-800">PSI ATEN</h2>
          </div>
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="space-y-1 px-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={closeSidebar}
                  className={cn(
                    pathname === item.href ||
                      pathname.startsWith(`${item.href}/`)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                    "group flex items-center rounded-md px-2 py-2 text-sm font-medium"
                  )}
                >
                  <item.icon
                    className={cn(
                      pathname === item.href ||
                        pathname.startsWith(`${item.href}/`)
                        ? "text-gray-900"
                        : "text-gray-400 group-hover:text-gray-500",
                      "mr-3 h-5 w-5 flex-shrink-0"
                    )}
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            {user && (
              <div className="flex flex-col space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                    <span className="text-sm font-medium text-gray-600">
                      {user.name?.charAt(0) || user.email?.charAt(0) || "U"}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">
                      {user.name || "Usuário"}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={handleLogout} // ✅ Nova função de logout
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Sair
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo principal */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Barra superior */}
        <div className="flex h-16 items-center justify-between border-b bg-white px-4 md:px-6">
          <button
            type="button"
            className="text-gray-500 focus:outline-none md:hidden"
            onClick={toggleSidebar}
          >
            <span className="sr-only">Abrir menu lateral</span>
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <div className="ml-4 md:ml-0">
            <span className="text-sm font-medium text-gray-500">
              {new Date().toLocaleDateString("pt-BR", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
              <span className="sr-only">Configurações</span>
            </Button>
          </div>
        </div>

        {/* Área de conteúdo */}
        <main className="flex-1 overflow-y-auto bg-gray-100 p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
