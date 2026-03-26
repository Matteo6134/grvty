"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
// Immagino che questi siano i tuoi componenti, assicurati che i percorsi siano corretti
import { GradientBackground } from "./GradientBackground";
import { LampModel } from "./LampModel";

interface LampSceneProps {
  readonly lampPositionY?: number;
  readonly lightIntensity?: number;
  readonly emissiveColor?: string;
  readonly gradientOpacity?: number;
  readonly isRGBMode?: boolean;
  readonly scrollProgress?: number;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
      <div className="w-12 h-12 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export function LampScene({
  lampPositionY = 0,
  lightIntensity = 0,
  emissiveColor = "#d4b055",
  gradientOpacity = 1,
  isRGBMode = false,
  scrollProgress = 0,
}: LampSceneProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          {/* IMPORTANTE: La telecamera a Z: 8 o 10 previene l'effetto "zoom in faccia" 
            se il modello è molto grande (come quelli di Womp) 
          */}
          <PerspectiveCamera makeDefault position={[0, 0, 40]} fov={45} />

          <GradientBackground 
            opacity={gradientOpacity} 
            emissiveColor={emissiveColor}
            isRGBMode={isRGBMode}
          />

          {/* Luci bilanciate per il 3D reale */}
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
            lightIntensity={lightIntensity}
            emissiveColor={emissiveColor}
            isRGBMode={isRGBMode}
            scrollProgress={scrollProgress}
          />

          {/* Ombra a terra per "radicare" l'oggetto nello spazio */}
          <ContactShadows
            position={[0, -2.8, 0]}
            opacity={0.4}
            scale={12}
            blur={2}
            far={4.5}
          />

          {/* Environment rende i materiali di Womp realistici e non piatti */}
          <Environment preset="city" environmentIntensity={0.5} />
        </Canvas>
      </Suspense>
    </div>
  );
}