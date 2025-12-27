"use client";

import {
  Environment,
  Scroll,
  ScrollControls,
  Stars,
  Text,
  useScroll,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import Image from "next/image";
import { ReactNode, useRef } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Group, MathUtils, Object3DEventMap, Points, Vector3 } from "three";

import { cn } from "@/lib/shadcn.utils";
import { useLerpedMouse } from "./hooks/use-lerped-mouse";
import { AbelHead } from "./models/AbelHead";
import { usePathname } from "next/navigation";

type MainSceneProps = { children?: ReactNode; className?: string };

function AbelFollowMouse() {
  const ref = useRef<Group<Object3DEventMap> | null>(null);
  const mouse = useLerpedMouse();
  const scroll = useScroll();

  // Live tweakable options via Leva (under "Abel Head")
  const { rotationFactor, lerpAlpha, uiFixedScale } = useControls("Abel Head", {
    rotationFactor: { value: 5, min: 1, max: 10, step: 1 },
    lerpAlpha: { value: 0.1, min: 0, max: 1, step: 0.01 },
    uiFixedScale: { value: 0.6, min: 0.1, max: 2, step: 0.01 },
  });

  const { width, height, camera } = useThree((state) => ({
    width: state.viewport.width,
    height: state.viewport.height,
    camera: state.camera,
  }));

  const headWorld = useRef(new Vector3());
  const projected = useRef(new Vector3());

  useFrame(() => {
    if (ref.current === null) return;
    if (!scroll) throw new Error("add <ScrollControls> above AbelFollowMouse");
    const head = ref.current;
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
    const scrollThreshold = 0.5 / 3; // 1/3 for 3 pages
    // compute parameter t in [0,1] relative to the threshold
    const localT = MathUtils.clamp(offset / scrollThreshold, 0, 1);
    const offsetX = ((localT / 2) * width) / 1.4;
    const offsetY = ((localT / 2) * -height) / 1.4;
    head.position.x = MathUtils.lerp(head.position.x, offsetX, lerpAlpha);
    head.position.y = MathUtils.lerp(head.position.y, offsetY, lerpAlpha);

    // scale down the head as we scroll past first page
    if (offset > scrollThreshold) {
      // scale down as we scroll past first page
      const targetScale = uiFixedScale / 2;
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
      <AbelHead ref={ref} />
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
        <Text
          position={[0, 2.5, -5]}
          fontSize={1}
          color="white"
          material-fog={false}
          letterSpacing={0}
        >
          Welcome
        </Text>
        <Text
          position={[0, -6, 0]}
          fontSize={0.5}
          color="white"
          material-fog={false}
          letterSpacing={0}
        >
          Scroll down to explore more
        </Text>
      </Scroll>
      <Scroll html>
        <div className="text-white">
          <h1>first page</h1>
          <h1 className="mt-[100vh]">second page</h1>
          <h1 className="mt-[100vh]">third page</h1>
        </div>
      </Scroll>
    </group>
  );
}

export function MainScene({ children, className }: MainSceneProps) {
  const pathname = usePathname();
  const isDebugging = pathname.includes("#debug");

  return (
    <div
      className={cn(
        "absolute flex flex-col items-center justify-center w-screen h-screen bg-black",
        className
      )}
    >
      {isDebugging && <Leva />}
      <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 4] }}>
        <Background />
        <Environment preset="sunset" />
        <ScrollControls pages={3} damping={0.1}>
          <AbelFollowMouse />
          <ScrollContent />
        </ScrollControls>
      </Canvas>

      {children}
    </div>
  );
}
