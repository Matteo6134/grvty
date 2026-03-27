"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { HeroText } from "@/components/sections/HeroText";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { PhotosSection } from "@/components/sections/PhotosSection";
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

  const currentEmissiveColor =
    manualColor ||
    (scroll.phase === "rgb" || scroll.phase === "cta"
      ? RGB_COLORS[colorIndex]
      : "#d4b055");

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

      <div className="card-frame" aria-hidden />
      <div className="noise-overlay" />

      <div className="relative z-10">
        {/* Hero */}
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center"
          style={{ opacity: heroAlpha, transition: "opacity 0.4s ease" }}
        >
          <HeroText opacity={1} />
        </section>

        {/* Spacer — lets the 3D object levitate before details section */}
        <div className="h-[60vh]" aria-hidden />

        {/* Specifications */}
        <section id="details" className="min-h-screen">
          <DetailsSection />
        </section>

        {/* Photos + Measurements */}
        <section id="photos" className="min-h-screen">
          <PhotosSection />
        </section>

        {/* RGB Showcase */}
        <section id="rgb" className="min-h-screen">
          <RGBShowcase
            progress={scroll.rgbProgress}
            onManualColor={(color) => setManualColor(color)}
          />
        </section>

        {/* CTA */}
        <section id="cta" className="min-h-screen">
          <ShopCTA />
        </section>
      </div>
    </main>
  );
}
