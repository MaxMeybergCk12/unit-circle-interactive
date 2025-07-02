// src/extras/Buttons.tsx
import "./buttons.css";

export function SinButton({ selected, onClick }: { selected: boolean, onClick: () => void }) {
  return (
    <button
      className={`toggle-sin-btn${selected ? " selected" : ""}`}
      onClick={onClick}
    >
      Sin
    </button>
  );
}

export function CosButton({ selected, onClick }: { selected: boolean, onClick: () => void }) {
  return (
    <button
      className={`toggle-cos-btn${selected ? " selected" : ""}`}
      onClick={onClick}
    >
      Cos
    </button>
  );
}
