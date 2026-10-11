"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ORANGE = "#ff6b2c";
const VIOLET = "#818cf8";

function ParticleField({ density }: { density: "low" | "high" }) {
  const pointsRef = useRef<THREE.Points>(null);
  const spin = useRef(0);
  const pointer = useRef({ x: 0, y: 0 });
  const count = density === "high" ? 1400 : 600;

  const geometry = useMemo(() => {
    const base = density === "high" ? 11.7 : 5.3;
    const random = (value: number) => {
      const wave = Math.sin(value * 127.1 + base) * 43758.5453;
      return wave - Math.floor(wave);
    };
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const orange = new THREE.Color(ORANGE);
    const violet = new THREE.Color(VIOLET);

    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (random(index * 3 + 1) - 0.5) * 16;
      positions[index * 3 + 1] = (random(index * 3 + 2) - 0.5) * 9;
      positions[index * 3 + 2] = (random(index * 3 + 3) - 0.5) * 6;

      const color = random(index + 0.5) < 0.72 ? orange : violet;
      colors[index * 3] = color.r;
      colors[index * 3 + 1] = color.g;
      colors[index * 3 + 2] = color.b;
    }

    const next = new THREE.BufferGeometry();
    next.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    next.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return next;
  }, [count, density]);

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      pointer.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
    };
  }, [geometry]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points) return;
    const step = Math.min(delta, 0.05);
    const scroll = window.scrollY;

    spin.current += step * 0.025;
    points.rotation.y = spin.current + scroll * 0.00012;
    points.rotation.x +=
      (pointer.current.y * 0.12 - points.rotation.x) * Math.min(1, step * 1.5);
    points.position.x +=
      (pointer.current.x * 0.25 - points.position.x) * Math.min(1, step * 1.2);
    points.position.y =
      Math.sin(state.clock.elapsedTime * 0.12) * 0.12 -
      (scroll % Math.max(window.innerHeight, 1)) * 0.00008;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        vertexColors
        sizeAttenuation
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function AmbientScene({ density }: { density: "low" | "high" }) {
  return (
    <Canvas
      dpr={density === "high" ? [1, 2] : [1, 1]}
      camera={{ position: [0, 0, 8], fov: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop="always"
      style={{ position: "absolute", inset: 0 }}
    >
      <ParticleField density={density} />
    </Canvas>
  );
}
