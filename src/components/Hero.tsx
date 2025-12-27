"use client";

import {
  Environment,
  Scroll,
  ScrollControls,
  Stars,
  Text,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import Image from "next/image";
import { useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Group, Object3DEventMap, Points } from "three";

import { cn } from "@/lib/shadcn.utils";
import { useLerpedMouse } from "./hooks/use-lerped-mouse";
import { AbelBust } from "./models/AbelBust";

type HeroProps = { className?: string };

function AbelFollowMouse() {
  const ref = useRef<Group<Object3DEventMap> | null>(null);
  const mouse = useLerpedMouse();
  useFrame(() => {
    if (ref.current === null) return;
    ref.current.rotation.y = (mouse.current.x * Math.PI) / 10;
    ref.current.rotation.x = (mouse.current.y * -Math.PI) / 10;
  });

  return <AbelBust ref={ref} />;
}

function Background() {
  const ref = useRef<Points | null>(null);
  useFrame((_, delta) => {
    if (ref.current === null) return;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <Stars
      ref={ref}
      fade
      radius={100}
      depth={10}
      count={5000}
      factor={20}
      saturation={0}
      speed={1.5}
    />
  );
}

export function Hero({ className }: HeroProps) {
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
        <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 6] }}>
          <Background />
          <Environment preset="sunset" />
          <ScrollControls pages={2} damping={0.1}>
            <Scroll>
              <Text
                position={[0, 2, -5]}
                fontSize={1}
                color="white"
                material-fog={false}
                letterSpacing={0}
              >
                Welcome
              </Text>
              <AbelFollowMouse />
              <Text
                position={[0, -6, 0]}
                fontSize={0.5}
                color="white"
                material-fog={false}
                letterSpacing={0}
              >
                Scroll down to explore more
              </Text>
            </Scroll>
            <Scroll html>
              <div className="h-[200vh] relative text-white">
                <h1>html in here (optional)</h1>
                <h1 className="absolute top-screen">second page</h1>
                <h1 className="absolute top-[100vh]">third page</h1>
              </div>
            </Scroll>
          </ScrollControls>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
