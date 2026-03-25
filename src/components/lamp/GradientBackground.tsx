"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";
import { COLORS } from "@/lib/constants";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform float u_time;
uniform float u_amplitude;
uniform float u_frequency;
uniform float u_speed;
uniform vec3 u_colorStart;
uniform vec3 u_colorMid;
uniform vec3 u_colorEnd;
uniform float u_opacity;
varying vec2 vUv;

void main() {
  // Radial glow centered slightly above middle (where lamp is)
  vec2 center = vec2(0.5, 0.45);
  float dist = distance(vUv, center);

  // Sinusoidal wave distortion on the radial
  float wave1 = sin(dist * u_frequency * 6.0 + u_time * u_speed) * u_amplitude * 0.3;
  float wave2 = sin(vUv.x * u_frequency * 2.0 + u_time * u_speed * 0.7) * u_amplitude * 0.15;

  float t = dist + wave1 + wave2;
  t = clamp(t * 1.8, 0.0, 1.0);

  // Radial gradient: gold center → warm mid → background edge
  vec3 color;
  if (t < 0.4) {
    color = mix(u_colorStart, u_colorMid, t / 0.4);
  } else {
    color = mix(u_colorMid, u_colorEnd, (t - 0.4) / 0.6);
  }

  gl_FragColor = vec4(color, u_opacity);
}`;

interface GradientBackgroundProps {
  readonly opacity?: number;
}

export function GradientBackground({ opacity = 1 }: GradientBackgroundProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { isDark } = useTheme();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_amplitude: { value: 0.15 },
      u_frequency: { value: 3.0 },
      u_speed: { value: 0.5 },
      u_colorStart: { value: new THREE.Vector3(...COLORS.dark.gradientStart) },
      u_colorMid: { value: new THREE.Vector3(...COLORS.dark.gradientMid) },
      u_colorEnd: { value: new THREE.Vector3(...COLORS.dark.gradientEnd) },
      u_opacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    const target = isDark ? COLORS.dark : COLORS.light;
    uniforms.u_time.value = state.clock.elapsedTime;
    uniforms.u_opacity.value = THREE.MathUtils.lerp(uniforms.u_opacity.value, opacity, 0.05);

    uniforms.u_colorStart.value.lerp(new THREE.Vector3(...target.gradientStart), 0.03);
    uniforms.u_colorMid.value.lerp(new THREE.Vector3(...target.gradientMid), 0.03);
    uniforms.u_colorEnd.value.lerp(new THREE.Vector3(...target.gradientEnd), 0.03);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
