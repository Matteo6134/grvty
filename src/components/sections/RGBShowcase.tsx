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

      {/* Middle: left narrative | lamp center | right color picker */}
      <div className="flex items-center gap-0 w-full flex-1 my-12">

        {/* Left: color description */}
        <div
          className="w-[30%] flex flex-col gap-6 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(-20px)",
          }}
        >
          <div
            className="glass-info rounded-[1.75rem] p-7 transition-all duration-700"
          >
            <h3
              className="text-[10px] font-black uppercase tracking-[0.35em] mb-3"
              style={{ color: "var(--foreground)", opacity: 0.4 }}
            >
              chromatic depth
            </h3>
            <p
              className="text-[12px] leading-relaxed"
              style={{ color: "var(--foreground)", opacity: 0.5 }}
            >
              16 million variants. From deep ruby to arctic blue — the lamp responds to your mood, your music, your moment.
            </p>
          </div>

          <div
            className="glass-info rounded-[1.75rem] p-7"
          >
            <h3
              className="text-[10px] font-black uppercase tracking-[0.35em] mb-3"
              style={{ color: "var(--foreground)", opacity: 0.4 }}
            >
              organic cycles
            </h3>
            <p
              className="text-[12px] leading-relaxed"
              style={{ color: "var(--foreground)", opacity: 0.5 }}
            >
              Auto-fading gradients mimic passing time. Slow, viscous shifts that feel as natural as dusk.
            </p>
          </div>
        </div>

        {/* Center: lamp space */}
        <div className="flex-1" />

        {/* Right: vertical color picker + current color info */}
        <div
          className="w-[26%] flex flex-col items-end gap-6 transition-all duration-700 ease-out"
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateX(0)" : "translateX(20px)",
          }}
        >
          {/* Color swatches — vertical */}
          <div className="glass-info rounded-[1.75rem] p-5 flex flex-col gap-4 w-full">
            {RGB_COLORS.map((color) => {
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
                  className="flex items-center gap-4 w-full group transition-all duration-300"
                >
                  <div
                    className="relative w-8 h-8 rounded-full shrink-0 transition-all duration-500"
                    style={{
                      backgroundColor: color,
                      boxShadow: isActive ? `0 0 20px ${color}80` : "none",
                      transform: isActive ? "scale(1.25)" : "scale(1)",
                    }}
                  >
                    {isActive && (
                      <div
                        className="absolute inset-[-3px] rounded-full border-2 transition-all duration-500"
                        style={{ borderColor: color }}
                      />
                    )}
                  </div>
                  <div className="flex flex-col items-start min-w-0">
                    <span
                      className="text-[11px] font-black font-sans transition-all duration-300"
                      style={{
                        color: "var(--foreground)",
                        opacity: isActive ? 0.8 : 0.35,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {COLOR_NAMES[color] || color}
                    </span>
                    <span
                      className="text-[9px] font-mono uppercase tracking-wider transition-all duration-300"
                      style={{ color: "var(--foreground)", opacity: isActive ? 0.4 : 0.15 }}
                    >
                      {color}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom: current color info bar */}
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
              fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
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
