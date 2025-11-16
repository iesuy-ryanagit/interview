// src/components/Button.tsx
import React from "react";

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: Props) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "12px 24px",
        backgroundColor: "transparent",
        color: "#00f0ff",
        border: "2px solid #00f0ff",
        borderRadius: "0",
        cursor: "pointer",
        margin: "8px",
        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: "1px",
        textTransform: "uppercase",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: "0 0 10px rgba(0, 240, 255, 0.3)",
        background: "linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(0, 100, 255, 0.05))"
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 240, 255, 0.8), inset 0 0 20px rgba(0, 240, 255, 0.2)";
        e.currentTarget.style.textShadow = "0 0 10px rgba(0, 240, 255, 0.8)";
        e.currentTarget.style.transform = "scale(1.05)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 240, 255, 0.3)";
        e.currentTarget.style.textShadow = "none";
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {children}
    </button>
  );
}
