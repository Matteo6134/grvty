"use client";

import { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { HeroText } from "@/components/sections/HeroText";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { RGBShowcase } from "@/components/sections/RGBShowcase";
import { ShopCTA } from "@/components/sections/ShopCTA";
import { RGB_COLORS } from "@/lib/constants";

const LampScene = dynamic(
  () => import("@/components/lamp/LampScene").then((mod) => ({ default: mod.LampScene })),
  { ssr: false }
);

function useFadeIn(threshold = 0.15) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, visible };
}

export default function Home() {
  const [manualColor, setManualColor] = useState<string | null>(null);
  const scroll = useScrollTimeline();

  const colorIndex = Math.min(
    Math.floor(scroll.rgbProgress * RGB_COLORS.length),
    RGB_COLORS.length - 1
  );

  const currentEmissiveColor = manualColor || (
    scroll.phase === "rgb" || scroll.phase === "cta"
      ? RGB_COLORS[colorIndex]
      : "#d4b055"
  );

  const details = useFadeIn(0.1);
  const rgb = useFadeIn(0.1);
  const cta = useFadeIn(0.05);

  const heroAlpha = Math.max(0, 1 - Math.max(0, scroll.progress - 0.08) / 0.1);

  return (
    <main className="relative">
      <LampScene
        lampPositionY={scroll.lampY}
        lampPositionX={scroll.lampX}
        lightIntensity={scroll.lightIntensity}
        emissiveColor={currentEmissiveColor}
        gradientOpacity={scroll.gradientOpacity}
        isRGBMode={scroll.phase === "rgb"}
        scrollProgress={scroll.progress}
      />

      {/* Card frame — creates the glass card / rocky-outside aesthetic */}
      <div className="card-frame" aria-hidden />

      <div className="noise-overlay" />

      <div className="relative z-10">
        {/* Hero section */}
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center"
          style={{ opacity: heroAlpha, transition: "opacity 0.4s ease" }}
        >
          <HeroText opacity={1} />
        </section>

        {/* Scroll spacer so the 3D object animates before details appear */}
        <section className="h-[50vh]" aria-hidden />

        {/* Details / Specifications section */}
        <section
          id="details"
          ref={details.ref}
          className="min-h-[180vh] flex flex-col justify-center"
          style={{
            opacity: details.visible ? 1 : 0,
            transform: details.visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <DetailsSection />
        </section>

        {/* RGB Showcase section */}
        <section
          id="rgb"
          ref={rgb.ref}
          className="min-h-screen flex items-center justify-center"
          style={{
            opacity: rgb.visible ? 1 : 0,
            transform: rgb.visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <RGBShowcase
            progress={scroll.rgbProgress}
            onManualColor={(color) => setManualColor(color)}
          />
        </section>

        {/* CTA section */}
        <section
          id="cta"
          ref={cta.ref}
          className="min-h-screen"
          style={{
            opacity: cta.visible ? 1 : 0,
            transform: cta.visible ? "translateY(0)" : "translateY(32px)",
            transition: "opacity 0.8s ease, transform 0.8s ease",
          }}
        >
          <ShopCTA />
        </section>
      </div>
    </main>
  );
}
