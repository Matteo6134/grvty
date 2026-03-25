"use client";

import { Canvas } from "@react-three/fiber";
import { GradientBackground } from "@/components/lamp/GradientBackground";

export function ShopBackground() {
  return (
    <Canvas
      className="!fixed inset-0 !z-0"
      camera={{ position: [0, 0, 5], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: true }}
    >
      <GradientBackground opacity={0.6} />
    </Canvas>
  );
}
