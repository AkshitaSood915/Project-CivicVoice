import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();

  const [issues, setIssues] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchIssues = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/issues");
      setIssues(res.data.issues || []);
    } catch (error) {
      alert(error.message);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/issues/${id}`, { status });
      fetchIssues();
    } catch {
      alert("Status update failed");
    }
  };

  const deleteIssue = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/issues/${id}`);
      alert("Complaint deleted successfully");
      fetchIssues();
    } catch {
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchIssues();
  }, []);

  const pendingCount = issues.filter((i) => i.status === "Pending").length;
  const progressCount = issues.filter((i) => i.status === "In Progress").length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;

  const categoryCounts = issues.reduce((acc, issue) => {
    const category = issue.category || "Other";
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const filteredIssues = issues.filter((issue) => {
    const text = search.toLowerCase();

    const title = issue.title || "";
    const description = issue.description || "";
    const category = issue.category || "";
    const location = issue.location || "";

    const matchesSearch =
      title.toLowerCase().includes(text) ||
      description.toLowerCase().includes(text) ||
      category.toLowerCase().includes(text) ||
      location.toLowerCase().includes(text);

    const matchesStatus =
      filterStatus === "All" || issue.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  return (
    <div style={page}>
      <nav style={nav}>
        <h2 style={{ color: "#38bdf8" }}>CivicVoice</h2>

        <div>
          <button style={navBtn} onClick={() => navigate("/home")}>
            Home
          </button>

          <button style={navBtn} onClick={() => navigate("/create-issue")}>
            Raise Complaint
          </button>

          <button style={logoutBtn} onClick={() => navigate("/")}>
            Logout
          </button>
        </div>
      </nav>

      <section style={hero}>
        <h1>Smart Civic Complaint Dashboard</h1>
        <p>Report, track and manage public issues in one place.</p>
      </section>

      <div style={stats}>
        <div style={card}>
          <h3>Total Complaints</h3>
          <p style={number}>{issues.length}</p>
        </div>

        <div style={card}>
          <h3>Pending</h3>
          <p style={number}>{pendingCount}</p>
        </div>

        <div style={card}>
          <h3>In Progress</h3>
          <p style={number}>{progressCount}</p>
        </div>

        <div style={card}>
          <h3>Resolved</h3>
          <p style={number}>{resolvedCount}</p>
        </div>
      </div>

      <section style={categorySection}>
        <h2>Category Analytics</h2>

        <div style={categoryGrid}>
          {Object.entries(categoryCounts).map(([category, count]) => (
            <div key={category} style={categoryCard}>
              <h3>{category}</h3>
              <p style={categoryNumber}>{count}</p>
            </div>
          ))}
        </div>
      </section>

      <h2 style={{ marginTop: "35px" }}>Recent Complaints</h2>

      <div style={filterBox}>
        <input
          type="text"
          placeholder="Search complaints..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchInput}
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={filterSelect}
        >
          <option>All</option>
          <option>Pending</option>
          <option>In Progress</option>
          <option>Resolved</option>
        </select>
      </div>

      {filteredIssues.length === 0 ? (
        <p style={{ color: "#94a3b8", marginTop: "20px" }}>
          No complaints found.
        </p>
      ) : (
        filteredIssues.map((issue) => (
          <div key={issue._id} style={issueCard}>
            <div style={cardHeader}>
              <h3>{issue.title || "Untitled Issue"}</h3>
              <span style={getBadgeStyle(issue.status)}>{issue.status}</span>
            </div>

            <p>{issue.description}</p>

            {issue.image && (
              <img
                src={`http://localhost:5000${issue.image}`}
                alt="Complaint"
                style={imageStyle}
              />
            )}

            <p>
              <b>Category:</b> {issue.category || "Other"}
            </p>

            <p>
              <b>Location:</b> {issue.location || "Not provided"}
            </p>

            <select
              value={issue.status}
              onChange={(e) => updateStatus(issue._id, e.target.value)}
              style={selectStyle}
            >
              <option>Pending</option>
              <option>In Progress</option>
              <option>Resolved</option>
            </select>

            <button onClick={() => deleteIssue(issue._id)} style={deleteBtn}>
              Delete Complaint
            </button>
          </div>
        ))
      )}
    </div>
  );
}

const getBadgeStyle = (status) => {
  let background = "#facc15";
  let color = "#111827";

  if (status === "In Progress") {
    background = "#38bdf8";
    color = "#020617";
  }

  if (status === "Resolved") {
    background = "#22c55e";
    color = "white";
  }

  return {
    background,
    color,
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold",
  };
};

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
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  marginLeft: "10px",
};

const logoutBtn = {
  background: "#ef4444",
  color: "white",
  border: "none",
  padding: "10px 16px",
  borderRadius: "8px",
  cursor: "pointer",
  marginLeft: "10px",
};

const hero = {
  background: "#1e293b",
  padding: "35px",
  borderRadius: "15px",
  marginTop: "25px",
  textAlign: "center",
};

const stats = {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  gap: "20px",
  marginTop: "25px",
};

const card = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  textAlign: "center",
};

const number = {
  fontSize: "32px",
  color: "#38bdf8",
};

const categorySection = {
  marginTop: "35px",
};

const categoryGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "18px",
  marginTop: "18px",
};

const categoryCard = {
  background: "#1e293b",
  padding: "18px",
  borderRadius: "12px",
  textAlign: "center",
  border: "1px solid rgba(56,189,248,0.2)",
};

const categoryNumber = {
  fontSize: "28px",
  color: "#38bdf8",
  fontWeight: "bold",
};

const filterBox = {
  display: "flex",
  gap: "12px",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const searchInput = {
  width: "100%",
  maxWidth: "500px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#334155",
  color: "white",
};

const filterSelect = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#334155",
  color: "white",
};

const issueCard = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "12px",
  marginTop: "15px",
};

const cardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const selectStyle = {
  marginTop: "12px",
  padding: "10px",
  borderRadius: "8px",
  border: "none",
  background: "#334155",
  color: "white",
};

const imageStyle = {
  width: "100%",
  maxWidth: "350px",
  borderRadius: "12px",
  marginTop: "10px",
  marginBottom: "10px",
};

const deleteBtn = {
  marginTop: "12px",
  marginLeft: "12px",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "none",
  background: "#ef4444",
  color: "white",
  cursor: "pointer",
};

export default Dashboard;