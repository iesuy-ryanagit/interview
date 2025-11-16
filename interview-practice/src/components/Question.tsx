// src/components/Question.tsx
import React from "react";

interface Props {
  question: string;
}

export default function Question({ question }: Props) {
  return (
    <div
      style={{
        padding: "24px",
        border: "2px solid #00f0ff",
        borderRadius: "0",
        margin: "32px auto",
        backgroundColor: "rgba(0, 240, 255, 0.05)",
        maxWidth: "700px",
        position: "relative",
        boxShadow: "0 0 20px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.05)",
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#00f0ff",
        animation: "neon-glow 3s ease-in-out infinite",
        backdropFilter: "blur(5px)"
      }}
    >
      <div style={{
        position: "absolute",
        top: "-2px",
        left: "20px",
        width: "40px",
        height: "2px",
        backgroundColor: "#00f0ff",
        boxShadow: "0 0 10px #00f0ff"
      }} />
      <div style={{
        position: "absolute",
        bottom: "-2px",
        right: "20px",
        width: "40px",
        height: "2px",
        backgroundColor: "#00f0ff",
        boxShadow: "0 0 10px #00f0ff"
      }} />
      {question}
    </div>
  );
}
