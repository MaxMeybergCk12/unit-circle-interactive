import React, { useState } from "react";
import { GRID, SHADOW } from "../../constraints";

export function DragPoint() {
  const size = GRID.size;
  const center = size / 2;
  const radius = (size / 2) * SHADOW.ratio;
  const pointRadius = 8;
  const [angle, setAngle] = useState(0);

  // Calculate point position
  const x = center + radius * Math.cos(angle);
  const y = center - radius * Math.sin(angle);

  return (
    <circle
      cx={x}
      cy={y}
      r={pointRadius}
      fill="red"
      stroke="black"
      strokeWidth={2}
      style={{ cursor: "pointer" }}
      onMouseDown={e => {
        const svg = (e.target as SVGCircleElement).ownerSVGElement!;
        const move = (ev: MouseEvent) => {
          const rect = svg.getBoundingClientRect();
          const mx = ev.clientX - rect.left;
          const my = ev.clientY - rect.top;
          setAngle(Math.atan2(center - my, mx - center));
        };
        const up = () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseup", up);
        };
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseup", up);
      }}
    />
  );
}
