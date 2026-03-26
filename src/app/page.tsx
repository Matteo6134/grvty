"use client";

import { useState } from "react";
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

  const getSectionOpacity = (start: number, peakStart: number, peakEnd: number, end: number) => {
    if (scroll.progress < start) return 0;
    if (scroll.progress < peakStart) return (scroll.progress - start) / (peakStart - start);
    if (scroll.progress < peakEnd) return 1;
    if (scroll.progress < end) return 1 - (scroll.progress - peakEnd) / (end - peakEnd);
    return 0;
  };

  const heroAlpha = getSectionOpacity(-0.1, 0, 0.15, 0.25);
  const detailsAlpha = getSectionOpacity(0.35, 0.45, 0.6, 0.7);
  const rgbAlpha = getSectionOpacity(0.65, 0.75, 0.85, 0.9);
  const ctaAlpha = getSectionOpacity(0.85, 0.95, 1.1, 1.2);

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
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: heroAlpha }}
        >
          <HeroText opacity={1} />
        </section>

        <section className="h-screen" />

        <section
          id="details"
          className="min-h-[200vh] flex flex-col justify-center transition-opacity duration-300"
          style={{ opacity: detailsAlpha }}
        >
          <DetailsSection />
        </section>

        <section
          id="rgb"
          className="min-h-screen flex items-center justify-center transition-opacity duration-300"
          style={{ opacity: rgbAlpha }}
        >
          <RGBShowcase
            progress={scroll.rgbProgress}
            onManualColor={(color) => setManualColor(color)}
          />
        </section>

        <section
          id="cta"
          className="min-h-screen transition-opacity duration-300"
          style={{ opacity: ctaAlpha }}
        >
          <ShopCTA />
        </section>
      </div>
    </main>
  );
}
