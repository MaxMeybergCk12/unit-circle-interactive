import { SINWAVE } from "../../constraints";
import { GraphSkeleton } from "./GraphSkeleton";
import TracePath from "./TracePath";

interface SinWaveProps {
  // Props is short for properties
  angle: number;
}

export function SinWave({ angle }: SinWaveProps) {
  const { width, height, border } = SINWAVE;
  const midY = height / 2;
  const amp = (height / 2) * 0.8;
  const labels = ["0", "π/2", "π", "3π/2", "2π"];
  const tickSpacing = width / 4;

  //Calculate tracing points
  const points = [];
  for (let x = 0; x <= width; x++) {
    const theta = (x / width) * 2 * Math.PI;
    const y = midY - Math.sin(theta) * amp;
    points.push(`${x},${y}`);
  }
  // voodooo magic for getting SVGs to listen

  const x = (angle / (2 * Math.PI)) * width;
  const y = midY - Math.sin(angle) * amp;

  return (
    <GraphSkeleton
      width={width}
      height={height}
      border={border}
      midY={midY}
      numberLineProps={{ tickSpacing, y: midY, labels }}
      traceX={x}
      traceY={y}
      strokeColor="blue"
    >
      <TracePath
        width={width}
        height={height}
        amp={amp}
        angle={angle}
        waveType="sin"
        trailColor="black"
        faintColor="#bbb"
      />
    </GraphSkeleton>
  );
}
