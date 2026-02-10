import { useState, useEffect } from "react";

function TestList({ onSelect }) {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mcqTests")) || [];
    setTests(data);
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Select a Test</h2>

      {tests.length === 0 && <p>No tests found. Upload CSV first.</p>}

      {tests.map((test, index) => (
        <button
          key={index}
          onClick={() => onSelect(test)}
          style={{
            padding: "15px",
            margin: "10px 0",
            width: "300px",
            background: "#222",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          {test.testName}
        </button>
      ))}
    </div>
  );
}

export default TestList;
