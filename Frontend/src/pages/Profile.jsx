import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { CheckCircle2, Sparkles, LogOut, FileText, User, Mail, MapPin, Calendar } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      console.log(error);
      setUser({
        name: "Citizen Contributor",
        email: "citizen@civicvoice.gov.in",
        role: "Registered Citizen",
      });
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/");
  };

  if (loading) {
    return (
      <div style={loadingWrapper}>
        <div style={{ color: "#0f2942", fontWeight: "600" }}>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div style={pageWrapper}>
      <div className="civic-container" style={{ maxWidth: "720px", padding: "40px 20px 60px" }}>
        <div className="civic-card" style={profileCard}>
          {/* Header Banner */}
          <div style={profileHeader}>
            <div style={avatarBox}>
              <User size={36} color="#ffffff" />
            </div>
            <div style={headerText}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <h1 style={userName}>{user?.name || "Citizen"}</h1>
                <span className="civic-badge badge-resolved">
                  <CheckCircle2 size={12} /> Verified Citizen
                </span>
              </div>
              <p style={userEmail}>{user?.email}</p>
            </div>
          </div>

          {/* User Details Grid */}
          <div style={detailsGrid}>
            <div style={detailItem}>
              <Mail size={16} color="#64748b" />
              <div>
                <span style={detailLabel}>Email Address</span>
                <span style={detailValue}>{user?.email || "citizen@civicvoice.gov.in"}</span>
              </div>
            </div>

            <div style={detailItem}>
              <MapPin size={16} color="#64748b" />
              <div>
                <span style={detailLabel}>Jurisdiction Ward</span>
                <span style={detailValue}>Ward 42, Central Municipal Zone</span>
              </div>
            </div>

            <div style={detailItem}>
              <Calendar size={16} color="#64748b" />
              <div>
                <span style={detailLabel}>Citizen Portal Status</span>
                <span style={detailValue}>Active Citizen Account</span>
              </div>
            </div>

            <div style={detailItem}>
              <FileText size={16} color="#64748b" />
              <div>
                <span style={detailLabel}>Grievance Monitoring</span>
                <span style={detailValue}>Direct Resolution Verification Enabled</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={actionRow}>
            <Link to="/create-issue" className="btn btn-orange">
              <Sparkles size={16} /> Report New Issue
            </Link>
            <Link to="/dashboard" className="btn btn-outline-navy">
              View My Grievances
            </Link>
            <button onClick={handleLogout} className="btn btn-ghost" style={{ color: "#dc2626", marginLeft: "auto" }}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const pageWrapper = {
  backgroundColor: "#f8fafc",
  minHeight: "80vh",
};

const loadingWrapper = {
  minHeight: "60vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#f8fafc",
};

const profileCard = {
  padding: "32px",
};

const profileHeader = {
  display: "flex",
  alignItems: "center",
  gap: "18px",
  paddingBottom: "24px",
  borderBottom: "1px solid #f1f5f9",
  flexWrap: "wrap",
};

const avatarBox = {
  width: "64px",
  height: "64px",
  borderRadius: "10px",
  backgroundColor: "#0f2942",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const headerText = {
  display: "flex",
  flexDirection: "column",
  gap: "4px",
};

const userName = {
  fontSize: "1.6rem",
  color: "#0f2942",
  margin: 0,
};

const userEmail = {
  color: "#64748b",
  fontSize: "0.92rem",
  margin: 0,
};

const detailsGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "18px",
  padding: "24px 0",
  borderBottom: "1px solid #f1f5f9",
};

const detailItem = {
  display: "flex",
  alignItems: "flex-start",
  gap: "10px",
};

const detailLabel = {
  display: "block",
  fontSize: "0.76rem",
  color: "#94a3b8",
  fontWeight: "600",
  textTransform: "uppercase",
};

const detailValue = {
  display: "block",
  fontSize: "0.9rem",
  color: "#0f2942",
  fontWeight: "500",
  marginTop: "2px",
};

const actionRow = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  paddingTop: "20px",
  flexWrap: "wrap",
};

export default Profile;