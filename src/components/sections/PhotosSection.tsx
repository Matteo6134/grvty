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
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return { ref, visible };
}

export function PhotosSection() {
  const label = useFadeIn(0);
  const main = useFadeIn(100);
  const side = useFadeIn(220);
  const specs = useFadeIn(300);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-10 md:px-16 py-24">

      {/* Label */}
      <div
        ref={label.ref}
        style={{
          opacity: label.visible ? 1 : 0,
          transform: label.visible ? "none" : "translateY(12px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        <span className="text-[10px] font-black uppercase"
          style={{ color: "var(--foreground)", opacity: 0.3, letterSpacing: "0.4em" }}>
          02 — Gallery
        </span>
      </div>

      {/* Photo grid */}
      <div className="flex gap-4 flex-1 my-10">

        {/* Main large photo placeholder */}
        <div
          ref={main.ref}
          className="flex-1 rounded-[1.5rem] overflow-hidden"
          style={{
            opacity: main.visible ? 1 : 0,
            transform: main.visible ? "none" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
            minHeight: 400,
            background: "var(--surface)",
            border: "1px solid rgba(var(--foreground-rgb,26,26,26),0.07)",
          }}
        >
          {/* Placeholder content */}
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 p-8">
            {/* Pyramid silhouette */}
            <svg viewBox="0 0 120 100" width="80" style={{ opacity: 0.15 }}>
              <polygon points="60,5 110,90 10,90" fill="none" stroke="currentColor" strokeWidth="1.5"/>
              <line x1="60" y1="5" x2="60" y2="90" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 4"/>
              <line x1="10" y1="90" x2="110" y2="90" stroke="currentColor" strokeWidth="0.5"/>
            </svg>
            <span className="text-[10px] uppercase tracking-[0.3em] text-center"
              style={{ color: "var(--foreground)", opacity: 0.2 }}>
              Photo coming soon
            </span>
          </div>
        </div>

        {/* Side photos */}
        <div
          ref={side.ref}
          className="flex flex-col gap-4 w-[30%]"
          style={{
            opacity: side.visible ? 1 : 0,
            transform: side.visible ? "none" : "translateY(24px)",
            transition: "opacity 1s ease 0.1s, transform 1s ease 0.1s",
          }}
        >
          {["Detail shot", "Glowing"].map((label) => (
            <div key={label}
              className="flex-1 rounded-[1.25rem] overflow-hidden flex items-center justify-center"
              style={{
                minHeight: 190,
                background: "var(--surface)",
                border: "1px solid rgba(var(--foreground-rgb,26,26,26),0.07)",
              }}
            >
              <span className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "var(--foreground)", opacity: 0.2 }}>
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Measurements strip — Apple-style */}
      <div
        ref={specs.ref}
        className="pt-6 border-t"
        style={{
          borderColor: "rgba(var(--foreground-rgb,26,26,26),0.08)",
          opacity: specs.visible ? 1 : 0,
          transform: specs.visible ? "none" : "translateY(12px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
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
              <span className="text-[9px] uppercase tracking-[0.32em] font-medium"
                style={{ color: "var(--foreground)", opacity: 0.26 }}>
                {m.label}
              </span>
              <span className="font-black font-sans leading-none"
                style={{
                  fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                }}>
                {m.value}
                <span style={{ fontSize: "0.45em", opacity: 0.4, fontWeight: 600 }}>{m.unit}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
