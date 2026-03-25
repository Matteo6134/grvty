"use client";

import { useEffect, useRef, useState } from "react";

interface DetailCardProps {
  readonly number: string;
  readonly title: string;
  readonly description: string;
  readonly side: "left" | "right";
  readonly delay?: number;
}

export function DetailCard({ number, title, description, side, delay = 0 }: DetailCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`flex items-start gap-5 max-w-md transition-all duration-700 ease-out ${
        side === "left" ? "self-start" : "self-end"
      } ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {/* Number + vertical line */}
      <div className="flex flex-col items-center gap-2 flex-shrink-0">
        <span className="font-mono text-xs text-accent tracking-wider">{number}</span>
        <div className="w-px h-12 bg-accent/30" />
      </div>

      {/* Content */}
      <div>
        <h3 className="font-sans text-base font-semibold text-foreground">{title}</h3>
        <p className="mt-1 font-sans text-sm text-foreground/50 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
