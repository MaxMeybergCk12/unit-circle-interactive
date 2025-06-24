import React, { useState } from "react";
import { GRID, SHADOW } from "../../constraints";

// Calculate angle from origin to (x, y)
function getAngle(origin: number, x: number, y: number) {
  let angle = Math.atan2(origin - y, x - origin);
  if (angle < 0) angle += 2 * Math.PI;
  return angle;
}

// Clamp angle between min and max
function clampAngle(angle: number, min: number, max: number) {
  if (angle < min) return min;
  if (angle > max) return max;
  return angle;
}

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

export function DragPoint() {
  const size = GRID.size;
  const origin = size / 2;
  const radius = (size / 2) * SHADOW.ratio;
  const pointRadius = 10;

  // State: current angle and furthest angle reached
  const [angle, setAngle] = useState(0);
  const [maxAngle, setMaxAngle] = useState(0);
  const [dragging, setDragging] = useState(false);

  // Drag logic
  function handleMouseDown(e: React.MouseEvent<SVGCircleElement, MouseEvent>) {
    setDragging(true);
    const svg = (e.target as SVGCircleElement).ownerSVGElement!;
    const rect = svg.getBoundingClientRect();

    function move(ev: MouseEvent) {
      const mx = ev.clientX - rect.left;
      const my = ev.clientY - rect.top;
      let newAngle = getAngle(origin, mx, my);

      // Only allow the dot to move between 0 and maxAngle
      if (newAngle > maxAngle) {
        setMaxAngle(newAngle);
      }
      newAngle = Math.max(0, Math.min(newAngle, Math.max(maxAngle, newAngle)));
      setAngle(newAngle);
    }

    function up() {
      setDragging(false);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    }

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  }

  // Point position
  const x = origin + radius * Math.cos(angle);
  const y = origin - radius * Math.sin(angle);

  return (
    <>
      {/* Orange highlight trail */}
      {angle > 0 && (
        <path
          d={HighlightSector(origin, radius * 0.4, angle)}
          fill="orange"
          opacity={0.4}
          stroke="none"
        />
      )}
      {/* Blue trace trail */}
      {angle > 0 && (
        <path
          d={TracePath(origin, radius, angle)}
          fill="none"
          stroke="blue"
          strokeWidth={6}
        />
      )}
      {/* Shadow circle (for reference) */}
      <circle
        cx={origin}
        cy={origin}
        r={radius}
        fill="none"
        stroke="blue"
        strokeWidth={2}
        opacity={0.15}
      />
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
        stroke="purple"
        strokeWidth={3}
      />
      {/* Draggable point */}
      <circle
        cx={x}
        cy={y}
        r={pointRadius}
        fill="red"
        stroke="black"
        strokeWidth={2}
        style={{ cursor: "pointer" }}
        onMouseDown={handleMouseDown}
      />
    </>
  );
}
