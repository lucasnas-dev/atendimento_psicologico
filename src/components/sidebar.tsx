"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "@/components/theme-switcher";
import {
  Users,
  Calendar,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  Home,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useEffect, useState } from "react";

export function AppSidebar() {
  const pathname = usePathname();
  const [user, setUser] = useState<{
    name: string;
    email: string;
    role: string;
  } | null>(null);

  useEffect(() => {
    // Recuperar dados do usuário do localStorage (apenas para demonstração)
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const routes = [
    {
      title: "Painel",
      href: "/painel",
      icon: Home,
    },
    {
      title: "Pacientes",
      href: "/pacientes",
      icon: Users,
    },
    {
      title: "Agenda",
      href: "/agenda",
      icon: Calendar,
    },
    {
      title: "Prontuários",
      href: "/prontuario",
      icon: FileText,
    },
    {
      title: "Anotações",
      href: "/anotacoes",
      icon: FileText,
    },
    {
      title: "Relatórios",
      href: "/relatorios",
      icon: BarChart3,
    },
    {
      title: "Configurações",
      href: "/configuracoes",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
            P
          </div>
          <div className="text-xl font-semibold">PsiAten</div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {routes.map((route) => (
            <SidebarMenuItem key={route.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === route.href}
                tooltip={route.title}
              >
                <Link href={route.href}>
                  <route.icon className="h-5 w-5" />
                  <span>{route.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg" alt="Avatar" />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user?.name || "Usuário"}</span>
              <span className="text-xs text-muted-foreground">
                {user?.email || "usuario@exemplo.com"}
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <ThemeSwitcher />
            <Button variant="outline" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Sair</span>
            </Button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
