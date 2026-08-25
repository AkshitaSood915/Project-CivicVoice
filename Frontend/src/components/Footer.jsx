import { ShieldCheck, Mail, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer style={footerWrapper}>
      {/* Top Banner Stripe */}
      <div style={topBannerStripe}>
        <div className="civic-container" style={topBannerContent}>
          <div style={bannerLeft}>
            <ShieldCheck size={18} color="#059669" />
            <span>
              <b>Government Accountability:</b> All submitted grievances are auto-assigned a reference ID with 24-hour mandatory municipal escalation.
            </span>
          </div>
          <Link to="/create-issue" className="btn btn-orange btn-sm">
            <Sparkles size={13} /> File Grievance (AI)
          </Link>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="civic-container" style={mainFooterGrid}>
        {/* Column 1: Brand & Overview */}
        <div style={colStyle}>
          <h3 style={footerBrandTitle}>
            CivicVoice
          </h3>
          <p style={footerBrandSub}>Centralized Public Grievance Portal</p>
          <p style={footerDesc}>
            Empowering citizens across India to report, monitor, and resolve civic infrastructure issues seamlessly through Generative AI issue analysis and citizen verification.
          </p>
          <div style={contactList}>
            <div style={contactItem}>
              <MapPin size={15} color="#94a3b8" />
              <span>Smart Cities Mission, New Delhi, India</span>
            </div>
            <div style={contactItem}>
              <Mail size={15} color="#94a3b8" />
              <span>support@civicvoice.gov.in</span>
            </div>
          </div>
        </div>

        {/* Column 2: Emergency & Helplines */}
        <div style={colStyle}>
          <h4 style={footerColHeading}>Emergency Helplines</h4>
          <ul style={helplineList}>
            <li style={helplineItem}>
              <span style={helplineName}>National Emergency</span>
              <span style={helplineNumber}>112</span>
            </li>
            <li style={helplineItem}>
              <span style={helplineName}>Civic & Municipal Helpline</span>
              <span style={helplineNumber}>1913</span>
            </li>
            <li style={helplineItem}>
              <span style={helplineName}>Disaster Management</span>
              <span style={helplineNumber}>1077</span>
            </li>
            <li style={helplineItem}>
              <span style={helplineName}>Women Helpline</span>
              <span style={helplineNumber}>1091</span>
            </li>
          </ul>
        </div>

        {/* Column 3: Connected Municipal Bodies */}
        <div style={colStyle}>
          <h4 style={footerColHeading}>Concerned Departments</h4>
          <ul style={footerLinksList}>
            <li>Public Works Department (PWD)</li>
            <li>Municipal Solid Waste Management</li>
            <li>Jal Board / Water Supply Works</li>
            <li>State Electricity Board (DISCOM)</li>
            <li>Traffic & Road Safety Police</li>
          </ul>
        </div>

        {/* Column 4: Quick Navigation */}
        <div style={colStyle}>
          <h4 style={footerColHeading}>Platform Navigation</h4>
          <ul style={navLinksList}>
            <li><Link to="/" style={footerLink}>Home</Link></li>
            <li><Link to="/public-issues" style={footerLink}>Public Grievances Feed</Link></li>
            <li><Link to="/emergency-alerts" style={footerLink}>Emergency Civic Alerts</Link></li>
            <li><Link to="/create-issue" style={footerLink}>Report an Issue (AI)</Link></li>
            <li><Link to="/dashboard" style={footerLink}>Citizen & Officer Dashboard</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div style={bottomStripe}>
        <div className="civic-container" style={bottomStripeContent}>
          <p style={copyrightText}>
            © {new Date().getFullYear()} CivicVoice. Centralized Public Grievance Redressal System.
          </p>
        </div>
      </div>
    </footer>
  );
}

const footerWrapper = {
  backgroundColor: "#0f2942",
  color: "#cbd5e1",
  marginTop: "auto",
  borderTop: "2px solid #1e40af",
};

const topBannerStripe = {
  backgroundColor: "#0a1c2e",
  padding: "14px 0",
  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
};

const topBannerContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "14px",
};

const bannerLeft = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
  color: "#f1f5f9",
  fontSize: "0.88rem",
};

const mainFooterGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "35px",
  paddingTop: "45px",
  paddingBottom: "45px",
};

const colStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const footerBrandTitle = {
  color: "#ffffff",
  fontSize: "1.35rem",
  fontWeight: "800",
  lineHeight: 1.1,
};

const footerBrandSub = {
  fontSize: "0.76rem",
  color: "#94a3b8",
  margin: 0,
};

const footerDesc = {
  fontSize: "0.85rem",
  color: "#94a3b8",
  lineHeight: 1.55,
};

const contactList = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  marginTop: "4px",
};

const contactItem = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  fontSize: "0.82rem",
  color: "#cbd5e1",
};

const footerColHeading = {
  color: "#ffffff",
  fontSize: "1rem",
  fontWeight: "700",
  marginBottom: "4px",
};

const helplineList = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const helplineItem = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "rgba(255, 255, 255, 0.04)",
  padding: "7px 10px",
  borderRadius: "5px",
  border: "1px solid rgba(255, 255, 255, 0.06)",
};

const helplineName = {
  fontSize: "0.8rem",
  color: "#e2e8f0",
};

const helplineNumber = {
  fontSize: "0.9rem",
  fontWeight: "700",
  color: "#d97706",
  fontFamily: "var(--font-heading)",
};

const footerLinksList = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
  fontSize: "0.85rem",
  color: "#94a3b8",
};

const navLinksList = {
  listStyle: "none",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const footerLink = {
  color: "#cbd5e1",
  fontSize: "0.85rem",
  textDecoration: "none",
};

const bottomStripe = {
  backgroundColor: "#07131e",
  padding: "16px 0",
  borderTop: "1px solid rgba(255, 255, 255, 0.05)",
};

const bottomStripeContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
};

const copyrightText = {
  fontSize: "0.8rem",
  color: "#64748b",
  margin: 0,
};

export default Footer;
