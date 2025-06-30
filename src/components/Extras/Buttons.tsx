// src/extras/Buttons.tsx
import React from "react";
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

export default function Buttons({ selectedGraph, setSelectedGraph }) {
  return (
    <div className="toggle-buttons">
      <CosButton selected={selectedGraph === "cos"} onClick={() => setSelectedGraph("cos")} />
      <SinButton selected={selectedGraph === "sin"} onClick={() => setSelectedGraph("sin")} />
    </div>
  );
}