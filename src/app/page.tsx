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
import { useIntroAnimation } from "@/hooks/useIntroAnimation";

const LampScene = dynamic(
  () => import("@/components/lamp/LampScene").then((mod) => ({ default: mod.LampScene })),
  { ssr: false }
);

export default function Home() {
  const [manualColor, setManualColor] = useState<string>(RGB_COLORS[0]);
  const scroll = useScrollTimeline();
  const introProgress = useIntroAnimation();

  // The lamp automatically reacts to the room's lighting state
  const defaultBulbState = "#c9a84c";

  const currentEmissiveColor =
    scroll.phase === "rgb_intro" || scroll.phase === "rgb" || scroll.phase === "cta"
      ? manualColor
      : defaultBulbState;

  // Text fades in smoothly at the end of the intro sequence
  const introAlpha = Math.max(0, (introProgress - 0.8) / 0.2); // Fades in from 80% to 100% of intro
  const heroAlpha = Math.min(introAlpha, Math.max(0, 1 - Math.max(0, scroll.progress - 0.08) / 0.1));

  return (
    <main className="relative">
      <div
        className="fixed z-[-10] inset-0 md:inset-[1.25rem_2rem] md:rounded-[2rem]"
        style={{
          background: "var(--background)",
          opacity: scroll.hidden ? 0 : 1,
          transition: "opacity 0.7s ease, background-color 1.2s ease"
        }}
      />

      <LampScene
        lampPositionY={scroll.lampY}
        lampPositionX={scroll.lampX}
        lightIntensity={scroll.lightIntensity}
        emissiveColor={currentEmissiveColor}
        isRGBMode={scroll.phase === "rgb_intro" || scroll.phase === "rgb"}
        scrollProgress={scroll.progress}
        phase={scroll.phase}
        hidden={scroll.hidden}
        introProgress={introProgress}
      />

      <div className="card-frame" aria-hidden style={{ opacity: introAlpha, transition: "opacity 0.5s ease" }} />
      <div className="noise-overlay" style={{ opacity: introAlpha * 0.04, transition: "opacity 0.5s ease" }} />

      <div className="relative">
        <section
          id="hero"
          className="relative h-screen flex items-center justify-center snap-center z-[-5]"
        >
          <HeroText opacity={heroAlpha} />
        </section>

        {/* Spacer — lets the 3D object levitate before story section */}
        <div className="h-[20vh] md:h-[40vh]" aria-hidden />

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
        <section id="rgb-intro" className="min-h-[60vh] md:min-h-screen snap-center flex items-center justify-center overflow-hidden pointer-events-none">
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
