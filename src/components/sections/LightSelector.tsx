"use client";

import { useState } from "react";

const LIGHT_MODES = [
  { label: "Warm", temp: "2700K", color: "#ffb347" },
  { label: "Neutral", temp: "4000K", color: "#ffe4b5" },
  { label: "Cool", temp: "5500K", color: "#e8f0ff" },
  { label: "RGB", temp: "16M", color: "#c9a84c" },
] as const;

interface LightSelectorProps {
  readonly onColorChange?: (color: string) => void;
}

export function LightSelector({ onColorChange }: LightSelectorProps) {
  const [selected, setSelected] = useState(0);

  const handleSelect = (index: number) => {
    setSelected(index);
    onColorChange?.(LIGHT_MODES[index].color);
  };

  return (
    <div className="border border-foreground/10 rounded-xl p-5 max-w-[200px] bg-background/50 backdrop-blur-sm">
      <div className="flex items-baseline gap-1 mb-1">
        <span className="font-sans text-2xl font-bold text-foreground">
          {LIGHT_MODES[selected].temp}
        </span>
      </div>
      <div className="flex items-center gap-1 mb-4">
        <span className="text-foreground/30 text-sm">+</span>
        <span className="font-sans text-sm text-foreground/50">
          {LIGHT_MODES[selected].label}
        </span>
      </div>

      {/* Color dots */}
      <div className="flex items-center gap-3">
        {LIGHT_MODES.map((mode, i) => (
          <button
            key={mode.label}
            onClick={() => handleSelect(i)}
            className={`w-4 h-4 rounded-full transition-all duration-300 ${
              i === selected ? "ring-2 ring-offset-2 ring-accent scale-110" : "opacity-50 hover:opacity-80"
            }`}
            style={{
              backgroundColor: mode.color,
              ringOffsetColor: "var(--background)",
            } as React.CSSProperties}
            aria-label={`${mode.label} light`}
          />
        ))}
      </div>
    </div>
  );
}
