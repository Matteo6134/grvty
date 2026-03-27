"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn(delay = 0, threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), delay); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);
  return { ref, visible };
}

export function DetailsSection() {
  const label = useFadeIn(0);
  const claim = useFadeIn(120);
  const statsLeft = useFadeIn(200);
  const statsRight = useFadeIn(260);
  const bar = useFadeIn(340);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-10 md:px-16 py-24">

      {/* Top row: label + headline */}
      <div className="flex items-start justify-between">
        <div
          ref={label.ref}
          style={{
            opacity: label.visible ? 1 : 0,
            transform: label.visible ? "none" : "translateY(16px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <span
            className="text-[10px] font-black uppercase"
            style={{ color: "var(--foreground)", opacity: 0.3, letterSpacing: "0.4em" }}
          >
            01 — Specifications
          </span>
        </div>
      </div>

      {/* Middle: claim text left | lamp center | stat right */}
      <div className="flex items-end justify-between w-full">

        {/* Left: one sentence */}
        <div
          ref={claim.ref}
          className="w-[30%]"
          style={{
            opacity: claim.visible ? 1 : 0,
            transform: claim.visible ? "none" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <p
            className="font-sans leading-tight lowercase"
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
            }}
          >
            Form follows function.
            <br />
            <span style={{ opacity: 0.35 }}>The pyramid, re-imagined as light.</span>
          </p>

          {/* Big stat bottom-left */}
          <div
            ref={statsLeft.ref}
            className="mt-10"
            style={{
              opacity: statsLeft.visible ? 1 : 0,
              transform: statsLeft.visible ? "none" : "translateY(16px)",
              transition: "opacity 0.9s ease, transform 0.9s ease",
            }}
          >
            <div
              className="font-black font-sans lowercase leading-none"
              style={{
                fontSize: "clamp(3.5rem, 6vw, 5.5rem)",
                letterSpacing: "-0.05em",
                color: "var(--foreground)",
              }}
            >
              32cm
            </div>
            <span
              className="text-[10px] uppercase tracking-[0.35em] font-medium"
              style={{ color: "var(--foreground)", opacity: 0.3 }}
            >
              Height
            </span>
          </div>
        </div>

        {/* Center: lamp space */}
        <div className="flex-1" />

        {/* Right: stacked stats */}
        <div
          ref={statsRight.ref}
          className="w-[22%] flex flex-col items-end gap-8"
          style={{
            opacity: statsRight.visible ? 1 : 0,
            transform: statsRight.visible ? "none" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          {[
            { value: "800", unit: "lm", label: "Luminous flux" },
            { value: "16M", unit: "", label: "RGB colors" },
            { value: "1.2", unit: "kg", label: "Weight" },
          ].map((s) => (
            <div key={s.label} className="text-right">
              <div
                className="font-black font-sans leading-none"
                style={{
                  fontSize: "clamp(2rem, 3.5vw, 3rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                }}
              >
                {s.value}
                <span style={{ fontSize: "0.45em", opacity: 0.5 }}>{s.unit}</span>
              </div>
              <span
                className="text-[10px] uppercase tracking-[0.3em]"
                style={{ color: "var(--foreground)", opacity: 0.28 }}
              >
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: horizontal spec strip */}
      <div
        ref={bar.ref}
        className="flex items-center gap-6 pt-6 border-t"
        style={{
          borderColor: "rgba(var(--foreground-rgb,26,26,26),0.08)",
          opacity: bar.visible ? 1 : 0,
          transform: bar.visible ? "none" : "translateY(12px)",
          transition: "opacity 0.8s ease, transform 0.8s ease",
        }}
      >
        {["Pyramid Form", "FDM 3D Print", "Hand Finished", "Worldwide Shipping"].map((item, i) => (
          <span key={item} className="flex items-center gap-6">
            <span
              className="text-[10px] uppercase tracking-[0.28em] font-medium"
              style={{ color: "var(--foreground)", opacity: 0.32 }}
            >
              {item}
            </span>
            {i < 3 && (
              <span style={{ color: "var(--foreground)", opacity: 0.15 }}>·</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
