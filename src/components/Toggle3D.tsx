import { cn } from "@/lib/shadcn.utils";
import { useShallow } from "zustand/react/shallow";

import { useGlobalStore } from "@/stores/use-global.store";
import { Toggle } from "./ui/toggle";

type Toggle3DProps = {
  className?: string;
};

/**
 * Design from https://www.creative-tim.com/twcomponents/component/3d-button-2
 */
export function Toggle3D({ className }: Toggle3DProps) {
  const [is3dOn, toggle3D, reset] = useGlobalStore(
    useShallow((state) => [state.is3dOn, state.toggle3D, state.reset])
  );

  const primaryColor = "bg-blue-500";

  return (
    <Toggle
      pressed={is3dOn}
      onPressedChange={() => {
        toggle3D();
        reset();
      }}
      className={cn(
        `button w-16 h-16 ${primaryColor} rounded-full cursor-pointer select-none hover:${primaryColor}
    active:translate-y-2  active:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] active:border-b-0
    data-[state=off]:translate-y-2  data-[state=off]:[box-shadow:0_0px_0_0_#1b6ff8,0_0px_0_0_#1b70f841] data-[state=off]:border-b-0
    data-[state=on]:${primaryColor}
    [box-shadow:0_8px_0_0_#1b6ff8,0_13px_0_0_#1b70f841] border border-blue-400
    transition-all duration-150
    `,
        className
      )}
    >
      <span className="flex flex-col justify-center items-center h-full text-white font-bold text-lg ">
        {is3dOn ? "3D" : "2D"}
      </span>
    </Toggle>
  );
}
