import { createFileRoute } from "@tanstack/react-router";

import Ballpit from "../components/ui/ballpit";

export const Route = createFileRoute("/3d")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative flex flex-col gap-4 h-screen w-screen  bg-radial-[at_25%_25%] from-cyan-500 to-blue-900 bg-blue-950">
      <div className="absolute top-0 left-0 flex items-center justify-center z-10 h-full w-full">
        <h1 className="p-4 text-2xl font-bold">3D Ballpit</h1>
      </div>
      <div className="relative h-full w-full min-h-[400px]">
        <Ballpit
          count={100}
          gravity={0.5}
          friction={0.8}
          wallBounce={0.95}
          followCursor={false}
        />
      </div>
    </div>
  );
}
