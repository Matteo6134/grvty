"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { HeroText } from "@/components/sections/HeroText";
import { StorySection } from "@/components/sections/StorySection";
import { DetailsSection } from "@/components/sections/DetailsSection";
import { PhotosSection } from "@/components/sections/PhotosSection";
import { RGBShowcase } from "@/components/sections/RGBShowcase";
import { ShopCTA } from "@/components/sections/ShopCTA";
import { RGB_COLORS } from "@/lib/constants";

import { useTheme } from "@/hooks/useTheme";

const LampScene = dynamic(
  () => import("@/components/lamp/LampScene").then((mod) => ({ default: mod.LampScene })),
  { ssr: false }
);

export default function Home() {
  const { isDark } = useTheme();
  const [manualColor, setManualColor] = useState<string | null>(null);
  const scroll = useScrollTimeline();

  const colorIndex = Math.min(
    Math.floor(scroll.rgbProgress * RGB_COLORS.length),
    RGB_COLORS.length - 1
  );

  // The lamp automatically reacts to the room's lighting state (UI Theme)
  const defaultBulbState = isDark ? "#c9a84c" : "#e0dcd3";

  const currentEmissiveColor =
    manualColor ||
    (scroll.phase === "rgb" || scroll.phase === "cta"
      ? RGB_COLORS[colorIndex]
      : defaultBulbState);

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
        hidden={false}
      />

      <div className="card-frame" aria-hidden />
      <div className="noise-overlay" />

      <div className="relative z-10">
        {/* Hero */}
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center snap-center"
          style={{ opacity: heroAlpha, transition: "opacity 0.4s ease" }}
        >
          <HeroText opacity={1} />
        </section>

        {/* Spacer — lets the 3D object levitate before story section */}
        <div className="h-[40vh]" aria-hidden />

        {/* Story Section */}
        <section id="story" className="min-h-screen snap-center">
          <StorySection />
        </section>

        {/* Specifications */}
        <section id="details" className="min-h-screen snap-center">
          <DetailsSection />
        </section>

        {/* Photos + Measurements */}
        <section id="photos" className="min-h-screen snap-center">
          <PhotosSection />
        </section>

        {/* RGB Showcase */}
        <section id="rgb" className="min-h-screen snap-center">
          <RGBShowcase
            progress={scroll.rgbProgress}
            onManualColor={(color) => setManualColor(color)}
          />
        </section>

        {/* CTA */}
        <section id="cta" className="min-h-screen snap-center">
          <ShopCTA />
        </section>
      </div>
    </main>
  );
}
