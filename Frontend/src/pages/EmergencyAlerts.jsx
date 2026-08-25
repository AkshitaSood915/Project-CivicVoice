import { useState } from "react";
import {
  AlertTriangle,
  Flame,
  Droplets,
  Zap,
  PhoneCall,
  Clock,
  MapPin,
  BellRing,
  CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

function EmergencyAlerts() {
  const [filterSeverity, setFilterSeverity] = useState("all");

  const alerts = [
    {
      id: "alert-101",
      title: "Flash Waterlogging & Open Drain Hazard on Outer Ring Road",
      category: "Drainage & Flood",
      department: "Municipal Disaster Management & PWD",
      location: "Sector 18 - Ring Road Underpass, Delhi NCR",
      severity: "Emergency",
      time: "15 mins ago",
      icon: Droplets,
      iconColor: "#dc2626",
      bgColor: "#fef2f2",
      badgeColor: "#ef4444",
      description: "Severe water accumulation up to 3 feet reported due to clogged storm drains. Civic drainage pumping teams deployed. Motorists advised to use alternate flyover route.",
      status: "Active Response",
      affectedCitizens: "4,500+ Commuters"
    },
    {
      id: "alert-102",
      title: "High Voltage Live Wire Snapped near Community School",
      category: "Electricity Hazard",
      department: "State Power Distribution Corp (DISCOM)",
      location: "Lane 3, Bapu Nagar, Jaipur",
      severity: "Emergency",
      time: "42 mins ago",
      icon: Zap,
      iconColor: "#ea580c",
      bgColor: "#fff7ed",
      badgeColor: "#f97316",
      description: "11kV overhead wire snapped following tree branch fall. Power supply immediately isolated by substation. Emergency repair squad on-site.",
      status: "Crew on Site",
      affectedCitizens: "School Zone"
    },
    {
      id: "alert-103",
      title: "Scheduled Potable Water Main Pipeline Maintenance",
      category: "Water Supply",
      department: "Delhi Jal Board (DJB)",
      location: "Zones 4, 7 and 9 (South West Region)",
      severity: "Advisory",
      time: "2 hours ago",
      icon: Droplets,
      iconColor: "#2563eb",
      bgColor: "#eff6ff",
      badgeColor: "#3b82f6",
      description: "Supply pressure will remain low from 06:00 AM to 02:00 PM tomorrow due to pump replacement at central treatment plant. Water tankers on standby.",
      status: "Scheduled Notice",
      affectedCitizens: "18,000 Households"
    },
    {
      id: "alert-104",
      title: "Toxic Solid Waste Fire Extinguished & Decontamination",
      category: "Sanitation & Fire",
      department: "Municipal Fire Services & Waste Dept",
      location: "Ghazipur Perimeter Sector 3",
      severity: "Moderate",
      time: "5 hours ago",
      icon: Flame,
      iconColor: "#d97706",
      bgColor: "#fefce8",
      badgeColor: "#eab308",
      description: "Spontaneous landfill fire contained by 3 fire engines within 45 minutes. Air quality misting machines currently operational.",
      status: "Contained",
      affectedCitizens: "Perimeter Safe"
    }
  ];

  const filteredAlerts = alerts.filter((alert) => {
    if (filterSeverity === "all") return true;
    return alert.severity.toLowerCase() === filterSeverity.toLowerCase();
  });

  return (
    <div style={pageWrapper}>
      {/* Header Banner */}
      <section style={headerBanner}>
        <div className="civic-container">
          <div style={headerContent}>
            <div>
              <span className="civic-badge badge-urgent">
                <BellRing size={12} /> Live Municipal Advisories
              </span>
              <h1 style={pageHeading}>Emergency Civic Alerts & Notices</h1>
              <p style={pageSubtitle}>
                Real-time critical municipal updates, urgent hazard warnings, and 24-hour escalation alerts across city wards.
              </p>
            </div>
            <Link to="/create-issue" className="btn btn-saffron btn-lg">
              <AlertTriangle size={18} /> Report Emergency Hazard
            </Link>
          </div>
        </div>
      </section>

      <div className="civic-container" style={{ paddingBottom: "70px" }}>
        {/* Emergency Quick Helpline Ticker */}
        <div style={emergencyTickerCard}>
          <div style={tickerIconWrapper}>
            <PhoneCall size={22} color="#ffffff" />
          </div>
          <div style={tickerTextGroup}>
            <h4 style={tickerHeading}>24/7 Civic Emergency Helpline Desk</h4>
            <p style={tickerSub}>
              For life-threatening hazards (gas leaks, structural collapses, live cables), dial toll-free immediately:
            </p>
          </div>
          <div style={emergencyPillsGroup}>
            <span style={urgentPill}>Disaster Helpline: <b>1077</b></span>
            <span style={urgentPill}>National SOS: <b>112</b></span>
            <span style={urgentPill}>Fire: <b>101</b></span>
          </div>
        </div>

        {/* Severity Filter Tabs */}
        <div style={filterTabsRow}>
          <div style={tabsGroup}>
            <button
              style={{ ...tabBtn, ...(filterSeverity === "all" ? activeTab : {}) }}
              onClick={() => setFilterSeverity("all")}
            >
              All Alerts ({alerts.length})
            </button>
            <button
              style={{ ...tabBtn, ...(filterSeverity === "emergency" ? activeEmergencyTab : {}) }}
              onClick={() => setFilterSeverity("emergency")}
            >
              🔴 Emergency Only
            </button>
            <button
              style={{ ...tabBtn, ...(filterSeverity === "advisory" ? activeTab : {}) }}
              onClick={() => setFilterSeverity("advisory")}
            >
              🔵 Municipal Advisories
            </button>
          </div>

          <div style={liveSyncBadge}>
            <span style={liveDot}></span> Connected to Central Municipal Control Room
          </div>
        </div>

        {/* Alerts Feed */}
        <div style={alertsList}>
          {filteredAlerts.map((alert) => {
            const Icon = alert.icon;
            return (
              <div key={alert.id} className="civic-card" style={alertCardStyle}>
                <div style={{ ...alertIconBox, backgroundColor: alert.bgColor }}>
                  <Icon size={28} color={alert.iconColor} />
                </div>

                <div style={alertContentBody}>
                  <div style={alertHeaderRow}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                      <span
                        className="civic-badge"
                        style={{
                          backgroundColor: alert.bgColor,
                          color: alert.iconColor,
                          border: `1px solid ${alert.iconColor}40`,
                        }}
                      >
                        {alert.severity}
                      </span>
                      <span style={alertDept}>{alert.department}</span>
                    </div>

                    <div style={alertTime}>
                      <Clock size={13} color="#64748b" />
                      <span>{alert.time}</span>
                    </div>
                  </div>

                  <h3 style={alertTitle}>{alert.title}</h3>
                  <p style={alertDescription}>{alert.description}</p>

                  <div style={alertMetaFooter}>
                    <div style={locationTag}>
                      <MapPin size={14} color="#1e40af" />
                      <span>{alert.location}</span>
                    </div>

                    <div style={statusTag}>
                      <CheckCircle2 size={14} color="#059669" />
                      <span>Status: <b>{alert.status}</b> ({alert.affectedCitizens})</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const pageWrapper = {
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
};

const headerBanner = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
  padding: "45px 0",
  marginBottom: "35px",
};

const headerContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "24px",
};

const pageHeading = {
  fontSize: "2.3rem",
  marginTop: "8px",
  marginBottom: "8px",
  color: "#0f2942",
};

const pageSubtitle = {
  color: "#475569",
  maxWidth: "650px",
  fontSize: "1.05rem",
};

const emergencyTickerCard = {
  backgroundColor: "#0f2942",
  borderRadius: "16px",
  padding: "20px 24px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexWrap: "wrap",
  gap: "18px",
  marginBottom: "30px",
  boxShadow: "0 6px 20px rgba(15, 41, 66, 0.15)",
};

const tickerIconWrapper = {
  width: "48px",
  height: "48px",
  borderRadius: "12px",
  backgroundColor: "#dc2626",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const tickerTextGroup = {
  flex: "1",
  minWidth: "260px",
};

const tickerHeading = {
  color: "#ffffff",
  fontSize: "1.1rem",
  marginBottom: "2px",
};

const tickerSub = {
  color: "#cbd5e1",
  fontSize: "0.85rem",
  margin: 0,
};

const emergencyPillsGroup = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const urgentPill = {
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  color: "#ffffff",
  padding: "6px 14px",
  borderRadius: "8px",
  fontSize: "0.85rem",
  border: "1px solid rgba(255, 255, 255, 0.15)",
};

const filterTabsRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "16px",
  marginBottom: "24px",
};

const tabsGroup = {
  display: "flex",
  gap: "8px",
  backgroundColor: "#ffffff",
  padding: "6px",
  borderRadius: "10px",
  border: "1px solid #e2e8f0",
};

const tabBtn = {
  border: "none",
  background: "transparent",
  padding: "8px 16px",
  borderRadius: "6px",
  fontSize: "0.88rem",
  fontWeight: "600",
  color: "#64748b",
  cursor: "pointer",
};

const activeTab = {
  backgroundColor: "#eff6ff",
  color: "#1e40af",
};

const activeEmergencyTab = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
};

const liveSyncBadge = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "0.82rem",
  color: "#059669",
  fontWeight: "600",
};

const liveDot = {
  width: "8px",
  height: "8px",
  borderRadius: "50%",
  backgroundColor: "#10b981",
  display: "inline-block",
};

const alertsList = {
  display: "flex",
  flexDirection: "column",
  gap: "18px",
};

const alertCardStyle = {
  display: "flex",
  gap: "20px",
  padding: "24px",
  alignItems: "flex-start",
};

const alertIconBox = {
  width: "56px",
  height: "56px",
  borderRadius: "14px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const alertContentBody = {
  flex: "1",
};

const alertHeaderRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "10px",
};

const alertDept = {
  fontSize: "0.8rem",
  fontWeight: "600",
  color: "#475569",
};

const alertTime = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  fontSize: "0.8rem",
  color: "#64748b",
};

const alertTitle = {
  fontSize: "1.25rem",
  color: "#0f2942",
  marginBottom: "8px",
  lineHeight: 1.3,
};

const alertDescription = {
  fontSize: "0.95rem",
  color: "#334155",
  lineHeight: 1.6,
  marginBottom: "16px",
};

const alertMetaFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
  paddingTop: "12px",
  borderTop: "1px solid #f1f5f9",
};

const locationTag = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.85rem",
  color: "#1e40af",
  fontWeight: "600",
};

const statusTag = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "0.85rem",
  color: "#059669",
};

export default EmergencyAlerts;
