import { useState, useEffect } from "react";

function ScoreHistory() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("scoreHistory")) || [];
    
    // ⭐ SHOW ONLY LAST 5 ENTRIES
    setHistory(data.slice(0, 5)); 
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>Score History (Last 5)</h2>

      {history.length === 0 && (
        <p style={{ color: "#fff" }}>No score history available.</p>
      )}

      {history.map((item, idx) => (
        <div
          key={idx}
          style={{
            marginBottom: "20px",
            padding: "20px",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
          }}
        >
          {/* Test Name */}
          <h3
            style={{
              color: "#222",
              fontWeight: "600",
              marginBottom: "10px",
            }}
          >
            {item.testName}
          </h3>

          {/* Date */}
          <p style={{ color: "#555" }}>
            <strong>Date:</strong> {item.date}
          </p>

          <p style={{ color: "#333" }}>
            <strong>Total Questions:</strong> {item.totalQuestions}
          </p>
          <p style={{ color: "#333" }}>
            <strong>Attempted:</strong> {item.attempted}
          </p>
          <p style={{ color: "green" }}>
            <strong>Correct:</strong> {item.correct}
          </p>
          <p style={{ color: "red" }}>
            <strong>Wrong:</strong> {item.wrong}
          </p>
          <p style={{ color: "#444" }}>
            <strong>Negative Marks:</strong> -{item.negative}
          </p>

          <p
            style={{
              color: "#000",
              fontWeight: "700",
              fontSize: "18px",
              marginTop: "10px",
            }}
          >
            <strong>Total Marks:</strong> {item.totalMarks}
          </p>

          <p style={{ color: "#333" }}>
            <strong>Percentage:</strong> {item.percentage}%
          </p>
        </div>
      ))}
    </div>
  );
}

export default ScoreHistory;
