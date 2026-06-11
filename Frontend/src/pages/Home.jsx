import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={page}>
      <nav style={nav}>
        <h2 style={logo}>CivicVoice</h2>

        <div style={navLinks}>
          <button style={navTextBtn} onClick={() => navigate("/home")}>
            Home
          </button>
          <button style={navTextBtn} onClick={() => navigate("/")}>
            Login
          </button>
          <button style={primaryBtn} onClick={() => navigate("/register")}>
            Register
          </button>
        </div>
      </nav>

      <section style={hero}>
        <div style={heroLeft}>
          <p style={tag}>Smart Civic Complaint Platform</p>

          <h1 style={title}>
            Report Civic Issues.
            <br />
            Build Better Cities.
          </h1>

          <p style={subtitle}>
            Report potholes, broken street lights, garbage dumps, water leakage
            and other civic problems through one simple platform.
          </p>

          <div style={buttonGroup}>
            <button style={mainBtn} onClick={() => navigate("/register")}>
              Get Started
            </button>
            <button style={outlineBtn} onClick={() => navigate("/")}>
              Login Now
            </button>
          </div>
        </div>

        <div style={heroCard}>
          <h2 style={cardHeading}>Popular Issues</h2>
          <p style={issueItem}>🛣️ Potholes & road damage</p>
          <p style={issueItem}>💡 Broken street lights</p>
          <p style={issueItem}>🚮 Garbage collection issues</p>
          <p style={issueItem}>💧 Water leakage problems</p>
          <p style={issueItem}>🚦 Traffic signal complaints</p>
        </div>
      </section>

      <section style={howSection}>
        <h2 style={sectionTitle}>How It Works</h2>

        <div style={grid3}>
          <div style={infoCard}>
            <h3>1. Report Issue</h3>
            <p>
              Citizens submit civic issues with title, description, category and
              location.
            </p>
          </div>

          <div style={infoCard}>
            <h3>2. Track Status</h3>
            <p>
              Complaints are visible on the dashboard with their current status.
            </p>
          </div>

          <div style={infoCard}>
            <h3>3. Improve City</h3>
            <p>
              Authorities can monitor complaints and work towards better public
              services.
            </p>
          </div>
        </div>
      </section>

      <section style={featuresSection}>
        <h2 style={sectionTitle}>Key Features</h2>

        <div style={grid3}>
          <div style={infoCard}>
            <h3>Quick Reporting</h3>
            <p>Raise complaints easily through a simple form.</p>
          </div>

          <div style={infoCard}>
            <h3>Smart Dashboard</h3>
            <p>View total complaints, pending issues and recent reports.</p>
          </div>

          <div style={infoCard}>
            <h3>Transparent Tracking</h3>
            <p>Every issue has a visible status for better transparency.</p>
          </div>
        </div>
      </section>

      <section style={statsSection}>
        <div style={statCard}>
          <h2>100+</h2>
          <p>Issues can be reported</p>
        </div>

        <div style={statCard}>
          <h2>24/7</h2>
          <p>Citizen access</p>
        </div>

        <div style={statCard}>
          <h2>Fast</h2>
          <p>Complaint submission</p>
        </div>
      </section>

      <footer style={footer}>
        <h2 style={logo}>CivicVoice</h2>
        <p>Making civic issue reporting simple, transparent and citizen-friendly.</p>
        <p style={{ color: "#64748b" }}>© 2026 CivicVoice. All rights reserved.</p>
      </footer>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "linear-gradient(135deg, #020617, #0f172a)",
  color: "white",
  padding: "28px 60px",
  boxSizing: "border-box",
};

const nav = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const logo = {
  color: "#38bdf8",
  fontSize: "30px",
  fontWeight: "800",
};

const navLinks = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
};

const navTextBtn = {
  background: "transparent",
  color: "#e2e8f0",
  border: "none",
  fontSize: "16px",
  cursor: "pointer",
};

const primaryBtn = {
  background: "#0ea5e9",
  color: "white",
  border: "none",
  padding: "11px 22px",
  borderRadius: "10px",
  fontSize: "16px",
  cursor: "pointer",
};

const hero = {
  maxWidth: "1200px",
  margin: "85px auto 0",
  display: "grid",
  gridTemplateColumns: "1.3fr 0.9fr",
  gap: "70px",
  alignItems: "center",
};

const heroLeft = {
  textAlign: "left",
};

const tag = {
  color: "#38bdf8",
  fontWeight: "700",
  marginBottom: "18px",
};

const title = {
  fontSize: "58px",
  lineHeight: "1.08",
  margin: "0",
  fontWeight: "900",
};

const subtitle = {
  color: "#cbd5e1",
  fontSize: "18px",
  lineHeight: "1.7",
  maxWidth: "620px",
  marginTop: "22px",
};

const buttonGroup = {
  display: "flex",
  gap: "16px",
  marginTop: "32px",
};

const mainBtn = {
  background: "#38bdf8",
  color: "#020617",
  border: "none",
  padding: "14px 28px",
  borderRadius: "12px",
  fontSize: "17px",
  fontWeight: "800",
  cursor: "pointer",
};

const outlineBtn = {
  background: "transparent",
  color: "#38bdf8",
  border: "1px solid #38bdf8",
  padding: "14px 28px",
  borderRadius: "12px",
  fontSize: "17px",
  cursor: "pointer",
};

const heroCard = {
  background: "rgba(30, 41, 59, 0.95)",
  padding: "35px",
  borderRadius: "22px",
  boxShadow: "0 0 35px rgba(14, 165, 233, 0.25)",
};

const cardHeading = {
  fontSize: "26px",
  marginBottom: "22px",
};

const issueItem = {
  background: "#0f172a",
  padding: "14px 16px",
  borderRadius: "12px",
  marginBottom: "14px",
  color: "#e2e8f0",
};

const howSection = {
  maxWidth: "1200px",
  margin: "100px auto 0",
  textAlign: "center",
};

const featuresSection = {
  maxWidth: "1200px",
  margin: "90px auto 0",
  textAlign: "center",
};

const sectionTitle = {
  fontSize: "40px",
  marginBottom: "35px",
};

const grid3 = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
};

const infoCard = {
  background: "#1e293b",
  padding: "28px",
  borderRadius: "18px",
  border: "1px solid rgba(148, 163, 184, 0.15)",
  textAlign: "left",
};

const statsSection = {
  maxWidth: "1200px",
  margin: "90px auto 0",
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gap: "24px",
};

const statCard = {
  background: "#0ea5e9",
  color: "#020617",
  padding: "28px",
  borderRadius: "18px",
  textAlign: "center",
  fontWeight: "700",
};

const footer = {
  maxWidth: "1200px",
  margin: "100px auto 0",
  padding: "40px 0",
  borderTop: "1px solid rgba(148, 163, 184, 0.2)",
  textAlign: "center",
  color: "#cbd5e1",
};

export default Home;