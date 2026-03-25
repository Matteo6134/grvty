"use client";

interface HeroTextProps {
  readonly opacity: number;
}

export function HeroText({ opacity }: HeroTextProps) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
      style={{ opacity }}
    >
      {/* Watermark background text */}
      <div className="absolute inset-0 flex items-end justify-center overflow-hidden pb-8">
        <span className="watermark-text text-center whitespace-nowrap">
          raw matter
        </span>
      </div>

      {/* Main title */}
      <p className="font-display text-xs font-light tracking-[0.4em] uppercase text-accent mb-5">
        Objects with gravity
      </p>
      <h1 className="font-sans text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.9]">
        Considered
      </h1>
      <h1 className="font-sans text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[0.9]">
        Form
      </h1>
    </div>
  );
}
