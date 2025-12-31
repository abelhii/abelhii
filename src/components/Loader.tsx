import { Html, useProgress } from "@react-three/drei";
import AbelAvatar2D from "./models/AbelAvatar2D";

export function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <AbelAvatar2D />
    </Html>
  );
}
