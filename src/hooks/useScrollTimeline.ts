"use client";

import { useState, useEffect } from "react";

interface ScrollState {
  readonly progress: number;
  readonly lampY: number;
  readonly lightIntensity: number;
  readonly gradientOpacity: number;
  readonly rgbProgress: number;
  readonly phase: "hero" | "levitation" | "details" | "rgb" | "cta";
}

export function useScrollTimeline(): ScrollState {
  const [state, setState] = useState<ScrollState>({
    progress: 0,
    lampY: 0,
    lightIntensity: 0,
    gradientOpacity: 0,
    rgbProgress: 0,
    phase: "hero",
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;

      let lampY = 0;
      let lightIntensity = 0;
      let gradientOpacity = 0;
      let rgbProgress = 0;
      let phase: ScrollState["phase"] = "hero";

      // The user wants it "sempre centrato" (always centered).
      // We will keep lampY close to 0 but drive the transitions via lightIntensity and phase.

      if (progress < 0.15) {
        // Hero
        phase = "hero";
        lampY = 0;
        gradientOpacity = 0;
      } else if (progress < 0.3) {
        // Levitation (visual transition)
        phase = "levitation";
        const t = (progress - 0.15) / 0.15;
        // Keep it centered but maybe a tiny bit of subtle vertical drift to show movement
        lampY = t * 0.2; 
        gradientOpacity = 0;
      } else if (progress < 0.65) {
        // Details
        phase = "details";
        lampY = 0.2;
        const t = (progress - 0.3) / 0.35;
        lightIntensity = t;
        gradientOpacity = t;
      } else if (progress < 0.85) {
        // RGB showcase
        phase = "rgb";
        lampY = 0.2;
        gradientOpacity = 1;
        lightIntensity = 1;
        rgbProgress = (progress - 0.65) / 0.2;
      } else {
        // CTA
        phase = "cta";
        const t = (progress - 0.85) / 0.15;
        // Even during CTA, we can keep it centered or slide it out slowly
        lampY = 0.2 + t * 0.5;
        gradientOpacity = 1 - t;
        lightIntensity = 1 - t;
        rgbProgress = 1;
      }

      setState({ progress, lampY, lightIntensity, gradientOpacity, rgbProgress, phase });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
