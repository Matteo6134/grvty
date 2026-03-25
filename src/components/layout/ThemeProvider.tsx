"use client";

import { ThemeContext, useThemeProvider } from "@/hooks/useTheme";

export function ThemeProvider({ children }: { readonly children: React.ReactNode }) {
  const themeValue = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeValue}>
      {children}
    </ThemeContext.Provider>
  );
}
