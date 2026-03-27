"use client";

import React, { useRef, useLayoutEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

useGLTF.preload("/models/lamp.glb", "https://www.gstatic.com/draco/versioned/decoders/1.5.7/");

export interface LampModelProps {
  positionY?: number;
  positionX?: number;
  lightIntensity?: number;
  emissiveColor?: string;
  scrollProgress?: number;
  isRGBMode?: boolean;
}

function mapRange(val: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const t = Math.max(0, Math.min(1, (val - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

export function LampModel({
  positionY = 0,
  positionX = 0,
  lightIntensity = 0,
  emissiveColor = "#ffdb58",
  scrollProgress = 0,
}: LampModelProps) {
  const { scene } = useGLTF(
    "/models/lamp.glb",
    "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
  );
  const { size } = useThree();

  // Responsive scale: 0.07 for desktop, 0.055 for tablet, 0.045 for mobile
  const responsiveScale = useMemo(() => {
    if (size.width < 768) return 0.045;
    if (size.width < 1200) return 0.055;
    return 0.07;
  }, [size.width]);

  const groupRef = useRef<THREE.Group>(null);
  const rotationGroupRef = useRef<THREE.Group>(null);
  const glbLightRef = useRef<THREE.PointLight | null>(null);
  const bulbMeshesRef = useRef<THREE.Mesh[]>([]);

  // Lampada parte SEMPRE spenta
  const warmupRef = useRef(0);
  const prevLightOnRef = useRef(false);

  // Flag: centering già eseguito su questa istanza di scene
  // Evita di ri-centrare se il componente re-renderizza (es. theme switch)
  const centeredRef = useRef(false);

  useLayoutEffect(() => {
    bulbMeshesRef.current = [];
    centeredRef.current = false; // reset al cambio scena

    // Centering robusto: prova subito, poi ri-prova dopo 1 frame e dopo 100ms
    // Copre sia cache hit (geometria già pronta) sia primo carico (geometria lazy)
    const applyCenter = () => {
      if (centeredRef.current) return;
      const box = new THREE.Box3().setFromObject(scene);
      // Box vuota = geometria non ancora pronta, aspettiamo
      if (box.isEmpty()) return;
      const center = new THREE.Vector3();
      box.getCenter(center);
      scene.position.x -= center.x;
      scene.position.y -= center.y;
      centeredRef.current = true;
    };

    // Tentativo 1: sincrono (funziona su hard refresh con cache)
    applyCenter();

    // Tentativo 2: dopo 1 frame (funziona su primo carico senza cache)
    const raf1 = requestAnimationFrame(applyCenter);

    // Tentativo 3: dopo 100ms (fallback per connessioni lente)
    const timer = setTimeout(applyCenter, 100);

    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh || child instanceof THREE.PointLight)) return;
      const name = child.name.toLowerCase();

      if (name.includes("area") || name.includes("spherical") || name.includes("bulb")) {
        if (child instanceof THREE.PointLight) {
          glbLightRef.current = child;
          child.castShadow = true;
          child.decay = 2;
          child.distance = 0;
          child.intensity = 0;
        } else if (child instanceof THREE.Mesh) {
          bulbMeshesRef.current.push(child);
          // Stato iniziale sempre OFF — niente flash bianco in light mode
          child.material = new THREE.MeshStandardMaterial({
            color: new THREE.Color("#111111"),
            emissive: new THREE.Color("#000000"),
            emissiveIntensity: 0,
            roughness: 0.1,
            metalness: 0.1,
            transparent: true,
            opacity: 0.6,
            toneMapped: false,
          });
        }
      } else if (name.includes("gravity") || name.includes("base")) {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color("#fafae1"),
            roughness: 0.6,
            metalness: 0,
            transmission: 0.8,
            thickness: 2.0,
            ior: 1.45,
            attenuationDistance: 0.5,
            attenuationColor: new THREE.Color("#fafae1"),
            emissive: new THREE.Color("#fdfdd0"),
            emissiveIntensity: 0,
          });
        }
      }
    });

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timer);
      bulbMeshesRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  const prevColorRef = useRef(emissiveColor);
  const glowPulseRef = useRef(1);

  useFrame((_, delta) => {
    if (prevColorRef.current !== emissiveColor) {
      glowPulseRef.current = 0;
      prevColorRef.current = emissiveColor;
    }
    glowPulseRef.current = THREE.MathUtils.lerp(glowPulseRef.current, 1, 0.08);

    const isOn = lightIntensity > 0.01;
    const targetColor = new THREE.Color(emissiveColor);
    const power = Math.min(lightIntensity * 1.5, 3) * glowPulseRef.current;

    // — Accensione realistica —
    const justTurnedOn = isOn && !prevLightOnRef.current;
    const justTurnedOff = !isOn && prevLightOnRef.current;
    prevLightOnRef.current = isOn;

    if (justTurnedOn) warmupRef.current = 0;
    if (justTurnedOff) warmupRef.current = Math.max(warmupRef.current, 0.01);

    if (isOn) {
      warmupRef.current = Math.min(warmupRef.current + delta * 3.5, 1);
    } else {
      warmupRef.current = Math.max(warmupRef.current - delta * 2.0, 0);
    }

    // EaseOut cubica
    const warmupEased = 1 - Math.pow(1 - warmupRef.current, 3);

    // — Luce fisica —
    if (glbLightRef.current) {
      const targetIntensity = power * 50 * (isOn ? warmupEased : warmupRef.current);
      glbLightRef.current.intensity = THREE.MathUtils.lerp(glbLightRef.current.intensity, targetIntensity, 0.15);
      glbLightRef.current.color.lerp(targetColor, 0.1);
    }

    // — Bulbo con warmup filamento —
    bulbMeshesRef.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial;
      const filamentColor = new THREE.Color("#ff6a00");
      const currentBulbColor = isOn
        ? filamentColor.clone().lerp(targetColor, warmupEased)
        : new THREE.Color("#000000");

      mat.emissive.lerp(currentBulbColor, 0.12);
      mat.emissiveIntensity = power * 4 * (isOn ? warmupEased : warmupRef.current);
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, isOn ? THREE.MathUtils.lerp(0.6, 1.0, warmupEased) : 0.6, 0.1);
      mat.color.lerp(isOn ? filamentColor.clone().lerp(targetColor, warmupEased) : new THREE.Color("#111111"), 0.1);
    });

    // — Posizione —
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, positionY, 0.1);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, positionX * 8, 0.08);
    }

    // — Rotazione 7 fasi —
    if (rotationGroupRef.current) {
      const OFFSET = 0;
      const FRONT = 0 + OFFSET;
      const ANGLE_L = -Math.PI / 5 + OFFSET;
      const ANGLE_R = Math.PI / 5 + OFFSET;
      const TWO_PI = Math.PI * 2;

      const s = scrollProgress;
      const P1 = 1 / 7;
      const P2 = 2 / 7;
      const P3 = 3 / 7;
      const P4 = 4 / 7;
      const P5 = 5 / 7;
      const P6 = 6 / 7;

      let targetRot: number;

      if (s < P1) {
        targetRot = ANGLE_L;
      } else if (s < P2) {
        targetRot = mapRange(s, P1, P2, ANGLE_L, FRONT);
      } else if (s < P3) {
        targetRot = FRONT;
      } else if (s < P4) {
        targetRot = FRONT;
      } else if (s < P5) {
        targetRot = FRONT;
      } else if (s < P6) {
        targetRot = FRONT;
      } else {
        targetRot = FRONT;
      }

      rotationGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rotationGroupRef.current.rotation.y,
        targetRot,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <group ref={rotationGroupRef}>
        <primitive object={scene} scale={responsiveScale} />
      </group>
    </group>
  );
}