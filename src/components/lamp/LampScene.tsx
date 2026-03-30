"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
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
  readonly introProgress?: number;
}

function LoadingFallback() {
  return <div className="absolute inset-0" />;
}

function ResponsiveCamera() {
  const { size, camera } = useThree();
  const initialized = useRef(false);

  // Aspect ratio drives everything — works for any screen shape
  const aspect = size.width / size.height;
  
  // The formula controls the size
  // Desktop (~1.78) calculation ends up around 40-42.
  // We use a smaller exponent or explicit boost to make it larger on mobile.
  let targetZ = 55 / Math.pow(aspect, 0.55);
  
  // If it's a tall phone screen (aspect < 0.7), pull the camera closer to make it significantly bigger
  if (aspect < 0.7) {
    targetZ *= 0.55; // Moderate zoom for mobile
  }

  // Y offset: keep centered on wide screens, shift up slightly on tall screens
  const targetY = aspect < 0.7 ? -1.5 : aspect < 1.2 ? -0.6 : 0;

  useFrame(() => {
    const targetPos = new THREE.Vector3(0, targetY, targetZ);
    // On the very first frame loop, instantly snap the camera to position
    if (!initialized.current) {
      camera.position.copy(targetPos);
      initialized.current = true;
    } else {
      camera.position.lerp(targetPos, 0.1);
    }
    camera.lookAt(0, 0, 0);
  });

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
  introProgress = 1,
}: LampSceneProps) {
  const [hasError, setHasError] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    setMounted(true);
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!mounted) return null;

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
      className="fixed z-0 inset-0 md:inset-[1.25rem_2rem] md:rounded-[2rem] overflow-hidden"
      style={{
        isolation: "isolate",
        transform: "translateZ(0)",
        WebkitMaskImage: "-webkit-radial-gradient(white, black)",
        opacity: hidden ? 0 : 1,
        transition: hidden
          ? "opacity 0.3s ease, background-color 1.2s ease"
          : "opacity 0.7s ease, background-color 1.2s ease",
        pointerEvents: hidden ? "none" : "auto",
      }}
    >
      {/* ── Dynamic Flowing Radial Glows ── */}
      {/* 1. Details Section (Warm Gold) */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none transition-all duration-[1500ms] ease-out z-[-1]"
        style={{
          width: "200%",
          height: "200%",
          opacity: phase === "details" ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${phase === "details" ? 1 : 0.8})`,
          mixBlendMode: "screen",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: "radial-gradient(ellipse at 40% 45%, rgba(201, 168, 76, 0.12) 0%, rgba(201, 168, 76, 0.03) 30%, rgba(201, 168, 76, 0) 50%)",
            animation: "spin 20s linear infinite",
          }}
        />
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />
      </div>

      {/* 2. RGB Section (Dynamic Hex Match) */}
      <div
        className="absolute top-1/2 left-1/2 pointer-events-none transition-all duration-700 ease-out z-[-1]"
        style={{
          width: "200%",
          height: "200%",
          opacity: phase === "rgb" || phase === "rgb_intro" ? 1 : 0,
          transform: `translate(-50%, -50%) scale(${phase === "rgb" || phase === "rgb_intro" ? 1 : 0.8})`,
          mixBlendMode: "screen",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            background: `radial-gradient(ellipse at 50% 50%, ${emissiveColor}22 0%, ${emissiveColor}07 35%, ${emissiveColor}00 55%)`,
            animation: "spin 20s linear reverse infinite",
          }}
        />
        {/* Grain overlay */}
        <div className="absolute inset-0 opacity-[0.10]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E\")", backgroundSize: "128px 128px" }} />
      </div>

      <Suspense fallback={<LoadingFallback />}>
        <Canvas
          dpr={isMobile ? [1, 2.5] : [1, 2]} // Allowed higher resolution limit to fix pixelation on iPhones
          gl={{
            antialias: true,
            alpha: true,
            stencil: false,
            depth: true,
          }}
          onCreated={(state) => {
            if (state?.gl && !state.gl.capabilities.isWebGL2) {
              setHasError(true);
            }
          }}
          onError={(e) => {
            console.error("Canvas Error:", e);
            setHasError(true);
          }}
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
            introProgress={introProgress}
          />

          {/* Environment reflections — lighter on mobile */}
          <Environment preset={isMobile ? "apartment" : "city"} environmentIntensity={isMobile ? 0.3 : 0.5} />

          {/* Post-Processing: Bloom — disabled on mobile for GPU savings */}
          {!isMobile && (
            <EffectComposer>
              <Bloom
                luminanceThreshold={1.0}
                mipmapBlur
                intensity={0.35}
                radius={0.3}
              />
            </EffectComposer>
          )}

        </Canvas>
      </Suspense>
    </div>
  );
}