/* eslint-disable @typescript-eslint/no-explicit-any */
import { OrbitControls, Text, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useControls } from "leva";
import { Suspense, useEffect, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Group, MathUtils, Object3DEventMap, Vector3 } from "three";

import { useAnchorModel } from "@/hooks/use-anchor-model";
import { useLerpedMouse } from "@/hooks/use-lerped-mouse";
import { useSmoothReset } from "@/hooks/use-smooth-reset";
import { isMobile } from "@/lib/is-mobile.utils";
import { useGlobalStore } from "@/stores/use-global.store";
import { Loader } from "../Loader";
import { AbelAvatar3D } from "./AbelAvatar3D";

export function Abel3DControlled() {
  const headModel = useRef<Group<Object3DEventMap> | null>(null);
  const headWorld = useRef(new Vector3());
  const projected = useRef(new Vector3());
  const orbitControls = useRef<any | null>(null);
  const [disableControls, setDisableControls] = useState(false);
  const resetId = useGlobalStore((state) => state.resetId);

  const mouse = useLerpedMouse();
  const scroll = useScroll();

  // Live tweakable options via Leva (under "Abel Head")
  const { rotationFactor, lerpAlpha, uiFixedScale, resetDuration } =
    useControls("Abel Head", {
      rotationFactor: { value: 5, min: 1, max: 10, step: 1 },
      lerpAlpha: { value: 0.1, min: 0, max: 1, step: 0.01 },
      resetDuration: { value: 1.2, min: 0.05, max: 3, step: 0.01 },
      uiFixedScale: { value: 1, min: 0.2, max: 2, step: 0.1 },
    });

  const { camera } = useThree((state) => ({ camera: state.camera }));
  const scrollThreshold = 0.5 / 3; // half of the first page

  const startReset = useSmoothReset(camera, orbitControls, resetDuration);

  // reset orbitControls when resetId updates
  useEffect(() => {
    startReset();
  }, [resetId, startReset]);

  // Disable controls and reset when scrolled past threshold
  useFrame(() => {
    if (!scroll || !orbitControls) return;
    const isScrolling = scroll.offset > scrollThreshold;
    if (isScrolling !== disableControls) {
      setDisableControls(isScrolling);
      startReset();
    }
  });

  // Look at mouse movement and respond to scroll position
  useFrame(() => {
    if (!headModel.current) return;
    const head = headModel.current;

    // compute head position in NDC (normalized device coords) and compare to mouse
    head.getWorldPosition(headWorld.current);
    headWorld.current.project(camera);
    projected.current.copy(headWorld.current);

    const dx = mouse.current.x - projected.current.x;
    const dy = mouse.current.y - projected.current.y;

    // smooth rotation so motion stays natural while scrolling (values controlled by Leva)
    const rf = Math.PI / rotationFactor;
    head.rotation.y = MathUtils.lerp(head.rotation.y, dx * rf, lerpAlpha);
    head.rotation.x = MathUtils.lerp(head.rotation.x, dy * -rf, lerpAlpha);
  });

  useAnchorModel({
    model: headModel,
    lerpAlpha,
    scrollThreshold,
    uiFixedScale,
  });

  return (
    <ErrorBoundary fallback={<Text>Failed to load 3D model</Text>}>
      <Suspense fallback={<Loader />}>
        <AbelAvatar3D ref={headModel} />
      </Suspense>
      {!isMobile() && (
        <OrbitControls
          ref={orbitControls}
          enabled={!disableControls}
          enableZoom={false}
          enablePan={false}
        />
      )}
    </ErrorBoundary>
  );
}
