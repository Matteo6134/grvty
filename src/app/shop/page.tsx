"use client";

import dynamic from "next/dynamic";

const ShopCanvas = dynamic(
  () => import("@/components/shop/ShopBackground").then((mod) => ({ default: mod.ShopBackground })),
  { ssr: false }
);

export default function ShopPage() {
  return (
    <main className="relative min-h-screen">
      {/* Gradient background canvas */}
      <ShopCanvas />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 pt-20">
        <p className="font-display text-xs font-light tracking-[0.3em] uppercase text-accent mb-3">
          Objects with gravity
        </p>
        <h1 className="font-sans text-5xl md:text-7xl font-bold text-foreground text-center mb-4">
          Order grvty
        </h1>
        <p className="font-display text-sm font-light text-foreground/45 text-center max-w-md mb-12">
          Message us on Instagram to order your lamp. We reply within 24h.
        </p>

        {/* iPhone mockup */}
        <div className="relative w-full max-w-xs mx-auto mb-12">
          {/* Phone frame */}
          <div className="relative bg-foreground/5 border-2 border-foreground/10 rounded-[3rem] p-3 shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-background rounded-b-2xl z-10" />

            {/* Screen */}
            <div className="bg-background rounded-[2.3rem] overflow-hidden">
              {/* Instagram DM header */}
              <div className="flex items-center gap-3 px-4 py-4 border-b border-foreground/10 pt-8">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <span className="text-xs font-bold text-accent">g</span>
                </div>
                <div>
                  <p className="font-sans text-sm font-semibold text-foreground">grvty</p>
                  <p className="font-display text-xs font-light text-foreground/40">Active now</p>
                </div>
              </div>

              {/* Messages */}
              <div className="px-4 py-6 space-y-4 min-h-[300px]">
                {/* Incoming message */}
                <div className="flex justify-start">
                  <div className="bg-foreground/5 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%]">
                    <p className="font-sans text-sm text-foreground">
                      Hey! I'd like to order a grvty 🔺
                    </p>
                  </div>
                </div>

                {/* Reply */}
                <div className="flex justify-end">
                  <div className="bg-accent rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                    <p className="font-sans text-sm text-white">
                      Great choice ✨ What color would you like?
                    </p>
                  </div>
                </div>

                {/* Incoming */}
                <div className="flex justify-start">
                  <div className="bg-foreground/5 rounded-2xl rounded-bl-sm px-4 py-2.5 max-w-[80%]">
                    <p className="font-sans text-sm text-foreground">
                      Matte black, please! 🖤
                    </p>
                  </div>
                </div>

                {/* Reply */}
                <div className="flex justify-end">
                  <div className="bg-accent rounded-2xl rounded-br-sm px-4 py-2.5 max-w-[80%]">
                    <p className="font-sans text-sm text-white">
                      Perfect! Sending you the details now 🚀
                    </p>
                  </div>
                </div>
              </div>

              {/* Input bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-t border-foreground/10">
                <div className="flex-1 bg-foreground/5 rounded-full px-4 py-2">
                  <p className="font-display text-xs font-light text-foreground/30">Message...</p>
                </div>
                <div className="w-7 h-7 rounded-full bg-accent flex items-center justify-center">
                  <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="https://ig.me/m/grvty"
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-3.5 bg-accent text-background font-sans font-semibold text-sm rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-accent/20 flex items-center gap-3"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
          </svg>
          Message on Instagram
        </a>

        {/* Footer */}
        <footer className="mt-20 pb-8 text-center">
          <p className="font-mono text-xs text-foreground/30">
            &copy; 2026 grvty. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  );
}
