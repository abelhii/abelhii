import { ComponentPropsWithRef } from "react";

export function Project(props?: ComponentPropsWithRef<"mesh">) {
  return (
    <mesh {...props}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
