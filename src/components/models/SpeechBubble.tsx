/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGLTF } from "@react-three/drei";
import { ComponentPropsWithRef } from "react";
import { useScaleAnimation } from "../../hooks/use-scale-animation";

const SPEECH_BUBBLE_URL =
  "https://fjvfwbnbufwhevhivldg.supabase.co/storage/v1/object/public/abelhii/speech-bubble.glb";

type SpeechBubbleProps = ComponentPropsWithRef<"group"> & {
  children?: React.ReactNode;
};

export function SpeechBubble({ children, ...props }: SpeechBubbleProps) {
  const { nodes } = useGLTF(SPEECH_BUBBLE_URL) as any;
  const { ref: innerRef, onPointerDown, onPointerUp } = useScaleAnimation({});

  return (
    <group {...props} dispose={null}>
      <group
        ref={innerRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onClick={onPointerDown}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Sphere.geometry}
          material={nodes.Sphere.material}
          scale={[1.242, 1, 0.465]}
        />
        {/* Text content */}
        <group scale={0.13} position={[0, 0, 0.48]}>
          {children}
        </group>
      </group>
    </group>
  );
}

useGLTF.preload(SPEECH_BUBBLE_URL) as any;
