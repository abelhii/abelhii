import { Center, Scroll, ScrollControls, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { MathUtils } from "three";

import { useGlobalStore } from "@/stores/use-global.store";
import { Abel3DControlled } from "./models/Abel3DControlled";
import AbelAvatar2D from "./models/AbelAvatar2D";
import { Toggle3D } from "./Toggle3D";

export function Header() {
  const viewport = useThree((state) => state.viewport);
  const is3dOn = useGlobalStore((state) => state.is3dOn);

  const scalingFactor = MathUtils.clamp(window.innerWidth / 1440, 0.75, 1.2);

  return (
    <group scale={scalingFactor}>
      <ScrollControls pages={3} damping={0.1}>
        <Scroll html>
          {!is3dOn && (
            <>
              <div className="flex h-screen w-screen items-center justify-center">
                <div className="flex flex-col items-center justify-center bg-none rounded-[6rem]">
                  <h1 className="absolute top-[25%] text-7xl md:text-9xl font-bold z-10">
                    Salutations
                  </h1>
                  <AbelAvatar2D className="z-10" />
                </div>
                <Toggle3D />
              </div>
            </>
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
                  scale={scalingFactor}
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
    </group>
  );
}
