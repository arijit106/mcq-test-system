import { useState } from "react";

function Login({ onLogin }) {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (id === "7908470514" && password === "111220") {
      localStorage.setItem("adminLogin", "true");
      onLogin(true);
    } else {
      setError("Invalid ID or Password!");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(8px)",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
          textAlign: "center",
        }}
      >
        <h2 style={{ color: "white", marginBottom: "20px" }}>Admin Login</h2>

        {/* LOGIN ID */}
        <input
          type="text"
          placeholder="Enter Login ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "15px",
            borderRadius: "8px",
            border: "none",
            outline: "none",
            fontSize: "16px",
          }}
        />

        {/* PASSWORD BOX + SHOW/HIDE BUTTON */}
        <div style={{ position: "relative" }}>
          <input
            type={showPass ? "text" : "password"}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              outline: "none",
              fontSize: "16px",
            }}
          />

          {/* SHOW/HIDE ICON */}
          <span
            onClick={() => setShowPass(!showPass)}
            style={{
              position: "absolute",
              right: "12px",
              top: "10px",
              cursor: "pointer",
              color: "#ddd",
              fontSize: "20px",
              userSelect: "none",
            }}
          >
            {showPass ? "🙈" : "👁️"}
          </span>
        </div>

        {/* ERROR MESSAGE */}
        {error && (
          <p
            style={{
              color: "#ff4d4f",
              marginTop: "10px",
              marginBottom: "10px",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        {/* LOGIN BUTTON */}
        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "8px",
            border: "none",
            marginTop: "15px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
