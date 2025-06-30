// src/extras/Buttons.tsx
import React from "react";
import "./buttons.css";

interface ButtonsProps {
  selectedGraph: "sin" | "cos";
  setSelectedGraph: (graph: "sin" | "cos") => void;
}

export default function Buttons({ selectedGraph, setSelectedGraph }: ButtonsProps) {
  return (
    <div className="toggle-buttons">

      <button
        className={`toggle-btn${selectedGraph === "cos" ? " selected" : ""}`}
        onClick={() => setSelectedGraph("cos")}
      >
        Cos
      </button>

      <button
        className={`toggle-btn${selectedGraph === "sin" ? " selected" : ""}`}
        onClick={() => setSelectedGraph("sin")}
      >
        Sin
      </button>
    </div>
  );
}