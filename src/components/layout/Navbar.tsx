"use client";

import { useTheme } from "@/hooks/useTheme";

const NAV_LINKS = [
  { label: "Discover", id: "details" },
  { label: "Colors", id: "rgb" },
  { label: "Shop", id: "cta" },
];

export function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-16 pointer-events-none">

      {/* Left — logo circle */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: "var(--foreground)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
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

      {/* Center — pill tabs */}
      <div
        className="glass-pill pointer-events-auto flex items-center gap-0.5 px-1.5 py-1.5 rounded-full"
      >
        {/* Active tab */}
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

        {/* Secondary tabs */}
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

      {/* Right — CTA + theme toggle */}
      <div className="pointer-events-auto flex items-center gap-2.5">
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
          className="glass-pill pointer-events-auto flex items-center gap-2.5 pl-2 pr-4 py-2 rounded-full text-[11px] font-semibold transition-all duration-300 hover:scale-105 active:scale-95"
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
