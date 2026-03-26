"use client";

import { Watermark } from "../ui/Watermark";

interface HeroTextProps {
  readonly opacity: number;
}

export function HeroText({ opacity }: HeroTextProps) {
  return (
    <div
      className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none px-6"
      style={{ opacity }}
    >
      <Watermark text="raw matter" index={0} targetId="hero" isStatic={true} />

      <div className="relative flex items-center justify-center w-full h-full max-w-5xl mx-auto">
        {/* Curved 'grvty' text hugging the object from behind — Less curved, middle positioned */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10 mt-[-2%] overflow-visible">
            <svg viewBox="0 0 1000 1000" className="w-[180%] h-[180%] md:w-[140%] md:h-[140%] animate-in fade-in duration-1000 overflow-visible">
                {/* Flatter arc: Move from P1 to P2 with a control point for subtle curvature */}
                <path 
                    id="curve" 
                    fill="transparent" 
                    d="M 100,520 Q 500,420 900,520" 
                />
                <text className="font-sans font-black text-[140px] uppercase tracking-[-0.05em] fill-foreground hover:fill-foreground/80 transition-colors duration-500 overflow-visible">
                    <textPath startOffset="50%" textAnchor="middle" href="#curve">
                        grvty
                    </textPath>
                </text>
            </svg>
        </div>

        {/* Hero Bottom Detail */}
        <div className="absolute top-[68%] flex flex-col items-center justify-center text-center">
            <p className="font-display text-[10px] md:text-xs font-light tracking-[0.6em] uppercase text-foreground/40 animate-in slide-in-from-bottom-4 duration-1000 delay-300">
                Considered Form
            </p>
        </div>
      </div>
    </div>
  );
}
