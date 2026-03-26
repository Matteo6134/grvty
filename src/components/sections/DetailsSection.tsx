"use client";

import { useEffect, useRef, useState } from "react";
import { Watermark } from "../ui/Watermark";
import { LightSelector } from "./LightSelector";

interface SpecItemProps {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly delay?: number;
}

function SpecItem({ title, description, delay = 0 }: SpecItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), delay);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col p-6 bg-white/[0.02] backdrop-blur-3xl rounded-[1.5rem] border border-white/5 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/[0.05] hover:-translate-y-1 w-full max-w-[280px] ${
        visible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
      }`}
    >
      <h3 className="font-sans text-xs font-black text-foreground tracking-[0.2em] uppercase mb-2 opacity-60">
        {title}
      </h3>
      <p className="font-display text-[11px] font-light text-foreground/70 leading-relaxed tracking-wider lowercase">
        {description}
      </p>
    </div>
  );
}

export function DetailsSection() {
  return (
    <div className="relative z-10 px-8 md:px-12 py-20 min-h-[150vh] flex flex-col items-center">
      <Watermark text="specifications" index={1} targetId="details" />

      {/* Primary Design Idea — Positioned at the Top Center to clear the object */}
      <div className="relative mt-12 mb-24 text-center max-w-4xl mx-auto px-4">
        <h2 className="font-sans text-5xl md:text-7xl font-black text-foreground leading-[1] tracking-tighter lowercase italic opacity-80 mix-blend-difference select-none">
          pyramids looks cool<br />so why not make a<br />lamp out of it?
        </h2>
      </div>

      {/* Symmetrical Lateral Layout — Leaves the center clear for the object */}
      <div className="flex-1 w-full max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between items-center md:items-stretch gap-12 md:gap-0 pb-24">
        
        {/* Left Flank — Technical Specs */}
        <div className="flex flex-col justify-start gap-12 w-full md:w-auto">
          <SpecItem
            number="01"
            title="additive precisely"
            description="layer by layer geometric precision. each surface shaped with additive intent for absolute clarity."
            delay={0}
          />
          <SpecItem
            number="02"
            title="balanced gravity"
            description="softened edges meet deliberate weight. a rounded pyramid form that commands its space."
            delay={150}
          />
        </div>

        {/* Center Buffer — Clear for the fixed 3D Object */}
        <div className="hidden md:block flex-1 pointer-events-none" />

        {/* Right Flank — Material & Philosophy */}
        <div className="flex flex-col justify-end gap-12 w-full md:w-auto items-end">
          <SpecItem
            number="03"
            title="matter honesty"
            description="raw texture meets refined post-processing. substantial yet lightweight — tactile gravity."
            delay={300}
          />
          
          <div className="group relative flex flex-col p-6 md:p-8 bg-white/[0.02] backdrop-blur-3xl rounded-[2rem] border border-white/5 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-white/[0.05] max-w-[280px] text-right">
             <p className="font-display text-[11px] font-light text-foreground/60 leading-relaxed tracking-wider lowercase">
                considered form is inevitability. 16m colors contained within a structure that simply belongs across every space and timeframe.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
}
