"use client";

import { useRef, useState } from "react";
import { RGB_COLORS } from "@/lib/constants";

export function RGBShowcase({
  progress,
  onManualColor,
}: {
  readonly progress: number;
  readonly onManualColor: (color: string) => void;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeColorIdx, setActiveColorIdx] = useState<number | null>(null);

  // Derive scroll-based active color when not manually interacting
  const autoColorIndex = Math.min(
    Math.floor(progress * RGB_COLORS.length),
    RGB_COLORS.length - 1
  );

  const displayColorIdx = activeColorIdx !== null ? activeColorIdx : autoColorIndex;
  const currentHex = RGB_COLORS[Math.max(0, displayColorIdx)];

  return (
    <div
      ref={sectionRef}
      className="relative z-20 w-full min-h-screen flex flex-col justify-between px-6 pt-32 pb-12 md:px-16 md:pt-36 md:pb-24 overflow-hidden"
    >
      {/* Main interactive area */}
      <div className="flex-1 flex flex-col items-start justify-end md:justify-center w-full mt-10 pointer-events-none pb-12 md:pb-0 z-20">
        
        {/* Typography Block */}
        <div className="w-full max-w-lg flex flex-col">
          <h2
            className="font-black leading-[0.9] text-[clamp(2.5rem,7vw,5rem)] tracking-tighter lowercase"
            style={{ color: "var(--foreground)" }}
          >
            Chroma output.
          </h2>
          <p
            className="mt-6 font-sans text-[13px] md:text-sm leading-[1.7] max-w-md"
            style={{ color: "var(--foreground)", opacity: 0.6 }}
          >
            The internal high-density LED matrix projects flawless, blended frequencies directly through the raw 3D printed diffusion layer. Tap to alter the core emission.
          </p>
          
          <div className="mt-8 font-sans text-[10px] tracking-[0.2em] uppercase font-bold" style={{ color: currentHex, transition: "color 0.4s ease", opacity: 0.9 }}>
            Sys Target: {currentHex}
          </div>
        </div>
      </div>

      {/* Technical Color Selector Panel */}
      <div className="w-full relative pointer-events-auto z-30 mt-auto flex flex-col border-t border-[var(--foreground)]/10 pt-6">
        <span className="font-sans font-bold text-[9px] tracking-[0.2em] uppercase mb-4" style={{ color: "var(--foreground)", opacity: 0.5 }}>
          Spectrum Matrix ──
        </span>
        
        <div className="flex w-full gap-2 md:gap-4 overflow-x-auto pb-4 hide-scrollbar select-none">
          {RGB_COLORS.map((color, idx) => {
            const isActive = displayColorIdx === idx;
            return (
              <button
                key={color}
                onMouseEnter={() => {
                  setActiveColorIdx(idx);
                  onManualColor(color);
                }}
                onMouseLeave={() => {
                  setActiveColorIdx(null);
                  onManualColor(""); // fallback to scroll
                }}
                onClick={() => {
                  setActiveColorIdx(idx);
                  onManualColor(color);
                }}
                className="group flex-1 min-w-[50px] md:min-w-0 flex flex-col items-center gap-3 transition-all duration-300"
                aria-label={`Select color ${color}`}
              >
                {/* Visual Bar */}
                <div
                  className="w-full relative rounded-sm backdrop-blur-3xl transition-all duration-500 overflow-hidden"
                  style={{
                    height: isActive ? 60 : 30,
                    background: isActive ? `${color}80` : "rgba(100, 100, 100, 0.05)",
                    border: `1px solid ${isActive ? color : "rgba(150, 150, 150, 0.2)"}`,
                    boxShadow: isActive ? `0 0 30px ${color}60` : "none",
                  }}
                >
                  <div
                    className="absolute bottom-0 left-0 w-full transition-all duration-500"
                    style={{
                      height: isActive ? "100%" : "2%",
                      background: color,
                      opacity: isActive ? 0.9 : 0.3
                    }}
                  />
                </div>
                
                {/* Wavelength Indicator */}
                <span
                  className="font-sans text-[9px] tracking-widest uppercase transition-all duration-300 font-bold"
                  style={{ 
                    opacity: isActive ? 0.9 : 0.3,
                    color: isActive ? color : "var(--foreground)",
                  }}
                >
                  {isActive ? "Locked" : `0${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
