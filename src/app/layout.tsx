"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react"; // ✅ NextAuth
import { Toaster } from "sonner";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <SessionProvider>{children}</SessionProvider>
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
            expand={true}
            visibleToasts={3}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
