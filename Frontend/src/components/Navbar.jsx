import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Sparkles,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Megaphone,
  FileSpreadsheet,
  Home as HomeIcon,
  ChevronRight,
  Search,
  Bell
} from "lucide-react";
import { toast } from "react-toastify";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [navSearch, setNavSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.success("Logged out successfully");
    navigate("/");
  };

  const handleNavSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/public-issues?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={navbarWrapper}>
        <div className="civic-container" style={navbarInner}>
          {/* Brand Logo & National Emblem */}
          <Link to="/" style={brandContainer} onClick={() => setMobileMenuOpen(false)}>
            {/* National Emblem SVG Icon */}
            <div style={emblemBox}>
              <svg width="28" height="34" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L15 6H9L12 1Z" fill="#0f2942" />
                <path d="M5 8C5 6.5 7 5 12 5C17 5 19 6.5 19 8C19 12 16 16 12 18C8 16 5 12 5 8Z" stroke="#0f2942" strokeWidth="1.8" fill="#f8fafc" />
                <circle cx="12" cy="10" r="3" stroke="#0f2942" strokeWidth="1.2" fill="#d97706" />
                <path d="M4 21C4 20 7 19.5 12 19.5C17 19.5 20 20 20 21V23H4V21Z" fill="#0f2942" />
                <rect x="7" y="24" width="10" height="2" rx="1" fill="#138808" />
              </svg>
            </div>

            <div style={brandDivider}></div>

            <div style={brandTextGroup}>
              <div style={brandTitle}>
                Civic<span>Voice</span><span style={betaTag}>.gov.in</span>
              </div>
              <span style={brandSub}>National Public Grievance Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <div style={desktopNavLinks}>
            <Link
              to="/"
              style={{
                ...navLink,
                ...(isActive("/") ? activeNavLink : {}),
              }}
            >
              <HomeIcon size={15} />
              <span>Home</span>
            </Link>

            <Link
              to="/public-issues"
              style={{
                ...navLink,
                ...(isActive("/public-issues") ? activeNavLink : {}),
              }}
            >
              <FileSpreadsheet size={15} />
              <span>Public Grievances</span>
            </Link>

            <Link
              to="/emergency-alerts"
              style={{
                ...navLink,
                ...(isActive("/emergency-alerts") ? activeNavLink : {}),
              }}
            >
              <Megaphone size={15} />
              <span>Civic Alerts</span>
            </Link>

            {isAuthenticated && (
              <Link
                to="/dashboard"
                style={{
                  ...navLink,
                  ...(isActive("/dashboard") ? activeNavLink : {}),
                }}
              >
                <LayoutDashboard size={15} />
                <span>Dashboard</span>
              </Link>
            )}
          </div>

          {/* Right: Quick Search + Report CTA + Auth */}
          <div style={desktopAuthGroup}>
            <form onSubmit={handleNavSearchSubmit} style={navSearchForm}>
              <Search size={14} color="#64748b" />
              <input
                type="text"
                placeholder="Search portal..."
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                style={navSearchInput}
              />
            </form>

            <Link to="/create-issue" className="btn btn-orange btn-sm">
              <Sparkles size={14} />
              <span>Report Grievance (AI)</span>
            </Link>

            {isAuthenticated ? (
              <div style={userControlGroup}>
                <Link to="/profile" style={profileBtn} title="My Citizen Account">
                  <User size={15} color="#1e40af" />
                  <span>Profile</span>
                </Link>
                <button onClick={handleLogout} style={logoutBtn} title="Logout">
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <div style={authButtonsGroup}>
                <Link to="/login" className="btn btn-ghost btn-sm" style={{ fontWeight: "600" }}>
                  Login
                </Link>
                <Link to="/register" className="btn btn-outline-navy btn-sm">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            style={mobileToggleBtn}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={22} color="#0f2942" /> : <Menu size={22} color="#0f2942" />}
          </button>
        </div>

        {/* Mobile Dropdown Drawer */}
        {mobileMenuOpen && (
          <div style={mobileDrawer}>
            <div style={mobileDrawerInner}>
              <Link
                to="/"
                style={{ ...mobileNavLink, ...(isActive("/") ? activeMobileNavLink : {}) }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <HomeIcon size={17} />
                <span>Home</span>
                <ChevronRight size={15} style={{ marginLeft: "auto" }} />
              </Link>

              <Link
                to="/public-issues"
                style={{ ...mobileNavLink, ...(isActive("/public-issues") ? activeMobileNavLink : {}) }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <FileSpreadsheet size={17} />
                <span>Public Grievances Directory</span>
                <ChevronRight size={15} style={{ marginLeft: "auto" }} />
              </Link>

              <Link
                to="/emergency-alerts"
                style={{ ...mobileNavLink, ...(isActive("/emergency-alerts") ? activeMobileNavLink : {}) }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Megaphone size={17} />
                <span>Emergency Alerts</span>
                <ChevronRight size={15} style={{ marginLeft: "auto" }} />
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    style={{ ...mobileNavLink, ...(isActive("/dashboard") ? activeMobileNavLink : {}) }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <LayoutDashboard size={17} />
                    <span>Citizen Dashboard</span>
                    <ChevronRight size={15} style={{ marginLeft: "auto" }} />
                  </Link>

                  <Link
                    to="/profile"
                    style={{ ...mobileNavLink, ...(isActive("/profile") ? activeMobileNavLink : {}) }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={17} />
                    <span>My Profile</span>
                    <ChevronRight size={15} style={{ marginLeft: "auto" }} />
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    style={mobileLogoutBtn}
                  >
                    <LogOut size={17} />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div style={mobileAuthRow}>
                  <Link
                    to="/login"
                    className="btn btn-outline-navy"
                    style={{ width: "100%" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-primary"
                    style={{ width: "100%" }}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Register
                  </Link>
                </div>
              )}

              <Link
                to="/create-issue"
                className="btn btn-orange"
                style={{ width: "100%", marginTop: "8px" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Sparkles size={16} />
                <span>Report Grievance with AI</span>
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Live Municipal Advisory Ticker Stripe (Image 2 style) */}
      <div style={liveTickerStripe}>
        <div className="civic-container" style={liveTickerInner}>
          <div style={tickerBadge}>
            <Bell size={13} color="#ffffff" />
            <span>WHAT'S NEW</span>
          </div>
          <div style={tickerText}>
            <span>
              <b>Centralized Civic SLA:</b> 24-Hour Mandatory Municipal Auto-Escalation live across 50+ Smart Cities & Wards. Jal Board, PWD & DISCOM Rapid Response Units active 24x7.
            </span>
          </div>
        </div>
      </div>
    </>
  );
}

const navbarWrapper = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
  position: "sticky",
  top: 0,
  zIndex: 30,
  boxShadow: "0 1px 4px rgba(0, 0, 0, 0.04)",
};

const navbarInner = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "70px",
};

const brandContainer = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  textDecoration: "none",
};

const emblemBox = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const brandDivider = {
  width: "1px",
  height: "32px",
  backgroundColor: "#cbd5e1",
};

const brandTextGroup = {
  display: "flex",
  flexDirection: "column",
};

const brandTitle = {
  fontFamily: "var(--font-heading)",
  fontSize: "1.32rem",
  fontWeight: "800",
  color: "#0f2942",
  lineHeight: 1.1,
  display: "flex",
  alignItems: "center",
  gap: "2px",
};

const betaTag = {
  fontSize: "0.68rem",
  backgroundColor: "#d97706",
  color: "#ffffff",
  padding: "1px 5px",
  borderRadius: "3px",
  marginLeft: "4px",
  fontWeight: "700",
};

const brandSub = {
  fontSize: "0.72rem",
  color: "#64748b",
  fontWeight: "500",
};

const desktopNavLinks = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

const navLink = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "8px 12px",
  borderRadius: "6px",
  fontSize: "0.88rem",
  fontWeight: "600",
  color: "#475569",
  textDecoration: "none",
  transition: "all 0.15s ease",
};

const activeNavLink = {
  backgroundColor: "#eff6ff",
  color: "#1e40af",
};

const desktopAuthGroup = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const navSearchForm = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  padding: "5px 10px",
};

const navSearchInput = {
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: "0.82rem",
  width: "120px",
  color: "#0f2942",
};

const userControlGroup = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const profileBtn = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  backgroundColor: "#f8fafc",
  padding: "6px 12px",
  borderRadius: "6px",
  fontSize: "0.84rem",
  fontWeight: "600",
  color: "#0f2942",
  border: "1px solid #e2e8f0",
  textDecoration: "none",
};

const logoutBtn = {
  backgroundColor: "#fef2f2",
  color: "#dc2626",
  border: "1px solid #fecaca",
  padding: "6px 8px",
  borderRadius: "6px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const authButtonsGroup = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const mobileToggleBtn = {
  display: "none",
  background: "none",
  border: "none",
  cursor: "pointer",
  padding: "4px",
};

const mobileDrawer = {
  backgroundColor: "#ffffff",
  borderTop: "1px solid #e2e8f0",
  padding: "16px 20px 20px",
  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.06)",
};

const mobileDrawerInner = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

const mobileNavLink = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 12px",
  borderRadius: "6px",
  fontSize: "0.92rem",
  fontWeight: "600",
  color: "#475569",
  textDecoration: "none",
  backgroundColor: "#f8fafc",
  border: "1px solid #e2e8f0",
};

const activeMobileNavLink = {
  backgroundColor: "#eff6ff",
  borderColor: "#bfdbfe",
  color: "#1e40af",
};

const mobileLogoutBtn = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  padding: "10px 12px",
  borderRadius: "6px",
  fontSize: "0.92rem",
  fontWeight: "600",
  color: "#dc2626",
  backgroundColor: "#fef2f2",
  border: "1px solid #fecaca",
  cursor: "pointer",
  width: "100%",
  textAlign: "left",
};

const mobileAuthRow = {
  display: "flex",
  gap: "8px",
  marginTop: "6px",
};

const liveTickerStripe = {
  backgroundColor: "#0f2942",
  color: "#ffffff",
  padding: "7px 0",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  fontSize: "0.82rem",
};

const liveTickerInner = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  overflow: "hidden",
};

const tickerBadge = {
  display: "inline-flex",
  alignItems: "center",
  gap: "5px",
  backgroundColor: "#d97706",
  color: "#ffffff",
  fontSize: "0.72rem",
  fontWeight: "800",
  padding: "2px 8px",
  borderRadius: "3px",
  flexShrink: 0,
  letterSpacing: "0.05em",
};

const tickerText = {
  color: "#e2e8f0",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis",
};

export default Navbar;
