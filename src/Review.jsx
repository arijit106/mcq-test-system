import { useState, useEffect } from "react";

function Review({ questions, answers }) {
  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "#fff", marginBottom: "20px" }}>Review Answers</h2>

      {questions.map((q, index) => {
        const correct =
          q.correct_answer === "A" ? q.option_a :
          q.correct_answer === "B" ? q.option_b :
          q.correct_answer === "C" ? q.option_c :
          q.correct_answer === "D" ? q.option_d :
          "";

        const userAnswer = answers[index] || "Not Answered";

        const isCorrect = userAnswer === correct;

        return (
          <div
            key={index}
            style={{
              marginBottom: "20px",
              padding: "20px",
              background: "#ffffff",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
            }}
          >
            {/* QUESTION */}
            <h3
              style={{
                color: "#222",
                fontWeight: "600",
                marginBottom: "10px",
                lineHeight: "1.4",
              }}
            >
              {index + 1}. {q.question}
            </h3>

            {/* USER ANSWER */}
            <p style={{ fontSize: "16px", color: "#222", marginBottom: "5px" }}>
              <strong>Your Answer: </strong>
              <span style={{ color: isCorrect ? "green" : "red" }}>
                {userAnswer}
              </span>
            </p>

            {/* CORRECT ANSWER */}
            <p style={{ fontSize: "16px", color: "#222", marginBottom: "5px" }}>
              <strong>Correct Answer: </strong>
              <span style={{ color: "green", fontWeight: "600" }}>
                {correct}
              </span>
            </p>

            {/* EXPLANATION */}
            <p
              style={{
                fontSize: "15px",
                color: "#444",
                marginTop: "8px",
                lineHeight: "1.5",
              }}
            >
              <strong>Explanation: </strong> {q.solution}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Review;
