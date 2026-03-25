"use client";

import Link from "next/link";

export function ShopCTA() {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[60vh] px-6 pb-20">
      <div className="absolute inset-0 flex items-end justify-center pb-32 pointer-events-none overflow-hidden">
        <span className="watermark-text text-center">
          get yours
        </span>
      </div>

      <p className="font-display text-xs font-light tracking-[0.3em] uppercase text-accent mb-3">
        Objects with gravity
      </p>
      <h2 className="font-sans text-4xl md:text-6xl font-bold text-foreground text-center mb-4">
        Bring grvty<br />to your space
      </h2>
      <p className="font-display text-sm font-light text-foreground/45 text-center max-w-md mb-10">
        Each lamp is unique. Message us on Instagram to order yours.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a
          href="https://ig.me/m/grvty"
          target="_blank"
          rel="noopener noreferrer"
          className="px-8 py-3.5 bg-accent text-background font-sans font-semibold text-sm rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-accent/20"
        >
          Shop Now
        </a>
        <Link
          href="/shop"
          className="px-8 py-3.5 border border-foreground/15 text-foreground font-display text-sm font-light rounded-full hover:border-accent/40 transition-all duration-300"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
