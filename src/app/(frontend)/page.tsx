"use client";

import { Environment, Scroll, ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useQuery } from "@tanstack/react-query";
import { Leva } from "leva";
import { ReactNode } from "react";

import { Background } from "@/components/Background";
import { Header2D } from "@/components/Header2D";
import { Header3D } from "@/components/Header3D";
import { Abel3DControlled } from "@/components/models/Abel3DControlled";
import { ProjectCardList } from "@/components/project/ProjectCardList";
import { getProjects } from "@/data/getProjects";
import { useIsDebugging } from "@/hooks/use-is-debugging";
import { cn } from "@/lib/shadcn.utils";
import { useGlobalStore } from "@/stores/use-global.store";

type SectionWrapperProps = {
  children: ReactNode;
  className?: string;
};

function SectionWrapper({ children, className }: SectionWrapperProps) {
  return (
    <div
      className={cn(
        "flex min-h-screen min-w-screen h-full w-full py-16 items-center justify-center",
        className
      )}
    >
      {children}
    </div>
  );
}

export default function HomePage() {
  const { is3dOn } = useGlobalStore();
  const { isDebugging } = useIsDebugging();

  const { data: projects } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  });

  console.log(projects);

  return (
    <div className="flex flex-col items-center justify-center bg-black text-white min-h-screen min-w-screen">
      <div className="absolute flex flex-col items-center justify-center w-screen h-screen bg-black">
        <Leva hidden={!isDebugging} />
        <Canvas dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 4] }}>
          <Background />
          <Environment preset="sunset" />
          <ScrollControls pages={3} damping={0.1}>
            <Header3D />

            <Scroll html>
              <SectionWrapper>{!is3dOn && <Header2D />}</SectionWrapper>

              <SectionWrapper className="items-start">
                {projects && <ProjectCardList projects={projects} />}
              </SectionWrapper>

              {isDebugging && (
                <div className="text-white">
                  <h1 className="absolute top-0">1</h1>
                  <h1 className="absolute top-[100vh]">2</h1>
                  <h1 className="absolute top-[200vh]">3</h1>
                </div>
              )}
            </Scroll>
          </ScrollControls>
        </Canvas>
      </div>
    </div>
  );
}
