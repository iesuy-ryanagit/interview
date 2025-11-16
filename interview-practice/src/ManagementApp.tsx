import React, { useState, useEffect } from "react";
import { getQuestionsFromFirestore, addCompany, addQuestion, deleteQuestion, deleteCompany, CompanyQuestions } from "./data/questions";
import Button from "./components/Button";

function ManagementApp() {
  const [questions, setQuestions] = useState<CompanyQuestions>({});
  const [loading, setLoading] = useState(true);
  const [newCompanyName, setNewCompanyName] = useState("");
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [newQuestion, setNewQuestion] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // データを取得
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const data = await getQuestionsFromFirestore();
      setQuestions(data);
      const firstCompany = Object.keys(data)[0] || "";
      setSelectedCompany(firstCompany);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const showMessage = (type: "success" | "error", text: string) => {
    setMessage({ type, text });
    setTimeout(() => setMessage(null), 3000);
  };

  // 企業を追加
  const handleAddCompany = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompanyName.trim()) {
      showMessage("error", "企業名を入力してください");
      return;
    }

    try {
      await addCompany(newCompanyName);
      setQuestions((prev) => ({ ...prev, [newCompanyName]: [] }));
      setNewCompanyName("");
      setSelectedCompany(newCompanyName);
      showMessage("success", `企業「${newCompanyName}」を追加しました`);
    } catch (err) {
      showMessage("error", "企業の追加に失敗しました");
    }
  };

  // 質問を追加
  const handleAddQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCompany) {
      showMessage("error", "企業を選択してください");
      return;
    }
    if (!newQuestion.trim()) {
      showMessage("error", "質問を入力してください");
      return;
    }

    try {
      await addQuestion(selectedCompany, newQuestion);
      const data = await getQuestionsFromFirestore();
      setQuestions(data);
      setNewQuestion("");
      showMessage("success", "質問を追加しました");
    } catch (err) {
      showMessage("error", "質問の追加に失敗しました");
    }
  };

  // 質問を削除
  const handleDeleteQuestion = async (questionIndex: number) => {
    if (!selectedCompany) return;

    try {
      await deleteQuestion(selectedCompany, questionIndex);
      const data = await getQuestionsFromFirestore();
      setQuestions(data);
      showMessage("success", "質問を削除しました");
    } catch (err) {
      showMessage("error", "質問の削除に失敗しました");
    }
  };

  // 企業を削除
  const handleDeleteCompany = async (companyName: string) => {
    if (!window.confirm(`「${companyName}」を削除してもよろしいですか？`)) return;

    try {
      await deleteCompany(companyName);
      const newQuestions = { ...questions };
      delete newQuestions[companyName];
      setQuestions(newQuestions);
      const firstCompany = Object.keys(newQuestions)[0] || "";
      setSelectedCompany(firstCompany);
      showMessage("success", `企業「${companyName}」を削除しました`);
    } catch (err) {
      showMessage("error", "企業の削除に失敗しました");
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center", color: "#00f0ff", fontSize: "18px" }}>Loading system...</div>;
  }

  const companies = Object.keys(questions);

  return (
    <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "20px", position: "relative", zIndex: 2 }}>
      <h1 style={{
        textAlign: "center",
        color: "#00f0ff",
        fontSize: "32px",
        marginBottom: "10px",
        textShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
        letterSpacing: "2px"
      }}>Management System</h1>

      <p style={{
        textAlign: "center",
        color: "#00ff88",
        fontSize: "12px",
        marginBottom: "30px",
        letterSpacing: "1px",
        textTransform: "uppercase"
      }}>Data Administration Panel</p>

      {/* メッセージ表示 */}
      {message && (
        <div style={{
          padding: "12px 16px",
          marginBottom: "20px",
          border: `2px solid ${message.type === "success" ? "#00ff88" : "#ff0055"}`,
          borderRadius: "0",
          backgroundColor: message.type === "success" ? "rgba(0, 255, 136, 0.1)" : "rgba(255, 0, 85, 0.1)",
          color: message.type === "success" ? "#00ff88" : "#ff0055",
          fontSize: "13px",
          boxShadow: `0 0 10px ${message.type === "success" ? "rgba(0, 255, 136, 0.3)" : "rgba(255, 0, 85, 0.3)"}`
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
        {/* 左: 企業管理 */}
        <div style={{
          padding: "24px",
          border: "2px solid #00f0ff",
          borderRadius: "0",
          backgroundColor: "rgba(0, 240, 255, 0.03)",
          boxShadow: "0 0 15px rgba(0, 240, 255, 0.2), inset 0 0 15px rgba(0, 240, 255, 0.05)"
        }}>
          <h2 style={{
            color: "#00f0ff",
            fontSize: "18px",
            marginTop: "0",
            letterSpacing: "1px",
            textShadow: "0 0 10px rgba(0, 240, 255, 0.3)"
          }}>企業管理</h2>

          <form onSubmit={handleAddCompany} style={{ marginBottom: "20px" }}>
            <div style={{ marginBottom: "12px" }}>
              <label style={{
                display: "block",
                color: "#00f0ff",
                fontSize: "12px",
                marginBottom: "8px",
                letterSpacing: "1px",
                textTransform: "uppercase",
                fontWeight: "600"
              }}>新規企業名</label>
              <input
                type="text"
                placeholder="Enter company name"
                value={newCompanyName}
                onChange={(e) => setNewCompanyName(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px",
                  backgroundColor: "rgba(0, 240, 255, 0.05)",
                  border: "2px solid rgba(0, 240, 255, 0.3)",
                  borderRadius: "0",
                  color: "#00f0ff",
                  fontSize: "13px",
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
              />
            </div>
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "10px",
                backgroundColor: "transparent",
                color: "#00ff88",
                border: "2px solid #00ff88",
                borderRadius: "0",
                cursor: "pointer",
                fontSize: "12px",
                fontWeight: "600",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                transition: "all 0.3s ease",
                boxShadow: "0 0 10px rgba(0, 255, 136, 0.3)"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.6)";
                e.currentTarget.style.transform = "scale(1.02)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 136, 0.3)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              Add Company
            </button>
          </form>

          <h3 style={{ color: "#00f0ff", fontSize: "13px", marginTop: "20px", letterSpacing: "0.5px" }}>企業一覧</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {companies.length === 0 ? (
              <p style={{ color: "rgba(0, 240, 255, 0.5)", fontSize: "12px" }}>企業がありません</p>
            ) : (
              companies.map((company) => (
                <div key={company} style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setSelectedCompany(company)}
                    style={{
                      flex: 1,
                      padding: "8px",
                      border: selectedCompany === company ? "2px solid #00ff88" : "2px solid rgba(0, 240, 255, 0.3)",
                      backgroundColor: selectedCompany === company ? "rgba(0, 255, 136, 0.1)" : "rgba(0, 240, 255, 0.05)",
                      color: selectedCompany === company ? "#00ff88" : "#00f0ff",
                      borderRadius: "0",
                      cursor: "pointer",
                      fontSize: "12px",
                      fontWeight: "600",
                      transition: "all 0.3s ease"
                    }}
                    onMouseEnter={(e) => {
                      if (selectedCompany !== company) {
                        e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 240, 255, 0.3)";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedCompany !== company) {
                        e.currentTarget.style.boxShadow = "none";
                      }
                    }}
                  >
                    {company}
                  </button>
                  <button
                    onClick={() => handleDeleteCompany(company)}
                    style={{
                      padding: "8px 12px",
                      backgroundColor: "transparent",
                      color: "#ff0055",
                      border: "2px solid #ff0055",
                      borderRadius: "0",
                      cursor: "pointer",
                      fontSize: "11px",
                      fontWeight: "600",
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
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* 右: 質問管理 */}
        <div style={{
          padding: "24px",
          border: "2px solid #00f0ff",
          borderRadius: "0",
          backgroundColor: "rgba(0, 240, 255, 0.03)",
          boxShadow: "0 0 15px rgba(0, 240, 255, 0.2), inset 0 0 15px rgba(0, 240, 255, 0.05)"
        }}>
          <h2 style={{
            color: "#00f0ff",
            fontSize: "18px",
            marginTop: "0",
            letterSpacing: "1px",
            textShadow: "0 0 10px rgba(0, 240, 255, 0.3)"
          }}>質問管理</h2>

          {selectedCompany ? (
            <>
              <form onSubmit={handleAddQuestion} style={{ marginBottom: "20px" }}>
                <div style={{ marginBottom: "12px" }}>
                  <label style={{
                    display: "block",
                    color: "#00f0ff",
                    fontSize: "12px",
                    marginBottom: "8px",
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    fontWeight: "600"
                  }}>新規質問 ({selectedCompany})</label>
                  <textarea
                    placeholder="Enter question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    style={{
                      width: "100%",
                      padding: "10px",
                      minHeight: "80px",
                      backgroundColor: "rgba(0, 240, 255, 0.05)",
                      border: "2px solid rgba(0, 240, 255, 0.3)",
                      borderRadius: "0",
                      color: "#00f0ff",
                      fontSize: "13px",
                      boxSizing: "border-box",
                      transition: "all 0.3s ease",
                      boxShadow: "inset 0 0 5px rgba(0, 240, 255, 0.1)",
                      fontFamily: "inherit"
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = "#00f0ff";
                      e.currentTarget.style.boxShadow = "inset 0 0 10px rgba(0, 240, 255, 0.2), 0 0 10px rgba(0, 240, 255, 0.3)";
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = "rgba(0, 240, 255, 0.3)";
                      e.currentTarget.style.boxShadow = "inset 0 0 5px rgba(0, 240, 255, 0.1)";
                    }}
                  />
                </div>
                <button
                  type="submit"
                  style={{
                    width: "100%",
                    padding: "10px",
                    backgroundColor: "transparent",
                    color: "#00ff88",
                    border: "2px solid #00ff88",
                    borderRadius: "0",
                    cursor: "pointer",
                    fontSize: "12px",
                    fontWeight: "600",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    transition: "all 0.3s ease",
                    boxShadow: "0 0 10px rgba(0, 255, 136, 0.3)"
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.6)";
                    e.currentTarget.style.transform = "scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 136, 0.3)";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  Add Question
                </button>
              </form>

              <h3 style={{ color: "#00f0ff", fontSize: "13px", marginTop: "20px", letterSpacing: "0.5px" }}>質問一覧</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "400px", overflowY: "auto" }}>
                {questions[selectedCompany]?.length === 0 ? (
                  <p style={{ color: "rgba(0, 240, 255, 0.5)", fontSize: "12px" }}>質問がありません</p>
                ) : (
                  questions[selectedCompany]?.map((q, idx) => (
                    <div key={idx} style={{
                      padding: "10px",
                      backgroundColor: "rgba(0, 240, 255, 0.05)",
                      border: "1px solid rgba(0, 240, 255, 0.2)",
                      borderRadius: "0",
                      color: "#00f0ff",
                      fontSize: "12px",
                      lineHeight: "1.5",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: "8px"
                    }}>
                      <span style={{ flex: 1, wordBreak: "break-word" }}>{q}</span>
                      <button
                        onClick={() => handleDeleteQuestion(idx)}
                        style={{
                          padding: "4px 8px",
                          backgroundColor: "transparent",
                          color: "#ff0055",
                          border: "1px solid #ff0055",
                          borderRadius: "0",
                          cursor: "pointer",
                          fontSize: "10px",
                          fontWeight: "600",
                          whiteSpace: "nowrap",
                          transition: "all 0.3s ease",
                          boxShadow: "0 0 5px rgba(255, 0, 85, 0.2)"
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = "0 0 10px rgba(255, 0, 85, 0.5)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "0 0 5px rgba(255, 0, 85, 0.2)";
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          ) : (
            <p style={{ color: "rgba(0, 240, 255, 0.5)", fontSize: "12px" }}>企業を選択してください</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ManagementApp;
