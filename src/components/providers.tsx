"use client";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";

export default function Providers({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <ThemeProvider
      attribute="data-theme"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
