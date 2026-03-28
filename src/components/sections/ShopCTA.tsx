"use client";

import { useEffect, useRef, useState } from "react";

export function ShopCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 w-full min-h-screen flex items-center px-6 pt-32 pb-12 md:px-16 md:pt-36 md:pb-20"
    >
      {/* Left: lamp space */}
      <div className="hidden md:block flex-1" />

      {/* Right: structured purchase card */}
      <div
        className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left z-20 pointer-events-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(32px)",
          transition: "opacity 1s ease, transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        
        <h2
          className="font-black font-sans leading-[0.88] lowercase mb-10"
          style={{
            fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
            letterSpacing: "-0.05em",
            color: "var(--foreground)",
            textShadow: "0 10px 30px rgba(0,0,0,0.05)"
          }}
        >
          own the
          <br />
          <span style={{ opacity: 0.3 }}>original.</span>
        </h2>

        {/* Premium E-commerce Card */}
        <div 
          className="w-full bg-[var(--surface)] rounded-[2rem] p-8 md:p-10 flex flex-col gap-8 w-full max-w-[420px]"
          style={{
            border: "1px solid rgba(150, 150, 150, 0.1)",
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)"
          }}
        >
          {/* Header & Price */}
          <div className="flex justify-between items-end border-b pb-6" style={{ borderColor: "rgba(150, 150, 150, 0.15)" }}>
            <div className="flex flex-col text-left">
              <span className="font-sans font-bold text-xl tracking-tight" style={{ color: "var(--foreground)" }}>grvty pyramid</span>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase mt-1 font-bold" style={{ color: "var(--foreground)", opacity: 0.4 }}>First Edition</span>
            </div>
            <div className="font-sans text-3xl tracking-tighter font-black" style={{ color: "var(--foreground)" }}>
              90€
            </div>
          </div>

          {/* Value Prop List */}
          <ul className="flex flex-col gap-4 text-[13px] font-sans text-left" style={{ color: "var(--foreground)", opacity: 0.65 }}>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Hand-finished & assembled in Milan
            </li>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              2–3 weeks manufacturing lead time
            </li>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(150,150,150,0.4)" }} />
              Worldwide express shipping available
            </li>
          </ul>

          {/* Action Button */}
          <a
            href="https://instagram.com/grvty.std"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center p-5 rounded-[1.25rem] font-sans font-black text-[12px] uppercase tracking-[0.2em] ios-button group mt-2"
            style={{ 
              color: "var(--foreground)",
            }}
          >
            <span className="relative z-10 flex items-center gap-3 drop-shadow-md">
              DM @grvty.std 
              <span className="transition-transform duration-300 group-hover:translate-x-1 font-sans">→</span>
            </span>
          </a>

          <div className="text-center font-sans text-[9px] uppercase tracking-widest font-bold" style={{ color: "var(--foreground)", opacity: 0.3 }}>
            Limited to 50 pieces · Inquire via instagram
          </div>
        </div>
      </div>
    </div>
  );
}
