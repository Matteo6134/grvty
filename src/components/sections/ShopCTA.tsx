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
      className="relative z-10 w-full min-h-screen flex items-center px-6 pt-24 pb-12 md:px-16 md:pt-36 md:pb-20"
    >
      {/* Left: lamp space */}
      <div className="hidden md:block flex-1" />

      {/* Right: structured purchase card */}
      <div
        id="cta-card"
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
            <div className="font-sans text-3xl tracking-tighter font-black" style={{ color: "var(--foreground)" }}>
              160€
            </div>
          </div>

          {/* Value Prop List */}
          <ul className="flex flex-col gap-4 text-[13px] font-sans text-left" style={{ color: "var(--foreground)", opacity: 0.65 }}>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Smart Bulb included
            </li>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Hand-finished & assembled in Italy
            </li>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              1–2 weeks manufacturing lead time
            </li>
            <li className="flex items-center gap-4">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              Express shipping available
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
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              SEND REQUEST NOW
            </span>
          </a>
        </div>
      </div>

      {/* Desktop Footer (Bottom Left) */}
      <div
        className="absolute bottom-10 left-16 hidden md:flex flex-col gap-2 pointer-events-auto"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <span className="font-sans text-[8px] tracking-[0.25em] font-bold opacity-20 uppercase">
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
        <span className="mt-2 font-sans text-[8px] tracking-[0.2em] font-medium opacity-15 uppercase">
          @grvty 2026 · all rights reserved
        </span>
      </div>
    </div>
  );
}
