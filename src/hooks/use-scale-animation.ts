import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, MathUtils } from "three";

type UseScaleAnimationOptions = {
  groupRef?: React.RefObject<Group | null>;
  initialScale?: number;
  pressedScale?: number;
  animLerp?: number;
  autoPlay?: boolean;
};

export function useScaleAnimation({
  groupRef,
  initialScale = 0.15,
  pressedScale = 0.8,
  animLerp = 0.12,
  autoPlay = true,
}: UseScaleAnimationOptions) {
  const defaultRef = useRef<Group | null>(null);
  const ref = groupRef || defaultRef;
  const targetScale = useRef(autoPlay ? 1 : initialScale);
  const currentScale = useRef(initialScale);

  useEffect(() => {
    if (autoPlay) targetScale.current = 1;
    if (ref.current) ref.current.scale.setScalar(currentScale.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    currentScale.current = MathUtils.lerp(
      currentScale.current,
      targetScale.current,
      animLerp,
    );
    ref.current.scale.setScalar(currentScale.current);
  });

  const onPointerDown = () => {
    targetScale.current =
      Math.abs(targetScale.current - 1) < 1e-4 ? pressedScale : 1;
  };

  const onPointerUp = () => {
    targetScale.current = 1;
  };

  const setTargetScale = (s: number) => (targetScale.current = s);

  return { ref, onPointerDown, onPointerUp, setTargetScale } as const;
}
