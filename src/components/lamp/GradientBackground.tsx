"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "@/hooks/useTheme";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_bgColor;
uniform vec3 u_dynamicColor;
uniform float u_opacity;
uniform float u_intensity;
uniform bool u_isDark;
varying vec2 vUv;

// High-quality noise for film grain
float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

// Organic Blob function
float blob(vec2 uv, vec2 pos, float size, vec2 stretch) {
  vec2 d = uv - pos;
  d *= stretch; // Independent X and Y stretching
  return smoothstep(size, 0.0, length(d));
}

void main() {
  vec2 uv = vUv;
  vec2 mouse = mix(vec2(0.5, 0.5), u_mouse, 0.2);
  
  // Base background
  vec3 color = u_bgColor;

  // Blob 1: Primary Amber Glow (Centrale, morbido)
  float b1 = blob(uv, mouse + vec2(sin(u_time * 0.3) * 0.05, cos(u_time * 0.2) * 0.03), 0.5, vec2(1.0, 2.0));
  vec3 c1 = u_dynamicColor * 2.0; 
  
  // Blob 2: Orange Light Leak (Destra, molto schiacciato)
  vec2 p2 = vec2(0.75 + sin(u_time * 0.4) * 0.1, 0.4 + cos(u_time * 0.5) * 0.2);
  float b2 = blob(uv, p2, 0.7, vec2(0.4, 15.0));
  vec3 c2 = vec3(1.0, 0.4, 0.0) * 1.5; // Vivid Orange
  
  // Blob 3: Blue Light Leak (Sinistra, molto schiacciato)
  vec2 p3 = vec2(0.25 + cos(u_time * 0.3) * 0.1, 0.6 + sin(u_time * 0.4) * 0.2);
  float b3 = blob(uv, p3, 0.6, vec2(0.4, 12.0));
  vec3 c3 = vec3(0.0, 0.3, 1.0) * 1.2; // Deep Blue

  // Composite Light Leaks
  vec3 leaks = c1 * b1 + c2 * b2 + c3 * b3;
  
  // Conditionally dim the background and streaks in Light Mode
  float streakScale = u_isDark ? 1.0 : 0.2;
  color += leaks * clamp(u_intensity, 0.1, 1.0) * streakScale;

  // High-frequency professional film grain
  float grain = (random(uv + u_time * 0.01) - 0.5) * 0.05;
  color += grain;

  gl_FragColor = vec4(color, u_opacity);
}`;

interface GradientBackgroundProps {
  opacity?: number;
  emissiveColor?: string;
  isRGBMode?: boolean;
  lightIntensity?: number;
}

export function GradientBackground({
  opacity = 0,
  emissiveColor = "#ffdb58",
  lightIntensity = 0,
}: GradientBackgroundProps) {
  const { isDark } = useTheme();
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_bgColor: { value: new THREE.Vector3(0.01, 0.01, 0.01) },
      u_dynamicColor: { value: new THREE.Color(emissiveColor) },
      u_intensity: { value: lightIntensity },
      u_opacity: { value: opacity },
      u_isDark: { value: isDark },
    }),
    []
  );

  const mouseSmooth = useMemo(() => new THREE.Vector2(0.5, 0.5), []);

  useFrame((state) => {
    // Background colors for the deep studio effect
    const DARK_BG = [0.005, 0.005, 0.006]; // Deepest black
    const LIGHT_BG = [0.75, 0.73, 0.68];   // Our studio beige
    
    const targetBg = isDark ? DARK_BG : LIGHT_BG;

    uniforms.u_time.value = state.clock.elapsedTime;

    mouseSmooth.x = THREE.MathUtils.lerp(mouseSmooth.x, (state.mouse.x + 1) / 2, 0.05);
    mouseSmooth.y = THREE.MathUtils.lerp(mouseSmooth.y, (state.mouse.y + 1) / 2, 0.05);
    uniforms.u_mouse.value.copy(mouseSmooth);

    uniforms.u_opacity.value = THREE.MathUtils.lerp(uniforms.u_opacity.value, opacity, 0.08);
    uniforms.u_intensity.value = THREE.MathUtils.lerp(uniforms.u_intensity.value, lightIntensity, 0.05);
    
    uniforms.u_bgColor.value.lerp(new THREE.Vector3(...targetBg), 0.05);
    uniforms.u_dynamicColor.value.lerp(new THREE.Color(emissiveColor), 0.05);
    uniforms.u_isDark.value = isDark;
  });

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, -10]}
      visible={uniforms.u_opacity.value > 0.001}
    >
      <planeGeometry args={[120, 120]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}