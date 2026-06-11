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
    } catch (error) {
      alert("Failed to load complaints");
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  return (
    <div style={pageStyle}>
      <h1>CivicVoice Dashboard</h1>

      <div style={countCard}>
        <h2>Total Complaints</h2>
        <p style={{ fontSize: "28px" }}>{issues.length}</p>
      </div>

      <button onClick={() => navigate("/create-issue")} style={buttonStyle}>
        Raise New Complaint
      </button>

      <h2 style={{ marginTop: "30px" }}>All Complaints</h2>

      {issues.map((issue) => (
        <div key={issue._id} style={issueCard}>
          <h3>{issue.title}</h3>
          <p>{issue.description}</p>
          <p><b>Category:</b> {issue.category}</p>
          <p><b>Location:</b> {issue.location}</p>
          <p><b>Status:</b> {issue.status}</p>
        </div>
      ))}
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  padding: "30px",
  textAlign: "center",
};

const countCard = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
};

const issueCard = {
  background: "#1e293b",
  padding: "18px",
  borderRadius: "10px",
  margin: "15px auto",
  maxWidth: "600px",
  textAlign: "left",
};

const buttonStyle = {
  marginTop: "25px",
  padding: "12px 25px",
  background: "#0ea5e9",
  border: "none",
  color: "white",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Dashboard;