"use client";

import { Suspense, useState } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { Environment, PerspectiveCamera } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { LampModel } from "./LampModel";

interface LampSceneProps {
  readonly lampPositionY?: number;
  readonly lampPositionX?: number;
  readonly lightIntensity?: number;
  readonly emissiveColor?: string;
  readonly isRGBMode?: boolean;
  readonly scrollProgress?: number;
  readonly phase?: string;
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
  let targetZ = 35; // Default desktop size
  if (size.width < 1500) {
    // Interpolazione fluida tra mobile (65) e large-desktop (35)
    // Ensures the 3D model continuously maps to the viewport geometry perfectly
    const progress = Math.max(0, (size.width - 320) / (1500 - 320));
    targetZ = 65 - progress * (65 - 35);
  }

  let targetY = 0;
  if (size.width < 1024) {
    targetY = -0.6; // Tablet offset
  }
  if (size.width < 768) {
    targetY = -1.2; // Mobile offset
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
  isRGBMode = false,
  scrollProgress = 0,
  phase = "hero",
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
      className="fixed z-0"
      style={{
        inset: "1.25rem 2rem",
        borderRadius: "2rem",
        overflow: "hidden",
        isolation: "isolate",
        transform: "translateZ(0)",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        background: "var(--background)",
        opacity: hidden ? 0 : 1,
        transition: "opacity 0.7s ease, background-color 1.2s ease",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* ── Dynamic Flowing Radial Glow (Details Section) ── */}
      <div 
        className="absolute top-1/2 left-1/2 pointer-events-none transition-all duration-[1500ms] ease-out z-[-1]"
        style={{
          width: "200%",
          height: "200%",
          background: "radial-gradient(ellipse at 40% 45%, rgba(201, 168, 76, 0.25) 0%, rgba(201, 168, 76, 0.05) 30%, rgba(201, 168, 76, 0) 50%)",
          opacity: phase === "details" ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${phase === "details" ? 1 : 0.8})`,
          mixBlendMode: "screen",
          animation: "spin 20s linear infinite",
        }}
      />

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

          {/* Illuminazione Ambientale ridotta per Light Mode / Details */}
          <ambientLight intensity={0.4} />

          {/* Photo Fill Lights — Highlights the product edges */}
          <directionalLight 
            position={[10, 10, 8]} 
            intensity={1.2} 
          />
          <directionalLight 
            position={[-10, 5, 5]} 
            intensity={0.5} 
          />

          {/* Il Modello 3D della Lampada */}
          <LampModel
            positionY={lampPositionY}
            positionX={lampPositionX}
            lightIntensity={lightIntensity}
            emissiveColor={emissiveColor}
            scrollProgress={scrollProgress}
            isRGBMode={isRGBMode}
            phase={phase}
          />

          {/* Mappa riflessi */}
          <Environment preset="city" environmentIntensity={0.5} />

          {/* Post-Processing: Bloom (Effetto Glow) */}
          <EffectComposer>
            <Bloom
              luminanceThreshold={1.0} // Solo gli oggetti con emissive > 1 brillano
              mipmapBlur              // Glow morbido e naturale
              intensity={0.55}         // Softer effect as requested
              radius={0.3}             // Raggio di diffusione della luce
            />
          </EffectComposer>

        </Canvas>
      </Suspense>
    </div>
  );
}