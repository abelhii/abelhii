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
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva } from "leva";
import { ReactNode, useRef } from "react";
import { Points } from "three";

import { useGlobal } from "@/context/global.context";
import { useIsDebugging } from "@/hooks/use-is-debugging";
import { cn } from "@/lib/shadcn.utils";
import { Abel3DControlled } from "./models/Abel3DControlled";
import AbelAvatar2D from "./models/AbelAvatar2D";

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
  const { is3dOn } = useGlobal();
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
        <ScrollControls pages={3} damping={0.1}>
          <Scroll html>
            {!is3dOn && (
              <div className="flex h-screen w-screen items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-none rounded-[6rem]">
                  <h1 className="absolute top-[25%] text-9xl font-bold z-10">
                    Salutations
                  </h1>
                  <AbelAvatar2D className="z-10" />
                </div>
              </div>
            )}

            <div className="text-white">
              <h1 className="absolute top-0">1</h1>
              <h1 className="absolute top-[100vh]">2</h1>
              <h1 className="absolute top-[200vh]">3</h1>
            </div>
          </Scroll>
          {is3dOn && (
            <>
              <Scroll>
                <Center top position={[0, 0.8, -1]}>
                  <Text3D
                    material-fog={false}
                    letterSpacing={0}
                    size={0.5}
                    font="/Inter_Bold.json"
                  >
                    Salutations
                    <meshStandardMaterial color="white" />
                  </Text3D>
                </Center>
              </Scroll>
              <Abel3DControlled />
            </>
          )}
        </ScrollControls>
      </Canvas>

      {children}
    </div>
  );
}
