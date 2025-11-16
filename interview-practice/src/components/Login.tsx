// src/components/Login.tsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../utils/firebase";

type LoginProps = {
  onLogin: (email: string, password: string) => void;
};

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin(email, password); // ← ここで親コンポーネントに通知！
    } catch (err: any) {
      console.error("ログイン失敗:", err);
      switch (err.code) {
        case "auth/invalid-email":
          setError("メールアドレスの形式が正しくありません。");
          break;
        case "auth/user-not-found":
          setError("このメールアドレスのユーザーが見つかりません。");
          break;
        case "auth/wrong-password":
          setError("パスワードが間違っています。");
          break;
        default:
          setError("ログインに失敗しました。もう一度お試しください。");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          width: "100%",
          padding: "40px",
          border: "2px solid #00f0ff",
          borderRadius: "0",
          backgroundColor: "rgba(10, 14, 39, 0.8)",
          boxShadow: "0 0 30px rgba(0, 240, 255, 0.3), inset 0 0 20px rgba(0, 240, 255, 0.05)",
          backdropFilter: "blur(10px)",
          position: "relative"
        }}
      >
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          right: "0",
          height: "2px",
          background: "linear-gradient(90deg, transparent, #00f0ff, transparent)",
          boxShadow: "0 0 10px #00f0ff"
        }} />
        
        <h1 style={{
          textAlign: "center",
          color: "#00f0ff",
          fontSize: "28px",
          marginBottom: "10px",
          textShadow: "0 0 10px rgba(0, 240, 255, 0.5)",
          letterSpacing: "2px"
        }}>Interview App</h1>
        
        <h2 style={{
          textAlign: "center",
          color: "#00ff88",
          fontSize: "16px",
          marginBottom: "30px",
          fontWeight: "600",
          letterSpacing: "1px",
          textTransform: "uppercase"
        }}>Access Required</h2>

        <div style={{ marginBottom: "16px" }}>
          <label style={{
            display: "block",
            color: "#00f0ff",
            fontSize: "12px",
            marginBottom: "8px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontWeight: "600"
          }}>Email Address</label>
          <input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ 
              width: "100%",
              padding: "12px",
              backgroundColor: "rgba(0, 240, 255, 0.05)",
              border: "2px solid rgba(0, 240, 255, 0.3)",
              borderRadius: "0",
              color: "#00f0ff",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
              boxShadow: "inset 0 0 5px rgba(0, 240, 255, 0.1)"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#00f0ff";
              e.currentTarget.style.boxShadow = "inset 0 0 10px rgba(0, 240, 255, 0.2), 0 0 10px rgba(0, 240, 255, 0.3)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.3)";
              e.currentTarget.style.boxShadow = "inset 0 0 5px rgba(0, 240, 255, 0.1)";
            }}
            required
          />
        </div>

        <div style={{ marginBottom: "24px" }}>
          <label style={{
            display: "block",
            color: "#00f0ff",
            fontSize: "12px",
            marginBottom: "8px",
            letterSpacing: "1px",
            textTransform: "uppercase",
            fontWeight: "600"
          }}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ 
              width: "100%",
              padding: "12px",
              backgroundColor: "rgba(0, 240, 255, 0.05)",
              border: "2px solid rgba(0, 240, 255, 0.3)",
              borderRadius: "0",
              color: "#00f0ff",
              fontSize: "14px",
              boxSizing: "border-box",
              transition: "all 0.3s ease",
              boxShadow: "inset 0 0 5px rgba(0, 240, 255, 0.1)"
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "#00f0ff";
              e.currentTarget.style.boxShadow = "inset 0 0 10px rgba(0, 240, 255, 0.2), 0 0 10px rgba(0, 240, 255, 0.3)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.3)";
              e.currentTarget.style.boxShadow = "inset 0 0 5px rgba(0, 240, 255, 0.1)";
            }}
            required
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "12px 16px",
            width: "100%",
            backgroundColor: "transparent",
            color: "#00ff88",
            border: "2px solid #00ff88",
            borderRadius: "0",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            letterSpacing: "1px",
            textTransform: "uppercase",
            transition: "all 0.3s ease",
            boxShadow: "0 0 10px rgba(0, 255, 136, 0.3)"
          }}
          disabled={loading}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(0, 255, 136, 0.8), inset 0 0 20px rgba(0, 255, 136, 0.2)";
            e.currentTarget.style.textShadow = "0 0 10px rgba(0, 255, 136, 0.8)";
            e.currentTarget.style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 136, 0.3)";
            e.currentTarget.style.textShadow = "none";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          {loading ? "AUTHENTICATING..." : "ACCESS SYSTEM"}
        </button>

        {error && <p style={{ 
          color: "#ff0055",
          marginTop: "16px",
          fontSize: "13px",
          textAlign: "center",
          backgroundColor: "rgba(255, 0, 85, 0.1)",
          padding: "10px",
          border: "1px solid rgba(255, 0, 85, 0.3)",
          borderRadius: "0"
        }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
