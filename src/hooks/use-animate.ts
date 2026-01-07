import { useEffect, useRef } from "react";

/**
 * Helper hook for animations that provides mouse and screen refs
 * @param useWindow defaults to true and will get coords based on the window
 * @returns mouse and screen refs
 */
export function useAnimate(useWindow = true) {
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const screen = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!useWindow) return;
    if (!window || !document)
      throw new Error("useAnimate can only be used in a client component");

    screen.current.width = window.innerWidth;
    screen.current.height = window.innerHeight;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const onResize = () => {
      screen.current.width = window.innerWidth;
      screen.current.height = window.innerHeight;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return { mouse, screen };
}
