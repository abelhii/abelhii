/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Sky, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Points } from "three";

export function Background() {
  const ref = useRef<Points | null>(null);
  useFrame((_, delta) => {
    if (ref.current === null) return;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <Sky
      distance={450000}
      sunPosition={[0, 2, 1]}
      inclination={2}
      azimuth={0.25}
    />
  );

  return (
    <Stars
      ref={ref}
      fade
      radius={100}
      depth={10}
      count={5000}
      factor={10}
      saturation={0}
      speed={1.5}
    />
  );
}
