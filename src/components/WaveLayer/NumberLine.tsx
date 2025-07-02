// src/components/GraphUtils/NumberLine.tsx

interface NumberLineProps {
  width: number;
  height: number;
  tickSpacing: number;
  y: number; // vertical position of the line
  labels?: string[];
}

export function NumberLine({ width, tickSpacing, y, labels }: NumberLineProps) {
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
          <text
            key={i}
            x={
              i === 0
                ? 10 // shift "0" right
                : i === labels.length - 1
                ? width - 10 // shift "2π" left
                : i * tickSpacing
            }
            y={y + 20}
            fontSize={12}
            textAnchor={
              i === 0
                ? "start"
                : i === labels.length - 1
                ? "end"
                : "middle"
            }
          >
            {label}
          </text>
        ))}
    </g>
  );
}