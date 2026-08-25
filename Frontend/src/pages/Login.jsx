import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { ShieldCheck, Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      toast.success("Welcome back! Login Successful.");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div className="civic-card" style={cardStyle}>
        {/* Emblem Badge */}
        <div style={badgeWrapper}>
          <ShieldCheck size={28} color="#ffffff" />
        </div>

        <h1 style={titleStyle}>
          Civic<span style={{ color: "#ea580c" }}>Voice</span>
        </h1>
        <p style={subText}>Citizen & Municipal Authority Access Portal</p>

        <form onSubmit={handleLogin} style={formStyle}>
          <div>
            <label style={labelStyle}>Registered Email Address</label>
            <div style={inputContainer}>
              <Mail size={18} color="#64748b" style={inputIcon} />
              <input
                type="email"
                name="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={handleChange}
                className="civic-input"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <label style={labelStyle}>Password</label>
            </div>
            <div style={inputContainer}>
              <Lock size={18} color="#64748b" style={inputIcon} />
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                className="civic-input"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ width: "100%", marginTop: "10px" }}
            disabled={loading}
          >
            {loading ? "Authenticating..." : (
              <>
                <LogIn size={18} /> Sign In to Dashboard
              </>
            )}
          </button>
        </form>

        <div style={footerRow}>
          <p style={footerNote}>
            New to CivicVoice?{" "}
            <Link to="/register" style={linkStyle}>
              Create Citizen Account <ArrowRight size={14} style={{ verticalAlign: "middle" }} />
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "80vh",
  backgroundColor: "#f8fafc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px 20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "440px",
  padding: "40px 32px",
  textAlign: "center",
  boxShadow: "0 10px 30px rgba(15, 41, 66, 0.08)",
  borderRadius: "20px",
};

const badgeWrapper = {
  width: "56px",
  height: "56px",
  borderRadius: "14px",
  background: "linear-gradient(135deg, #1e40af, #0f2942)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto 16px",
  boxShadow: "0 6px 16px rgba(30, 64, 175, 0.25)",
};

const titleStyle = {
  fontSize: "1.85rem",
  color: "#0f2942",
  marginBottom: "4px",
};

const subText = {
  color: "#64748b",
  fontSize: "0.92rem",
  marginBottom: "28px",
};

const formStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
  textAlign: "left",
};

const labelStyle = {
  display: "block",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#334155",
  marginBottom: "6px",
};

const inputContainer = {
  position: "relative",
  display: "flex",
  alignItems: "center",
};

const inputIcon = {
  position: "absolute",
  left: "14px",
  pointerEvents: "none",
};

const inputStyle = {
  paddingLeft: "42px",
};

const footerRow = {
  marginTop: "24px",
  paddingTop: "20px",
  borderTop: "1px solid #f1f5f9",
};

const footerNote = {
  fontSize: "0.9rem",
  color: "#475569",
};

const linkStyle = {
  fontWeight: "700",
  color: "#1e40af",
  textDecoration: "none",
};

export default Login;