"use client";

import { useGLTF } from "@react-three/drei";

import { MainScene } from "@/components/MainScene";
import { Toggle3D } from "@/components/Toggle3D";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen min-w-screen">
      <Toggle3D />
      <MainScene />
    </div>
  );
}
