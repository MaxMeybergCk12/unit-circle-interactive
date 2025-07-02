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
  const radius = centerPointRadius;

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
      {/* Intersection labels */}
      <text
        x={center + radius + 180}  // move further right
        y={center + 20}            // move slightly down
        fontSize={18}
        fill="black"
        textAnchor="start"
      >(1, 0)</text>

      <text
        x={center + radius + 20}
        y={center -200}  // move further up
        fontSize={18}
        fill="black"
        textAnchor="middle"
      >(0, 1)</text>

      <text
        x={center - 200}  // move further left
        y={center + 20}
        fontSize={18}
        fill="black"
        textAnchor="end"
      >(-1, 0)</text>

      <text
        x={center +30}
        y={center + radius + 200}  // move further down
        fontSize={18}
        fill="black"
        textAnchor="middle"
      >(0, -1)</text>
    </svg>
  );
}
