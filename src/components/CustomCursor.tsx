import React, { useEffect, useState } from "react";
import { useCursor } from "@site/src/contexts/CursorContext";
import "@site/src/css/custom-cursor.css";

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

interface SparkleParticle {
  x: number;
  y: number;
  size: number;
  color: string;
  id: number;
  vx: number;
  vy: number;
}

export default function CustomCursor() {
  const { cursor } = useCursor();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  useEffect(() => {
    if (cursor === "default") return;

    let animationFrameId: number;
    let lastSparkleTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      setPos({ x, y });

      if (cursor === "trail") {
        setTrail((prev) => [...prev.slice(-12), { x, y, id: Date.now() + Math.random() }]);
      }

      if (cursor === "sparkle" && Date.now() - lastSparkleTime > 50) {
        lastSparkleTime = Date.now();
        const colors = ["#60A5FA", "#38BDF8", "#818CF8", "#C084FC", "#34D399"];
        const newSparkle: SparkleParticle = {
          x,
          y,
          size: Math.random() * 6 + 4,
          color: colors[Math.floor(Math.random() * colors.length)],
          id: Date.now() + Math.random(),
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
        };
        setSparkles((prev) => [...prev.slice(-15), newSparkle]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    const updateSparkles = () => {
      setSparkles((prev) =>
        prev
          .map((p) => ({ ...p, x: p.x + p.vx, y: p.y + p.vy, size: p.size * 0.92 }))
          .filter((p) => p.size > 0.5)
      );
      animationFrameId = requestAnimationFrame(updateSparkles);
    };

    if (cursor === "sparkle") {
      animationFrameId = requestAnimationFrame(updateSparkles);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [cursor]);

  if (cursor === "default") return null;

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* Glow Cursor */}
      {cursor === "glow" && (
        <div
          className="absolute rounded-full pointer-events-none transition-transform duration-75 ease-out bg-indigo-500/20 blur-xl"
          style={{
            width: "120px",
            height: "120px",
            transform: `translate3d(${pos.x - 60}px, ${pos.y - 60}px, 0)`,
          }}
        />
      )}

      {/* Trail Cursor */}
      {cursor === "trail" && (
        <>
          {trail.map((pt, idx) => (
            <div
              key={pt.id}
              className="absolute rounded-full bg-cyan-400 pointer-events-none"
              style={{
                width: `${Math.max(2, (idx / trail.length) * 10)}px`,
                height: `${Math.max(2, (idx / trail.length) * 10)}px`,
                transform: `translate3d(${pt.x}px, ${pt.y}px, 0)`,
                opacity: idx / trail.length,
              }}
            />
          ))}
          <div
            className="absolute w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50 pointer-events-none"
            style={{
              transform: `translate3d(${pos.x - 6}px, ${pos.y - 6}px, 0)`,
            }}
          />
        </>
      )}

      {/* Sparkle Cursor */}
      {cursor === "sparkle" && (
        <>
          {sparkles.map((sp) => (
            <div
              key={sp.id}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: `${sp.size}px`,
                height: `${sp.size}px`,
                backgroundColor: sp.color,
                boxShadow: `0 0 8px ${sp.color}`,
                transform: `translate3d(${sp.x}px, ${sp.y}px, 0)`,
              }}
            />
          ))}
          <div
            className="absolute w-4 h-4 border-2 border-purple-400 rotate-45 pointer-events-none"
            style={{
              transform: `translate3d(${pos.x - 8}px, ${pos.y - 8}px, 0) rotate(45deg)`,
            }}
          />
        </>
      )}
    </div>
  );
}
