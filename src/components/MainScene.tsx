/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Center,
  Environment,
  Scroll,
  ScrollControls,
  Stars,
  Text3D,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva } from "leva";
import { ReactNode, useRef } from "react";
import { Points } from "three";

import { useIsDebugging } from "@/hooks/use-is-debugging";
import { cn } from "@/lib/shadcn.utils";
import { useGlobalStore } from "@/stores/use-global.store";
import { Abel3DControlled } from "./models/Abel3DControlled";
import AbelAvatar2D from "./models/AbelAvatar2D";
import { Toggle3D } from "./Toggle3D";
import { Header } from "./Header";

type MainSceneProps = { children?: ReactNode; className?: string };

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

export function MainScene({ children, className }: MainSceneProps) {
  const { isDebugging } = useIsDebugging();

  return (
    <div
      className={cn(
        "absolute flex flex-col items-center justify-center w-screen h-screen bg-black",
        className
      )}
    >
      <Leva hidden={!isDebugging} />
      <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 4] }}>
        <Background />
        <Environment preset="sunset" />
        <Header />
      </Canvas>

      {children}
    </div>
  );
}
