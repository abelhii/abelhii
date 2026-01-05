import { Center, Text3D } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { MathUtils } from "three";

export function Header3D() {
  const viewport = useThree((state) => state.viewport);
  const scalingFactor = MathUtils.clamp(window.innerWidth / 1440, 0.75, 1.2);

  return (
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
  );
}
