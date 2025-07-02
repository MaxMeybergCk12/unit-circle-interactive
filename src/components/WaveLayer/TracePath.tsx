import * as d3 from "d3-shape";

interface TracePathProps {
  width: number;
  height: number;
  amp: number;
  angle: number;
  waveType: "sin" | "cos" | "tan";
  trailColor: string;
  faintColor?: string;
  strokeWidth?: number;
  trailWidth?: number;
}

function getY(theta: number, amp: number, midY: number, waveType: "sin" | "cos" | "tan") {
  if (waveType === "sin") return midY - Math.sin(theta) * amp;
  if (waveType === "cos") return midY - Math.cos(theta) * amp;
  if (waveType === "tan") return midY - Math.max(Math.min(Math.tan(theta) * amp * 0.2, amp), -amp);
  return midY;
}

export default function TracePath({
  width,
  height,
  amp,
  angle,
  waveType,
  trailColor,
  faintColor = "#bbb",
  strokeWidth = 2,
  trailWidth = 3,
}: TracePathProps) {
  const midY = height / 2;
  const fullPoints: [number, number][] = [];
  for (let x = 0; x <= width; x++) {
    const theta = (x / width) * 2 * Math.PI;
    fullPoints.push([x, getY(theta, amp, midY, waveType)]);
  }

  const trailX = (angle / (2 * Math.PI)) * width;
  const trailPoints = fullPoints.filter(([x]) => x <= trailX);

  const line = d3.line<[number, number]>()
    .x(d => d[0])
    .y(d => d[1]);

  const fullPath = line(fullPoints) || "";
  const trailPath = line(trailPoints) || "";
  const dotY = getY(angle, amp, midY, waveType);

  return (
    <>
      {/* Full faint wave */}
      <path d={fullPath} fill="none" stroke={faintColor} strokeWidth={strokeWidth} />
      {/* Trailing path */}
      <path d={trailPath} fill="none" stroke={trailColor} strokeWidth={trailWidth} />
      {/* Moving dot */}
      <circle cx={trailX} cy={dotY} r={10} fill="green" stroke="black" strokeWidth={2} />
    </>
  );
}
