"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

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
          className="w-full bg-[var(--surface)] rounded-[2rem] p-5 md:p-6 flex flex-col gap-5 w-full max-w-[420px]"
          style={{
            border: "1px solid rgba(150, 150, 150, 0.1)",
            boxShadow: "0 24px 60px -12px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.2)"
          }}
        >
          {/* Header & Price */}
          {/* Product Header */}
          <div className="flex justify-between items-center border-b pb-4" style={{ borderColor: "rgba(150, 150, 150, 0.1)" }}>
            <h3 className="font-sans font-black text-2xl tracking-tighter lowercase leading-none">
              grvty.
            </h3>
            <Link
              href="/checkout"
              className="flex items-center justify-center px-5 py-3 rounded-xl font-sans font-black text-[9px] uppercase tracking-[0.2em] ios-button group cursor-pointer"
              style={{
                color: "var(--foreground)",
              }}
            >
              <span className="relative z-10 flex items-center gap-2 drop-shadow-md">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                ORDER NOW
              </span>
            </Link>
          </div>

          {/* Line Items for Value Proof */}
          <div className="flex flex-col gap-3 py-1">
            {[
              { label: "1 x grvty", value: "160€" },
              { label: "1 x Smart RGB Bulb", value: "Incl." },
              { label: "1 x E27 Socket", value: "Incl." },
              { label: "1 x EU/US Plug with Switch", value: "Incl." },
              { label: "1 x Textile Power Cable (2m)", value: "Incl." },
            ].map((item, idx) => (
              <div key={item.label} className="flex justify-between items-end border-b pb-2 border-white/[0.03]">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[8px] opacity-20">0{idx + 1}</span>
                  <span className="font-sans text-[11px] font-bold opacity-60 lowercase">{item.label}</span>
                </div>
                <span className="font-sans text-[12px] font-black tracking-tight lowercase">{item.value}</span>
              </div>
            ))}
          </div>

          {/* Total & Shipping Note */}
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="font-sans font-black text-[9px] uppercase tracking-[0.2em] opacity-30">Total Price</span>
              <div className="flex flex-col items-end leading-none">
                <span className="font-sans text-2xl font-black tracking-tighter">160€</span>
                <span className="font-sans text-[8px] font-black opacity-20 uppercase tracking-widest mt-1">Excl. Shipping</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
              <span className="font-sans text-[11px] font-bold opacity-45 uppercase tracking-wider">
                Hand-finished in Italy · 14-day lead time
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Footer (Bottom Left) */}
      <div
        className="absolute bottom-10 left-6 md:left-16 flex flex-col gap-8 md:gap-6 pointer-events-auto"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease 1s",
        }}
      >
        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Project */}
          <div className="flex flex-col gap-3">
             <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.25 }}>
               Project
             </span>
             <div className="flex flex-col gap-1.5">
               <Link href="/#hero" className="font-sans text-[10px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">The Lamp</Link>
               <Link href="/#story" className="font-sans text-[10px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Story</Link>
             </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
             <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.25 }}>
               Legal
             </span>
             <div className="flex flex-col gap-1.5">
               <Link href="/legal/privacy" className="font-sans text-[10px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Privacy</Link>
               <Link href="/legal/terms" className="font-sans text-[10px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Terms</Link>
               <Link href="/legal/shipping" className="font-sans text-[10px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Shipping</Link>
               <Link href="/legal/returns" className="font-sans text-[10px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Returns</Link>
             </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-3">
             <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.25 }}>
               Connect
             </span>
             <div className="flex flex-col gap-1.5">
               <a href="https://ig.me/m/grvty.std" className="font-sans text-[10px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">@grvty.std</a>
               <a href="https://instagram.com/ma.tt._" className="font-sans text-[10px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">@ma.tt._</a>
             </div>
          </div>
        </div>

        <span className="font-sans text-[8px] tracking-[0.2em] font-medium uppercase" style={{ color: "var(--foreground)", opacity: 0.2 }}>
          @grvty 2026 · objects with gravity · all rights reserved
        </span>
      </div>
    </div>

  );
}
