/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Center,
  Environment,
  OrbitControls,
  Scroll,
  ScrollControls,
  Stars,
  Text3D,
  useScroll,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Image from "next/image";
import { ReactNode, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Group, MathUtils, Object3DEventMap, Points, Vector3 } from "three";

import { useIsDebugging } from "@/hooks/use-is-debugging";
import { cn } from "@/lib/shadcn.utils";
import { useLerpedMouse } from "../hooks/use-lerped-mouse";
import { useSmoothReset } from "../hooks/use-smooth-reset";
import { AbelHead } from "./models/AbelHead";
import { Project } from "./Project";
import { isMobile } from "@/lib/is-mobile.utils";

type MainSceneProps = { children?: ReactNode; className?: string };

function AbelHeadWithControls() {
  const headModel = useRef<Group<Object3DEventMap> | null>(null);
  const headWorld = useRef(new Vector3());
  const projected = useRef(new Vector3());
  const orbitControls = useRef<any | null>(null);
  const [disableControls, setDisableControls] = useState(false);

  const mouse = useLerpedMouse();
  const scroll = useScroll();

  // Live tweakable options via Leva (under "Abel Head")
  const { rotationFactor, lerpAlpha, uiFixedScale, resetDuration } =
    useControls("Abel Head", {
      rotationFactor: { value: 5, min: 1, max: 10, step: 1 },
      lerpAlpha: { value: 0.1, min: 0, max: 1, step: 0.01 },
      uiFixedScale: { value: 0.8, min: 0.1, max: 2, step: 0.01 },
      resetDuration: { value: 1.75, min: 0.05, max: 3, step: 0.01 }, // <= added
    });

  const { width, height, camera } = useThree((state) => ({
    width: state.viewport.width,
    height: state.viewport.height,
    camera: state.camera,
  }));
  const scrollThreshold = 0.5 / 3; // 1/3 for 3 pages

  const startReset = useSmoothReset(camera, orbitControls, resetDuration);

  useFrame(() => {
    if (scroll === null || orbitControls === null) return;
    const isScrolling = scroll.offset > scrollThreshold;
    if (isScrolling !== disableControls) {
      setDisableControls(isScrolling);
      startReset();
    }
  });

  // Look at mouse movement and respond to scroll position
  useFrame(() => {
    if (headModel.current === null) return;
    if (!scroll) throw new Error("add <ScrollControls> above AbelFollowMouse");
    const head = headModel.current;
    const { offset } = scroll;

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

    // move to bottom right of screen as we scroll down
    // compute parameter t in [0,1] relative to the threshold
    const localT = MathUtils.clamp(offset / scrollThreshold, 0, 1);
    const offsetX = ((localT / 2) * width) / 1.4;
    const offsetY = ((localT / 2) * -height) / 1.4;
    head.position.x = MathUtils.lerp(head.position.x, offsetX, lerpAlpha);
    head.position.y = MathUtils.lerp(head.position.y, offsetY, lerpAlpha);

    if (offset > scrollThreshold) {
      // scale down as we scroll past first page
      const targetScale = uiFixedScale / 3;
      head.scale.lerp(
        new Vector3(targetScale, targetScale, targetScale),
        lerpAlpha
      );
    } else {
      // scale back to normal when on first page
      head.scale.lerp(
        new Vector3(uiFixedScale, uiFixedScale, uiFixedScale),
        lerpAlpha
      );
    }
  });

  return (
    <ErrorBoundary
      fallback={
        <Image
          src="/abel-bust.png"
          alt="Failed to load 3D model"
          width={500}
          height={500}
        />
      }
    >
      <AbelHead ref={headModel} />
      <OrbitControls
        ref={orbitControls}
        enabled={!disableControls && !isMobile()}
        enableZoom={false}
        enablePan={false}
      />
    </ErrorBoundary>
  );
}

function Background() {
  const ref = useRef<Points | null>(null);
  useFrame((_, delta) => {
    if (ref.current === null) return;
    ref.current.rotation.y += delta * 0.02;
  });

  return (
    <Stars
      ref={ref}
      fade
      radius={100}
      depth={10}
      count={5000}
      factor={20}
      saturation={0}
      speed={1.5}
    />
  );
}

function ScrollContent() {
  return (
    <group>
      <Scroll>
        <Center top position={[0, 1, -1]}>
          <Text3D
            material-fog={false}
            letterSpacing={0}
            size={0.5}
            font="/Inter_Bold.json"
          >
            Salutations
            <meshStandardMaterial color="white" />
          </Text3D>
        </Center>
        <Project position={[2, -7, 0]} />
      </Scroll>
      <Scroll html>
        <div className="text-white">
          <h1>1</h1>
          <h1 className="mt-[100vh]">2</h1>
          <h1 className="mt-[100vh]">3</h1>
        </div>
      </Scroll>
    </group>
  );
}

export function MainScene({ children, className }: MainSceneProps) {
  const { isDebugging } = useIsDebugging();

  return (
    <div
      className={cn(
        "absolute flex flex-col items-center justify-center w-screen h-screen bg-black",
        className
      )}
    >
      <Leva hidden={!isDebugging} />
      <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 4] }}>
        <Background />
        <Environment preset="sunset" />
        <ScrollControls pages={3} damping={0.1}>
          <AbelHeadWithControls />
          <ScrollContent />
        </ScrollControls>
      </Canvas>

      {children}
    </div>
  );
}
