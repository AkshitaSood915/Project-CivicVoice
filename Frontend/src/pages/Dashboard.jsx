import { toast } from "react-toastify";
import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Search,
  Filter,
  Trash2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MapPin,
  Sparkles,
  RefreshCw,
  FolderOpen
} from "lucide-react";

function Dashboard() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterCity, setFilterCity] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  const fetchIssues = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/issues");
      setIssues(res.data.issues || []);
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/issues/${id}`, { status });
      toast.success(`Complaint status updated to: ${status}`);
      fetchIssues();
    } catch {
      toast.error("Status update failed");
    }
  };

  const deleteIssue = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint record?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/issues/${id}`);
      toast.success("Complaint deleted successfully");
      fetchIssues();
    } catch {
      toast.error("Delete failed");
    }
  };

  const pendingCount = issues.filter((i) => i.status === "Pending").length;
  const progressCount = issues.filter((i) => i.status === "In Progress").length;
  const resolvedCount = issues.filter((i) => i.status === "Resolved").length;

  const filteredIssues = issues.filter((issue) => {
    const text = search.toLowerCase();

    const title = issue.title || "";
    const description = issue.description || "";
    const category = issue.category || "";
    const location = issue.location || "";
    const city = issue.city || "";

    const matchesSearch =
      title.toLowerCase().includes(text) ||
      description.toLowerCase().includes(text) ||
      category.toLowerCase().includes(text) ||
      location.toLowerCase().includes(text);

    const matchesCity =
      filterCity === "All" ||
      city.toLowerCase().includes(filterCity.toLowerCase()) ||
      location.toLowerCase().includes(filterCity.toLowerCase());

    const matchesStatus =
      filterStatus === "All" || issue.status === filterStatus;

    return matchesSearch && matchesCity && matchesStatus;
  });

  return (
    <div style={pageStyle}>
      {/* Top Banner */}
      <section style={headerBanner}>
        <div className="civic-container">
          <div style={headerContent}>
            <div>
              <span className="civic-badge badge-gov">Citizen & Authority Control Center</span>
              <h1 style={pageHeading}>Civic Grievance Dashboard</h1>
              <p style={pageSubtitle}>
                Monitor complaint statuses, view assigned municipal departments, and manage public issues across wards.
              </p>
            </div>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <button onClick={fetchIssues} className="btn btn-outline-navy btn-sm" title="Refresh Feed">
                <RefreshCw size={15} /> Refresh
              </button>
              <Link to="/create-issue" className="btn btn-saffron btn-sm">
                <Sparkles size={16} /> Raise Grievance
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="civic-container" style={{ paddingBottom: "70px" }}>
        {/* Statistics Cards */}
        <div style={statsGrid}>
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "#eff6ff" }}>
              <FolderOpen size={26} color="#1e40af" />
            </div>
            <div>
              <div className="stat-num">{issues.length}</div>
              <div className="stat-label">Total Complaints</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "#fef3c7" }}>
              <Clock size={26} color="#d97706" />
            </div>
            <div>
              <div className="stat-num" style={{ color: "#d97706" }}>{pendingCount}</div>
              <div className="stat-label">Pending Action</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "#eff6ff" }}>
              <AlertTriangle size={26} color="#2563eb" />
            </div>
            <div>
              <div className="stat-num" style={{ color: "#2563eb" }}>{progressCount}</div>
              <div className="stat-label">In Progress</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ backgroundColor: "#ecfdf5" }}>
              <CheckCircle2 size={26} color="#059669" />
            </div>
            <div>
              <div className="stat-num" style={{ color: "#059669" }}>{resolvedCount}</div>
              <div className="stat-label">Resolved Cases</div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div style={filterBarCard}>
          <div style={searchBox}>
            <Search size={18} color="#64748b" />
            <input
              type="text"
              placeholder="Search complaints by title, keyword, or ward..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={searchInput}
            />
          </div>

          <div style={selectWrapper}>
            <MapPin size={15} color="#1e40af" />
            <select
              value={filterCity}
              onChange={(e) => setFilterCity(e.target.value)}
              style={selectBox}
            >
              <option value="All">All Cities</option>
              <option value="Delhi">Delhi & NCR</option>
              <option value="Bengaluru">Bengaluru</option>
              <option value="Bhopal">Bhopal</option>
              <option value="Jaipur">Jaipur</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
            </select>
          </div>

          <div style={selectWrapper}>
            <Filter size={15} color="#64748b" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={selectBox}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        {/* Issues List */}
        {loading ? (
          <div style={loadingBox}>
            <div className="pulse-animation" style={{ color: "#1e40af", fontWeight: "700" }}>
              Loading grievances...
            </div>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div style={emptyBox}>
            <FolderOpen size={48} color="#94a3b8" />
            <h3 style={{ marginTop: "16px", color: "#0f2942" }}>No Grievances Found</h3>
            <p style={{ color: "#64748b", maxWidth: "400px", margin: "8px auto" }}>
              {search || filterStatus !== "All"
                ? "No complaints match your filter criteria."
                : "You have not submitted any civic complaints yet."}
            </p>
            <Link to="/create-issue" className="btn btn-primary" style={{ marginTop: "16px" }}>
              Raise a Complaint
            </Link>
          </div>
        ) : (
          <div style={issuesListContainer}>
            {filteredIssues.map((issue) => (
              <div key={issue._id} className="civic-card" style={issueCard}>
                <div style={cardHeaderRow}>
                  <div>
                    <span className={`civic-badge badge-${(issue.status || "pending").toLowerCase().replace(" ", "")}`}>
                      {issue.status}
                    </span>
                    <span style={categoryPill}>{issue.category || "General"}</span>
                  </div>

                  <span style={dateText}>
                    {issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : "Recently Added"}
                  </span>
                </div>

                <h3 style={issueTitle}>{issue.title || "Untitled Grievance"}</h3>
                <p style={issueDescription}>{issue.description}</p>

                {issue.image && (
                  <div style={imageContainer}>
                    <img
                      src={issue.image.startsWith("http") ? issue.image : `http://localhost:5000${issue.image}`}
                      alt="Complaint Proof"
                      style={issueImage}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                )}

                <div style={locationBox}>
                  <MapPin size={15} color="#1e40af" />
                  <span><b>Location:</b> {issue.location || "Location Not Provided"}</span>
                </div>

                {/* Status Update & Delete Controls */}
                <div style={controlsRow}>
                  <div style={statusSelectGroup}>
                    <label style={{ fontSize: "0.82rem", fontWeight: "600", color: "#475569" }}>
                      Update Status:
                    </label>
                    <select
                      value={issue.status}
                      onChange={(e) => updateStatus(issue._id, e.target.value)}
                      style={statusSelect}
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>

                  <button
                    onClick={() => deleteIssue(issue._id)}
                    style={deleteBtn}
                    title="Delete Complaint"
                  >
                    <Trash2 size={16} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const pageStyle = {
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
};

const headerBanner = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
  padding: "40px 0",
  marginBottom: "30px",
};

const headerContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const pageHeading = {
  fontSize: "2.2rem",
  color: "#0f2942",
  marginTop: "6px",
  marginBottom: "6px",
};

const pageSubtitle = {
  color: "#64748b",
  fontSize: "1rem",
  maxWidth: "600px",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "18px",
  marginBottom: "28px",
};

const filterBarCard = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "14px",
  padding: "16px 20px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "16px",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
  marginBottom: "24px",
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "10px 14px",
  flex: "1",
  minWidth: "260px",
};

const searchInput = {
  border: "none",
  background: "transparent",
  width: "100%",
  outline: "none",
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  color: "#0f172a",
};

const selectWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const selectBox = {
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#ffffff",
  fontFamily: "var(--font-sans)",
  fontSize: "0.92rem",
  color: "#0f2942",
  outline: "none",
  cursor: "pointer",
};

const issuesListContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const issueCard = {
  padding: "24px",
  borderRadius: "16px",
};

const cardHeaderRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  flexWrap: "wrap",
  gap: "8px",
};

const categoryPill = {
  fontSize: "0.78rem",
  fontWeight: "700",
  color: "#1e40af",
  backgroundColor: "#eff6ff",
  padding: "4px 10px",
  borderRadius: "6px",
  marginLeft: "8px",
};

const dateText = {
  fontSize: "0.82rem",
  color: "#64748b",
};

const issueTitle = {
  fontSize: "1.3rem",
  color: "#0f2942",
  marginBottom: "8px",
};

const issueDescription = {
  fontSize: "0.95rem",
  color: "#475569",
  lineHeight: 1.6,
  marginBottom: "14px",
};

const imageContainer = {
  maxWidth: "400px",
  borderRadius: "10px",
  overflow: "hidden",
  marginBottom: "14px",
  border: "1px solid #e2e8f0",
};

const issueImage = {
  width: "100%",
  maxHeight: "220px",
  objectFit: "cover",
  display: "block",
};

const locationBox = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#f8fafc",
  padding: "10px 14px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
  fontSize: "0.86rem",
  color: "#334155",
  marginBottom: "18px",
};

const controlsRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "14px",
  borderTop: "1px solid #f1f5f9",
  flexWrap: "wrap",
  gap: "12px",
};

const statusSelectGroup = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const statusSelect = {
  padding: "8px 12px",
  borderRadius: "8px",
  border: "1.5px solid #cbd5e1",
  backgroundColor: "#ffffff",
  color: "#0f2942",
  fontWeight: "600",
  fontSize: "0.88rem",
  outline: "none",
};

const deleteBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: "#fee2e2",
  color: "#dc2626",
  border: "1px solid #fecaca",
  padding: "8px 14px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  fontWeight: "600",
  cursor: "pointer",
  transition: "background-color 0.2s",
};

const loadingBox = {
  textAlign: "center",
  padding: "60px 0",
};

const emptyBox = {
  textAlign: "center",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "16px",
  padding: "60px 20px",
};

export default Dashboard;