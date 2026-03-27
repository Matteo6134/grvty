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
uniform vec2 u_mouse;
uniform vec3 u_colorStart;
uniform vec3 u_colorMid;
uniform vec3 u_colorEnd;
uniform vec3 u_bgColor;
uniform vec3 u_dynamicColor;
uniform bool u_isRGBMode;
uniform float u_opacity;
varying vec2 vUv;

void main() {
  vec2 uv = vUv;
  vec2 center = vec2(0.5, 0.5);

  vec2 targetCenter = mix(center, u_mouse, 0.15);
  float dist = distance(uv, targetCenter);

  vec3 headColor = u_isRGBMode ? u_dynamicColor : u_colorStart;
  vec3 midColor  = u_isRGBMode ? (headColor * 0.7) : u_colorMid;
  vec3 bgColor   = u_bgColor;

  float orb  = smoothstep(0.8, 0.0, dist);
  float core = smoothstep(0.35, 0.0, dist);

  vec3 sphereCol = mix(bgColor, midColor, orb);
  sphereCol = mix(sphereCol, headColor, core);

  float shimmer = sin(uv.x * 10.0 + u_time * 0.5) * cos(uv.y * 8.0 - u_time * 0.3) * 0.02;
  sphereCol += shimmer * orb;

  gl_FragColor = vec4(sphereCol, u_opacity);
}`;

interface GradientBackgroundProps {
  opacity?: number;
  emissiveColor?: string;
  isRGBMode?: boolean;
}

// bgColor separato da gradientEnd:
// in dark mode coincide con gradientEnd (quasi nero)
// in light mode è leggermente più scuro di gradientEnd per non saturare di bianco
const BG_DARK: [number, number, number] = [0.04, 0.04, 0.04];
const BG_LIGHT: [number, number, number] = [0.88, 0.84, 0.78]; // crema scura, mai bianco

export function GradientBackground({
  opacity = 1,
  emissiveColor = "#d4b055",
  isRGBMode = false,
}: GradientBackgroundProps) {
  const { isDark } = useTheme();
  const meshRef = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(
    () => ({
      u_time: { value: 0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_colorStart: { value: new THREE.Vector3(...COLORS.dark.gradientStart) },
      u_colorMid: { value: new THREE.Vector3(...COLORS.dark.gradientMid) },
      u_colorEnd: { value: new THREE.Vector3(...COLORS.dark.gradientEnd) },
      u_bgColor: { value: new THREE.Vector3(...BG_DARK) },
      u_dynamicColor: { value: new THREE.Color(emissiveColor) },
      u_isRGBMode: { value: isRGBMode },
      u_opacity: { value: opacity },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const mouseSmooth = useMemo(() => new THREE.Vector2(0.5, 0.5), []);

  useFrame((state) => {
    const target = isDark ? COLORS.dark : COLORS.light;
    const targetBg = isDark ? BG_DARK : BG_LIGHT;

    uniforms.u_time.value = state.clock.elapsedTime;

    mouseSmooth.x = THREE.MathUtils.lerp(mouseSmooth.x, (state.mouse.x + 1) / 2, 0.15);
    mouseSmooth.y = THREE.MathUtils.lerp(mouseSmooth.y, (state.mouse.y + 1) / 2, 0.15);
    uniforms.u_mouse.value.copy(mouseSmooth);

    if (meshRef.current) {
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, state.mouse.x * 0.8, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, state.mouse.y * 0.8, 0.05);
    }

    uniforms.u_opacity.value = THREE.MathUtils.lerp(uniforms.u_opacity.value, opacity, 0.1);
    uniforms.u_isRGBMode.value = isRGBMode;
    uniforms.u_dynamicColor.value.lerp(new THREE.Color(emissiveColor), 0.05);

    uniforms.u_colorStart.value.lerp(new THREE.Vector3(...target.gradientStart), 0.03);
    uniforms.u_colorMid.value.lerp(new THREE.Vector3(...target.gradientMid), 0.03);
    uniforms.u_colorEnd.value.lerp(new THREE.Vector3(...target.gradientEnd), 0.03);

    // bgColor ha il suo target separato — non va mai a bianco puro
    uniforms.u_bgColor.value.lerp(new THREE.Vector3(...targetBg), 0.03);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <planeGeometry args={[120, 120]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}