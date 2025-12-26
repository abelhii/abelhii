import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export function useLerpedMouse() {
  const mouse = useThree((state) => state.mouse);
  const lerped = useRef(mouse.clone());
  const previous = new THREE.Vector2();
  useFrame((state) => {
    previous.copy(lerped.current);
    lerped.current.lerp(mouse, 0.1);
    // Regress system when the mouse is moved
    if (!previous.equals(lerped.current)) state.performance.regress();
  });
  return lerped;
}
