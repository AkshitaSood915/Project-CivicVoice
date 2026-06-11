import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [issues, setIssues] = useState([]);

  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/issues");
      setIssues(res.data.issues);
    } catch {
      alert("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div style={page}>
      <nav style={nav}>
        <h2 style={{ color: "#38bdf8" }}>CivicVoice</h2>
        <button style={navBtn} onClick={() => navigate("/create-issue")}>
          Raise Complaint
        </button>
      </nav>

      <section style={hero}>
        <h1>Smart Civic Complaint Dashboard</h1>
        <p>Report, track and monitor public issues in one place.</p>
      </section>

      <div style={stats}>
        <div style={card}>
          <h3>Total Complaints</h3>
          <p style={number}>{issues.length}</p>
        </div>

        <div style={card}>
          <h3>Pending</h3>
          <p style={number}>
            {issues.filter((i) => i.status === "Pending").length}
          </p>
        </div>
      </div>

      <h2 style={{ marginTop: "30px" }}>Recent Complaints</h2>

      {issues.map((issue) => (
        <div key={issue._id} style={issueCard}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p><b>Category:</b> {issue.category}</p>
          <p><b>Location:</b> {issue.location}</p>
          <span style={badge}>{issue.status}</span>
        </div>
      ))}
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: "25px",
};

const nav = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const navBtn = {
  background: "#0ea5e9",
  color: "white",
  border: "none",
  padding: "10px 18px",
  borderRadius: "8px",
  cursor: "pointer",
};

const hero = {
  background: "#1e293b",
  padding: "35px",
  borderRadius: "15px",
  marginTop: "25px",
  textAlign: "center",
};

const stats = {
  display: "flex",
  gap: "20px",
  marginTop: "25px",
};

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  flex: 1,
  textAlign: "center",
};

const number = {
  fontSize: "32px",
  color: "#38bdf8",
};

const issueCard = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "15px",
};

const badge = {
  background: "#facc15",
  color: "#111827",
  padding: "6px 12px",
  borderRadius: "20px",
  fontWeight: "bold",
};

export default Dashboard;