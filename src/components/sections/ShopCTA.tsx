"use client";

import Link from "next/link";

export function ShopCTA() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pb-24 overflow-hidden">
      
      {/* Background Watermark - All Lowercase "grvty" (identica all'Hero) */}
      <div className="absolute inset-0 flex items-end justify-center pointer-events-none pb-8">
        <span className="watermark-text text-center whitespace-nowrap">
          grvty
        </span>
      </div>

      <div className="max-w-4xl text-center relative z-20">
          {/* Sottotitolo stile Hero */}
          <p className="font-display text-xs font-light tracking-[0.5em] uppercase text-accent mb-8">
            limited production
          </p>
          
          {/* Titolo Principale MASSIVE - Stessa Typography dell'Hero */}
          <h1 className="font-sans text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tight text-foreground leading-[0.85] lowercase italic mb-12">
            bring it<br />
            <span className="text-white font-light opacity-40">to life</span>
          </h1>

          {/* Testo descrittivo più grande e arioso */}
          <p className="font-display text-sm md:text-base font-light text-foreground/50 text-center max-w-lg mx-auto mb-16 leading-relaxed tracking-wide">
            Each piece is custom built and numbered in our studio. <br className="hidden md:block" />
            Designed for those who appreciate the weight of light.
          </p>
          
          {/* Pulsanti più Grandi e Premium */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
            <a
              href="https://ig.me/m/grvty"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative px-12 py-5 bg-white text-black font-sans font-bold text-xs uppercase tracking-[0.25em] rounded-full overflow-hidden transition-all duration-500 hover:scale-105 active:scale-95 shadow-[0_0_50px_rgba(255,255,255,0.1)]"
            >
              <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 group-hover:text-background transition-colors">Order via Instagram</span>
            </a>
            
            <Link
              href="/collections"
              className="px-12 py-5 border border-white/10 text-foreground font-display text-[11px] uppercase tracking-[0.4em] font-medium rounded-full hover:bg-white/5 transition-all duration-500"
            >
              The Collection
            </Link>
          </div>
      </div>
    </div>
  );
}
