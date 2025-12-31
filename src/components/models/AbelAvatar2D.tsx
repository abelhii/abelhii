"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

import { cn } from "@/lib/shadcn.utils";

type AbelAvatar2DProps = {
  className?: string;
  onClick?: VoidFunction;
};

export default function AbelAvatar2D({
  className,
  onClick,
}: AbelAvatar2DProps) {
  const scope = useRef<SVGSVGElement | null>(null);

  // mutable refs for cursor tracking
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const screen = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  // timelines
  const blinkTl = useRef<gsap.core.Timeline | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(scope);

      const safeToAnimate = window.matchMedia(
        "(prefers-reduced-motion: no-preference)"
      ).matches;
      if (!safeToAnimate) return;

      screen.current.width = window.innerWidth;
      screen.current.height = window.innerHeight;

      blinkTl.current = gsap.timeline({
        repeat: -1,
        repeatDelay: 3.5,
        paused: true,
      });

      blinkTl.current
        .to(q(".right-eye, .left-eye"), { opacity: 0, duration: 0.05 }, 0)
        .to(q(".right-eye2, .left-eye2"), { opacity: 1, duration: 0.05 }, 0)
        .to(q(".right-eye, .left-eye"), { opacity: 1, duration: 0.05 }, 0.15)
        .to(q(".right-eye2, .left-eye2"), { opacity: 0, duration: 0.05 }, 0.15);

      blinkTl.current.play();

      const percentage = (v: number, total: number) => (100 * v) / total;

      const animateFace = () => {
        const { x, y } = mouse.current;
        if (!x || !y) return;

        const xp = percentage(x, screen.current.width) - 50;
        const yHigh = percentage(y, screen.current.height) - 20;
        const yLow = percentage(y, screen.current.height) - 80;

        gsap.to(q(".head"), { xPercent: xp / 30, yPercent: yLow / 30 });
        gsap.to(q(".inner-face"), { xPercent: xp / 2, yPercent: yHigh / 3 });
        gsap.to(q(".glasses"), { xPercent: xp / 10, yPercent: yHigh / 6 });
        gsap.to(q(".hair-fringe"), { xPercent: xp / 22, yPercent: yHigh / 15 });
        gsap.to(q(".shadow"), {
          xPercent: (xp / 20) * -1,
          yPercent: (yLow / 20) * -1,
        });
        gsap.to(q(".ears"), {
          xPercent: (xp / 30) * -1,
          yPercent: (percentage(y, screen.current.height) - 50) * -0.66,
        });
        gsap.to(q(".eyebrow-left, .eyebrow-right"), {
          yPercent: percentage(y, screen.current.height) / 3,
        });
      };

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
      gsap.ticker.add(animateFace);

      return () => {
        blinkTl.current?.kill();
        blinkTl.current = null;

        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("resize", onResize);
        gsap.ticker.remove(animateFace);
      };
    },
    { scope }
  );

  return (
    <svg
      ref={scope}
      id="abelavatar"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 790.38 804.17"
      className={cn("h-96 w-96 md:h-125 md:w-125", className)}
      onClick={onClick}
    >
      <title>Abel Hii</title>

      <g className="head">
        <g className="ears">
          <g className="left-ear">
            <circle
              cx="117.4"
              cy="403.7"
              r="37.06"
              style={{ fill: "#f4d0e4" }}
            />
            <path
              d="M256.15,502.69s-23.69,15.51-40.67-2.78"
              transform="translate(-104.32 -96.3)"
              style={{
                fill: "none",
                stroke: "#6d555e",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: "3px",
              }}
            />
            <path
              d="M227,484.08s-20.54,13-8.3,31.6"
              transform="translate(-104.32 -96.3)"
              style={{
                fill: "none",
                stroke: "#6d555e",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: "3px",
              }}
            />
          </g>
          <g className="right-ear">
            <circle
              cx="674.53"
              cy="403.7"
              r="37.06"
              style={{ fill: "#f4d0e4" }}
            />
            <path
              d="M742.69,502.06s23.4,15.95,40.72-2"
              transform="translate(-104.32 -96.3)"
              style={{
                fill: "none",
                stroke: "#6d555e",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: "3px",
              }}
            />
            <path
              d="M772.16,484s20.3,13.38,7.72,31.75"
              transform="translate(-104.32 -96.3)"
              style={{
                fill: "none",
                stroke: "#6d555e",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: "3px",
              }}
            />
          </g>
        </g>

        <circle
          className="face"
          cx="395.68"
          cy="403.7"
          r="258.09"
          style={{ fill: "#f9dce7" }}
        />

        <g className="hair">
          <path
            className="hair-shadow2 shadow"
            d="M493.05,377.19s57.77,82.8,98,80.75,29.67-22.18,29.67-22.18l-97.15-82.58Z"
            transform="translate(-104.32 -96.3)"
            style={{ fill: "#edc8d9" }}
          />
          <path
            className="hair-shadow1 shadow"
            d="M342.2,426.6c-5.45,22.18,17.12,39.78,38.23,31.06q1.59-.65,3.24-1.47s-24.43-.38-12-55.73Z"
            transform="translate(-104.32 -96.3)"
            style={{ fill: "#edc8d9" }}
          />
          <path
            className="main-hair"
            d="M640.06,402.53a11.93,11.93,0,0,1,1.91,2.1c19.72,18.53,96.78,89.27,113.9,62.27,13.66-21.53,9.21-63.38,4.66-89.17A146,146,0,0,0,745,333.23c-2-3.61-4.2-7.52-6.69-11.61a191.54,191.54,0,0,0-51.45-55.52c-20.6-14.92-52.13-36.12-80.21-48.19C560.12,197.9,503.74,203,503.74,203s-125.32-3.88-197.12,68.64C244,334.91,239.75,428.17,239.69,451a20.21,20.21,0,0,0,13.64,19.26c4.61,1.55,10.75,2.23,18.94,1.17,26.68-3.47,86.62-58.12,98.39-69.06C370.66,402.37,488.92,261,640.06,402.53Z"
            transform="translate(-104.32 -96.3)"
            style={{ fill: "#212126" }}
          />
          <path
            className="hair-shadow shadow"
            d="M371.7,400.46s28.26-66.64,78-122.75c0,0-66.16,49.74-107.73,148.75Z"
            transform="translate(-104.32 -96.3)"
          />
          <path
            className="hair-fringe"
            d="M450.45,277.89s-86.82,106.86-84.1,146.91a59.46,59.46,0,0,1,.16,6.4c-.3,6.77.47,22,12.88,25.74,0,0,10.72,6.43,34.09-9.46,0,0,53.83-33.87,90.69-73.62,0,0,72.47,84.43,100,84.55,2.09,0,15,.36,26.21-5.1a28.51,28.51,0,0,0,15.67-23c.72-7.71.81-19-3.55-25.49a69.4,69.4,0,0,1-4.92-8.3c-8.74-18.2-38.58-75.92-84.48-119.27C497.92,225.11,450.45,277.89,450.45,277.89Z"
            transform="translate(-104.32 -96.3)"
            style={{ fill: "#212126" }}
          />
        </g>

        <g className="glasses">
          <circle
            cx="231.24"
            cy="358.78"
            r="143.04"
            style={{
              fill: "none",
              stroke: "#88b9ea",
              strokeMiterlimit: 10,
              strokeWidth: "3px",
            }}
          />
          <circle
            cx="562.84"
            cy="358.78"
            r="143.04"
            style={{
              fill: "none",
              stroke: "#88b9ea",
              strokeMiterlimit: 10,
              strokeWidth: "3px",
            }}
          />
          <line
            x1="419.8"
            y1="358.78"
            x2="374.28"
            y2="358.78"
            style={{
              fill: "none",
              stroke: "#88b9ea",
              strokeMiterlimit: 10,
              strokeWidth: "3px",
            }}
          />
        </g>

        <g className="inner-face">
          <g className="nose">
            <ellipse
              className="nose-2"
              data-name="nose"
              cx="395.68"
              cy="398.59"
              rx="42.95"
              ry="29.95"
              style={{
                fill: "#f27293",
                stroke: "#f27293",
                strokeMiterlimit: 10,
                strokeWidth: "3px",
              }}
            />
            <ellipse
              className="left-nostril"
              cx="381.09"
              cy="398.59"
              rx="7.64"
              ry="12.29"
              style={{ fill: "#8c465a" }}
            />
            <ellipse
              className="right-nostril"
              cx="411.65"
              cy="398.59"
              rx="7.64"
              ry="12.29"
              style={{ fill: "#8c465a" }}
            />
          </g>

          <path
            className="mouth"
            d="M516,549c-1.72,11.23-13.67,11.23-13.67,11.23-12.89,0-15.55-11.23-15.55-11.23"
            transform="translate(-104.32 -96.3)"
            style={{
              fill: "none",
              stroke: "#6d555e",
              strokeLinecap: "round",
              strokeMiterlimit: 10,
              strokeWidth: "3px",
            }}
          />

          <g className="open-mouth">
            <path
              className="open-mouth-black"
              d="M516,549c-1.72,11.23-13.67,11.23-13.67,11.23-12.89,0-15.55-11.23-15.55-11.23Z"
              transform="translate(-104.32 -96.3)"
              style={{ fill: "#352a2e" }}
            />
            <path
              className="open-mouth-tongue"
              d="M494.37,557.7a12.61,12.61,0,0,1,2-2,8.29,8.29,0,0,1,9.1-.72,6.1,6.1,0,0,1,2.85,3,18.78,18.78,0,0,1-7,1.28A20.23,20.23,0,0,1,494.37,557.7Z"
              transform="translate(-104.32 -96.3)"
              style={{ fill: "#ee4289" }}
            />
            <path
              className="open-mouth-outline"
              d="M516,549c-1.72,11.23-13.67,11.23-13.67,11.23-12.89,0-15.55-11.23-15.55-11.23Z"
              transform="translate(-104.32 -96.3)"
              style={{
                fill: "none",
                stroke: "#77616a",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: "3px",
              }}
            />
          </g>

          <g className="eyes">
            <path
              className="left-eye2"
              d="M433.23,479.36c0,10.24-12.14,10.24-12.14,10.24-12.89,0-12.18-10.24-12.18-10.24"
              transform="translate(-104.32 -96.3)"
              style={{
                fill: "none",
                stroke: "#231f20",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: "3px",
              }}
            />
            <g className="left-eye">
              <circle
                cx="316.77"
                cy="382.23"
                r="12.18"
                style={{
                  stroke: "#231f20",
                  strokeMiterlimit: 10,
                  strokeWidth: "3px",
                }}
              />
              <circle
                cx="312.06"
                cy="380.44"
                r="1.62"
                style={{ fill: "#efefef" }}
              />
            </g>
            <path
              className="right-eye2"
              d="M591.08,479.36c0,10.24-12.15,10.24-12.15,10.24-12.89,0-12.18-10.24-12.18-10.24"
              transform="translate(-104.32 -96.3)"
              style={{
                fill: "none",
                stroke: "#231f20",
                strokeLinecap: "round",
                strokeMiterlimit: 10,
                strokeWidth: "3px",
              }}
            />
            <g className="right-eye">
              <circle
                cx="474.59"
                cy="382.23"
                r="12.18"
                style={{
                  stroke: "#231f20",
                  strokeMiterlimit: 10,
                  strokeWidth: "3px",
                }}
              />
              <circle
                cx="470.15"
                cy="380.61"
                r="1.62"
                style={{ fill: "#efefef" }}
              />
            </g>
          </g>

          {/* <g className="eyebrows">
            <ellipse
              className="eyebrow-left"
              cx="421.07"
              cy="439.95"
              rx="16.98"
              ry="4.5"
              transform="translate(-169.36 -23.16) rotate(-9.22)"
              style={{ fill: "#635f5f" }}
            />
            <ellipse
              className="eyebrow-right"
              cx="578.91"
              cy="439.95"
              rx="4.5"
              ry="16.98"
              transform="translate(-56.97 839.78) rotate(-80.26)"
              style={{ fill: "#635f5f" }}
            />
          </g> */}
        </g>
      </g>
    </svg>
  );
}
