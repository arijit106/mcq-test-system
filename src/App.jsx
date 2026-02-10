import { useState, useEffect } from "react";
import UploadCSV from "./UploadCSV";
import TestList from "./TestList";
import MCQ from "./MCQ";
import ScoreHistory from "./ScoreHistory";
import Login from "./Login";

function App() {
  const [mode, setMode] = useState("");
  const [selectedTest, setSelectedTest] = useState(null);
  const [adminLogged, setAdminLogged] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("adminLogin") === "true") {
      setAdminLogged(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("adminLogin");
    setAdminLogged(false);
    setMode("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>MCQ Test System</h1>

      {/* TOP MENU */}
      <div style={{
        marginBottom: "20px",
        display: "flex",
        justifyContent: "space-between"
      }}>

        {/* LEFT SIDE BUTTONS */}
        <div>
          {/* USER PANEL ALWAYS VISIBLE */}
          <button
            onClick={() => {
              setMode("user");
              setSelectedTest(null);
            }}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "green",
              color: "white",
              borderRadius: "5px",
            }}
          >
            User Panel
          </button>

          {/* SCORE HISTORY ALWAYS VISIBLE */}
          <button
            onClick={() => {
              setMode("history");
              setSelectedTest(null);
            }}
            style={{
              padding: "10px 20px",
              marginRight: "10px",
              backgroundColor: "orange",
              color: "white",
              borderRadius: "5px",
            }}
          >
            Score History
          </button>

          {/* DEVELOPER PANEL ONLY AFTER LOGIN */}
          {adminLogged && (
            <button
              onClick={() => setMode("admin")}
              style={{
                padding: "10px 20px",
                backgroundColor: "purple",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Developer Panel
            </button>
          )}
        </div>

        {/* RIGHT SIDE – LOGIN / LOGOUT */}
        <div>
          {!adminLogged ? (
            <button
              onClick={() => setMode("login")}
              style={{
                padding: "10px 20px",
                backgroundColor: "#222",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              style={{
                padding: "10px 20px",
                backgroundColor: "red",
                color: "white",
                borderRadius: "5px",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {/* LOGIN PAGE */}
      {mode === "login" && (
        <Login
          onLogin={() => {
            setAdminLogged(true);
            setMode("admin");
          }}
        />
      )}

      {/* ADMIN UPLOAD PANEL */}
      {mode === "admin" && adminLogged && <UploadCSV />}

      {/* USER TEST LIST */}
      {mode === "user" && !selectedTest && (
        <TestList
          onSelect={(test) => {
            localStorage.setItem("currentTestName", test.testName);
            setSelectedTest(test);
          }}
        />
      )}

      {/* MCQ PAGE */}
      {selectedTest && <MCQ questions={selectedTest.questions} />}

      {/* SCORE HISTORY */}
      {mode === "history" && <ScoreHistory />}
    </div>
  );
}

export default App;
