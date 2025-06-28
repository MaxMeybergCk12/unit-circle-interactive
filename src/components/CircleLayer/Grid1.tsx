
import type { ReactNode } from "react";
import { GRID } from "../../constraints";

type AxisProps = Partial<typeof GRID> & { children?: ReactNode };

export function Grid1({
  size = GRID.size,
  axisColor = GRID.axisColor,
  axisWidth = GRID.axisWidth,
  centerPointColor = GRID.centerPointColor,
  centerPointRadius = GRID.centerPointRadius,
  borderColor = GRID.borderColor,
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
