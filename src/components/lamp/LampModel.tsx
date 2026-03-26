"use client";

import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

// --- COMPONENTE MODELLO ---
export interface LampModelProps {
  positionY?: number;
  positionX?: number;
  lightIntensity?: number;
  emissiveColor?: string;
  isRGBMode?: boolean;
  scrollProgress?: number;
}

export function LampModel({
  positionY = 0,
  positionX = 0,
  lightIntensity = 0,
  emissiveColor = "#ffdb58",
  isRGBMode = false,
  scrollProgress = 0,
}: LampModelProps) {
  // Sostituisci con il percorso corretto del tuo file .gltf o .glb
  const { scene } = useGLTF("/models/lamp.gltf");
  const lightRef = useRef<THREE.PointLight>(null);
  const groupRef = useRef<THREE.Group>(null);
  const rotationGroupRef = useRef<THREE.Group>(null);

  // Ottimizzazione materiali ad ALTA QUALITÀ
  useMemo(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {

        // --- LOGICA DI SCOPERTA BULBO ---
        const isInternalSphere =
          child.name.toLowerCase().includes("sphere") ||
          child.name.toLowerCase().includes("bulb") ||
          child.name.toLowerCase().includes("luce") ||
          child.material.name.toLowerCase().includes("emissive");

        if (isInternalSphere) {
          child.material = child.material.clone();
          child.material.name = "Bulb_Material";
          child.material.color = new THREE.Color(emissiveColor);
          child.material.emissive = new THREE.Color(emissiveColor);
          child.material.emissiveIntensity = 0;
          child.material.transparent = true;
          child.material.opacity = 0.8; // Leggera trasparenza
          child.material.roughness = 0.0;
          child.material.metalness = 0.0;
        } else {
          // La struttura esterna - ORA BIANCO CREMA / PLASTICA PREMIUM
          child.material = child.material.clone();
          child.material.name = "Frame_Material";
          child.material.color = new THREE.Color("#f5f0eb"); // Bianco crema / Avorio
          child.material.emissive = new THREE.Color("#000000");
          child.material.emissiveIntensity = 0;
          child.material.roughness = 0.3; // Effetto plastica morbida / satinata
          child.material.metalness = 0.1; // Non metallico, effetto polimero
          child.material.envMapIntensity = 1.0;
        }

        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [scene, emissiveColor]);

  useFrame((state) => {
    const power = lightIntensity * 5;
    const targetColor = new THREE.Color(emissiveColor);

    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(lightRef.current.intensity, power * 25, 0.05);
      lightRef.current.color.lerp(targetColor, 0.05);
    }

    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, positionY, 0.1);
      groupRef.current.position.x = THREE.MathUtils.lerp(groupRef.current.position.x, positionX * 8, 0.08);
    }

    // --- LOGICA DI ROTAZIONE DINAMICA ---
    if (rotationGroupRef.current) {
      let targetRotation = Math.PI;
      
      if (scrollProgress < 0.3) {
        const t = scrollProgress / 0.3;
        targetRotation = Math.PI + (t * 0.35);
      } else if (scrollProgress < 0.5) {
        const t = (scrollProgress - 0.3) / 0.2;
        targetRotation = (Math.PI + 0.35) + (t * 0.5);
      } else if (scrollProgress < 0.85) {
        const t = (scrollProgress - 0.5) / 0.35;
        targetRotation = (Math.PI + 0.85) - (t * 0.15);
      } else {
        // ONE-TIME 360 Rotation during CTA transition
        const t = (scrollProgress - 0.85) / 0.15;
        // Start at 0.7 offset and add 360 degrees (2*PI) over the progress t
        targetRotation = (Math.PI + 0.7) - (t * Math.PI * 2); 
      }

      rotationGroupRef.current.rotation.y = THREE.MathUtils.lerp(
        rotationGroupRef.current.rotation.y,
        targetRotation,
        0.05
      );
    }

    // --- AGGIORNAMENTO DINAMICO COLORE - SOLO PER IL BULBO ---
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {

        if (child.material.name === "Bulb_Material") {
          child.material.color.lerp(targetColor, 0.05);
          child.material.emissive.lerp(targetColor, 0.05);
          child.material.emissiveIntensity = THREE.MathUtils.lerp(
            child.material.emissiveIntensity,
            power,
            0.05
          );
        } else {
          // IL FRAME rimane scuro e spento col suo colore di base bianco crema
          child.material.color.set("#f5f0eb");
          child.material.emissive.set("#000000");
          child.material.emissiveIntensity = 0;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      <group ref={rotationGroupRef}>
        <Center>
          <primitive object={scene} scale={0.1} />
          <pointLight
            ref={lightRef}
            color={emissiveColor}
            position={[0, 4, 0]}
            distance={25}
            decay={2}
            intensity={0}
          />
        </Center>
      </group>
    </group>
  );
}