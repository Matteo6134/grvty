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

const LampScene = dynamic(
  () => import("@/components/lamp/LampScene").then((mod) => ({ default: mod.LampScene })),
  { ssr: false }
);

export default function Home() {
  const [manualColor, setManualColor] = useState<string>(RGB_COLORS[0]);
  const scroll = useScrollTimeline();

  // The lamp automatically reacts to the room's lighting state
  const defaultBulbState = "#c9a84c";

  const currentEmissiveColor =
    scroll.phase === "rgb_intro" || scroll.phase === "rgb" || scroll.phase === "cta"
      ? manualColor
      : defaultBulbState;

  const heroAlpha = Math.max(0, 1 - Math.max(0, scroll.progress - 0.08) / 0.1);

  return (
    <main className="relative">
      <LampScene
        lampPositionY={scroll.lampY}
        lampPositionX={scroll.lampX}
        lightIntensity={scroll.lightIntensity}
        emissiveColor={currentEmissiveColor}
        isRGBMode={scroll.phase === "rgb_intro" || scroll.phase === "rgb"}
        scrollProgress={scroll.progress}
        phase={scroll.phase}
        hidden={scroll.hidden}
      />

      <div className="card-frame" aria-hidden />
      <div className="noise-overlay" />

      <div className="relative">
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

        {/* RGB Intro */}
        <section id="rgb-intro" className="min-h-screen snap-center flex items-center justify-center overflow-hidden pointer-events-none">
          <h2 
            className="font-black tracking-tighter lowercase text-white mix-blend-difference leading-[0.85] text-center relative z-20"
            style={{ fontSize: "clamp(5rem, 15vw, 15rem)" }}
          >
            ambient<br />colors.
          </h2>
        </section>

        {/* RGB Showcase / Action */}
        <section id="rgb" className="min-h-screen snap-center">
          <RGBShowcase
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
