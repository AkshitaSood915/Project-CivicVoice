import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Login failed"
      );
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: "#38bdf8", marginBottom: "10px" }}>
          CivicVoice
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "25px" }}>
          Login to continue
        </p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const cardStyle = {
  background: "#1e293b",
  padding: "40px",
  borderRadius: "15px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 0 20px rgba(59,130,246,0.4)",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#334155",
  color: "white",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#0ea5e9",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default Login;