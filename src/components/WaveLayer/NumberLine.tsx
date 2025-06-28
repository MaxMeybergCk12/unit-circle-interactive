// src/components/GraphUtils/NumberLine.tsx
import React from "react";

interface NumberLineProps {
  width: number;
  height: number;
  tickSpacing: number;
  y: number; // vertical position of the line
  labels?: string[];
}

export function NumberLine({ width, height, tickSpacing, y, labels }: NumberLineProps) {
  const ticks = [];
  for (let x = 0; x <= width; x += tickSpacing) {
    ticks.push(
      <line key={x} x1={x} y1={y - 5} x2={x} y2={y + 5} stroke="black" />
    );
  }

  return (
    <g>
      {/* Main line */}
      <line x1={0} y1={y} x2={width} y2={y} stroke="black" />
      {/* Ticks */}
      {ticks}
      {/* Optional: labels */}
      {labels &&
        labels.map((label, i) => (
          <text key={i} x={i * tickSpacing} y={y + 20} fontSize={12} textAnchor="middle">
            {label}
          </text>
        ))}
    </g>
  );
}