"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";
import { COLORS } from "@/lib/constants";

// High quality Noise & Fluid Gradient Shaders
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform float u_time;
uniform vec3 u_colorStart;
uniform vec3 u_colorMid;
uniform vec3 u_colorEnd;
uniform vec3 u_dynamicColor;
uniform bool u_isRGBMode;
uniform float u_opacity;
varying vec2 vUv;

// Simple Noise for performance and visibility
float rand(vec2 n) { 
	return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
	const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
	return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

void main() {
  vec2 uv = vUv;
  
  // High contrast movement
  float n = noise(uv * 3.0 + u_time * 0.2);
  
  // Base Colors transition
  vec3 headColor = u_isRGBMode ? u_dynamicColor : u_colorStart;
  vec3 midColor = u_isRGBMode ? (u_dynamicColor * 0.4) : u_colorMid;
  vec3 backColor = u_colorEnd;

  // Create radial focus
  float dist = distance(uv, vec2(0.5, 0.5));
  float circle = smoothstep(0.7, 0.2, dist + n * 0.15);
  
  // Mix layers
  vec3 finalColor = mix(backColor, midColor, circle);
  finalColor = mix(finalColor, headColor, circle * (1.0 - dist * 1.5));

  // Add subtle shimmer
  finalColor += rand(uv + u_time * 0.01) * 0.02;

  gl_FragColor = vec4(finalColor, u_opacity);
}`;

interface GradientBackgroundProps {
  opacity?: number;
  emissiveColor?: string;
  isRGBMode?: boolean;
}

export function GradientBackground({ 
  opacity = 1, 
  emissiveColor = "#d4b055",
  isRGBMode = false 
}: GradientBackgroundProps) {
  const { isDark } = useTheme();

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_colorStart: { value: new THREE.Vector3(...COLORS.dark.gradientStart) },
      u_colorMid: { value: new THREE.Vector3(...COLORS.dark.gradientMid) },
      u_colorEnd: { value: new THREE.Vector3(...COLORS.dark.gradientEnd) },
      u_dynamicColor: { value: new THREE.Color(emissiveColor) },
      u_isRGBMode: { value: isRGBMode },
      u_opacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useFrame((state) => {
    const target = isDark ? COLORS.dark : COLORS.light;
    uniforms.u_time.value = state.clock.elapsedTime;
    // Forziamo opacità alta per visibilità
    uniforms.u_opacity.value = THREE.MathUtils.lerp(uniforms.u_opacity.value, opacity * 1.0, 0.1);
    uniforms.u_isRGBMode.value = isRGBMode;
    
    uniforms.u_dynamicColor.value.lerp(new THREE.Color(emissiveColor), 0.05);
    uniforms.u_colorStart.value.lerp(new THREE.Vector3(...target.gradientStart), 0.03);
    uniforms.u_colorMid.value.lerp(new THREE.Vector3(...target.gradientMid), 0.03);
    uniforms.u_colorEnd.value.lerp(new THREE.Vector3(...target.gradientEnd), 0.03);
  });

  return (
    <mesh position={[0, 0, -5]}>
      <planeGeometry args={[100, 100]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
