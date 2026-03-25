"use client";

import { useEffect, useRef, useState } from "react";
import { LightSelector } from "./LightSelector";

interface SpecItemProps {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly delay?: number;
}

function SpecItem({ number, title, description, delay = 0 }: SpecItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), delay);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`flex items-start gap-5 transition-all duration-700 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <span className="font-display text-xs text-accent tracking-wider flex-shrink-0 mt-1">
        {number}
      </span>
      <div className="w-px h-full min-h-[3rem] bg-accent/40 flex-shrink-0" />
      <div>
        <h3 className="font-sans text-sm font-semibold text-foreground">{title}</h3>
        <p className="mt-0.5 font-display text-xs font-light text-foreground/45 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export function DetailsSection() {
  return (
    <div className="relative z-10 px-6 md:px-16 py-20">
      {/* Watermark */}
      <div className="absolute top-8 left-0 right-0 flex items-center justify-center pointer-events-none">
        <span className="watermark-text text-center leading-[0.9]">
          Raw Matter
        </span>
      </div>

      <div className="relative min-h-[80vh] flex flex-col justify-end">
        <div className="flex flex-col md:flex-row justify-between items-end gap-12">
          {/* Left — numbered specs */}
          <div className="flex flex-col gap-6 md:max-w-sm">
            <SpecItem
              number="01"
              title="3D Printed Form"
              description="Layer by layer precision. Each surface shaped with intent, born from additive manufacturing."
              delay={0}
            />
            <SpecItem
              number="02"
              title="Pyramidal Geometry"
              description="Softened edges, deliberate weight. A rounded pyramid that commands presence on any surface."
              delay={150}
            />
            <SpecItem
              number="03"
              title="Material Honesty"
              description="Raw texture meets refined finish. Lightweight yet substantial — you feel the gravity."
              delay={300}
            />
          </div>

          {/* Right — subtitle + light selector + description */}
          <div className="flex flex-col gap-6 md:max-w-xs items-end text-right">
            <div>
              <p className="font-display text-xs font-light tracking-[0.3em] uppercase text-accent mb-2">
                Considered form
              </p>
              <h2 className="font-sans text-3xl md:text-4xl font-bold text-foreground leading-tight">
                Light as<br />an object
              </h2>
            </div>
            <LightSelector />
            <p className="font-display text-xs font-light text-foreground/45 max-w-xs leading-relaxed">
              Warm ambience or focused brightness. Adjust the atmosphere effortlessly. 16 million colors inside a form that feels inevitable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
