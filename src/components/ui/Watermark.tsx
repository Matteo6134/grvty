"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WatermarkProps {
  readonly text: string;
  readonly index: number;
  readonly targetId: string;
  readonly isStatic?: boolean;
}

export function Watermark({ text, index, targetId, isStatic = false }: WatermarkProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      if (!containerRef.current || !textRef.current) return;

      // START DIRECTLY AT CORNER STACK POSITION
      const stackTop = `${8 + index * 2.2}rem`;
      const stackLeft = "4rem";

      gsap.set(textRef.current, {
        position: "fixed",
        top: stackTop,
        left: stackLeft,
        x: -20, // Small slide-in from left
        opacity: 0,
        fontSize: "0.85rem",
        pointerEvents: "none",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: isStatic ? "top 50%" : "top 85%", 
          end: isStatic ? "bottom 20%" : "bottom 20%",
          scrub: true,
          toggleActions: "play none none reverse",
        }
      });

      // Simple Fade and Slide In at the Corner
      tl.to(textRef.current, {
        opacity: 1, // Full opacity for extreme sharpness
        x: 0,
        pointerEvents: "auto",
        duration: 0.4,
        ease: "power2.out",
      });

      // Special handling for Hero (Static) — Fade out at end of section
      if (isStatic) {
         tl.to(textRef.current, {
            opacity: 0,
            duration: 0.2,
         }, "+=0.2");
      }

    }, containerRef);

    return () => ctx.revert();
  }, [index, text, isStatic]);

  const handleClick = () => {
    const el = document.getElementById(targetId);
    if (el) {
      // Offset slightly for better visibility
      const top = el.getBoundingClientRect().top + window.pageYOffset - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} className="absolute inset-0 pointer-events-none z-[100] h-screen px-8 md:px-12">
      <span 
        ref={textRef} 
        onClick={handleClick}
        className="watermark-text whitespace-nowrap fixed cursor-pointer hover:!opacity-60 transition-all duration-300 font-sans tracking-tight lowercase text-xs md:text-sm text-foreground font-black"
      >
        {text}
      </span>
    </div>
  );
}
