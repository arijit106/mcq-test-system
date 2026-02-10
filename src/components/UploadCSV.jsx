import Papa from "papaparse";
import { useState, useEffect } from "react";

function UploadCSV() {
  const [fileName, setFileName] = useState("");
  const [testName, setTestName] = useState("");
  const [tests, setTests] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("mcqTests")) || [];
    setTests(data);
  }, []);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file || !testName.trim()) {
      alert("Please enter test name and choose CSV file");
      return;
    }

    setFileName(file.name);

    Papa.parse(file, {
      header: true,
      complete: (result) => {
        const cleaned = result.data.filter(
          q =>
            q.question &&
            q.option_a &&
            q.option_b &&
            q.option_c &&
            q.option_d &&
            q.correct_answer
        );

        const oldTests = JSON.parse(localStorage.getItem("mcqTests")) || [];

        oldTests.push({
          testName,
          questions: cleaned
        });

        localStorage.setItem("mcqTests", JSON.stringify(oldTests));
        setTests(oldTests);

        alert("Test uploaded successfully!");
        setTestName("");
        setFileName("");
      }
    });
  };

  const deleteTest = (index) => {
    if (!confirm("Are you sure you want to delete this test?")) return;

    const updated = [...tests];
    updated.splice(index, 1);
    localStorage.setItem("mcqTests", JSON.stringify(updated));
    setTests(updated);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "white", marginBottom: "20px" }}>
        Developer Panel – Upload / Manage Tests
      </h2>

      {/* UPLOAD BOX */}
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          marginBottom: "35px",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#222" }}>Upload New Test</h3>

        <input
          type="text"
          placeholder="Enter Test Name"
          value={testName}
          onChange={(e) => setTestName(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <input
          type="file"
          accept=".csv"
          onChange={handleFile}
          style={{ marginBottom: "10px" }}
        />

        {fileName && <p style={{ color: "#333" }}>Selected: {fileName}</p>}
      </div>

      {/* TEST LIST BOX */}
      <div
        style={{
          background: "#ffffff",
          padding: "25px",
          borderRadius: "12px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginBottom: "15px", color: "#222" }}>
          Manage Existing Tests
        </h3>

        {tests.length === 0 && <p style={{ color: "#555" }}>No tests uploaded yet.</p>}

        {tests.map((test, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#f4f4f4",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontSize: "16px", fontWeight: "600", color: "#222" }}>
              {index + 1}. {test.testName}
            </span>

            <button
              onClick={() => deleteTest(index)}
              style={{
                background: "#ff5757",
                color: "white",
                padding: "8px 14px",
                borderRadius: "6px",
                border: "none",
                fontWeight: "600",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#e63939")}
              onMouseOut={(e) => (e.target.style.background = "#ff5757")}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UploadCSV;