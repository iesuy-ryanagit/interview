import React, { useState, useEffect } from "react";
import { getQuestionsFromFirestore, CompanyQuestions } from "./data/questions";
import Question from "./components/Question";
import Button from "./components/Button";
import CompanySelect from "./components/CompanySelect";
import { speak } from "./utils/speak";

function InterviewApp() {
  const [questions, setQuestions] = useState<CompanyQuestions>({});
  const [selectedCompany, setSelectedCompany] = useState<string>("");
  const [index, setIndex] = useState(0);
  const [isSpeechOn, setIsSpeechOn] = useState(true);
  const [loading, setLoading] = useState(true);

  // Firestore から質問を取得
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const data = await getQuestionsFromFirestore();
      setQuestions(data);

      // 企業選択の初期値
      const firstCompany = Object.keys(data)[0] || "";
      setSelectedCompany(firstCompany);
      setIndex(0);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  const nextQuestion = () => {
    if (!selectedCompany) return;
    setIndex((prev) =>
      prev + 1 < questions[selectedCompany].length ? prev + 1 : prev
    );
  };

  const prevQuestion = () => {
    if (!selectedCompany) return;
    setIndex((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
  };

  const handleCompanyChange = (company: string) => {
    setSelectedCompany(company);
    setIndex(0);
  };

  useEffect(() => {
    if (!isSpeechOn || !selectedCompany) return;
    const currentQuestion = questions[selectedCompany][index];
    if (currentQuestion) speak(currentQuestion);
  }, [selectedCompany, index, isSpeechOn, questions]);

  if (loading) return <div style={{ padding: "40px", textAlign: "center", color: "#00f0ff", fontSize: "18px" }}>Loading system...</div>;

  const companies = Object.keys(questions);

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", position: "relative", zIndex: 2 }}>
      <h1 style={{
        textAlign: "center",
        color: "#00f0ff",
        fontSize: "32px",
        marginBottom: "10px",
        textShadow: "0 0 20px rgba(0, 240, 255, 0.5)",
        letterSpacing: "2px"
      }}>Interview Practice System</h1>
      
      <p style={{
        textAlign: "center",
        color: "#00ff88",
        fontSize: "12px",
        marginBottom: "30px",
        letterSpacing: "1px",
        textTransform: "uppercase"
      }}>Advanced Training Protocol</p>

      <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
        <Button onClick={() => setIsSpeechOn((prev) => !prev)}>
          {isSpeechOn ? "🔊 Audio ON" : "🔇 Audio OFF"}
        </Button>
      </div>

      <div style={{
        padding: "24px",
        border: "2px solid #00f0ff",
        borderRadius: "0",
        backgroundColor: "rgba(0, 240, 255, 0.03)",
        boxShadow: "0 0 15px rgba(0, 240, 255, 0.2), inset 0 0 15px rgba(0, 240, 255, 0.05)",
        marginBottom: "32px",
        position: "relative"
      }}>
        <div style={{
          position: "absolute",
          top: "-2px",
          left: "20px",
          width: "60px",
          height: "2px",
          backgroundColor: "#00f0ff",
          boxShadow: "0 0 10px #00f0ff"
        }} />
        
        <p style={{
          textAlign: "center",
          color: "#00ff88",
          fontSize: "12px",
          marginBottom: "20px",
          marginTop: "0",
          letterSpacing: "1px",
          textTransform: "uppercase",
          fontWeight: "600"
        }}>Select Company</p>
        
        <CompanySelect
          companies={companies}
          selected={selectedCompany}
          onChange={handleCompanyChange}
        />
      </div>

      <Question question={questions[selectedCompany]?.[index] || "Loading..."} />

      <div style={{ display: "flex", justifyContent: "center", gap: "16px", marginBottom: "24px" }}>
        <Button onClick={prevQuestion}>← Previous</Button>
        <Button onClick={nextQuestion}>Next →</Button>
      </div>

      <div style={{
        textAlign: "center",
        color: "#00f0ff",
        fontSize: "14px",
        padding: "16px",
        border: "2px solid rgba(0, 240, 255, 0.3)",
        borderRadius: "0",
        backgroundColor: "rgba(0, 240, 255, 0.05)",
        boxShadow: "0 0 10px rgba(0, 240, 255, 0.2)",
        letterSpacing: "1px"
      }}>
        Progress: {index + 1} / {selectedCompany ? questions[selectedCompany].length : 0}
      </div>
    </div>
  );
}

export default InterviewApp;
