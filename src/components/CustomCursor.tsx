import React, { useEffect, useRef, useState } from "react";
import { useCursor } from "@site/src/contexts/CursorContext";
import "@site/src/css/custom-cursor.css";

// --- Types ---
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

// Sparkle Color Palette
const SPARKLE_COLORS = ["#60A5FA", "#38BDF8", "#818CF8", "#C084FC", "#34D399"];

export default function CustomCursor() {
  const { cursor } = useCursor();

  // State for rendering trail & sparkle arrays
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);

  // Refs for tracking mouse/animations without triggering React re-renders on every move
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const lastSparkleTime = useRef(0);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    // 1. Don't run cursor logic for 'default' or on touch/mobile devices
    const isTouchDevice =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);

    if (cursor === "default" || isTouchDevice) return;

    // 2. High-performance Mouse Move Handler
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mousePos.current = { x, y };

      // Direct DOM manipulation for instant main cursor pointer tracking
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      // Handle Trail mode
      if (cursor === "trail") {
        setTrail((prev) => [
          ...prev.slice(-12),
          { x, y, id: Date.now() + Math.random() },
        ]);
      }

      // Handle Sparkle mode spawn throttling
      if (cursor === "sparkle" && Date.now() - lastSparkleTime.current > 40) {
        lastSparkleTime.current = Date.now();
        const newSparkle: SparkleParticle = {
          x,
          y,
          size: Math.random() * 6 + 4,
          color:
            SPARKLE_COLORS[Math.floor(Math.random() * SPARKLE_COLORS.length)],
          id: Date.now() + Math.random(),
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
        };
        setSparkles((prev) => [...prev.slice(-15), newSparkle]);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 3. Animation Loop for Updating Physics (Sparkles Decay)
    const updatePhysics = () => {
      if (cursor === "sparkle") {
        setSparkles((prev) =>
          prev
            .map((p) => ({
              ...p,
              x: p.x + p.vx,
              y: p.y + p.vy,
              size: p.size * 0.92,
            }))
            .filter((p) => p.size > 0.5)
        );
      }
      animFrameId.current = requestAnimationFrame(updatePhysics);
    };

    animFrameId.current = requestAnimationFrame(updatePhysics);

    // Clean up events and animation loops
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [cursor]);

  if (cursor === "default") return null;

  return (
    <div className="custom-cursor-container pointer-events-none fixed inset-0 z-[999999] overflow-hidden">
      {/* Dynamic Cursor Target (GPU-accelerated) */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: "translate3d(-100px, -100px, 0)" }}
      >
        {/* Glow Mode Pointer */}
        {cursor === "glow" && (
          <div
            className="rounded-full bg-indigo-500/20 blur-xl transition-transform duration-75 ease-out"
            style={{
              width: "120px",
              height: "120px",
              marginLeft: "-60px",
              marginTop: "-60px",
            }}
          />
        )}

        {/* Trail Mode Main Pointer */}
        {cursor === "trail" && (
          <div
            className="w-3 h-3 bg-cyan-400 rounded-full shadow-lg shadow-cyan-500/50"
            style={{ marginLeft: "-6px", marginTop: "-6px" }}
          />
        )}

        {/* Sparkle Mode Diamond Pointer */}
        {cursor === "sparkle" && (
          <div
            className="w-4 h-4 border-2 border-purple-400"
            style={{
              marginLeft: "-8px",
              marginTop: "-8px",
              transform: "rotate(45deg)",
            }}
          />
        )}
      </div>

      {/* Render Trail Particles */}
      {cursor === "trail" &&
        trail.map((pt, idx) => (
          <div
            key={pt.id}
            className="absolute rounded-full bg-cyan-400 pointer-events-none transition-opacity duration-300"
            style={{
              width: `${Math.max(2, (idx / trail.length) * 10)}px`,
              height: `${Math.max(2, (idx / trail.length) * 10)}px`,
              transform: `translate3d(${pt.x}px, ${pt.y}px, 0)`,
              opacity: idx / trail.length,
            }}
          />
        ))}

      {/* Render Sparkle Particles */}
      {cursor === "sparkle" &&
        sparkles.map((sp) => (
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
    </div>
  );
}