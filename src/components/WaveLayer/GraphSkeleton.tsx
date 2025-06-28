import React from "react";
import { NumberLine } from "./NumberLine";

interface GraphSkeletonProps {
  width: number;
  height: number;
  border?: string;
  midY: number;
  numberLineProps: {
    tickSpacing: number;
    y: number;
    labels: string[];
  };
  children: React.ReactNode;
}

export function GraphSkeleton({
  width,
  height,
  border,
  midY,
  numberLineProps,
  children,
}: GraphSkeletonProps) {
  return (
    <div style={{ width, height, border }}>
      <svg width={width} height={height} style={{ display: "block", background: "white" }}>
        {/* Number line and axis */}
        <NumberLine
          width={width}
          height={height}
          tickSpacing={numberLineProps.tickSpacing}
          y={numberLineProps.y}
          labels={numberLineProps.labels}
        />
        <line
          x1={0}
          y1={midY}
          x2={width}
          y2={midY}
          stroke="black"
          strokeWidth={2}
        />
        {/* Graph-specific content */}
        {children}
      </svg>
    </div>
  );
}