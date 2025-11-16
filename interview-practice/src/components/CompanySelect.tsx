// src/components/CompanySelect.tsx
import React, { useState } from "react";

interface Props {
  companies: string[];
  selected: string;
  onChange: (company: string) => void;
}

export default function CompanySelect({ companies, selected, onChange }: Props) {
  const [hoveredCompany, setHoveredCompany] = useState<string | null>(null);

  return (
    <div style={{ 
      marginBottom: "32px",
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: "8px"
    }}>
      {companies.map((company) => (
        <button
          key={company}
          onClick={() => onChange(company)}
          onMouseEnter={() => setHoveredCompany(company)}
          onMouseLeave={() => setHoveredCompany(null)}
          style={{
            margin: "4px",
            padding: "10px 20px",
            borderRadius: "0",
            border: selected === company ? "2px solid #00ff88" : "2px solid rgba(0, 240, 255, 0.5)",
            backgroundColor: selected === company 
              ? "rgba(0, 255, 136, 0.1)" 
              : hoveredCompany === company 
              ? "rgba(0, 240, 255, 0.1)"
              : "transparent",
            color: selected === company ? "#00ff88" : "#00f0ff",
            cursor: "pointer",
            fontSize: "13px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            boxShadow: selected === company 
              ? "0 0 15px rgba(0, 255, 136, 0.5)" 
              : hoveredCompany === company
              ? "0 0 10px rgba(0, 240, 255, 0.4)"
              : "0 0 5px rgba(0, 240, 255, 0.2)"
          }}
        >
          {company}
        </button>
      ))}
    </div>
  );
}
