"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  FileText,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";

export function MainSidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const menuItems = [
    {
      title: "Painel",
      href: "/painel",
      icon: LayoutDashboard,
    },
    {
      title: "Pacientes",
      href: "/pacientes",
      icon: Users,
    },
    {
      title: "Consultas",
      href: "/consultas",
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
      title: "Configurações",
      href: "/configuracoes",
      icon: Settings,
    },
  ];

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <Link href="/painel" className="flex items-center space-x-2">
          <Home className="h-6 w-6" />
          <span className="text-xl font-bold">PsiAten</span>
        </Link>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton asChild isActive={pathname === item.href}>
                <Link href={item.href}>
                  <item.icon className="h-5 w-5" />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary font-medium">
                {user?.nome
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() || "U"}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium">{user?.nome || "Usuário"}</p>
              <p className="text-xs text-muted-foreground">
                {user?.email || ""}
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={() => logout()}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Sair
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
