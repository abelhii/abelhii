import { useGlobal } from "@/context/global.context";
import { Toggle } from "./ui/toggle";
import { cn } from "@/lib/shadcn.utils";

type Toggle3DProps = {
  className?: string;
};

/**
 * Design from https://www.creative-tim.com/twcomponents/component/3d-button-2
 */
export function Toggle3D({ className }: Toggle3DProps) {
  const { is3dOn, setIs3dOn, reset } = useGlobal();

  const primaryColor = "bg-blue-500";

  return (
    <Toggle
      pressed={is3dOn}
      onPressedChange={() => {
        setIs3dOn(!is3dOn);
        reset();
      }}
      className={cn(
        `fixed top-4 left-4 z-10 button w-16 h-16 ${primaryColor} rounded-full cursor-pointer select-none hover:${primaryColor}
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
