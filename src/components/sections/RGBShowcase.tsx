"use client";

import { RGB_COLORS } from "@/lib/constants";

interface RGBShowcaseProps {
  readonly progress: number;
}

export function RGBShowcase({ progress }: RGBShowcaseProps) {
  const colorIndex = Math.min(
    Math.floor(progress * RGB_COLORS.length),
    RGB_COLORS.length - 1
  );
  const currentColor = RGB_COLORS[colorIndex];

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="watermark-text text-center">
          Your Light
        </span>
      </div>

      <div className="text-center max-w-lg relative">
        <p className="font-display text-xs font-light tracking-[0.3em] uppercase text-accent mb-3">
          16 million shades
        </p>
        <h2 className="font-sans text-4xl md:text-5xl font-bold text-foreground mb-6">
          Every Color,<br />One Form
        </h2>

        <div className="flex items-center justify-center gap-4 mb-6">
          {RGB_COLORS.map((color, i) => (
            <div
              key={color}
              className="w-3 h-3 rounded-full transition-all duration-500"
              style={{
                backgroundColor: color,
                transform: i === colorIndex ? "scale(2)" : "scale(1)",
                opacity: i === colorIndex ? 1 : 0.25,
                boxShadow: i === colorIndex ? `0 0 24px ${color}` : "none",
              }}
            />
          ))}
        </div>

        <p
          className="font-display text-xs font-light tracking-[0.3em] uppercase transition-colors duration-500"
          style={{ color: currentColor }}
        >
          {["Red", "Blue", "Green", "Purple", "Gold"][colorIndex]}
        </p>
      </div>
    </div>
  );
}
