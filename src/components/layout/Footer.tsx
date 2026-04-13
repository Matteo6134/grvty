"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full px-6 py-20 md:px-16 md:py-32 relative z-10 border-t border-white/5 overflow-hidden">
      {/* Dynamic Background Text (Consistent with Hero/CTA) */}
      <div 
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none overflow-hidden h-[80%] flex items-end justify-center z-0"
        style={{ opacity: 0.04 }}
      >
        <span 
          className="font-black leading-none translate-y-[30%] text-[35vw] tracking-[-0.08em] whitespace-nowrap"
          style={{ 
            fontFamily: "var(--font-syne), sans-serif",
            color: "var(--foreground)",
          }}
        >
          grvty
        </span>
      </div>

      {/* Frosted Glass Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1]" 
        style={{ 
          backdropFilter: "blur(40px) saturate(150%)",
          background: "linear-gradient(to bottom, transparent 0%, var(--background) 100%)"
        }} 
      />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-[2] mix-blend-overlay" style={{ backgroundImage: "url('/noise.png')" }} />

      <div className="flex flex-col gap-12 md:gap-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-24 w-full">
          {/* Project */}
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.35 }}>
              Project
            </span>
            <div className="flex flex-col gap-2.5">
              <Link href="/#hero" className="font-sans text-[12px] font-black opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">The Lamp</Link>
              <Link href="/#story" className="font-sans text-[12px] font-black opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Story</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.35 }}>
              Legal
            </span>
            <div className="flex flex-col gap-2.5">
              <Link href="/legal/privacy" className="font-sans text-[12px] font-black opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Privacy</Link>
              <Link href="/legal/terms" className="font-sans text-[12px] font-black opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Terms</Link>
              <Link href="/legal/shipping" className="font-sans text-[12px] font-black opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Shipping</Link>
              <Link href="/legal/returns" className="font-sans text-[12px] font-black opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Returns</Link>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.35 }}>
              Connect
            </span>
            <div className="flex flex-col gap-2.5">
              <a href="https://ig.me/m/grvty.std" className="font-sans text-[12px] font-black opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">@grvty.std</a>
              <a href="https://instagram.com/ma.tt._" className="font-sans text-[12px] font-black opacity-80 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">@ma.tt._</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-sans text-[10px] tracking-[0.2em] font-medium uppercase" style={{ color: "var(--foreground)", opacity: 0.4 }}>
            @grvty 2026 · objects with gravity · all rights reserved
          </span>
          <span className="font-sans text-[8px] tracking-[0.1em] font-bold opacity-20 uppercase">
            hand-finished in italy
          </span>
        </div>
      </div>
    </footer>
  );
}
