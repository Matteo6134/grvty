"use client";

import { useRef, useState } from "react";
import { RGB_COLORS } from "@/lib/constants";

export function RGBShowcase({
  onManualColor,
}: {
  readonly progress?: number;
  readonly onManualColor: (color: string) => void;
}) {
  const handleRandomize = () => {
    // Generate a beautiful, vibrant random hue
    const hue = Math.floor(Math.random() * 360);
    // Convert HSL(hue, 90%, 65%) to Hex for ThreeJS color compatibility
    const s = 0.9;
    const l = 0.65;
    const a = s * Math.min(l, 1 - l);
    const f = (n: number) => {
      const k = (n + hue / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    const randomHex = `#${f(0)}${f(8)}${f(4)}`;
    
    onManualColor(randomHex);
  };

  return (
    <div className="relative z-20 w-full min-h-screen flex items-center px-6 pt-32 pb-12 md:px-16 md:pt-36 md:pb-20 pointer-events-none overflow-hidden">
      
      {/* Left: Space for 3D Lamp */}
      <div className="hidden md:block flex-1" />

      {/* Right: Interaction Panel */}
      <div className="w-full md:w-[45%] flex flex-col items-center md:items-start text-center md:text-left pointer-events-auto">
        
        <h3 className="font-black text-3xl md:text-4xl tracking-tighter lowercase text-foreground">
          limitless combinations.
        </h3>
        
        <p className="mt-6 font-sans text-sm md:text-base outline-none text-foreground/60 leading-relaxed max-w-sm">
          Press the button to generate an endless spectrum of atmospheres. The internal 3D printed diffusion layer seamlessly blends the frequencies.
        </p>

        {/* Randomize Button */}
        <button
          onClick={handleRandomize}
          className="mt-10 group relative px-8 py-4 rounded-full overflow-hidden backdrop-blur-3xl border border-white/20 transition-all duration-500 hover:border-white/50 active:scale-95"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20" />
          <span className="relative font-bold font-sans tracking-widest uppercase text-xs text-foreground">
            Randomize Hue
          </span>
        </button>
        
      </div>
    </div>
  );
}
