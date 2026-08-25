import { useState } from "react";
import { PhoneCall, Globe } from "lucide-react";

function TopHeader() {
  const [fontSize, setFontSize] = useState("normal");
  const [lang, setLang] = useState("EN");

  const handleFontChange = (size) => {
    setFontSize(size);
    if (size === "small") {
      document.documentElement.style.fontSize = "14px";
    } else if (size === "large") {
      document.documentElement.style.fontSize = "18px";
    } else {
      document.documentElement.style.fontSize = "16px";
    }
  };

  return (
    <header style={topHeaderStyle}>
      <div className="civic-container" style={topHeaderContainer}>
        {/* Left: Official Flag & Ministry Tag */}
        <div style={leftSection}>
          <div style={flagBox}>
            <span style={{ backgroundColor: "#FF9933", height: "4px", width: "18px", display: "block" }}></span>
            <span style={{ backgroundColor: "#FFFFFF", height: "4px", width: "18px", display: "block" }}></span>
            <span style={{ backgroundColor: "#138808", height: "4px", width: "18px", display: "block" }}></span>
          </div>
          <span style={govText}>
            <b>भारत सरकार</b> | Government of India • National Civic Portal
          </span>
        </div>

        {/* Right: Accessibility, Helpline & Language */}
        <div style={rightSection}>
          <a href="#main-search" style={skipLink}>Skip to main content</a>
          <span style={sep}>|</span>

          <div style={helplinePill}>
            <PhoneCall size={12} color="#f8fafc" />
            <span>Civic Helpline: <b>1913</b> | Emergency: <b>112</b></span>
          </div>
          <span style={sep}>|</span>

          <div style={fontSizerGroup}>
            <button
              style={{ ...fontBtn, fontWeight: fontSize === "small" ? "700" : "400" }}
              onClick={() => handleFontChange("small")}
              title="Decrease Font Size"
            >
              A-
            </button>
            <button
              style={{ ...fontBtn, fontWeight: fontSize === "normal" ? "700" : "400" }}
              onClick={() => handleFontChange("normal")}
              title="Standard Font Size"
            >
              A
            </button>
            <button
              style={{ ...fontBtn, fontWeight: fontSize === "large" ? "700" : "400" }}
              onClick={() => handleFontChange("large")}
              title="Increase Font Size"
            >
              A+
            </button>
          </div>
          <span style={sep}>|</span>

          <div style={langGroup}>
            <Globe size={12} color="#94a3b8" />
            <button
              style={{ ...langBtn, fontWeight: lang === "EN" ? "700" : "400", color: lang === "EN" ? "#ffffff" : "#cbd5e1" }}
              onClick={() => setLang("EN")}
            >
              English
            </button>
            <span style={{ color: "#475569" }}>/</span>
            <button
              style={{ ...langBtn, fontWeight: lang === "HI" ? "700" : "400", color: lang === "HI" ? "#ffffff" : "#cbd5e1" }}
              onClick={() => setLang("HI")}
            >
              हिन्दी
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

const topHeaderStyle = {
  backgroundColor: "#0a192f",
  color: "#cbd5e1",
  fontSize: "0.78rem",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
};

const topHeaderContainer = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  paddingTop: "6px",
  paddingBottom: "6px",
  flexWrap: "wrap",
  gap: "8px",
};

const leftSection = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
};

const flagBox = {
  display: "flex",
  flexDirection: "column",
  borderRadius: "2px",
  overflow: "hidden",
  boxShadow: "0 1px 2px rgba(0,0,0,0.3)",
};

const govText = {
  color: "#f1f5f9",
  fontSize: "0.8rem",
  letterSpacing: "0.01em",
};

const rightSection = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
};

const skipLink = {
  color: "#cbd5e1",
  fontSize: "0.75rem",
  textDecoration: "none",
};

const sep = {
  color: "#334155",
};

const helplinePill = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
  color: "#f8fafc",
  fontSize: "0.76rem",
};

const fontSizerGroup = {
  display: "flex",
  alignItems: "center",
  gap: "3px",
};

const fontBtn = {
  background: "rgba(255, 255, 255, 0.08)",
  border: "1px solid rgba(255, 255, 255, 0.18)",
  color: "#f8fafc",
  padding: "1px 6px",
  borderRadius: "3px",
  cursor: "pointer",
  fontSize: "0.72rem",
};

const langGroup = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
};

const langBtn = {
  background: "none",
  border: "none",
  cursor: "pointer",
  fontSize: "0.76rem",
  padding: "0 2px",
};

export default TopHeader;
