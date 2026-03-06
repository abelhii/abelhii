"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

export function Stars2D() {
  const STAR_COUNT = 400;
  const space = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    if (!space.current) return;

    const canvas = space.current;
    const ctx = canvas.getContext("2d");

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();

    const stars: { x: number; y: number; radius: number; speed: number }[] = [];

    function createStars() {
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: Math.random() * 0.3 + 0.1,
        });
      }
    }
    createStars();

    function drawStars() {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";

      for (const star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      }
    }

    gsap.ticker.add(drawStars);

    return () => {
      gsap.ticker.remove(drawStars);
    };
  });

  return <canvas ref={space} className="absolute w-full h-full" />;
}
