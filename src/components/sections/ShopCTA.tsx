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
      { threshold: 0.05 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="relative z-10 w-full min-h-screen flex items-center px-10 md:px-16 py-20"
    >
      {/* Left: empty space (lamp moves here via scroll) */}
      <div className="hidden md:flex flex-1 items-end pb-4">
        <div
          className="transition-all duration-1000 ease-out"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
          }}
        >
          <span
            className="text-[10px] font-black uppercase tracking-[0.45em] mb-5 block"
            style={{ color: "var(--foreground)", opacity: 0.25 }}
          >
            03 — Order
          </span>
          <p
            className="text-[12px] leading-relaxed"
            style={{ color: "var(--foreground)", opacity: 0.22, maxWidth: "160px" }}
          >
            Each piece is custom built and numbered in the studio.
          </p>
        </div>
      </div>

      {/* Right: full contact & order card */}
      <div
        className="w-full md:w-[48%] flex flex-col gap-10 transition-all duration-1000 ease-out"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateX(0)" : "translateX(32px)",
          transitionDelay: "100ms",
        }}
      >
        {/* Headline */}
        <div className="flex flex-col gap-4">
          <span
            className="text-[10px] font-black uppercase tracking-[0.45em] block md:hidden"
            style={{ color: "var(--foreground)", opacity: 0.3 }}
          >
            03 — Order
          </span>
          <h2
            className="font-sans font-black leading-[0.92] lowercase"
            style={{
              fontSize: "clamp(3rem, 7vw, 6.5rem)",
              letterSpacing: "-0.05em",
              color: "var(--foreground)",
            }}
          >
            bring it
            <br />
            <span style={{ opacity: 0.25 }}>to life.</span>
          </h2>
          <p
            className="text-[13px] leading-relaxed"
            style={{ color: "var(--foreground)", opacity: 0.45, maxWidth: "340px" }}
          >
            Designed for those who appreciate the weight of light. Handcrafted, numbered, and shipped from Milan.
          </p>
        </div>

        {/* Contact + CTA card */}
        <div
          className="glass-info rounded-[2rem] overflow-hidden"
        >
          {/* Contact rows */}
          <div className="px-8 pt-7 pb-5 flex flex-col gap-5">
            {[
              { label: "Inquiries", value: "studio@grvty.art" },
              { label: "Location", value: "Milan, IT — Global Shipping" },
              { label: "Lead Time", value: "~2–3 weeks" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-baseline justify-between gap-6 pb-4 border-b last:border-b-0"
                style={{ borderColor: "rgba(var(--foreground-rgb,26,26,26),0.07)" }}
              >
                <span
                  className="text-[10px] uppercase tracking-[0.3em] font-medium shrink-0"
                  style={{ color: "var(--foreground)", opacity: 0.35 }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[13px] font-semibold font-sans text-right"
                  style={{ color: "var(--foreground)" }}
                >
                  {item.value}
                </span>
              </div>
            ))}
          </div>

          {/* CTA button */}
          <div className="px-5 pb-5">
            <a
              href="https://ig.me/m/grvty"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between w-full px-8 py-5 rounded-[1.25rem] font-sans font-black text-xs uppercase tracking-[0.3em] transition-all duration-400 hover:scale-[1.02] active:scale-[0.98] group"
              style={{
                background: "var(--foreground)",
                color: "var(--background)",
              }}
            >
              <span>Order via Instagram</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        {/* Footer note */}
        <p
          className="text-[10px] leading-relaxed"
          style={{ color: "var(--foreground)", opacity: 0.22 }}
        >
          Limited availability. Each lamp is hand-assembled and signed by the maker.
        </p>
      </div>
    </div>
  );
}
