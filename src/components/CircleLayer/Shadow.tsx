import React from "react";
import { GRID, SHADOW } from "../../constraints";

// A dotted gray light brush circle, always active
interface ShadowProps {
    size?: number;   // SVG size (width/height)
    ratio?: number;  // Ratio of shadow circle to SVG size (0 < ratio < 1)
    color?: string;  // Shadow color
    strokeWidth?: number;
    opacity?: number; // Shadow opacity (0 to 1)
}
  
export function Shadow({
    size = GRID.size,
    ratio = SHADOW.ratio,
    color = SHADOW.color,
    strokeWidth = SHADOW.strokeWidth,
    opacity = SHADOW.opacity,
  }: ShadowProps) {
    const center = size / 2;
    const radius = (size / 2) * ratio;
  
    return (
      <circle
        cx={center}
        cy={center}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        opacity={opacity}
      />
    );
  }