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

const SPECS = [
  { label: "Height", value: "220", unit: "mm" },
  { label: "Base width", value: "220", unit: "mm" },
  { label: "Cord length", value: "2", unit: "m" },
  { label: "Socket", value: "E27", unit: "" },
  { label: "Voltage", value: "110–240", unit: "V" },
];

const RIGHT_SPECS = [
  { label: "Material", value: "ASA", unit: "White" },
  { label: "Manufacture", value: "3D", unit: "Printed" },
  { label: "Origin", value: "Italy", unit: "" },
];

export function DetailsSection() {
  const claim = useFadeIn(80);
  const statsLeft = useFadeIn(160);
  const statsRight = useFadeIn(240);
  const linesRef = useRef<HTMLDivElement>(null);
  const [linesVisible, setLinesVisible] = useState(false);

  useEffect(() => {
    const el = linesRef.current;
    if (!el) return;
    let timeout: NodeJS.Timeout;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          timeout = setTimeout(() => setLinesVisible(true), 150);
        } else {
          clearTimeout(timeout);
          setLinesVisible(false);
        }
      },
      { threshold: 0.45 }
    );
    obs.observe(el);
    return () => {
      clearTimeout(timeout);
      obs.disconnect();
    };
  }, []);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-center px-4 md:px-16 pt-20 md:pt-36 pb-16 md:pb-24">
      {/* ── CENTRAL HUD AREA (Pushes text away from the center) ── */}
      <div className="absolute inset-0 md:relative w-full flex-1 flex justify-center items-center pointer-events-none z-0 min-h-[35vh] md:min-h-0 py-4 md:py-0">
        <div
          ref={linesRef}
          className="relative pointer-events-none flex items-center justify-center md:mt-0 transition-transform duration-1000 ease-out"
          style={{ 
            width: "clamp(180px, 42vw, 420px)",
            height: "clamp(180px, 42vw, 420px)",
            transform: "translateY(0)" 
          }}
        >
          {/* ── Height Glass Pill (vertical, left side) ── */}
          <div className="absolute left-[-2%] md:left-[-15%] bottom-[5%] w-[5px] md:w-[6px] h-[90%] pointer-events-none flex flex-col justify-end z-20">
            <div
              className="w-full relative overflow-hidden rounded-full backdrop-blur-3xl"
              style={{
                height: linesVisible ? "100%" : "0%",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: linesVisible ? "height 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s" : "height 0.5s ease 0s",
                boxShadow: linesVisible ? "0 0 30px rgba(201, 168, 76, 0.2)" : "none",
              }}
            >
              <div
                className="absolute bottom-0 left-0 w-full h-full"
                style={{
                  background: "linear-gradient(to top, rgba(201, 168, 76, 0) 0%, rgba(201, 168, 76, 0.4) 50%, var(--accent) 100%)",
                }}
              />
            </div>

            {/* Anchored Height Label */}
            <div
              className="absolute top-1/2 right-[100%] mr-4 md:mr-8 -translate-y-1/2 whitespace-nowrap z-30 pointer-events-auto"
              style={{
                opacity: linesVisible ? 1 : 0,
                transition: linesVisible ? "opacity 1s ease 1s" : "opacity 0.3s ease",
              }}
            >
              <div
                className="font-black font-sans leading-none shadow-xl rounded-full bg-black/60 backdrop-blur-2xl px-3 py-1.5 md:py-2 md:px-4 border border-white/10"
                style={{
                  fontSize: "clamp(1rem, 4.5vw, 1.8rem)",
                  letterSpacing: "-0.05em",
                  color: "var(--foreground)",
                }}
              >
                {SPECS[0].value}
                <span style={{ fontSize: "0.45em", opacity: 0.6, paddingLeft: "4px" }}>{SPECS[0].unit}</span>
              </div>
            </div>

            <div className="absolute -left-[4px] -bottom-[4px] w-[12px] h-[12px] rounded-full backdrop-blur-3xl border flex items-center justify-center bg-black/5 border-black/20" style={{ opacity: linesVisible ? 1 : 0, transition: "opacity 0.4s 0s" }}>
              <div className="w-[4px] h-[4px] rounded-full bg-[var(--accent)]" />
            </div>
            <div className="absolute -left-[4px] w-[12px] h-[12px] rounded-full backdrop-blur-3xl border flex items-center justify-center bg-black/5 border-black/20" style={{ bottom: linesVisible ? "100%" : "0%", opacity: linesVisible ? 1 : 0, transition: "bottom 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.1s, opacity 0.4s 0.8s", transform: "translateY(50%)" }}>
              <div className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]" />
            </div>
          </div>

          {/* ── Width Glass Pill (horizontal) ── */}
          <div className="absolute bottom-[-5%] md:bottom-[-15%] left-[5%] w-[90%] h-[5px] md:h-[6px] pointer-events-none flex items-center z-20">
            <div
              className="h-full relative overflow-hidden rounded-full backdrop-blur-3xl"
              style={{
                width: linesVisible ? "100%" : "0%",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                transition: linesVisible ? "width 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s" : "width 0.5s ease 0s",
                boxShadow: linesVisible ? "0 0 30px rgba(201, 168, 76, 0.2)" : "none",
              }}
            >
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  background: "linear-gradient(to right, rgba(201, 168, 76, 0) 0%, rgba(201, 168, 76, 0.4) 50%, var(--accent) 100%)",
                }}
              />
            </div>

            {/* Anchored Width Label */}
            <div
              className="absolute top-[100%] left-1/2 -translate-x-1/2 mt-4 md:mt-8 whitespace-nowrap z-30 pointer-events-auto"
              style={{
                opacity: linesVisible ? 1 : 0,
                transition: linesVisible ? "opacity 1s ease 1.4s" : "opacity 0.3s ease",
              }}
            >
              <div
                className="font-black font-sans leading-none shadow-xl rounded-full bg-black/60 backdrop-blur-2xl px-3 py-1.5 md:py-2 md:px-4 border border-white/10"
                style={{
                  fontSize: "clamp(1rem, 4.5vw, 1.8rem)",
                  letterSpacing: "-0.05em",
                  color: "var(--foreground)",
                }}
              >
                {SPECS[1].value}
                <span style={{ fontSize: "0.45em", opacity: 0.6, paddingLeft: "4px" }}>{SPECS[1].unit}</span>
              </div>
            </div>

            {/* Start/End Dots */}
            <div className="absolute -left-[4px] -bottom-[4px] w-[12px] h-[12px] rounded-full backdrop-blur-3xl border flex items-center justify-center bg-black/5 border-black/20" style={{ opacity: linesVisible ? 1 : 0, transition: "opacity 0.4s 0.3s" }}>
              <div className="w-[4px] h-[4px] rounded-full bg-[var(--accent)]" />
            </div>
            <div className="absolute -bottom-[4px] w-[12px] h-[12px] rounded-full backdrop-blur-3xl border flex items-center justify-center bg-black/5 border-black/20" style={{ left: linesVisible ? "100%" : "0%", opacity: linesVisible ? 1 : 0, transition: "left 1.2s cubic-bezier(0.22, 1, 0.36, 1) 0.4s, opacity 0.4s 1.2s", transform: "translateX(-50%)" }}>
              <div className="w-[6px] h-[6px] rounded-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)]" />
            </div>
          </div>
        </div>
      </div>

      {/* ── BOTTOM CONTENT AREA (Specs ONLY) ── */}
      <div className="relative w-full md:w-auto flex flex-col justify-end pointer-events-auto z-10 mt-auto md:absolute md:bottom-24 md:left-16 md:right-16 md:flex-row md:items-end md:justify-between">
        
        {/* Technical Specs Row */}
        <div
          ref={statsRight.ref}
          className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row gap-y-2 gap-x-0 md:gap-x-8 mt-10 md:mt-0"
          style={{
            opacity: statsRight.visible ? 1 : 0,
            transform: statsRight.visible ? "none" : "translateY(24px)",
            transition: "opacity 1s ease, transform 1s ease 0.1s",
          }}
        >
          {SPECS.slice(2).map((s) => (
            <div key={s.label} className="text-center md:text-left flex flex-col items-center md:items-start">
              <div
                className="font-black font-sans leading-none whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-sora), system-ui, sans-serif"
                }}
              >
                {s.value}
                <span style={{ fontSize: "0.42em", opacity: 0.4, paddingLeft: "1.5px" }}>{s.unit}</span>
              </div>
              <span className="hud-label mt-1 text-center md:text-left text-[9px] md:text-[10px]" style={{ fontFamily: "var(--font-sora), sans-serif", letterSpacing: "0.15em", color: "var(--foreground)", opacity: 0.5 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Divider — mobile only */}
        <div className="w-2/3 mx-auto h-px bg-white/10 my-6 md:hidden" />

        {/* Manufacturing Specs Row */}
        <div 
          className="w-full md:w-auto grid grid-cols-3 md:flex md:flex-row gap-y-2 gap-x-0 md:gap-x-8 md:mt-0 md:pb-8"
          style={{
            opacity: statsRight.visible ? 1 : 0,
            transform: statsRight.visible ? "none" : "translateY(24px)",
            transition: "opacity 1s ease 0.4s, transform 1s ease 0.4s",
          }}
        >
          {RIGHT_SPECS.map((s) => (
            <div key={s.label} className="text-center md:text-right flex flex-col items-center md:items-end">
              <div
                className="font-black font-sans leading-none whitespace-nowrap"
                style={{
                  fontSize: "clamp(1.4rem, 4vw, 2.5rem)",
                  letterSpacing: "-0.04em",
                  color: "var(--foreground)",
                  fontFamily: "var(--font-sora), system-ui, sans-serif"
                }}
              >
                {s.value}
                <span style={{ fontSize: "0.42em", opacity: 0.4, paddingLeft: "1.5px" }}>{s.unit}</span>
              </div>
              <span className="hud-label mt-1 text-center md:text-right text-[9px] md:text-[10px]" style={{ fontFamily: "var(--font-sora), sans-serif", letterSpacing: "0.15em", color: "var(--foreground)", opacity: 0.5 }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
