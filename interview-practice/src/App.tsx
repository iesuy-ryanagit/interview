import React, { useState } from "react";
import Login from "./components/Login";
import InterviewApp from "./InterviewApp";
import ManagementApp from "./ManagementApp";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentScreen, setCurrentScreen] = useState<"interview" | "management">("interview");

  const handleLogin = (email: string, password: string) => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div>
      {/* ナビゲーションバー */}
      <div style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        height: "60px",
        backgroundColor: "rgba(10, 14, 39, 0.95)",
        borderBottom: "2px solid rgba(0, 240, 255, 0.3)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        zIndex: 999,
        backdropFilter: "blur(10px)",
        boxShadow: "0 0 20px rgba(0, 240, 255, 0.1)"
      }}>
        <div style={{ display: "flex", gap: "16px" }}>
          <button
            onClick={() => setCurrentScreen("interview")}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: currentScreen === "interview" ? "#00ff88" : "#00f0ff",
              border: `2px solid ${currentScreen === "interview" ? "#00ff88" : "rgba(0, 240, 255, 0.3)"}`,
              borderRadius: "0",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              boxShadow: currentScreen === "interview" ? "0 0 10px rgba(0, 255, 136, 0.4)" : "none"
            }}
            onMouseEnter={(e) => {
              if (currentScreen !== "interview") {
                e.currentTarget.style.borderColor = "#00f0ff";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 240, 255, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentScreen !== "interview") {
                e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.3)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            Interview Practice
          </button>

          <button
            onClick={() => setCurrentScreen("management")}
            style={{
              padding: "8px 16px",
              backgroundColor: "transparent",
              color: currentScreen === "management" ? "#00ff88" : "#00f0ff",
              border: `2px solid ${currentScreen === "management" ? "#00ff88" : "rgba(0, 240, 255, 0.3)"}`,
              borderRadius: "0",
              cursor: "pointer",
              fontSize: "12px",
              fontWeight: "600",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              transition: "all 0.3s ease",
              boxShadow: currentScreen === "management" ? "0 0 10px rgba(0, 255, 136, 0.4)" : "none"
            }}
            onMouseEnter={(e) => {
              if (currentScreen !== "management") {
                e.currentTarget.style.borderColor = "#00f0ff";
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 240, 255, 0.3)";
              }
            }}
            onMouseLeave={(e) => {
              if (currentScreen !== "management") {
                e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.3)";
                e.currentTarget.style.boxShadow = "none";
              }
            }}
          >
            Management
          </button>
        </div>

        <button
          onClick={handleLogout}
          style={{
            padding: "8px 16px",
            backgroundColor: "transparent",
            color: "#ff0055",
            border: "2px solid #ff0055",
            borderRadius: "0",
            cursor: "pointer",
            fontSize: "12px",
            fontWeight: "600",
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            boxShadow: "0 0 5px rgba(255, 0, 85, 0.2)"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 0, 85, 0.5)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 5px rgba(255, 0, 85, 0.2)";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Logout
        </button>
      </div>

      {/* メインコンテンツ */}
      <div style={{ marginTop: "60px" }}>
        {currentScreen === "interview" ? <InterviewApp /> : <ManagementApp />}
      </div>
    </div>
  );
}

export default App;
