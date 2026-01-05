"use client";

import { Environment, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva } from "leva";

import { Background } from "@/components/Background";
import { Header2D } from "@/components/Header2D";
import { Header3D } from "@/components/Header3D";
import { Abel3DControlled } from "@/components/models/Abel3DControlled";
import { useIsDebugging } from "@/hooks/use-is-debugging";
import { useGlobalStore } from "@/stores/use-global.store";
import { MathUtils } from "three";

export default function HomePage() {
  const { is3dOn } = useGlobalStore();
  const { isDebugging } = useIsDebugging();
  const scalingFactor = MathUtils.clamp(window.innerWidth / 1440, 0.75, 1.2);

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen min-w-screen">
      <div className="absolute flex flex-col items-center justify-center w-screen h-screen bg-black">
        <Leva hidden={!isDebugging} />
        <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 4] }}>
          <Background />
          <Environment preset="sunset" />
          <ScrollControls pages={3} damping={0.1}>
            <group scale={scalingFactor}>
              <Scroll>{is3dOn && <Header3D />}</Scroll>
              {is3dOn && <Abel3DControlled />}

              <Scroll html>
                {!is3dOn && <Header2D />}
                <div className="text-white">
                  <h1 className="absolute top-0">1</h1>
                  <h1 className="absolute top-[100vh]">2</h1>
                  <h1 className="absolute top-[200vh]">3</h1>
                </div>
              </Scroll>
            </group>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
