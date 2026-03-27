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
  const [activeId, setActiveId] = useState("hero");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track which section is in view
  useEffect(() => {
    const ids = ["cta", "rgb", "photos", "details", "hero"];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveId(id); },
        { threshold: 0.25 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
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
      {/* Left — grvty wordmark pill */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="pointer-events-auto flex items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95"
        style={{
          height: 40,
          padding: "0 14px",
          borderRadius: 999,
          background: "var(--foreground)",
          boxShadow: collapsed ? "0 4px 24px rgba(0,0,0,0.2)" : "0 2px 12px rgba(0,0,0,0.12)",
          transform: collapsed ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.4s ease, box-shadow 0.4s ease, padding 0.4s ease",
        }}
        aria-label="Back to top"
      >
        <span
          className="font-black tracking-tighter"
          style={{ fontSize: 13, color: "var(--background)", letterSpacing: "-0.04em" }}
        >
          grvty
        </span>
      </button>

      {/* Center — pill tabs */}
      <div
        className="glass-pill pointer-events-auto flex items-center gap-0.5 px-1.5 py-1.5 rounded-full"
        style={{
          opacity: collapsed ? 0 : 1,
          transform: collapsed ? "translateY(-10px) scale(0.92)" : "translateY(0) scale(1)",
          transition: "opacity 0.35s ease, transform 0.35s ease",
          pointerEvents: collapsed ? "none" : "auto",
        }}
      >
        {/* grvty home tab */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-bold transition-all duration-300 active:scale-95"
          style={{
            background: activeId === "hero" ? "var(--foreground)" : "transparent",
            color: activeId === "hero" ? "var(--background)" : "var(--foreground)",
            opacity: activeId === "hero" ? 1 : 0.5,
          }}
        >
          <span className="text-[13px] leading-none" style={{ opacity: 0.7 }}>≡</span>
          <span>grvty</span>
        </button>

        {NAV_LINKS.map((link) => {
          const isActive = activeId === link.id;
          return (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="px-4 py-2 rounded-full text-[11px] font-medium transition-all duration-300 active:scale-95"
              style={{
                background: isActive ? "var(--foreground)" : "transparent",
                color: isActive ? "var(--background)" : "var(--foreground)",
                opacity: isActive ? 1 : 0.5,
                transform: "scale(1)",
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.opacity = "0.85";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.opacity = "0.5";
              }}
            >
              {link.label}
            </button>
          );
        })}
      </div>

      {/* Right — theme + CTA */}
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
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            →
          </span>
          <span className="hidden md:inline whitespace-nowrap">Order yours</span>
        </a>
      </div>
    </nav>
  );
}
