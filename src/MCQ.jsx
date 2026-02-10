import { useState, useEffect } from "react";
import Review from "./Review";

// Shuffle Helper Function
const shuffleArray = (array) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

function MCQ({ questions }) {
  if (!questions || questions.length === 0) {
    return <h2>No questions found. Please upload CSV first.</h2>;
  }

  // Shuffle questions ONCE only
  const [questionSet] = useState(() => shuffleArray(questions));

  const totalQuestions = questionSet.length;
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [showSolution, setShowSolution] = useState(false);
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [answers, setAnswers] = useState({});

  const q = questionSet[current];

  // Shuffle options for each question
  const [optionSet] = useState(() =>
    shuffleArray([q.option_a, q.option_b, q.option_c, q.option_d])
  );

  // Correct answer value
  const correct =
    q.correct_answer === "A" ? q.option_a :
    q.correct_answer === "B" ? q.option_b :
    q.correct_answer === "C" ? q.option_c :
    q.correct_answer === "D" ? q.option_d : "";

  // TIMER LOGIC
  useEffect(() => {
    if (showSolution) return;

    if (timeLeft === 0) {
      setShowSolution(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showSolution]);

  // NEXT LOGIC
  const handleNext = () => {
    if (!showSolution) {
      setAnswers({ ...answers, [current]: selected });

      if (selected === correct) setScore(score + 1);

      setShowSolution(true);
      return;
    }

    setSelected("");
    setShowSolution(false);
    setTimeLeft(30);

    if (current + 1 < totalQuestions) {
      setCurrent(current + 1);
      setSelected(answers[current + 1] || "");
    } else {
      setFinished(true);
    }
  };

  // BACK BUTTON LOGIC
  const handleBack = () => {
    if (current === 0) return;

    setCurrent(current - 1);
    setTimeLeft(30);
    setSelected(answers[current - 1] || "");
    setShowSolution(false);
  };

  // FINISHED → SHOW REVIEW PAGE
  if (finished) {
  // OLD HISTORY
  const oldHistory = JSON.parse(localStorage.getItem("scoreHistory")) || [];

  // CALCULATE VALUES
  const correct = score;
  const attempted = Object.keys(answers).length;
  const wrong = attempted - correct;
  const negative = wrong / 3; // 3 wrong = -1 mark
  const totalMarks = (correct - negative).toFixed(2);
  const percentage = Math.round((correct / totalQuestions) * 100);

  // NEW ENTRY
  const newEntry = {
    testName: localStorage.getItem("currentTestName") || "Unknown Test",
    totalQuestions,
    attempted,
    correct,
    wrong,
    negative,
    totalMarks,
    percentage,
    date: new Date().toLocaleString()
  };

  // SAVE HISTORY
  localStorage.setItem(
    "scoreHistory",
    JSON.stringify([newEntry, ...oldHistory])
  );

  return <Review questions={questionSet} answers={answers} />;
}



  const progressPercent = ((current + 1) / totalQuestions) * 100;

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f0f2f5",
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      padding: "30px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "700px",
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>

        {/* QUESTION NUMBER */}
        <h4 style={{ marginBottom: "10px" }}>
          Question {current + 1} / {totalQuestions}
        </h4>

        {/* PROGRESS BAR */}
        <div style={{
          width: "100%",
          backgroundColor: "#eee",
          height: "12px",
          borderRadius: "6px",
          overflow: "hidden",
          marginBottom: "25px",
        }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: "100%",
              background: "linear-gradient(90deg, #4CAF50, #2e8b57)",
              transition: "0.4s"
            }}
          ></div>
        </div>

        {/* TIMER */}
        <div
          style={{
            fontSize: "22px",
            fontWeight: "bold",
            marginBottom: "20px",
            backgroundColor: timeLeft <= 5 ? "#ff4d4f" : "#333",
            color: "white",
            padding: "10px",
            borderRadius: "8px",
            textAlign: "center",
            width: "150px"
          }}
        >
          ⏳ {timeLeft}s
        </div>

        {/* QUESTION */}
        <h3 style={{
          marginBottom: "20px",
          color: "#222",
          fontWeight: "600",
          fontSize: "20px"
        }}>
          {q.question}
        </h3>

        {/* OPTIONS */}
        {!showSolution && optionSet.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(opt)}
            disabled={timeLeft === 0}
            style={{
              display: "block",
              margin: "10px 0",
              padding: "14px 16px",
              width: "100%",
              backgroundColor: selected === opt ? "#4CAF50" : "#f7f7f7",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "16px",
              transition: "0.2s",
              opacity: timeLeft === 0 ? 0.5 : 1,
              color: "#333",
              fontWeight: "500",
            }}
          >
            {opt}
          </button>
        ))}

        {/* SOLUTION CARD */}
        {showSolution && (
          <div style={{
            marginTop: "25px",
            padding: "20px",
            backgroundColor: "#fef6d6",
            border: "1px solid #ffd666",
            borderRadius: "10px"
          }}>
            <p style={{
              color: "#0a3d0a",
              fontWeight: "600",
              fontSize: "18px"
            }}>
              ✔ Correct Answer: {correct}
            </p>

            <p style={{
              color: "#333",
              marginTop: "10px",
              fontSize: "16px",
              lineHeight: "1.5"
            }}>
              📝 <strong>Explanation:</strong> {q.solution}
            </p>
          </div>
        )}

        {/* BUTTON ROW */}
        <div style={{ marginTop: "25px", display: "flex", gap: "10px" }}>
          <button
            onClick={handleBack}
            disabled={current === 0}
            style={{
              padding: "10px 20px",
              backgroundColor: current === 0 ? "gray" : "#007bff",
              color: "white",
              borderRadius: "8px",
              cursor: current === 0 ? "not-allowed" : "pointer",
              flex: 1
            }}
          >
            ⬅ Back
          </button>

          <button
            onClick={handleNext}
            style={{
              padding: "10px 20px",
              backgroundColor: "#333",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
              flex: 1
            }}
          >
            {showSolution ? "Continue ➜" : "Next ➜"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default MCQ;
