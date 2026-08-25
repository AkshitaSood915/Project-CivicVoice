import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ShieldCheck, User, Mail, Lock, UserPlus, ArrowRight } from "lucide-react";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", form);
      toast.success(res.data.message || "Account created successfully! Please login.");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed. Please try again.");
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
        <p style={subText}>Register as a Verified Citizen Contributor</p>

        <form onSubmit={handleRegister} style={formStyle}>
          <div>
            <label style={labelStyle}>Full Name</label>
            <div style={inputContainer}>
              <User size={18} color="#64748b" style={inputIcon} />
              <input
                name="name"
                type="text"
                placeholder="e.g. Rahul Sharma"
                value={form.name}
                onChange={handleChange}
                className="civic-input"
                style={inputStyle}
                required
              />
            </div>
          </div>

          <div>
            <label style={labelStyle}>Email Address</label>
            <div style={inputContainer}>
              <Mail size={18} color="#64748b" style={inputIcon} />
              <input
                name="email"
                type="email"
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
            <label style={labelStyle}>Create Password</label>
            <div style={inputContainer}>
              <Lock size={18} color="#64748b" style={inputIcon} />
              <input
                name="password"
                type="password"
                placeholder="Minimum 6 characters"
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
            {loading ? "Registering..." : (
              <>
                <UserPlus size={18} /> Complete Citizen Registration
              </>
            )}
          </button>
        </form>

        <div style={footerRow}>
          <p style={footerNote}>
            Already registered?{" "}
            <Link to="/login" style={linkStyle}>
              Sign In to Your Account <ArrowRight size={14} style={{ verticalAlign: "middle" }} />
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
  maxWidth: "460px",
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

export default Register;