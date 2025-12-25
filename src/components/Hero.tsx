"use client";

import { OrbitControls, Stage } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { AbelBust } from "./models/AbelBust";

export function Hero() {
  const ref = useRef(null);

  return (
    <div className="flex items-center justify-center w-screen h-[80vh]">
      <ErrorBoundary
        fallback={
          <Image
            src="/abel-bust.png"
            alt="Failed to load 3D model"
            width={500}
            height={500}
          />
        }
      >
        <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
          <Stage
            preset="rembrandt"
            environment="dawn"
            shadows={false}
            intensity={1}
          >
            <AbelBust />
          </Stage>
          <OrbitControls
            ref={ref}
            autoRotate
            autoRotateSpeed={10}
            enableZoom={false}
            enablePan={false}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
