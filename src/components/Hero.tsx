"use client";

import { OrbitControls, Stage, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { ErrorBoundary } from "react-error-boundary";

import { cn } from "@/lib/shadcn.utils";
import { AbelBust } from "./models/AbelBust";

type HeroProps = { className?: string };

export function Hero({ className }: HeroProps) {
  const ref = useRef(null);
  const [autoRotate, setAutoRotate] = useState(true);

  // timeout ref to store the id so we can clear it
  const timeoutRef = useRef<number | null>(null);

  // clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    // stop auto-rotate immediately and clear any pending resume timers
    setAutoRotate(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleEnd = () => {
    // schedule re-enabling auto-rotate after 3s
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setAutoRotate(true);
      timeoutRef.current = null;
    }, 3000);
  };

  return (
    <div
      className={cn(
        "absolute flex items-center justify-center w-screen h-screen bg-black",
        className
      )}
    >
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
        <Canvas dpr={[1, 2]} camera={{ fov: 50 }}>
          <Stars
            radius={100}
            depth={50}
            count={5000}
            factor={12}
            saturation={0}
            fade
            speed={2}
          />
          <Stage
            preset="soft"
            environment="sunset"
            shadows={false}
            intensity={1}
          >
            <AbelBust />
          </Stage>
          <OrbitControls
            ref={ref}
            enableDamping
            autoRotate={autoRotate}
            enablePan={false}
            onStart={handleStart}
            onEnd={handleEnd}
          />
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
