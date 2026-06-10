function Dashboard() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "white",
        padding: "30px",
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
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          background: "#0ea5e9",
          border: "none",
          color: "white",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Raise New Complaint
      </button>
    </div>
  );
}

export default Dashboard;