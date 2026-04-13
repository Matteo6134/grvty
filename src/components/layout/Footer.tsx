"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full px-6 py-20 md:px-16 md:py-32 relative z-10">
      <div className="flex flex-col gap-8 md:gap-12">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Project */}
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.25 }}>
              Project
            </span>
            <div className="flex flex-col gap-2">
              <Link href="/#hero" className="font-sans text-[11px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">The Lamp</Link>
              <Link href="/#story" className="font-sans text-[11px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Story</Link>
            </div>
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.25 }}>
              Legal
            </span>
            <div className="flex flex-col gap-2">
              <Link href="/legal/privacy" className="font-sans text-[11px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Privacy</Link>
              <Link href="/legal/terms" className="font-sans text-[11px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Terms</Link>
              <Link href="/legal/shipping" className="font-sans text-[11px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Shipping</Link>
              <Link href="/legal/returns" className="font-sans text-[11px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">Returns</Link>
            </div>
          </div>

          {/* Connect */}
          <div className="flex flex-col gap-4">
            <span className="font-sans text-[8px] tracking-[0.25em] font-bold uppercase" style={{ color: "var(--foreground)", opacity: 0.25 }}>
              Connect
            </span>
            <div className="flex flex-col gap-2">
              <a href="https://ig.me/m/grvty.std" className="font-sans text-[11px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">@grvty.std</a>
              <a href="https://instagram.com/ma.tt._" className="font-sans text-[11px] font-black opacity-60 hover:opacity-100 hover:text-[var(--accent)] transition-all lowercase">@ma.tt._</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <span className="font-sans text-[9px] tracking-[0.2em] font-medium uppercase" style={{ color: "var(--foreground)", opacity: 0.2 }}>
            @grvty 2026 · objects with gravity · all rights reserved
          </span>
          <span className="font-sans text-[8px] tracking-[0.1em] font-bold opacity-10 uppercase">
            hand-finished in italy
          </span>
        </div>
      </div>
    </footer>
  );
}
