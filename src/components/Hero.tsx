"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";

import { AbelBust } from "./models/AbelBust";

export function Hero() {
  const ref = useRef(null);

  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
      <Suspense fallback={null}>
        <Stage
          ref={ref}
          preset="rembrandt"
          environment="dawn"
          shadows={false}
          intensity={1}
        >
          <AbelBust />
        </Stage>
      </Suspense>
      <OrbitControls
        ref={ref}
        autoRotate
        enableZoom={false}
        enablePan={false}
      />
    </Canvas>
  );
}
