"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), delay); },
      { threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

export function PhotosSection() {
  const main = useFadeIn(80);
  const side = useFadeIn(200);
  const specs = useFadeIn(320);

  return (
    /* Solid background covers the 3D scene entirely for this section */
    <div
      className="relative w-full min-h-screen flex flex-col justify-between px-10 md:px-16 py-24"
      style={{
        background: "var(--background)",
        zIndex: 20,
      }}
    >
      {/* Section label */}
      <div>
        <span
          className="text-[10px] font-black uppercase"
          style={{ color: "var(--foreground)", opacity: 0.3, letterSpacing: "0.4em" }}
        >
          Gallery
        </span>
      </div>

      {/* Photo grid */}
      <div className="flex gap-4 flex-1 my-10">

        {/* Main large photo */}
        <div
          ref={main.ref}
          className="flex-1 rounded-[1.75rem] overflow-hidden relative"
          style={{
            opacity: main.visible ? 1 : 0,
            transform: main.visible ? "none" : "translateY(28px)",
            transition: "opacity 1.1s ease, transform 1.1s ease",
            minHeight: 420,
            background: "var(--surface)",
            border: "1px solid rgba(var(--foreground-rgb,26,26,26),0.06)",
          }}
        >
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <svg viewBox="0 0 120 100" width="64" style={{ opacity: 0.1 }}>
              <polygon points="60,5 110,90 10,90" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="60" y1="5" x2="60" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4"/>
            </svg>
            <span
              className="text-[9px] uppercase tracking-[0.4em]"
              style={{ color: "var(--foreground)", opacity: 0.18 }}
            >
              Photo coming soon
            </span>
          </div>
        </div>

        {/* Side photos */}
        <div
          ref={side.ref}
          className="flex flex-col gap-4 w-[31%]"
          style={{
            opacity: side.visible ? 1 : 0,
            transform: side.visible ? "none" : "translateY(28px)",
            transition: "opacity 1.1s ease 0.1s, transform 1.1s ease 0.1s",
          }}
        >
          {[
            { label: "Detail", hint: "close-up texture shot" },
            { label: "Glow", hint: "ambient light scene" },
          ].map((item) => (
            <div
              key={item.label}
              className="flex-1 rounded-[1.5rem] overflow-hidden relative"
              style={{
                minHeight: 200,
                background: "var(--surface)",
                border: "1px solid rgba(var(--foreground-rgb,26,26,26),0.06)",
              }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5">
                <span
                  className="text-[9px] uppercase tracking-[0.38em]"
                  style={{ color: "var(--foreground)", opacity: 0.18 }}
                >
                  {item.label}
                </span>
                <span
                  className="text-[8px] lowercase"
                  style={{ color: "var(--foreground)", opacity: 0.1 }}
                >
                  {item.hint}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Measurements — Apple-style big numbers */}
      <div
        ref={specs.ref}
        className="pt-6 border-t"
        style={{
          borderColor: "rgba(var(--foreground-rgb,26,26,26),0.07)",
          opacity: specs.visible ? 1 : 0,
          transform: specs.visible ? "none" : "translateY(14px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <div className="flex items-start justify-between">
          {[
            { label: "Height", value: "32", unit: "cm" },
            { label: "Base width", value: "22", unit: "cm" },
            { label: "Cord length", value: "2", unit: "m" },
            { label: "Socket", value: "E27", unit: "" },
            { label: "Voltage", value: "110–240", unit: "V" },
          ].map((m) => (
            <div key={m.label} className="flex flex-col gap-1">
              <span
                className="text-[9px] uppercase tracking-[0.32em] font-medium"
                style={{ color: "var(--foreground)", opacity: 0.24 }}
              >
                {m.label}
              </span>
              <span
                className="font-black font-sans leading-none"
                style={{
                  fontSize: "clamp(1.3rem, 2.2vw, 1.9rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                }}
              >
                {m.value}
                <span style={{ fontSize: "0.42em", opacity: 0.35, fontWeight: 600 }}>{m.unit}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
