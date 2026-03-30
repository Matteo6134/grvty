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
  const [state, setState] = useState<ScrollState>(() => {
    // SSR Fallback
    if (typeof window === "undefined") {
      return {
        progress: 0,
        lampY: 0,
        lampX: 0,
        lightIntensity: 0,
        gradientOpacity: 0,
        rgbProgress: 0,
        phase: "hero",
        hidden: false,
      };
    }
    
    // Initial client-side calculation to prevent jump on reload
    try {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      return getCalculatedState(progress, window.innerWidth, window.innerHeight);
    } catch (e) {
      return {
        progress: 0,
        lampY: 0,
        lampX: 0,
        lightIntensity: 0,
        gradientOpacity: 0,
        rgbProgress: 0,
        phase: "hero",
        hidden: false,
      };
    }
  });

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      setState(getCalculatedState(progress, window.innerWidth, window.innerHeight));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Re-sync after mount/layout
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}

function getCalculatedState(progress: number, width: number, height: number): ScrollState {
  let lampY = 0;
  let lampX = 0;
  let lightIntensity = 0;
  let gradientOpacity = 0;
  let rgbProgress = 0;
  let hidden = false;
  let phase: ScrollState["phase"] = "hero";

  const isMobile = width < 768;

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

    if (isMobile) {
      const mfgEl = document.getElementById("story-manufacturing");
      if (mfgEl) {
        const rect = mfgEl.getBoundingClientRect();
        const startOverlap = height * 0.65;
        const endOverlap = height * 0.45;
        if (rect.top < startOverlap) {
          const fadeT = Math.min(1, Math.max(0, (startOverlap - rect.top) / (startOverlap - endOverlap)));
          lightIntensity *= (1 - fadeT);
          hidden = fadeT >= 0.8;
        }
      }
    }
  } else if (progress < 0.55) {
    phase = "details";
    lampY = 0.2;
    lampX = isMobile ? 0 : 1.35; 
    lightIntensity = 1;
    gradientOpacity = 1;
    
    if (isMobile) {
      const specsEl = document.getElementById("details-specs");
      if (specsEl) {
        const rect = specsEl.getBoundingClientRect();
        const startOverlap = height * 0.65;
        const endOverlap = height * 0.45;
        if (rect.top < startOverlap) {
          const fadeT = Math.min(1, Math.max(0, (startOverlap - rect.top) / (startOverlap - endOverlap)));
          lightIntensity = 1 - fadeT;
          gradientOpacity = 1 - fadeT;
          hidden = fadeT >= 0.8;
        }
      }
    } else {
      const photosEl = document.getElementById("photos");
      if (photosEl) {
        const rect = photosEl.getBoundingClientRect();
        const distanceFromBottom = rect.top - height;
        if (distanceFromBottom < 0) {
          const fadeT = Math.min(1, Math.abs(distanceFromBottom) / 150);
          lightIntensity = 1 - fadeT;
          gradientOpacity = 1 - fadeT;
          hidden = fadeT >= 0.9;
        }
      }
    }
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
    lampX = 0;
    gradientOpacity = 0;
    lightIntensity = 1;
    hidden = false;
    rgbProgress = 0;
  } else if (progress < 0.88) {
    phase = "rgb";
    lampY = 0.2;
    lampX = isMobile ? 0 : -0.85; 
    gradientOpacity = 0;
    lightIntensity = 1;
    hidden = false;
    rgbProgress = (progress - 0.75) / 0.13;

    if (isMobile) {
      const rgbPanel = document.getElementById("rgb-panel");
      if (rgbPanel) {
        const rect = rgbPanel.getBoundingClientRect();
        const startOverlap = height * 0.65;
        const endOverlap = height * 0.45;
        if (rect.top < startOverlap) {
          const fadeT = Math.min(1, Math.max(0, (startOverlap - rect.top) / (startOverlap - endOverlap)));
          lightIntensity = 1 - fadeT;
          hidden = fadeT >= 0.8;
        }
      }
    }
  } else {
    phase = "cta";
    const t = (progress - 0.88) / 0.12;
    lampX = isMobile ? 0 : -0.85 + t * -0.95;
    lampY = 0.2 + t * 0.04;
    lightIntensity = 1.0; 
    gradientOpacity = 0;
    hidden = false;
    rgbProgress = 1;

    if (isMobile) {
      const ctaCard = height < 1 ? null : document.getElementById("cta-card");
      if (ctaCard) {
        const rect = ctaCard.getBoundingClientRect();
        const startOverlap = height * 0.65;
        const endOverlap = height * 0.45;
        if (rect.top < startOverlap) {
          const fadeT = Math.min(1, Math.max(0, (startOverlap - rect.top) / (startOverlap - endOverlap)));
          lightIntensity = 1 - fadeT;
          hidden = fadeT >= 0.8;
        }
      }
    }
  }

  return { progress, lampY, lampX, lightIntensity, gradientOpacity, rgbProgress, phase, hidden };
}
