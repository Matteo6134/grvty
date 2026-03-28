"use client";

import { useEffect, useState, useRef } from "react";

const NAV_LINKS = [
  { label: "Discover", id: "details" },
  { label: "Colors", id: "rgb" },
  { label: "Shop", id: "cta" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [displayText, setDisplayText] = useState("grvty");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (activeId === 'hero') {
      setDisplayText("grvty");
      return;
    }

    // Show temporary section name
    const sectionName = activeId === 'cta' ? 'shop' : activeId;
    setDisplayText(`grvty — ${sectionName}`);

    // Clear existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Reset back to 'grvty' after 3 seconds
    timerRef.current = setTimeout(() => {
      setDisplayText("grvty");
    }, 3000);

    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [activeId]);

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
    <>
      <nav
        className="fixed top-6 md:top-8 left-0 right-0 z-50 flex items-center justify-start md:justify-between px-4 md:px-16 pointer-events-none gap-4"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left — grvty wordmark pill (Desktop Only) */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="hidden md:flex pointer-events-auto items-center justify-center transition-all duration-500 hover:scale-105 active:scale-95"
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
        className="glass-pill pointer-events-auto flex items-center gap-0.5 px-1.5 py-1.5 rounded-full transition-all duration-300 shadow-xl"
        style={{
          opacity: 1, // Always visible on mobile, handle desktop below
          transform: "translateY(0) scale(1)",
        }}
      >
          {/* Mobile Active Section Display: Timed 'grvty — section' animation */}
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="md:hidden flex items-center gap-3 px-5 py-2.5 rounded-full text-[12px] font-black tracking-tight"
            style={{ background: "var(--foreground)", color: "var(--background)" }}
          >
            <span className="opacity-70">{displayText}</span>
            <span className="opacity-40">{isMenuOpen ? "×" : "▿"}</span>
          </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
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
                  fontFamily: "var(--font-space), monospace",
                  letterSpacing: "0.06em",
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
      </div>

      {/* Right — theme + CTA */}
      <div
        className="pointer-events-auto flex items-center gap-2.5 ml-auto md:ml-0"
        style={{
          opacity: 1, // Always visible on mobile
          transition: "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
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

      {/* MOBILE FULL-SCREEN NAVIGATION MODAL */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] w-screen h-screen flex flex-col items-center justify-center p-8 md:hidden pointer-events-auto"
          style={{ 
            background: "var(--background)", 
            animation: "fadeIn 0.3s ease-out" 
          }}
        >
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-8 right-6 w-12 h-12 rounded-full flex items-center justify-center text-2xl"
            style={{ color: "var(--foreground)", border: "1px solid rgba(150,150,150,0.2)" }}
          >
            ×
          </button>
          
          <div className="flex flex-col gap-8 text-center w-full">
            <span className="font-sans text-[10px] tracking-[0.3em] uppercase mb-4 font-bold" style={{ color: "var(--foreground)", opacity: 0.3 }}>Menu</span>
            {[{label: 'Concept', id: 'hero'}, ...NAV_LINKS].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  scrollTo(link.id);
                  setIsMenuOpen(false);
                }}
                className="text-4xl font-black lowercase tracking-tighter"
                style={{ 
                  color: activeId === link.id ? "var(--foreground)" : "var(--foreground)",
                  opacity: activeId === link.id ? 1 : 0.4
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
          
          <div className="mt-auto pt-20 flex flex-col items-center gap-6">
             <a href="https://instagram.com/grvty.std" target="_blank" rel="noopener noreferrer" className="font-sans font-bold text-[10px] tracking-widest uppercase" style={{ color: "var(--foreground)", opacity: 0.5 }}>Instagram</a>
          </div>
        </div>
      )}
    </>
  );
}
