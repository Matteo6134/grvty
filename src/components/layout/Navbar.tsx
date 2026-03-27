"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme";

const NAV_LINKS = [
  { label: "Discover", id: "details" },
  { label: "Colors", id: "rgb" },
  { label: "Shop", id: "cta" },
];

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const collapsed = scrolled && !hovered;

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-16 pointer-events-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left — logo circle (always visible) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="pointer-events-auto rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95"
        style={{
          width: 40,
          height: 40,
          background: "var(--foreground)",
          boxShadow: collapsed
            ? "0 4px 24px rgba(0,0,0,0.18)"
            : "0 2px 12px rgba(0,0,0,0.12)",
          transform: collapsed ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease",
        }}
        aria-label="Back to top"
      >
        <span
          className="text-[11px] font-black tracking-tighter"
          style={{ color: "var(--background)" }}
        >
          g
        </span>
      </button>

      {/* Center — pill tabs (collapses on scroll) */}
      <div
        className="glass-pill pointer-events-auto flex items-center gap-0.5 px-1.5 py-1.5 rounded-full"
        style={{
          opacity: collapsed ? 0 : 1,
          transform: collapsed ? "translateY(-10px) scale(0.92)" : "translateY(0) scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          pointerEvents: collapsed ? "none" : "auto",
        }}
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-300 hover:opacity-90 active:scale-95"
          style={{
            background: "var(--foreground)",
            color: "var(--background)",
          }}
        >
          <span className="text-[13px] leading-none opacity-70">≡</span>
          <span>grvty</span>
        </button>

        {NAV_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className="px-4 py-2 rounded-full text-[11px] font-medium transition-all duration-200 hover:bg-black/5 active:scale-95"
            style={{ color: "var(--foreground)", opacity: 0.55 }}
          >
            {link.label}
          </button>
        ))}
      </div>

      {/* Right — theme toggle + CTA (collapses on scroll) */}
      <div
        className="pointer-events-auto flex items-center gap-2.5"
        style={{
          opacity: collapsed ? 0 : 1,
          transform: collapsed ? "translateY(-10px) scale(0.92)" : "translateY(0) scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          pointerEvents: collapsed ? "none" : "auto",
        }}
      >
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
          style={{
            background: "rgba(255,255,255,0.5)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.7)",
          }}
          aria-label={isDark ? "Switch to light" : "Switch to dark"}
        >
          <div
            className="w-3 h-3 rounded-full transition-all duration-500"
            style={{
              background: isDark
                ? "linear-gradient(135deg, #f0ebe5 50%, transparent 50%)"
                : "linear-gradient(135deg, #1a1a1a 50%, transparent 50%)",
            }}
          />
        </button>

        <a
          href="#cta"
          onClick={(e) => { e.preventDefault(); scrollTo("cta"); }}
          className="glass-pill flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
          style={{ color: "var(--foreground)" }}
        >
          <span
            className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold"
            style={{
              background: "var(--foreground)",
              color: "var(--background)",
            }}
          >
            →
          </span>
          <span className="hidden md:inline whitespace-nowrap">Order yours</span>
        </a>
      </div>
    </nav>
  );
}
