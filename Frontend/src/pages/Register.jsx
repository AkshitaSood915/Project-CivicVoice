import { useState } from "react";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      alert(res.data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: "#38bdf8", marginBottom: "10px" }}>CivicVoice</h1>
        <p style={{ color: "#94a3b8", marginBottom: "25px" }}>Create your account</p>

        <form onSubmit={handleRegister}>
          <input
            name="name"
            type="text"
            placeholder="Enter Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="email"
            type="email"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            style={inputStyle}
          />

          <input
            name="password"
            type="password"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>Register</button>

          <button type="button" style={googleBtn}>
            Continue with Google
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

const googleBtn = {
  width: "100%",
  padding: "12px",
  marginTop: "12px",
  border: "1px solid #475569",
  borderRadius: "8px",
  background: "white",
  color: "#0f172a",
  fontSize: "16px",
  cursor: "pointer",
};

export default Register;