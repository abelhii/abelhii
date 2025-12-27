/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Vector3 } from "three";

/**
 * Smoothly resets the camera and controls to their default positions over a specified duration.
 * @param camera The camera object to reset.
 * @param controlsRef A reference to the controls object.
 * @param duration The duration of the reset animation in seconds.
 * @returns A function to initiate the reset animation.
 */
export function useSmoothReset(
  camera: any,
  controlsRef: React.RefObject<any>,
  duration = 10
) {
  const progress = useRef(0);
  const running = useRef(false);
  const startCam = useRef(new Vector3());
  const startTarget = useRef(new Vector3());
  const endCam = useRef(new Vector3());
  const endTarget = useRef(new Vector3());

  const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * Math.pow(t, 3) : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const startReset = (
    camTarget = new Vector3(0, 0, 4),
    target = new Vector3(0, 0, 0)
  ) => {
    if (!controlsRef.current) return;
    startCam.current.copy(camera.position);
    startTarget.current.copy(controlsRef.current.target ?? new Vector3());
    endCam.current.copy(camTarget);
    endTarget.current.copy(target);
    progress.current = 0;
    running.current = true;
  };

  useFrame((_, delta) => {
    if (!running.current || !controlsRef.current) return;
    progress.current = Math.min(1, progress.current + delta / duration);
    const t = easeInOutCubic(progress.current);

    camera.position.lerpVectors(startCam.current, endCam.current, t);
    controlsRef.current.target.lerpVectors(
      startTarget.current,
      endTarget.current,
      t
    );
    controlsRef.current.update();

    if (progress.current >= 1) running.current = false;
  });

  return startReset;
}
