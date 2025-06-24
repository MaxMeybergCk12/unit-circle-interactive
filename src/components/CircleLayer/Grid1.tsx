import React from "react";
import type { ReactNode } from "react";
import { GRID_CONFIG } from "../../constraints";

type AxisProps = Partial<typeof GRID_CONFIG> & { children?: ReactNode };

export function Grid1({
  size = GRID_CONFIG.size,
  axisColor = GRID_CONFIG.axisColor,
  axisWidth = GRID_CONFIG.axisWidth,
  centerPointColor = GRID_CONFIG.centerPointColor,
  centerPointRadius = GRID_CONFIG.centerPointRadius,
  borderColor = GRID_CONFIG.borderColor,
  children
}: AxisProps) {
  const center = size / 2;

  return (
    <svg width={size} height={size} style={{ border: `1px solid ${borderColor}` }}>
      {/* Vertical axis */}
      <line
        x1={center}
        y1={0}
        x2={center}
        y2={size}
        stroke={axisColor}
        strokeWidth={axisWidth}
      />
      {/* Horizontal axis */}
      <line
        x1={0}
        y1={center}
        x2={size}
        y2={center}
        stroke={axisColor}
        strokeWidth={axisWidth}
      />
      {/* Center point */}
      <circle
        cx={center}
        cy={center}
        r={centerPointRadius}
        fill={centerPointColor}
      />
      {/* Render children (e.g., Shadow) */}
      {children}
    </svg>
  );
}
