"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setVisible(true);

    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const down = () => setClicked(true);
    const up = () => setClicked(false);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, select, textarea, label, .card-3d")
      ) {
        setHovering(true);
      } else {
        setHovering(false);
      }
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mousedown", down);
    window.addEventListener("mouseup", up);
    window.addEventListener("mouseover", over);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("mouseover", over);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${clicked ? 0.65 : hovering ? 1.8 : 1})`,
          transition: "transform 0.15s ease-out",
        }}
      >
        <div
          className="w-9 h-9 rounded-full border-2"
          style={{
            borderColor: hovering ? "#C3073F" : "#f0f0f0",
            background: hovering ? "rgba(195, 7, 63, 0.15)" : "transparent",
            boxShadow: hovering ? "0 0 20px rgba(195, 7, 63, 0.4)" : "none",
            transition: "all 0.15s ease-out",
          }}
        />
      </div>
      <div
        className="pointer-events-none fixed z-[9999]"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.8 : 1})`,
          transition: "transform 0.1s ease-out",
        }}
      >
        <div
          className="w-2 h-2 rounded-full"
          style={{ background: "#C3073F" }}
        />
      </div>
    </>
  );
}
