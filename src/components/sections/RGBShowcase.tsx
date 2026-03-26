"use client";

import { RGB_COLORS } from "@/lib/constants";
import { useState, useEffect } from "react";

import { Watermark } from "../ui/Watermark";

interface RGBShowcaseProps {
  readonly progress: number;
  readonly onManualColor?: (color: string | null) => void;
}

export function RGBShowcase({ progress, onManualColor }: RGBShowcaseProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [autoIndex, setAutoIndex] = useState(0);

  const isVisible = progress > 0.1 && progress < 0.95;

  // Auto-cycle effect
  useEffect(() => {
    if (!isVisible || selectedColor || hoverColor) return;
    const interval = setInterval(() => {
      setAutoIndex((prev) => (prev + 1) % RGB_COLORS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isVisible, selectedColor, hoverColor]);

  const scrollColorIndex = Math.min(
    Math.floor(progress * RGB_COLORS.length),
    RGB_COLORS.length - 1
  );
  
  // Use scroll color when scrolling, auto-cycle when stationary, or manual select
  const currentColor = hoverColor || selectedColor || (progress > 0 && progress < 1 ? RGB_COLORS[scrollColorIndex] : RGB_COLORS[autoIndex]);

  useEffect(() => {
    onManualColor?.(selectedColor || hoverColor || (isVisible ? currentColor : null));
  }, [selectedColor, hoverColor, isVisible, currentColor, onManualColor]);

  const handleColorClick = (color: string) => {
    setSelectedColor(selectedColor === color ? null : color);
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-between min-h-screen px-6 py-32 pointer-events-none overflow-hidden">
      <Watermark text="infinite tones" index={2} targetId="rgb" />

      {/* Narrative Boxes — Balanced Left/Right */}
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-8 mt-auto pb-12">
        <div 
          className="flex flex-col p-6 md:p-8 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] transition-all duration-1000 max-w-[280px]"
          style={{ opacity: isVisible ? 1 : 0, transform: `translateY(${isVisible ? '0' : '40px'})` }}
        >
          <h3 className="font-sans text-[10px] font-black text-foreground tracking-[0.4em] uppercase mb-4 opacity-30">
            chromatic depth
          </h3>
          <p className="font-display text-[11px] font-light text-foreground/70 leading-relaxed tracking-wider lowercase">
            16 million variants. from deep ruby to arctic blue. the matter responds to your mood.
          </p>
        </div>

        <div 
          className="flex flex-col p-6 md:p-8 bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-[2rem] transition-all duration-1000 delay-200 max-w-[280px]"
          style={{ opacity: isVisible ? 1 : 0, transform: `translateY(${isVisible ? '0' : '40px'})` }}
        >
          <h3 className="font-sans text-[10px] font-black text-foreground tracking-[0.4em] uppercase mb-4 opacity-30">
             organic cycles
          </h3>
          <p className="font-display text-[11px] font-light text-foreground/70 leading-relaxed tracking-wider lowercase">
             auto-fading gradients mimic passing time. slow, viscous shifts that feel as natural as bioluminescence.
          </p>
        </div>
      </div>

      {/* Pill Color Selector */}
      <div 
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 focus-within:opacity-100"
        }`}
      >
        <div className="glass-card rounded-full px-8 py-5 flex items-center gap-8 shadow-2xl scale-90 md:scale-100">
          <div className="flex items-center gap-6 md:gap-8">
            {RGB_COLORS.map((color, i) => {
              const isActive = (selectedColor === color) || (hoverColor === color) || (!selectedColor && !hoverColor && color === currentColor);
              
              return (
                <button
                  key={color}
                  onMouseEnter={() => setHoverColor(color as string)}
                  onMouseLeave={() => setHoverColor(null)}
                  onClick={() => handleColorClick(color as string)}
                  className="group relative flex items-center justify-center w-6 h-6 md:w-8 md:h-8 transition-all duration-700 outline-none"
                >
                  <div 
                    className={`absolute inset-[-12px] rounded-full border-2 transition-all duration-700 ease-out ${isActive ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}
                    style={{ borderColor: color }}
                  />
                  <div
                    className="w-full h-full rounded-full transition-all duration-700 shadow-xl"
                    style={{
                       backgroundColor: color,
                       boxShadow: isActive ? `0 0 35px ${color}` : "none",
                       filter: isActive ? "brightness(1.2)" : "brightness(0.5)",
                       transform: isActive ? "scale(1.2)" : "scale(1)",
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
