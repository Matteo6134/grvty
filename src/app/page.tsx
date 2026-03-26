"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useScrollTimeline } from "@/hooks/useScrollTimeline";
import { HeroText } from "@/components/sections/HeroText";
import { ScrollIndicator } from "@/components/sections/ScrollIndicator";
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

  // Map RGB progress to color
  const colorIndex = Math.min(
    Math.floor(scroll.rgbProgress * RGB_COLORS.length),
    RGB_COLORS.length - 1
  );
  
  // Se l'utente sta interagendo manualmente, usiamo quel colore, altrimenti quello dello scroll
  const currentEmissiveColor = manualColor || (
    scroll.phase === "rgb" || scroll.phase === "cta"
      ? RGB_COLORS[colorIndex]
      : "#d4b055"
  );

  // Hero text fades out during levitation
  const heroOpacity =
    scroll.progress < 0.15 ? 1 : Math.max(0, 1 - (scroll.progress - 0.15) / 0.1);

  // Scroll indicator fades early
  const scrollIndicatorOpacity = Math.max(0, 1 - scroll.progress / 0.1);

  return (
    <main className="relative">
      {/* Fixed 3D Canvas */}
      <LampScene
        lampPositionY={scroll.lampY}
        lightIntensity={scroll.lightIntensity}
        emissiveColor={currentEmissiveColor}
        gradientOpacity={scroll.gradientOpacity}
        isRGBMode={scroll.phase === "rgb"}
        scrollProgress={scroll.progress}
      />

      {/* Scroll container — drives the timeline */}
      <div className="relative z-10">
        {/* Hero section */}
        <section className="relative h-screen flex items-center justify-center">
          <HeroText opacity={heroOpacity} />
          <ScrollIndicator opacity={scrollIndicatorOpacity} />
        </section>

        {/* Levitation spacer */}
        <section className="h-screen" />

        {/* Details section */}
        <section className="min-h-[200vh]">
          <DetailsSection />
        </section>

        {/* RGB showcase - Passiamo manualColor come state fisso */}
        <section className="min-h-screen">
          <RGBShowcase 
            progress={scroll.rgbProgress} 
            onManualColor={(color) => setManualColor(color)}
          />
        </section>

        {/* CTA */}
        <section>
          <ShopCTA />
        </section>
      </div>
    </main>
  );
}
