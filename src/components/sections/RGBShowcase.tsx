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

const COLOR_DESCS: Record<string, string> = {
  "#ef4444": "Bold, energizing. Perfect for a creative studio or late-night workspace.",
  "#3b82f6": "Calm, focused. Ideal for deep work sessions and meditation corners.",
  "#22c55e": "Fresh, organic. Brings nature's energy into any living space.",
  "#a855f7": "Mysterious, luxurious. Elevates an art gallery or lounge.",
  "#c9a84c": "Warm, timeless. The original grvty glow — gold meets gravity.",
};

// D-shape geometry: flat edge on RIGHT, arc opens to the LEFT
const R = 108;          // arc radius
const SR = 21;          // swatch radius
const PAD = 14;
const W = R + SR * 2 + PAD * 2;       // total width
const H = R * 2 + SR * 2 + PAD * 2;  // total height
const CX = W - SR - PAD;             // circle center X (right side)
const CY = H / 2;                    // circle center Y (vertical middle)

// angle_i: π/2 (bottom) → 3π/2 (top) going counterclockwise through the left
function getSwatchPos(index: number, total: number) {
  const angle = Math.PI / 2 + (index / (total - 1)) * Math.PI;
  return {
    x: CX + Math.cos(angle) * R,
    y: CY + Math.sin(angle) * R,
  };
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
    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % RGB_COLORS.length);
    }, 3500);
    return () => clearInterval(interval);
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
      className="relative z-20 w-full min-h-screen flex flex-col justify-between px-10 md:px-16 py-20"
    >
      {/* Top: label + headline */}
      <div
        className="transition-all duration-1000 ease-out"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(24px)",
        }}
      >
        <span
          className="text-[10px] font-black uppercase tracking-[0.45em] mb-5 block"
          style={{ color: "var(--foreground)", opacity: 0.3 }}
        >
          02 — Chromatic Spectrum
        </span>
        <h2
          className="font-sans font-black leading-[1.0] lowercase"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 4rem)",
            letterSpacing: "-0.04em",
            color: "var(--foreground)",
          }}
        >
          16 million ways
          <br />
          <span style={{ opacity: 0.3 }}>to feel the light</span>
        </h2>
      </div>

      {/* Middle: left narrative | lamp center | right D-wheel */}
      <div className="flex items-center gap-0 w-full flex-1 my-12">

        {/* Left: narrative cards */}
        <div
          className="w-[28%] flex flex-col gap-6 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(-20px)",
          }}
        >
          <div className="glass-info rounded-[1.75rem] p-7">
            <h3
              className="text-[10px] font-black uppercase tracking-[0.35em] mb-3"
              style={{ color: "var(--foreground)", opacity: 0.4 }}
            >
              chromatic depth
            </h3>
            <p className="text-[12px] leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.5 }}>
              16 million variants. From deep ruby to arctic blue — the lamp responds to your mood, your music, your moment.
            </p>
          </div>

          <div className="glass-info rounded-[1.75rem] p-7">
            <h3
              className="text-[10px] font-black uppercase tracking-[0.35em] mb-3"
              style={{ color: "var(--foreground)", opacity: 0.4 }}
            >
              organic cycles
            </h3>
            <p className="text-[12px] leading-relaxed" style={{ color: "var(--foreground)", opacity: 0.5 }}>
              Auto-fading gradients mimic passing time. Slow, viscous shifts that feel as natural as dusk.
            </p>
          </div>
        </div>

        {/* Center: lamp space */}
        <div className="flex-1" />

        {/* Right: D-shape color wheel */}
        <div
          className="flex flex-col items-center gap-5 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(24px)",
          }}
        >
          {/* D-wheel canvas */}
          <div className="relative select-none" style={{ width: W, height: H }}>

            {/* SVG: arc + diameter + spoke */}
            <svg
              width={W}
              height={H}
              className="absolute inset-0 pointer-events-none"
              style={{ overflow: "visible" }}
            >
              {/* Left arc (the D-curve) */}
              <path
                d={`M ${CX},${CY - R} A ${R},${R} 0 0,0 ${CX},${CY + R}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="3 9"
                style={{ color: "var(--foreground)", opacity: 0.14 }}
              />
              {/* Diameter line (flat right edge) */}
              <line
                x1={CX} y1={CY - R - SR}
                x2={CX} y2={CY + R + SR}
                stroke="currentColor"
                strokeWidth="1"
                style={{ color: "var(--foreground)", opacity: 0.08 }}
              />
              {/* Spoke: center → active swatch */}
              {RGB_COLORS.map((color, i) => {
                const pos = getSwatchPos(i, RGB_COLORS.length);
                const isActive =
                  hoverColor === color ||
                  selectedColor === color ||
                  (!hoverColor && !selectedColor && color === currentColor);
                if (!isActive) return null;
                return (
                  <line
                    key={color}
                    x1={CX} y1={CY}
                    x2={pos.x} y2={pos.y}
                    stroke={color}
                    strokeWidth="1.5"
                    opacity="0.35"
                    strokeDasharray="4 4"
                  />
                );
              })}
            </svg>

            {/* Swatches along the arc */}
            {RGB_COLORS.map((color, i) => {
              const pos = getSwatchPos(i, RGB_COLORS.length);
              const isActive =
                hoverColor === color ||
                selectedColor === color ||
                (!hoverColor && !selectedColor && color === currentColor);

              return (
                <button
                  key={color}
                  onMouseEnter={() => setHoverColor(color as string)}
                  onMouseLeave={() => setHoverColor(null)}
                  onClick={() => handleColorClick(color as string)}
                  className="absolute outline-none transition-all duration-500"
                  style={{
                    width: SR * 2,
                    height: SR * 2,
                    left: pos.x - SR,
                    top: pos.y - SR,
                    borderRadius: "50%",
                  }}
                  aria-label={COLOR_NAMES[color]}
                >
                  {/* Ring */}
                  <span
                    className="absolute inset-[-5px] rounded-full border transition-all duration-500"
                    style={{
                      borderColor: color,
                      opacity: isActive ? 0.75 : 0,
                      transform: isActive ? "scale(1)" : "scale(0.5)",
                    }}
                  />
                  {/* Fill */}
                  <span
                    className="absolute inset-0 rounded-full transition-all duration-500"
                    style={{
                      backgroundColor: color,
                      boxShadow: isActive ? `0 0 26px 6px ${color}60` : "none",
                      transform: isActive ? "scale(1.2)" : "scale(0.8)",
                      filter: isActive ? "brightness(1.1)" : "brightness(0.5) saturate(0.6)",
                    }}
                  />
                </button>
              );
            })}

            {/* Center dot */}
            <div
              className="absolute rounded-full pointer-events-none"
              style={{
                width: 5,
                height: 5,
                left: CX - 2.5,
                top: CY - 2.5,
                background: "var(--foreground)",
                opacity: 0.15,
              }}
            />
          </div>

          {/* Color label below wheel */}
          <div className="flex flex-col items-center gap-1">
            <span
              className="font-black font-sans transition-all duration-700"
              style={{
                fontSize: "1.1rem",
                letterSpacing: "-0.03em",
                color: currentColor,
                textShadow: `0 0 18px ${currentColor}55`,
              }}
            >
              {COLOR_NAMES[currentColor] || currentColor}
            </span>
            <span
              className="text-[9px] font-mono uppercase tracking-wider"
              style={{ color: "var(--foreground)", opacity: 0.28 }}
            >
              {currentColor}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom: info bar */}
      <div
        className="flex items-end justify-between pt-6 border-t transition-all duration-700 ease-out"
        style={{
          borderColor: "rgba(var(--foreground-rgb,26,26,26),0.1)",
          opacity: mounted ? 1 : 0,
        }}
      >
        <div className="flex flex-col gap-1">
          <span
            className="text-[9px] uppercase tracking-[0.35em] font-medium"
            style={{ color: "var(--foreground)", opacity: 0.28 }}
          >
            Currently active
          </span>
          <span
            className="font-black font-sans transition-all duration-700"
            style={{
              fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
              color: currentColor,
              letterSpacing: "-0.03em",
              textShadow: `0 0 24px ${currentColor}60`,
            }}
          >
            {COLOR_NAMES[currentColor] || currentColor}
          </span>
        </div>

        <p
          className="text-[11px] leading-relaxed text-right max-w-[220px]"
          style={{ color: "var(--foreground)", opacity: 0.35 }}
        >
          {COLOR_DESCS[currentColor] || "Adjust the mood effortlessly."}
        </p>
      </div>
    </div>
  );
}
