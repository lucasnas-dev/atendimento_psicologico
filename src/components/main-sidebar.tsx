"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react"; // ✅ NextAuth
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
} from "@/components/ui/sidebar";
// ❌ import { useAuth } from "@/hooks/use-auth"; // Removido

export function MainSidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession(); // ✅ NextAuth
  const user = session?.user; // ✅ User do NextAuth

  // ✅ Função de logout com NextAuth
  const handleLogout = () => {
    signOut({ callbackUrl: "/login" });
  };

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

  // ✅ Loading state
  if (status === "loading") {
    return (
      <div className="flex h-screen w-64 items-center justify-center border-r bg-white">
        <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // ✅ Not authenticated
  if (!session) {
    return null; // Ou redirecionar para login
  }

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
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <span className="font-medium text-primary">
                {/* ✅ Ajustado para user.name (padrão NextAuth) */}
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase() ||
                  user?.email?.charAt(0).toUpperCase() ||
                  "U"}
              </span>
            </div>
            <div>
              {/* ✅ Ajustado para user.name */}
              <p className="text-sm font-medium">{user?.name || "Usuário"}</p>
              <p className="text-xs text-muted-foreground">
                {user?.email || ""}
              </p>
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
      </SidebarFooter>
    </Sidebar>
  );
}
