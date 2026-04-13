"use client";

import React, { useRef, useLayoutEffect, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

const DRACO_PATH = "https://www.gstatic.com/draco/versioned/decoders/1.5.7/";
const GLB_DESKTOP = "/models/lamp.glb";
const GLB_MOBILE = "/models/lamp_draco.glb";

// Preload both so the correct one is cached
useGLTF.preload(GLB_DESKTOP, DRACO_PATH);
useGLTF.preload(GLB_MOBILE, DRACO_PATH);

// Determine which GLB to load (runs once at module init, before hooks)
const getGlbPath = () => {
  if (typeof window === "undefined") return GLB_DESKTOP;
  return window.innerWidth < 768 ? GLB_MOBILE : GLB_DESKTOP;
};

export interface LampModelProps {
  positionY?: number;
  positionX?: number;
  lightIntensity?: number;
  emissiveColor?: string;
  scrollProgress?: number;
  isRGBMode?: boolean;
  phase?: string;
  introProgress?: number;
}

function mapRange(val: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
  const t = Math.max(0, Math.min(1, (val - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}

// Supporta sia i nomi originali che quelli rinominati (con o senza trattini bassi)
const isBulbNode = (name: string) =>
  name.includes("Area_(2)") || name.includes("Area (2)") || name.includes("E27-light-bulb");

const isShellNode = (name: string) =>
  name.includes("Area_(1)") || name.includes("Area (1)") || name.includes("gravity");

const isLightNode = (name: string) =>
  name.includes("Spherical");

export function LampModel({
  positionY = 0,
  positionX = 0,
  lightIntensity = 0,
  emissiveColor = "#ffdb58",
  scrollProgress = 0,
  isRGBMode = false,
  phase = "hero",
  introProgress = 1
}: LampModelProps) {
  const glbPath = useMemo(() => getGlbPath(), []);
  const { scene } = useGLTF(glbPath, DRACO_PATH);
  const { size } = useThree();

  const responsiveScale = useMemo(() => {
    if (size.width < 768) return 0.045;
    if (size.width < 1200) return 0.055;
    return 0.07;
  }, [size.width]);

  const groupRef = useRef<THREE.Group>(null);
  const rotationGroupRef = useRef<THREE.Group>(null);
  const pointLightRef = useRef<THREE.PointLight | null>(null);
  const bulbMeshRef = useRef<THREE.Mesh | null>(null);
  const shellMeshRef = useRef<THREE.Mesh | null>(null);

  const warmupRef = useRef(0);
  const prevLightOnRef = useRef(false);
  const centeredRef = useRef(false);
  const initializedPosRef = useRef(false);

  useLayoutEffect(() => {
    bulbMeshRef.current = null;
    shellMeshRef.current = null;
    pointLightRef.current = null;
    centeredRef.current = false;

    const applyCenter = () => {
      if (centeredRef.current) return;
      const box = new THREE.Box3().setFromObject(scene);
      if (box.isEmpty()) return;
      const center = new THREE.Vector3();
      box.getCenter(center);
      scene.position.x -= center.x;
      scene.position.y -= center.y;
      centeredRef.current = true;
    };

    applyCenter();
    const raf1 = requestAnimationFrame(applyCenter);
    const timer = setTimeout(applyCenter, 100);

    scene.traverse((child) => {
      const name = child.name;

      // ── Luce point (Spherical) ──
      if (child instanceof THREE.PointLight) {
        if (isLightNode(name)) {
          pointLightRef.current = child;
          child.color.set(emissiveColor);
          child.intensity = 0;
          // MODIFICA: Migliora la dispersione nell'ambiente
          child.distance = 35; // Raggio d'azione della luce (più grande = illumina di più la scena)
          child.decay = 1.5;   // Falloff più dolce, la luce non muore subito
        } else {
          child.intensity = 0;
        }
        return;
      }

      if (child instanceof THREE.Light) {
        child.intensity = 0;
        return;
      }

      if (!(child instanceof THREE.Mesh)) return;

      // ── Bulbo di vetro ──
      if (isBulbNode(name)) {
        bulbMeshRef.current = child;
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#727272"),
          emissive: new THREE.Color("#000000"),
          emissiveIntensity: 0,
          // Vetro molto satinato per massima diffusione morbida
          roughness: 0.9,
          metalness: 0,
          transmission: 0.5,   // Minore trasmissione per disperdere più luce 
          thickness: 2.0,
          ior: 1,
          transparent: false,
          opacity: 0.6,        // Più presente visivamente
          side: THREE.FrontSide,
        });
        return;
      }

      if (isShellNode(name)) {
        shellMeshRef.current = child;
        child.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color("#ffffff"),
          roughness: 0.85,  // Slight bump to handle direct light softer
          metalness: 0.0,
          transmission: 0.0, // Removes the transparent bleed-through from the background
          thickness: 1.0,
          ior: 1.46,
          emissive: new THREE.Color("#000000"),
          emissiveIntensity: 0,
        });
        return;
      }

      if (child.material) {
        const mat = child.material as THREE.MeshStandardMaterial;
        if (mat.emissive) {
          mat.emissive.set("#000000");
          mat.emissiveIntensity = 0;
        }
      }
    });

    return () => {
      cancelAnimationFrame(raf1);
      clearTimeout(timer);
      bulbMeshRef.current = null;
      shellMeshRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene]);

  const prevColorRef = useRef(emissiveColor);
  const glowPulseRef = useRef(1);

  useFrame((_, delta) => {
    let finalIntensity = lightIntensity;
    let finalColor = emissiveColor;
    
    // Intro Sequence overrides (0 to 1 over 2.8s)
    if (introProgress < 1) {
      finalColor = "#ff9500"; // warm yellow-orange tint
      if (introProgress < 0.2) {
        finalIntensity = mapRange(introProgress, 0.0, 0.2, 0, 1.5); // Fades up
      } else if (introProgress < 0.6) {
        finalIntensity = 1.5; // Max bright
      } else {
        finalIntensity = mapRange(introProgress, 0.6, 0.8, 1.5, 0); // Fades down
      }
    }

    if (prevColorRef.current !== finalColor) {
      glowPulseRef.current = 0;
      prevColorRef.current = finalColor;
    }
    glowPulseRef.current = THREE.MathUtils.lerp(glowPulseRef.current, 1, 0.08);

    const isOn = finalIntensity > 0.01;
    const targetColor = new THREE.Color(finalColor);
    const power = Math.min(finalIntensity * 1.5, 3) * glowPulseRef.current;

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

    const warmupEased = 1 - Math.pow(1 - warmupRef.current, 3);

    // Animazione Luce (Dispersione e Intensità bilanciati)
    if (pointLightRef.current) {
      // Significantly reduced multiplier to prevent harsh artificial burn
      const multiplier = isRGBMode ? 4 : 16;
      const targetIntensity = isOn
        ? power * multiplier * warmupEased
        : power * multiplier * warmupRef.current;

      pointLightRef.current.intensity = THREE.MathUtils.lerp(
        pointLightRef.current.intensity,
        targetIntensity,
        0.15
      );
      pointLightRef.current.color.lerp(targetColor, 0.1);
    }

    // Animazione Vetro Bulbo
    if (bulbMeshRef.current) {
      const mat = bulbMeshRef.current.material as THREE.MeshPhysicalMaterial;
      const filamentColor = new THREE.Color("#ff9500");
      const glowColor = isOn
        ? filamentColor.clone().lerp(targetColor, warmupEased)
        : new THREE.Color("#000000");

      mat.emissive.lerp(glowColor, 0.15);
      // Very subtle inner glow to avoid fake burn
      mat.emissiveIntensity = THREE.MathUtils.lerp(
        mat.emissiveIntensity,
        isOn ? power * 0.3 * warmupEased : 0,
        0.12
      );
    }

    // Animazione Plastica corpo (Glow diffuso)
    if (shellMeshRef.current) {
      const mat = shellMeshRef.current.material as THREE.MeshPhysicalMaterial;
      mat.emissive.lerp(
        isOn ? targetColor : new THREE.Color("#000000"),
        0.04
      );
      // Shell diffusion glow — deliberately subtle
      mat.emissiveIntensity = power * (isRGBMode ? 0.10 : 0.12) * (isOn ? warmupEased : warmupRef.current);
      mat.attenuationColor.lerp(
        new THREE.Color(isOn ? emissiveColor : "#fff5e0"),
        0.05
      );
      mat.color.lerp(new THREE.Color("#ffffff"), 0.05);
      mat.roughness = THREE.MathUtils.lerp(mat.roughness, 0.80, 0.05);
    }

    if (groupRef.current) {
      if (!initializedPosRef.current) {
        groupRef.current.position.y = positionY;
        groupRef.current.position.x = positionX * 8;
      } else {
        groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, positionY, 0.1);
        groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, positionX * 8, 0.08);
      }
    }

    if (rotationGroupRef.current) {
      const FRONT = 0;
      const ANGLE_L = -Math.PI / 5;
      const TWO_PI = Math.PI * 2;
      const s = scrollProgress;
      const P1 = 0.15, P2 = 0.35, P6 = 0.88;

      let targetRot: number;
      if (s < P1) targetRot = ANGLE_L;
      else if (s < P2) targetRot = mapRange(s, P1, P2, ANGLE_L, FRONT);
      else if (phase === "rgb") targetRot = Math.PI / 6;
      else if (s < P6) targetRot = FRONT;
      else targetRot = mapRange(s, P6, 1, FRONT, TWO_PI);

      // Intro overrides rotation
      if (introProgress < 1) {
        if (introProgress < 0.25) {
          // move from ANGLE_L to FRONT
          targetRot = mapRange(introProgress, 0.0, 0.25, ANGLE_L, FRONT);
        } else if (introProgress < 0.6) {
          // Hold FRONT
          targetRot = FRONT;
        } else {
          // move from FRONT back to ANGLE_L
          targetRot = mapRange(introProgress, 0.6, 1.0, FRONT, ANGLE_L);
        }
      }

      if (!initializedPosRef.current) {
        rotationGroupRef.current.rotation.y = targetRot;
        initializedPosRef.current = true; // all initial setups done
      } else {
        rotationGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          rotationGroupRef.current.rotation.y,
          targetRot,
          0.08
        );
      }
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