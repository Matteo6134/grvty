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

        // Mobile hiding for Story section (Manufacturing text) only when overlapping
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
          const mfgEl = document.getElementById("story-manufacturing");
          if (mfgEl) {
            const rect = mfgEl.getBoundingClientRect();
            // Start fading when text reaches 65% of screen height, fully hide at 45% (center-ish)
            const startOverlap = window.innerHeight * 0.65;
            const endOverlap = window.innerHeight * 0.45;
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
        const isMobile = window.innerWidth < 768;
        // Shift significantly right on desktop to align with the HUD lines
        lampX = isMobile ? 0 : 1.35; 
        lightIntensity = 1;
        gradientOpacity = 1;
        
        if (isMobile) {
          // On mobile, hide ONLY when text actually reaches the centered lamp
          const specsEl = document.getElementById("details-specs");
          if (specsEl) {
            const rect = specsEl.getBoundingClientRect();
            const startOverlap = window.innerHeight * 0.65;
            const endOverlap = window.innerHeight * 0.45;
            if (rect.top < startOverlap) {
              const fadeT = Math.min(1, Math.max(0, (startOverlap - rect.top) / (startOverlap - endOverlap)));
              lightIntensity = 1 - fadeT;
              gradientOpacity = 1 - fadeT;
              hidden = fadeT >= 0.8;
            }
          }
        } else {
          // Desktop: only hide once the photos section enters the viewport
          const photosEl = document.getElementById("photos");
          if (photosEl) {
            const rect = photosEl.getBoundingClientRect();
            const distanceFromBottom = rect.top - window.innerHeight;
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
        // Fully hide the entire 3D canvas so photo images are visible
        hidden = true;
        rgbProgress = 0;
      } else if (progress < 0.75) {
        phase = "rgb_intro";
        lampY = 0.2;
        lampX = 0; // Pop up from center
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

        // Mobile hiding for RGB panel only when overlapping
        if (isMobile) {
          const rgbPanel = document.getElementById("rgb-panel");
          if (rgbPanel) {
            const rect = rgbPanel.getBoundingClientRect();
            const startOverlap = window.innerHeight * 0.65;
            const endOverlap = window.innerHeight * 0.45;
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
        const isMobile = window.innerWidth < 768;
        lampX = isMobile ? 0 : -0.85 + t * -0.95;
        // Subtle vertical float
        lampY = 0.2 + t * 0.04;
        // Maintain high light intensity for the final section
        lightIntensity = 1.0; 
        gradientOpacity = 0;
        hidden = false;
        rgbProgress = 1;

        // Mobile hiding for CTA card only when overlapping
        if (isMobile) {
          const ctaCard = document.getElementById("cta-card");
          if (ctaCard) {
            const rect = ctaCard.getBoundingClientRect();
            const startOverlap = window.innerHeight * 0.65;
            const endOverlap = window.innerHeight * 0.45;
            if (rect.top < startOverlap) {
              const fadeT = Math.min(1, Math.max(0, (startOverlap - rect.top) / (startOverlap - endOverlap)));
              lightIntensity = 1 - fadeT;
              hidden = fadeT >= 0.8;
            }
          }
        }
      }

      setState({ progress, lampY, lampX, lightIntensity, gradientOpacity, rgbProgress, phase, hidden });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return state;
}
