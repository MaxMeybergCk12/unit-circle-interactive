import React, { useState } from "react";
import { GRID, SHADOW } from "../../constraints";

interface DragPointProps {
  angle: number;
  setAngle: (a: number) => void;
}

// Calculate angle from origin to (x, y)
function getAngle(origin: number, x: number, y: number) {
  let angle = Math.atan2(origin - y, x - origin);
  if (angle < 0) angle += 2 * Math.PI;
  return angle;
}

// // Clamp angle between min and max
// function clampAngle(angle: number, min: number, max: number) {
//   if (angle < min) return min;
//   if (angle > max) return max;
//   return angle;
// }

// SVG arc path from 0 to endAngle (the blue trail)
function TracePath(origin: number, radius: number, endAngle: number) {
  if (endAngle === 0) return "";
  const start = {
    x: origin + radius,
    y: origin,
  };
  const end = {
    x: origin + radius * Math.cos(endAngle),
    y: origin - radius * Math.sin(endAngle),
  };
  const largeArc = endAngle > Math.PI ? 1 : 0;
  return [
    `M ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
  ].join(" ");
}

function HighlightSector(origin: number, radius: number, endAngle: number) {
  if (endAngle === 0) return "";
  const start = { x: origin + radius, y: origin };
  const end = {
    x: origin + radius * Math.cos(endAngle),
    y: origin - radius * Math.sin(endAngle),
  };
  const largeArc = endAngle > Math.PI ? 1 : 0;
  return [
    `M ${origin} ${origin}`,
    `L ${start.x} ${start.y}`,
    `A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`,
    "Z",
  ].join(" ");
}

export function DragPoint({ angle, setAngle }: DragPointProps) {
  const size = GRID.size;
  const origin = size / 2;
  const radius = (size / 2) * SHADOW.ratio;
  const pointRadius = 10;

  // State: current angle and furthest angle reached
  const [maxAngle, setMaxAngle] = useState(0);

  // Drag logic
  function handleMouseDown(e: React.MouseEvent<SVGCircleElement, MouseEvent>) {
    const svg = (e.target as SVGCircleElement).ownerSVGElement!;
    const rect = svg.getBoundingClientRect();

    function move(ev: MouseEvent) {
      const mx = ev.clientX - rect.left;
      const my = ev.clientY - rect.top;
      let newAngle = getAngle(origin, mx, my);
      if (newAngle > maxAngle) setMaxAngle(newAngle);
      newAngle = Math.max(0, Math.min(newAngle, Math.max(maxAngle, newAngle)));
      setAngle(newAngle);
    }
    function up() {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    }
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  // Touch logic for mobile
  function handleTouchStart(e: React.TouchEvent<SVGCircleElement>) {
    e.preventDefault();
    const svg = (e.target as SVGCircleElement).ownerSVGElement!;
    const rect = svg.getBoundingClientRect();

    function move(ev: TouchEvent) {
      ev.preventDefault();
      const touch = ev.touches[0];
      const mx = touch.clientX - rect.left;
      const my = touch.clientY - rect.top;
      let newAngle = getAngle(origin, mx, my);
      if (newAngle > maxAngle) setMaxAngle(newAngle);
      newAngle = Math.max(0, Math.min(newAngle, Math.max(maxAngle, newAngle)));
      setAngle(newAngle);
    }
    function up() {
      window.removeEventListener("touchmove", move);
      window.removeEventListener("touchend", up);
    }
    window.addEventListener("touchmove", move, { passive: false });
    window.addEventListener("touchend", up);
  }

  // Point position
  const x = origin + radius * Math.cos(angle);
  const y = origin - radius * Math.sin(angle);
  const mathX = Math.cos(angle);
  const mathY = Math.sin(angle);

  return (
    <>
      {/* Orange highlight trail */}
      {angle > 0 && (
        <path
          d={HighlightSector(origin, radius * 0.2, angle)}
          fill="orange"
          opacity={0.4}
          stroke="none"
        />
      )}
      {/*  Outer trace trail */}
      {angle > 0 && (
        <path
          d={TracePath(origin, radius, angle)}
          fill="none"
          stroke="black"
          strokeWidth={6}
        />
      )}
      {/* Traceline for radius*/}
      <line
        x1={origin}
        y1={origin}
        x2={x}
        y2={y}
        stroke="purple"
        strokeWidth={3}
      />
      {/* Traceline for x-axis */}
      <line
        x1={x}
        y1={origin}
        x2={x}
        y2={y}
        stroke="blue"
        strokeWidth={3}
      />
      {/* Traceline for y-axis*/}
      <line
        x1={origin}
        y1={origin}
        x2={x}
        y2={origin}
        stroke="red"
        strokeWidth={3}
      />
      {/* Draggable point */}
      <circle
        cx={x}
        cy={y}
        r={pointRadius}
        fill="green"
        stroke="black"
        strokeWidth={4}
        style={{ cursor: "pointer" }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      {/* Highlight behind coordinate label */}
      <rect
        x={x + 15}
        y={y - 28}
        width={100}
        height={35}
        rx={8}
        fill="lightgray"
        opacity={0.5}
      />
      <text
        x={x + 18}
        y={y - 10}
        fontSize={18}
        fill="black"
        stroke="white"
        strokeWidth={0.5}
        paintOrder="stroke"
        style={{ userSelect: "none" }}
      >
        (
        <tspan fill="red">{mathX.toFixed(2)}</tspan>
        ,{" "}
        <tspan fill="blue">{mathY.toFixed(2)}</tspan>
        )
      </text>
    </>
  );
}
