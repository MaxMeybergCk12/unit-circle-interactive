import React from "react";
import { GRID_CONFIG, SHADOW_CONFIG } from "../../constraints";

// A dotted gray light brush circle, always active
interface ShadowProps {
    size?: number;   // SVG size (width/height)
    ratio?: number;  // Ratio of shadow circle to SVG size (0 < ratio < 1)
    color?: string;  // Shadow color
    strokeWidth?: number;
    opacity?: number; // Shadow opacity (0 to 1)
}
  
export function Shadow({
    size = GRID_CONFIG.size,
    ratio = SHADOW_CONFIG.ratio,
    color = SHADOW_CONFIG.color,
    strokeWidth = SHADOW_CONFIG.strokeWidth,
    opacity = SHADOW_CONFIG.opacity,
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