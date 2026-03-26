"use client";

import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-8 right-8 md:top-12 md:right-12 z-[150] pointer-events-auto">
      <div
        className="group relative flex items-center justify-center bg-white/[0.03] dark:bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-full px-5 h-12 md:h-14 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:px-8 hover:shadow-2xl overflow-hidden min-w-[60px] md:min-w-[64px] hover:min-w-[480px]"
      >
        {/* Logo */}
        <button
          onClick={() => scrollTo("hero")}
          className="font-sans text-sm font-black text-foreground tracking-tighter shrink-0 z-10"
        >
          grvty
        </button>

        {/* Expanded Menu Content */}
        <div className="flex items-center justify-center gap-6 w-0 opacity-0 translate-x-4 group-hover:w-auto group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-700 delay-75 group-hover:ml-8">
          <button
            onClick={() => scrollTo("details")}
            className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground transition-colors whitespace-nowrap"
          >
            specifications
          </button>
          <button
            onClick={() => scrollTo("rgb")}
            className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground transition-colors whitespace-nowrap"
          >
            light
          </button>
          <button
            onClick={() => scrollTo("cta")}
            className="text-[10px] font-sans font-bold uppercase tracking-[0.3em] text-foreground/40 hover:text-foreground transition-colors whitespace-nowrap"
          >
            contact
          </button>

          {/* Theme toggle integrated */}
          <button
            onClick={toggleTheme}
            className="w-6 h-6 flex items-center justify-center rounded-full border border-foreground/10 hover:border-foreground/30 transition-all duration-300 ml-2"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div
              className="w-2.5 h-2.5 rounded-full transition-all duration-500"
              style={{
                background: isDark
                  ? "linear-gradient(135deg, #f0ebe5 50%, transparent 50%)"
                  : "linear-gradient(135deg, #1a1a1a 50%, transparent 50%)",
              }}
            />
          </button>
        </div>
      </div>
    </nav>
  );
}
