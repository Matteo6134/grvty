"use client";

import { useState, useEffect } from "react";

interface ScrollState {
  readonly progress: number;
  readonly lampY: number;
  readonly lampX: number;
  readonly lightIntensity: number;
  readonly gradientOpacity: number;
  readonly rgbProgress: number;
  readonly phase: "hero" | "levitation" | "details" | "photos" | "rgb_intro" | "rgb" | "cta";
  readonly hidden: boolean;
}

export function useScrollTimeline(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    lampY: 0,
    lampX: 0,
    lightIntensity: 0,
    gradientOpacity: 0,
    rgbProgress: 0,
    phase: "hero",
    hidden: false,
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

      let lampY = 0;
      let lampX = 0;
      let lightIntensity = 0;
      let gradientOpacity = 0;
      let rgbProgress = 0;
      let hidden = false;
      let phase: ScrollState["phase"] = "hero";

      if (progress < 0.15) {
        phase = "hero";
        lampY = 0;
        lampX = 0;
        gradientOpacity = 0;
        lightIntensity = 0;
      } else if (progress < 0.35) {
        phase = "levitation";
        const t = (progress - 0.15) / 0.20;
        lampY = t * 0.2;
        lampX = 0;
        gradientOpacity = 0;
        lightIntensity = Math.pow(Math.max(0, (t - 0.15) * 1.18), 1.8) * 0.5;
      } else if (progress < 0.55) {
        phase = "details";
        lampY = 0.2;
        lampX = 0; // Re-centered to perfectly align with 2D bounds
        lightIntensity = 1;
        gradientOpacity = 1;
      } else if (progress < 0.65) {
        phase = "photos";
        lampY = 0.2;
        lampX = 0;
        lightIntensity = 0;
        gradientOpacity = 0;
        hidden = true;
        rgbProgress = 0;
      } else if (progress < 0.75) {
        phase = "rgb_intro";
        lampY = 0.2;
        lampX = 0; // Centered
        gradientOpacity = 0;
        lightIntensity = 1;
        hidden = false;
        rgbProgress = 0;
      } else if (progress < 0.88) {
        phase = "rgb";
        lampY = 0.2;
        const isMobile = window.innerWidth < 768;
        // On mobile: center the lamp. On desktop: shift left for side-by-side layout
        lampX = isMobile ? 0 : -0.85; 
        gradientOpacity = 0;
        lightIntensity = 1;
        hidden = false;
        rgbProgress = (progress - 0.75) / 0.13;
      } else {
        phase = "cta";
        const t = (progress - 0.88) / 0.12;
        const isMobile = window.innerWidth < 768;
        lampX = isMobile ? 0 : -0.85 + t * -0.95;
        // Subtle vertical float
        lampY = 0.2 + t * 0.04;
        // Maintain high light intensity for the final section
        lightIntensity = 1.0; 
        gradientOpacity = 0;
        hidden = false;
        rgbProgress = 1;
      }

      setState({ progress, lampY, lampX, lightIntensity, gradientOpacity, rgbProgress, phase, hidden });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
