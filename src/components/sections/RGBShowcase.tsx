"use client";

import { RGB_COLORS } from "@/lib/constants";
import { useState, useEffect } from "react";

interface RGBShowcaseProps {
  readonly progress: number;
  readonly onManualColor?: (color: string | null) => void;
}

export function RGBShowcase({ progress, onManualColor }: RGBShowcaseProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [hoverColor, setHoverColor] = useState<string | null>(null);

  const isVisible = progress > 0.1 && progress < 0.95;
  const contentOpacity = isVisible ? 1 : 0;

  const scrollColorIndex = Math.min(
    Math.floor(progress * RGB_COLORS.length),
    RGB_COLORS.length - 1
  );
  
  const currentColor = hoverColor || selectedColor || RGB_COLORS[scrollColorIndex];

  useEffect(() => {
    onManualColor?.(selectedColor || hoverColor);
  }, [selectedColor, hoverColor, onManualColor]);

  const handleColorClick = (color: string) => {
    setSelectedColor(selectedColor === color ? null : color);
  };

  return (
    <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6 pointer-events-none">
      
      {/* Background Watermark */}
      <div 
        className="absolute inset-0 flex items-end justify-center pointer-events-none overflow-hidden pb-8 transition-opacity duration-1000"
        style={{ opacity: contentOpacity }}
      >
        <span className="watermark-text text-center whitespace-nowrap">
           chroma physics
        </span>
      </div>

      {/* Main Titles */}
      <div 
        className="text-center z-10 transition-all duration-1000"
        style={{ opacity: contentOpacity, transform: `translateY(${isVisible ? '0' : '20px'})` }}
      >
        <p className="font-display text-xs font-light tracking-[0.5em] uppercase text-accent mb-6">
          Atmospheric moods
        </p>
        <h1 className="font-sans text-5xl md:text-8xl font-black text-foreground mb-8 tracking-tighter leading-none lowercase italic opacity-20">
            Infinite<br />Tones
        </h1>
      </div>

      {/* Selettore Colori - iOS 26 Glassmorphism Pill */}
      <div 
        className={`fixed bottom-12 left-1/2 -translate-x-1/2 pointer-events-auto transition-all duration-1000 ease-in-out ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="glass-card rounded-full px-8 py-5 flex items-center gap-8">
          <div className="hidden md:block">
            <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 whitespace-nowrap">
                Select mood
            </span>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            {RGB_COLORS.map((color, i) => {
              const isActive = (selectedColor === color) || (hoverColor === color) || (!selectedColor && !hoverColor && i === scrollColorIndex);
              
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
                      filter: isActive ? "brightness(1.15)" : "brightness(0.35)",
                      transform: isActive ? "scale(1.15)" : "scale(1)",
                    }}
                  />
                  {/* Label fluttuante stile iOS */}
                  {(hoverColor === color || selectedColor === color) && (
                    <div className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none transition-all duration-500 ease-out active:scale-90">
                        <div className="glass-card px-3 py-1.5 rounded-full flex items-center justify-center">
                            <span className="text-[9px] font-bold tracking-widest uppercase text-accent">
                                {color === "#ef4444" && "Ruby"}
                                {color === "#3b82f6" && "Night"}
                                {color === "#22c55e" && "Green"}
                                {color === "#a855f7" && "Deep"}
                                {color === "#c9a84c" && "Gold"}
                            </span>
                        </div>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
