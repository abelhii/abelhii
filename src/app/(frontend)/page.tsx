"use client";

import { MainScene } from "@/components/MainScene";
import { Toggle3D } from "@/components/Toggle3D";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen min-w-screen">
      <Toggle3D className="fixed top-4 left-4 z-10" />
      <MainScene />
    </div>
  );
}
