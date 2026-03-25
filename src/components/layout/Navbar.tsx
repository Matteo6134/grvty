"use client";

import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import { useEffect, useState } from "react";

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <div
        className={`flex items-center gap-1 px-1.5 py-1.5 rounded-full transition-all duration-500 ${
          scrolled
            ? "bg-foreground/8 dark:bg-foreground/10 backdrop-blur-2xl shadow-lg shadow-black/5 border border-foreground/[0.06]"
            : "bg-foreground/5 dark:bg-foreground/8 backdrop-blur-xl border border-foreground/[0.04]"
        }`}
        style={{
          WebkitBackdropFilter: "blur(40px) saturate(180%)",
          backdropFilter: "blur(40px) saturate(180%)",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          className="px-4 py-2 rounded-full text-sm font-semibold text-foreground hover:bg-foreground/5 transition-colors"
        >
          grvty
        </Link>

        {/* Divider */}
        <div className="w-px h-4 bg-foreground/10" />

        {/* Shop */}
        <Link
          href="/shop"
          className="px-4 py-2 rounded-full font-display text-xs font-light text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-all"
        >
          Shop
        </Link>

        {/* Divider */}
        <div className="w-px h-4 bg-foreground/10" />

        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-foreground/5 transition-all duration-300"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <div
            className="w-4 h-4 rounded-full transition-all duration-500"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #f0ebe5 50%, transparent 50%)"
                : "linear-gradient(135deg, #1a1a1a 50%, transparent 50%)",
              border: `1.5px solid ${isDark ? "#f0ebe5" : "#1a1a1a"}`,
            }}
          />
        </button>
      </div>
    </nav>
  );
}
