"use client";

import { useEffect, useRef, useState } from "react";

function useFadeIn(delay = 0, threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTimeout(() => setVisible(true), delay); },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay, threshold]);
  return { ref, visible };
}

export function StorySection() {
  const claim = useFadeIn(80);
  const statsLeft = useFadeIn(160);

  return (
    <div className="relative z-10 w-full min-h-screen flex flex-col justify-between px-6 md:px-16 pt-32 pb-24 text-[var(--foreground)]">
      {/* Top: claim text */}
      <div
        ref={claim.ref}
        style={{
          opacity: claim.visible ? 1 : 0,
          transform: claim.visible ? "none" : "translateY(24px)",
          transition: "opacity 1.2s ease, transform 1.2s ease",
        }}
        className="w-full flex justify-center md:justify-start"
      >
        <p
          className="font-sans leading-[1.1] lowercase text-center md:text-left"
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "var(--foreground)",
            fontFamily: "var(--font-sora), system-ui, sans-serif",
          }}
        >
          Form follows function.
          <br />
          <span style={{ opacity: 0.35 }}>The pyramid, re-imagined as light.</span>
        </p>
      </div>

      {/* Bottom: Manufacturing */}
      <div
        ref={statsLeft.ref}
        className="w-full flex justify-center md:justify-end"
        style={{
          opacity: statsLeft.visible ? 1 : 0,
          transform: statsLeft.visible ? "none" : "translateY(24px)",
          transition: "opacity 1.2s ease 0.2s, transform 1.2s ease 0.2s",
        }}
      >
        <div 
          id="story-manufacturing"
          className="flex flex-col gap-3 md:gap-5 max-w-[450px] text-center md:text-right bg-[var(--background)]/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none p-6 md:p-0 rounded-3xl pb-12">
          <span
            className="font-black uppercase tracking-[0.25em]"
            style={{
              fontSize: "12px",
              color: "var(--foreground)",
              fontFamily: "var(--font-sora), system-ui, sans-serif"
            }}
          >
            Manufacturing
          </span>
          <p
            className="leading-[1.7]"
            style={{
              fontSize: "14px",
              color: "var(--foreground)",
              opacity: 0.65,
              fontFamily: "var(--font-sora), system-ui, sans-serif"
            }}
          >
            Engineered with precision in <strong>Onshape</strong>, each pyramid is meticulously 3D printed using advanced additive manufacturing. The layered extrusion process creates a unique, tactile surface finish that diffuses light with an organic warmth entirely unique to each print.
          </p>
        </div>
      </div>
    </div>
  );
}
