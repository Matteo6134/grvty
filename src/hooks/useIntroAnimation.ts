"use client";

import { useState, useEffect } from "react";

export function useIntroAnimation() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // If the user reloads while scrolled down, skip the intro ceremony to prevent position jumps
    if (window.scrollY > 50) {
      setProgress(1);
      return;
    }

    let start: number | null = null;
    const duration = 4500; // 4.5 seconds for a slower, more graceful intro

    const frame = (time: number) => {
      if (!start) start = time;
      const elapsed = time - start;
      const p = Math.min(elapsed / duration, 1);
      
      setProgress(p);

      if (p < 1) {
        requestAnimationFrame(frame);
      }
    };
    
    // Slight delay before starting to ensure canvas is ready
    const timer = setTimeout(() => {
      requestAnimationFrame(frame);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  return progress; // 0 to 1
}
