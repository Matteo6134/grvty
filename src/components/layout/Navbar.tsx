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
      setDisplayText("");
      return;
    }

    // Show temporary section name
    let sectionName = activeId;
    if (activeId === 'cta') sectionName = 'shop';
    if (activeId === 'details') sectionName = 'discover';
    if (activeId === 'rgb') sectionName = 'colors';
    setDisplayText(sectionName);

    // Clear existing timer
    if (timerRef.current) clearTimeout(timerRef.current);

    // Reset back to blank after 3 seconds
    timerRef.current = setTimeout(() => {
      setDisplayText("");
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
        className="fixed top-6 md:top-8 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-16 pointer-events-none"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Left — grvty wordmark pill (Acts as Menu toggle on Mobile, Scroll Top on Desktop) */}
        <button
          onClick={() => {
            if (window.innerWidth < 768) setIsMenuOpen(true);
            else window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex pointer-events-auto items-center justify-center ios-button cursor-pointer"
          style={{
            height: 40,
            padding: "0 18px",
            borderRadius: 999,
          }}
          aria-label="Back to top"
        >
          <span
            className="font-black tracking-tighter"
            style={{ fontSize: 13, color: "var(--foreground)", letterSpacing: "-0.04em" }}
          >
            grvty
          </span>
        </button>

        {/* Center — pill tabs (Desktop Only) */}
        <div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-auto hidden md:flex items-center gap-0.5 px-1.5 py-1.5 rounded-full transition-all duration-300 shadow-xl"
          style={{
            opacity: 1,
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(24px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
          }}
        >
          {/* Desktop nav links */}
          <div className="flex items-center gap-0.5">
            {/* Navigation Links */}

            {NAV_LINKS.map((link) => {
              const isActive = activeId === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="px-4 py-2 rounded-full text-[11px] font-medium transition-all duration-300 active:scale-95 group"
                  style={{
                    background: isActive ? "rgba(255, 255, 255, 0.12)" : "transparent",
                    backdropFilter: isActive ? "blur(12px)" : "none",
                    border: isActive ? "1px solid rgba(255, 255, 255, 0.15)" : "1px solid transparent",
                    boxShadow: isActive ? "inset 0 1px 0 rgba(255,255,255,0.1)" : "none",
                    color: "var(--foreground)",
                    opacity: isActive ? 1 : 0.6,
                    transform: "scale(1)",
                    fontFamily: "var(--font-space), monospace",
                    letterSpacing: "0.06em",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.9";
                      (e.currentTarget as HTMLButtonElement).style.background = "rgba(255, 255, 255, 0.05)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLButtonElement).style.opacity = "0.6";
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                    }
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
          className="pointer-events-auto flex items-center gap-2.5"
          style={{
            opacity: 1, // Always visible on mobile
            transition: "opacity 0.35s ease, transform 0.35s ease",
          }}
        >
          <a
            href="#cta"
            onClick={(e) => { e.preventDefault(); scrollTo("cta"); }}
            className="ios-button flex items-center px-4 md:px-5 py-2.5 rounded-full text-[11px] font-black tracking-widest uppercase"
            style={{ color: "var(--foreground)" }}
          >
            <span className="drop-shadow-md">order here</span>
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
            className="absolute top-8 right-6 w-12 h-12 rounded-full flex items-center justify-center text-2xl z-[110]"
            style={{ color: "var(--foreground)", border: "1px solid rgba(150,150,150,0.2)" }}
          >
            ×
          </button>

          <div className="flex-1 flex flex-col items-center justify-center gap-8 text-center w-full">
            {[{ label: 'Concept', id: 'hero' }, ...NAV_LINKS].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  scrollTo(link.id);
                  setIsMenuOpen(false);
                }}
                className="text-4xl font-black lowercase tracking-tighter"
                style={{
                  color: "var(--foreground)",
                  opacity: activeId === link.id ? 1 : 0.4
                }}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mt-auto pb-12 flex flex-col items-center gap-2">
            <span className="font-sans text-[9px] tracking-[0.25em] font-bold opacity-20 uppercase mb-1">
              Design & Direction
            </span>
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com/grvty.std" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-sans text-[10px] tracking-[0.1em] font-black opacity-40 hover:opacity-100 transition-opacity lowercase" 
                style={{ color: "var(--foreground)" }}
              >
                @grvty.std
              </a>
              <span className="opacity-10 text-[10px]">•</span>
              <a 
                href="https://instagram.com/ma.tt._" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="font-sans text-[10px] tracking-[0.1em] font-black opacity-40 hover:opacity-100 transition-opacity lowercase" 
                style={{ color: "var(--foreground)" }}
              >
                @ma.tt._
              </a>
            </div>
            <span className="mt-4 font-sans text-[8px] tracking-[0.2em] font-medium opacity-20 uppercase">
              @grvty 2026 · all rights reserved
            </span>
          </div>
        </div>
      )}
    </>
  );
}
