"use client";

import { useState, useEffect } from "react";

interface ScrollState {
  readonly progress: number;
  readonly lampY: number;
  readonly lampX: number;
  readonly lightIntensity: number;
  readonly gradientOpacity: number;
  readonly rgbProgress: number;
  readonly phase: "hero" | "levitation" | "details" | "rgb" | "cta";
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
      let phase: ScrollState["phase"] = "hero";

      if (progress < 0.15) {
        phase = "hero";
        lampY = 0;
        lampX = 0;
        gradientOpacity = 0;
        lightIntensity = 0;
      } else if (progress < 0.40) {
        phase = "levitation";
        const t = (progress - 0.15) / 0.25;
        lampY = t * 0.2;
        lampX = 0;
        gradientOpacity = 0;
        lightIntensity = Math.pow(Math.max(0, (t - 0.15) * 1.18), 1.8) * 0.5;
      } else if (progress < 0.65) {
        phase = "details";
        lampY = 0.2;
        lampX = 0;
        const t = (progress - 0.40) / 0.25;
        lightIntensity = Math.min(1, 0.5 + t * 0.5);
        gradientOpacity = t * 0.9;
      } else if (progress < 0.85) {
        phase = "rgb";
        lampY = 0.2;
        lampX = 0;
        gradientOpacity = 1;
        lightIntensity = 1;
        rgbProgress = (progress - 0.65) / 0.2;
      } else {
        phase = "cta";
        const t = (progress - 0.85) / 0.15;
        // Reduced from -3.5 → -1.5 so lamp stays on screen
        lampX = t * -1.5;
        lampY = 0.2 + t * 0.05;
        lightIntensity = 0.65;
        gradientOpacity = Math.max(0.3, 1 - t);
        rgbProgress = 1;
      }

      setState({ progress, lampY, lampX, lightIntensity, gradientOpacity, rgbProgress, phase });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
