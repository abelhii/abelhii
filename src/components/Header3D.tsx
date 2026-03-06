/* eslint-disable react/no-unescaped-entities */
import {
  Billboard,
  Center,
  Cloud,
  Clouds,
  Scroll,
  Text,
} from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { MathUtils, MeshBasicMaterial } from "three";

import { Abel3DControlled } from "./models/Abel3DControlled";
import { SpeechBubble } from "./models/SpeechBubble";

export function Header3D() {
  useThree((state) => state.viewport);
  const scalingFactor = MathUtils.clamp(window.innerWidth / 1440, 0.75, 1.2);

  const { cloudOneColor, cloudTwoColor } = useControls("Clouds", {
    cloudOneColor: { value: "#ffffff" },
    cloudTwoColor: { value: "#ff6d53" },
  });

  return (
    <group scale={scalingFactor}>
      <Scroll>
        {/* <Billboard
          follow={false}
          lockX={false}
          lockY={false}
          lockZ={false} // Lock the rotation on the z axis (default=false)
        >
          <Center top position={[-1, 0.5, 0]}>
            <SpeechBubble scale={0.8}>
              <Text fontWeight="bold" color="black" position={[0, 1, 0]}>
                Hello, my name is Abel
              </Text>
              <Text fontWeight="bold" color="black" position={[0, -0.5, 0]}>
                I'm a Frontend Developer
              </Text>
              <Text fontWeight="bold" color="black" position={[0, -2, 0]}>
                Welcome to my portfolio!
              </Text>
            </SpeechBubble>
          </Center>
        </Billboard> */}

        <Clouds
          material={MeshBasicMaterial}
          scale={0.8}
          position={[0, -4.3, -0.5]}
        >
          <Cloud
            segments={40}
            bounds={[10, 2, 2]}
            volume={7}
            color={cloudOneColor}
          />
          <Cloud
            seed={1}
            scale={2}
            volume={5}
            color={cloudTwoColor}
            fade={100}
          />
        </Clouds>
      </Scroll>
      <Abel3DControlled position={[0, 0, 0]} />\
    </group>
  );
}
