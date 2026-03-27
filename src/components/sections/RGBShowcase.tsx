"use client";

import { RGB_COLORS } from "@/lib/constants";
import { useState, useEffect, useRef } from "react";

interface RGBShowcaseProps {
  readonly progress: number;
  readonly onManualColor?: (color: string | null) => void;
}

const COLOR_NAMES: Record<string, string> = {
  "#ef4444": "Ruby Red",
  "#3b82f6": "Arctic Blue",
  "#22c55e": "Forest Green",
  "#a855f7": "Deep Violet",
  "#c9a84c": "Warm Gold",
};

// D-shape geometry
const R = 100;
const SR = 20;
const PAD = 12;
const W = R + SR * 2 + PAD * 2;
const H = R * 2 + SR * 2 + PAD * 2;
const CX = W - SR - PAD;
const CY = H / 2;

function getSwatchPos(index: number, total: number) {
  const angle = Math.PI / 2 + (index / (total - 1)) * Math.PI;
  return { x: CX + Math.cos(angle) * R, y: CY + Math.sin(angle) * R };
}

export function RGBShowcase({ progress, onManualColor }: RGBShowcaseProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setMounted(true); },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (selectedColor || hoverColor) return;
    const id = setInterval(() => {
      setAutoIndex((p) => (p + 1) % RGB_COLORS.length);
    }, 3200);
    return () => clearInterval(id);
  }, [selectedColor, hoverColor]);

  const currentColor =
    hoverColor ||
    selectedColor ||
    (progress > 0 && progress < 1
      ? RGB_COLORS[Math.min(Math.floor(progress * RGB_COLORS.length), RGB_COLORS.length - 1)]
      : RGB_COLORS[autoIndex]);

  useEffect(() => {
    onManualColor?.(selectedColor || hoverColor || currentColor);
  }, [selectedColor, hoverColor, currentColor, onManualColor]);

  const handleColorClick = (color: string) => {
    setSelectedColor(selectedColor === color ? null : color);
  };

  return (
    <div
      ref={sectionRef}
      className="relative z-20 w-full min-h-screen flex flex-col justify-between px-10 md:px-16 py-24 overflow-hidden"
    >
      {/* Live ambient gradient background — the main visual */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 55% 55% at 50% 50%, ${currentColor}22 0%, transparent 70%)`,
          transition: "background 1.8s ease",
          animation: "rgb-breathe 5s ease-in-out infinite",
        }}
      />

      {/* Top: label + big number */}
      <div
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "none" : "translateY(20px)",
          transition: "opacity 1s ease, transform 1s ease",
        }}
      >
        <span
          className="text-[10px] font-black uppercase block mb-6"
          style={{ color: "var(--foreground)", opacity: 0.3, letterSpacing: "0.4em" }}
        >
          02 — Chromatic Spectrum
        </span>
        <div
          className="font-black font-sans leading-none lowercase"
          style={{
            fontSize: "clamp(5rem, 14vw, 11rem)",
            letterSpacing: "-0.06em",
            color: "var(--foreground)",
            opacity: 0.08,
            userSelect: "none",
          }}
        >
          16M
        </div>
      </div>

      {/* Middle: lamp center | D-wheel right */}
      <div className="flex items-center justify-between w-full flex-1">

        {/* Left: minimal text */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 1.2s ease 0.2s",
          }}
        >
          <p
            className="font-sans lowercase font-bold"
            style={{
              fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
              letterSpacing: "-0.03em",
              color: "var(--foreground)",
              opacity: 0.5,
              maxWidth: 220,
              lineHeight: 1.4,
            }}
          >
            16 million colors.
            <br />
            <span style={{ opacity: 0.5 }}>Any mood. Any room.</span>
          </p>
        </div>

        {/* Center: lamp space */}
        <div className="flex-1" />

        {/* Right: D-wheel */}
        <div
          className="flex flex-col items-center gap-5"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "none" : "translateX(20px)",
            transition: "opacity 1s ease 0.3s, transform 1s ease 0.3s",
          }}
        >
          <div className="relative select-none" style={{ width: W, height: H }}>
            <svg width={W} height={H} className="absolute inset-0 pointer-events-none" style={{ overflow: "visible" }}>
              {/* Arc */}
              <path
                d={`M ${CX},${CY - R} A ${R},${R} 0 0,0 ${CX},${CY + R}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 8"
                style={{ color: "var(--foreground)", opacity: 0.12 }}
              />
              {/* Diameter line */}
              <line x1={CX} y1={CY - R - SR} x2={CX} y2={CY + R + SR}
                stroke="currentColor" strokeWidth="1"
                style={{ color: "var(--foreground)", opacity: 0.06 }}
              />
              {/* Spoke to active */}
              {RGB_COLORS.map((color, i) => {
                const pos = getSwatchPos(i, RGB_COLORS.length);
                const isActive = hoverColor === color || selectedColor === color ||
                  (!hoverColor && !selectedColor && color === currentColor);
                if (!isActive) return null;
                return (
                  <line key={color} x1={CX} y1={CY} x2={pos.x} y2={pos.y}
                    stroke={color} strokeWidth="1" opacity="0.4" strokeDasharray="3 4"
                  />
                );
              })}
            </svg>

            {/* Swatches */}
            {RGB_COLORS.map((color, i) => {
              const pos = getSwatchPos(i, RGB_COLORS.length);
              const isActive = hoverColor === color || selectedColor === color ||
                (!hoverColor && !selectedColor && color === currentColor);
              return (
                <button
                  key={color}
                  onMouseEnter={() => setHoverColor(color as string)}
                  onMouseLeave={() => setHoverColor(null)}
                  onClick={() => handleColorClick(color as string)}
                  className="absolute outline-none transition-all duration-500"
                  style={{
                    width: SR * 2, height: SR * 2,
                    left: pos.x - SR, top: pos.y - SR,
                    borderRadius: "50%",
                  }}
                  aria-label={COLOR_NAMES[color]}
                >
                  <span className="absolute inset-[-5px] rounded-full border transition-all duration-500"
                    style={{ borderColor: color, opacity: isActive ? 0.65 : 0, transform: isActive ? "scale(1)" : "scale(0.4)" }}
                  />
                  <span className="absolute inset-0 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: color,
                      boxShadow: isActive ? `0 0 28px 8px ${color}55` : "none",
                      transform: isActive ? "scale(1.25)" : "scale(0.75)",
                      filter: isActive ? "brightness(1.1)" : "brightness(0.45) saturate(0.5)",
                    }}
                  />
                </button>
              );
            })}

            {/* Center dot */}
            <div className="absolute rounded-full pointer-events-none"
              style={{ width: 4, height: 4, left: CX - 2, top: CY - 2, background: "var(--foreground)", opacity: 0.12 }}
            />
          </div>

          {/* Color name — clean, no hex */}
          <span
            className="font-black font-sans lowercase transition-all duration-700"
            style={{
              fontSize: "1rem",
              letterSpacing: "-0.02em",
              color: currentColor,
              textShadow: `0 0 16px ${currentColor}50`,
            }}
          >
            {COLOR_NAMES[currentColor] || currentColor}
          </span>
        </div>
      </div>

      {/* Bottom: simple line */}
      <div
        className="flex items-center justify-between pt-5 border-t"
        style={{
          borderColor: "rgba(var(--foreground-rgb,26,26,26),0.08)",
          opacity: mounted ? 1 : 0,
          transition: "opacity 1s ease 0.5s",
        }}
      >
        <span
          className="text-[10px] uppercase tracking-[0.3em]"
          style={{ color: "var(--foreground)", opacity: 0.25 }}
        >
          Select a color — it changes the lamp in real time
        </span>
        <span
          className="font-black font-sans transition-all duration-700"
          style={{ fontSize: "0.9rem", letterSpacing: "-0.02em", color: currentColor }}
        >
          {COLOR_NAMES[currentColor]}
        </span>
      </div>
    </div>
  );
}
