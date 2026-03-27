"use client";

import { Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
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
  readonly hidden?: boolean;
}

function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-10 h-10 border-[3px] border-foreground/20 border-t-foreground/60 rounded-full animate-spin" />
    </div>
  );
}

function ResponsiveCamera() {
  const { size, camera } = useThree();

  // Baseline ottimizzata per vedere bene il fronte della lampada
  let targetZ = 32;
  if (size.width < 1200) {
    // Interpolazione fluida tra mobile (70) e desktop (32)
    const progress = Math.max(0, (size.width - 320) / (1200 - 320));
    targetZ = 70 - progress * (70 - 32);
  }

  let targetY = 0;
  if (size.width < 768) {
    targetY = -1.2; // Offset verticale ridotto per mobile (prima era -2.8, ora più centrato)
  }

  // Movimento fluido della camera verso il target
  camera.position.lerp(new THREE.Vector3(0, targetY, targetZ), 0.1);
  camera.lookAt(0, 0, 0);
  camera.updateProjectionMatrix();

  return null;
}

export function LampScene({
  lampPositionY = 0,
  lampPositionX = 0,
  lightIntensity = 0,
  emissiveColor = "#d4b055",
  gradientOpacity = 1,
  isRGBMode = false,
  scrollProgress = 0,
  hidden = false,
}: LampSceneProps) {
  const [hasError, setHasError] = useState(false);

  // Fallback in caso di errore WebGL
  if (hasError) {
    return (
      <div
        className="fixed inset-0 z-0"
        style={{ background: "var(--background)" }}
      />
    );
  }

  return (
    <div
      className="fixed inset-0 z-0"
      style={{
        background: "var(--background)",
        opacity: hidden ? 0 : 1,
        transition: "opacity 0.7s ease",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={[1, 2]} // Supporto Retina
          gl={{
            antialias: false, // Disabilitato per massime prestazioni con Bloom
            alpha: true,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
          onCreated={(state) => {
            if (!state.gl.capabilities.isWebGL2) {
              setHasError(true);
            }
          }}
          onError={() => setHasError(true)}
        >
          {/* Camera Setup */}
          <PerspectiveCamera makeDefault fov={45} />
          <ResponsiveCamera />

          {/* Sfondo dinamico */}
          <GradientBackground
            opacity={gradientOpacity}
            emissiveColor={emissiveColor}
            isRGBMode={isRGBMode}
          />

          {/* Illuminazione Ambientale */}
          <ambientLight intensity={0.4} />

          {/* Photo Fill Lights — Highlights the product edges */}
          <directionalLight position={[10, 10, 8]} intensity={1.2} />
          <directionalLight position={[-10, 5, 5]} intensity={0.5} />

          {/* Il Modello 3D della Lampada */}
          <LampModel
            positionY={lampPositionY}
            positionX={lampPositionX}
            lightIntensity={lightIntensity}
            emissiveColor={emissiveColor}
            scrollProgress={scrollProgress}
            isRGBMode={isRGBMode}
          />

          {/* Mappa riflessi */}
          <Environment preset="city" environmentIntensity={0.5} />

          {/* Post-Processing: Bloom (Effetto Glow) */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={1.0} // Solo gli oggetti con emissive > 1 brillano
              mipmapBlur              // Glow morbido e naturale
              intensity={0.8}          // Forza dell'effetto
              radius={0.3}             // Raggio di diffusione della luce
            />
          </EffectComposer>

        </Canvas>
      </Suspense>
    </div>
  );
}