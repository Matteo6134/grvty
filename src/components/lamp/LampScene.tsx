"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import { GradientBackground } from "./GradientBackground";
import { LampModel } from "./LampModel";

interface LampSceneProps {
  readonly lampPositionY?: number;
  readonly lampPositionX?: number;
  readonly lightIntensity?: number;
  readonly emissiveColor?: string;
  readonly gradientOpacity?: number;
  readonly isRGBMode?: boolean;
  readonly scrollProgress?: number;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 border-[3px] border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
    </div>
  );
}

export function LampScene({
  lampPositionY = 0,
  lampPositionX = 0,
  lightIntensity = 0,
  emissiveColor = "#d4b055",
  gradientOpacity = 1,
  isRGBMode = false,
  scrollProgress = 0,
}: LampSceneProps) {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ background: "var(--background)" }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={45} />

          <GradientBackground
            opacity={gradientOpacity}
            emissiveColor={emissiveColor}
            isRGBMode={isRGBMode}
          />

          <ambientLight intensity={0.5} />
          <spotLight
            position={[10, 10, 10]}
            angle={0.15}
            penumbra={1}
            intensity={2}
            castShadow
          />

          <LampModel
            positionY={lampPositionY}
            positionX={lampPositionX}
            lightIntensity={lightIntensity}
            emissiveColor={emissiveColor}
            isRGBMode={isRGBMode}
            scrollProgress={scrollProgress}
          />

          <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.35}
            scale={12}
            blur={2}
            far={4.5}
          />

          <Environment preset="city" environmentIntensity={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}
