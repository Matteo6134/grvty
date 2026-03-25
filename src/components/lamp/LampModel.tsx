"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center, Environment, ContactShadows, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

// --- COMPONENTE MODELLO ---
export interface LampModelProps {
  positionY?: number;
  lightIntensity?: number;
  emissiveColor?: string;
  isRGBMode?: boolean;
}

export function LampModel({
  positionY = 0,
  lightIntensity = 0,
  emissiveColor = "#ffdb58",
  isRGBMode = false
}: LampModelProps) {
  // Sostituisci con il percorso corretto del tuo file .gltf o .glb
  const { scene } = useGLTF("/models/lamp-final.glb");
  const lightRef = useRef<THREE.PointLight>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Ottimizzazione materiali e reset posizione
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        // Rendiamo il materiale "figo" e reattivo
        child.material.roughness = 0.1;
        child.material.metalness = 0.8;
        child.material.emissive = new THREE.Color(emissiveColor);
        child.material.emissiveIntensity = 0;
        // Importante per i riflessi
        child.material.envMapIntensity = 2;
      }
    });
  }, [scene, emissiveColor]);

  useFrame((state) => {
    // 1. L'intensità della luce segue lo scroll (da 0 a 1)
    const power = lightIntensity * 5;

    if (lightRef.current) {
      // Intensità della luce puntiforme (interno lampada)
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, power * 20, 0.1);
    }

    if (groupRef.current) {
      // Applichiamo la positionY passata
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, positionY, 0.1);
    }

    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
        // Effetto "glow" del materiale
        child.material.emissiveIntensity = THREE.MathUtils.lerp(
          child.material.emissiveIntensity,
          power,
          0.1
        );
      }
    });
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} />
        <pointLight
          ref={lightRef}
          color={emissiveColor}
          distance={10}
          decay={2}
          intensity={0}
        />
      </Center>
    </group>
  );
}