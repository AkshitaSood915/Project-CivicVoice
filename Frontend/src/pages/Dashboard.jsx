import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
        textAlign: "center",
      }}
    >
      <h1>CivicVoice Dashboard</h1>

      <div
        style={{
          background: "#1e293b",
          padding: "20px",
          marginTop: "20px",
          borderRadius: "10px",
        }}
      >
        <h2>Total Complaints</h2>
        <p>0</p>
      </div>

      <button
        onClick={() => navigate("/create-issue")}
        style={{
          marginTop: "25px",
          padding: "12px 25px",
          background: "#0ea5e9",
          border: "none",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Raise New Complaint
      </button>
    </div>
  );
}

export default Dashboard;