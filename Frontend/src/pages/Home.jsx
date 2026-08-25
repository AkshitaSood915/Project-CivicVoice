import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  Building2,
  Activity,
  Search,
  ChevronRight,
  ShieldCheck,
  Award
} from "lucide-react";

function Home() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("All");
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [cityFilterText, setCityFilterText] = useState("");
  const [pledgeTaken, setPledgeTaken] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(48290);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set("search", searchQuery.trim());
    if (searchCategory !== "All") params.set("category", searchCategory);
    navigate(`/public-issues?${params.toString()}`);
  };

  const handlePledge = () => {
    if (!pledgeTaken) {
      setPledgeTaken(true);
      setPledgeCount((prev) => prev + 1);
    }
  };

  const allIndiaCities = [
    // North
    { name: "New Delhi & NCR", region: "North", state: "Delhi NCR", activeIssues: 142 },
    { name: "Noida & Greater Noida", region: "North", state: "Uttar Pradesh", activeIssues: 58 },
    { name: "Gurgaon (Gurugram)", region: "North", state: "Haryana", activeIssues: 64 },
    { name: "Ghaziabad", region: "North", state: "Uttar Pradesh", activeIssues: 41 },
    { name: "Chandigarh", region: "North", state: "Chandigarh UT", activeIssues: 22 },
    { name: "Lucknow", region: "North", state: "Uttar Pradesh", activeIssues: 89 },
    { name: "Kanpur", region: "North", state: "Uttar Pradesh", activeIssues: 76 },
    { name: "Varanasi", region: "North", state: "Uttar Pradesh", activeIssues: 53 },
    { name: "Agra", region: "North", state: "Uttar Pradesh", activeIssues: 47 },
    { name: "Dehradun", region: "North", state: "Uttarakhand", activeIssues: 31 },
    { name: "Ludhiana", region: "North", state: "Punjab", activeIssues: 39 },
    { name: "Amritsar", region: "North", state: "Punjab", activeIssues: 34 },
    { name: "Jaipur", region: "North", state: "Rajasthan", activeIssues: 92 },
    { name: "Jodhpur", region: "North", state: "Rajasthan", activeIssues: 38 },
    { name: "Kota", region: "North", state: "Rajasthan", activeIssues: 29 },

    // Central & West
    { name: "Bhopal", region: "Central", state: "Madhya Pradesh", activeIssues: 67 },
    { name: "Indore", region: "Central", state: "Madhya Pradesh", activeIssues: 45 },
    { name: "Jabalpur", region: "Central", state: "Madhya Pradesh", activeIssues: 33 },
    { name: "Gwalior", region: "Central", state: "Madhya Pradesh", activeIssues: 28 },
    { name: "Mumbai", region: "West", state: "Maharashtra", activeIssues: 178 },
    { name: "Pune", region: "West", state: "Maharashtra", activeIssues: 114 },
    { name: "Nagpur", region: "West", state: "Maharashtra", activeIssues: 52 },
    { name: "Thane", region: "West", state: "Maharashtra", activeIssues: 61 },
    { name: "Nashik", region: "West", state: "Maharashtra", activeIssues: 36 },
    { name: "Ahmedabad", region: "West", state: "Gujarat", activeIssues: 105 },
    { name: "Surat", region: "West", state: "Gujarat", activeIssues: 72 },
    { name: "Vadodara", region: "West", state: "Gujarat", activeIssues: 44 },
    { name: "Rajkot", region: "West", state: "Gujarat", activeIssues: 31 },

    // South
    { name: "Bengaluru", region: "South", state: "Karnataka", activeIssues: 165 },
    { name: "Mysuru", region: "South", state: "Karnataka", activeIssues: 27 },
    { name: "Hyderabad", region: "South", state: "Telangana", activeIssues: 138 },
    { name: "Chennai", region: "South", state: "Tamil Nadu", activeIssues: 124 },
    { name: "Coimbatore", region: "South", state: "Tamil Nadu", activeIssues: 48 },
    { name: "Madurai", region: "South", state: "Tamil Nadu", activeIssues: 35 },
    { name: "Visakhapatnam", region: "South", state: "Andhra Pradesh", activeIssues: 51 },
    { name: "Vijayawada", region: "South", state: "Andhra Pradesh", activeIssues: 42 },
    { name: "Kochi (Cochin)", region: "South", state: "Kerala", activeIssues: 39 },
    { name: "Thiruvananthapuram", region: "South", state: "Kerala", activeIssues: 33 },

    // East & North East
    { name: "Kolkata", region: "East", state: "West Bengal", activeIssues: 119 },
    { name: "Howrah", region: "East", state: "West Bengal", activeIssues: 54 },
    { name: "Patna", region: "East", state: "Bihar", activeIssues: 88 },
    { name: "Ranchi", region: "East", state: "Jharkhand", activeIssues: 49 },
    { name: "Jamshedpur", region: "East", state: "Jharkhand", activeIssues: 32 },
    { name: "Bhubaneswar", region: "East", state: "Odisha", activeIssues: 46 },
    { name: "Cuttack", region: "East", state: "Odisha", activeIssues: 30 },
    { name: "Guwahati", region: "East", state: "Assam", activeIssues: 41 }
  ];

  const filteredCities = allIndiaCities.filter((city) => {
    const matchesRegion = selectedRegion === "All" || city.region === selectedRegion;
    const matchesSearch =
      city.name.toLowerCase().includes(cityFilterText.toLowerCase()) ||
      city.state.toLowerCase().includes(cityFilterText.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const categories = [
    {
      id: "roads",
      name: "Roads & Potholes",
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=700&q=80",
      dept: "Public Works Department (PWD)",
      sla: "24-48 Hours",
      description: "Severe road damage, dangerous potholes, broken dividers, and hazardous street cave-ins.",
    },
    {
      id: "waste",
      name: "Garbage & Sanitation",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=700&q=80",
      dept: "Solid Waste Management",
      sla: "12-24 Hours",
      description: "Overflowing street dustbins, uncollected waste, public littering, and open dumping spots.",
    },
    {
      id: "lighting",
      name: "Street Lighting",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80",
      dept: "Electricity Board",
      sla: "18-24 Hours",
      description: "Non-functional street lights, dark corridors causing safety hazards, and broken fixtures.",
    },
    {
      id: "water",
      name: "Water Supply & Leaks",
      image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=700&q=80",
      dept: "Jal Board / Water Works",
      sla: "6-18 Hours",
      description: "Main potable pipeline bursts, contaminated drinking water, low pressure, and leakages.",
    },
    {
      id: "drainage",
      name: "Drainage & Sewage",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=700&q=80",
      dept: "Drainage & Sewerage Board",
      sla: "12-24 Hours",
      description: "Blocked storm drains, sewage overflows onto streets, and uncovered manhole hazards.",
    },
    {
      id: "power",
      name: "Electricity Hazards",
      image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=80",
      dept: "State DISCOM Emergency Squad",
      sla: "2-6 Hours",
      description: "Snapped high-voltage cables, spark emissions from transformers, and exposed wire pillars.",
    }
  ];

  return (
    <div style={homePageWrapper}>
      {/* 1. NATIONAL PORTAL UNIVERSAL SEARCH HERO (india.gov.in + USAGov style) */}
      <section id="main-search" style={nationalHeroSection}>
        <div style={heroBackdrop}></div>

        <div className="civic-container" style={heroMainContainer}>
          {/* Top Emblem & Portal Name */}
          <div style={portalEmblemHeader}>
            <svg width="42" height="52" viewBox="0 0 24 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={ashokaEmblemSvg}>
              <path d="M12 1L15 6H9L12 1Z" fill="#ffffff" />
              <path d="M5 8C5 6.5 7 5 12 5C17 5 19 6.5 19 8C19 12 16 16 12 18C8 16 5 12 5 8Z" stroke="#ffffff" strokeWidth="1.8" fill="rgba(255,255,255,0.15)" />
              <circle cx="12" cy="10" r="3" stroke="#ffffff" strokeWidth="1.2" fill="#d97706" />
              <path d="M4 21C4 20 7 19.5 12 19.5C17 19.5 20 20 20 21V23H4V21Z" fill="#ffffff" />
              <rect x="7" y="24" width="10" height="2" rx="1" fill="#138808" />
            </svg>
            <span style={satyamevaText}>सत्यमेव जयते</span>

            <h1 style={portalMainTitle}>
              CivicVoice<span style={govInDot}>.gov.in</span>
              <span style={betaPill}>BETA</span>
            </h1>
            <p style={portalTagline}>
              National Portal for Centralized Public Grievances & Municipal Monitoring
            </p>
            <p style={portalConverge}>
              Where Citizen Grievances & Municipal Action Converge
            </p>
          </div>

          {/* Center: Universal Search Bar (india.gov.in format) */}
          <div style={universalSearchCard}>
            <form onSubmit={handleHeroSearch} style={universalSearchForm}>
              <div style={searchFieldGroup}>
                <Search size={20} color="#64748b" />
                <input
                  type="text"
                  placeholder="Search for potholes, garbage dumps, water leaks, streetlights, or ward..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={universalSearchInput}
                />
              </div>

              <div style={categorySelectGroup}>
                <select
                  value={searchCategory}
                  onChange={(e) => setSearchCategory(e.target.value)}
                  style={universalCategorySelect}
                >
                  <option value="All">All Categories</option>
                  <option value="Roads & Potholes">Roads & Potholes</option>
                  <option value="Garbage & Sanitation">Garbage & Sanitation</option>
                  <option value="Street Lighting">Street Lighting</option>
                  <option value="Water Supply">Water Supply</option>
                  <option value="Drainage & Sewage">Drainage & Sewage</option>
                  <option value="Electricity Hazards">Electricity Hazards</option>
                </select>
              </div>

              <button type="submit" style={universalSearchBtn}>
                Search Grievances
              </button>
            </form>

            {/* Trending Civic Searches */}
            <div style={trendingSearchesRow}>
              <span style={trendingLabel}>Trending Searches:</span>
              <Link to="/public-issues?search=Pothole" style={trendingPill}>🛣️ Potholes Repair</Link>
              <Link to="/public-issues?search=Garbage" style={trendingPill}>🚮 Garbage Dump</Link>
              <Link to="/public-issues?search=Water" style={trendingPill}>💧 Water Leakage</Link>
              <Link to="/public-issues?search=Streetlight" style={trendingPill}>💡 Street Lights</Link>
              <Link to="/public-issues?search=Drainage" style={trendingPill}>🌊 Sewage Drain</Link>
              <Link to="/public-issues?search=Electricity" style={trendingPill}>⚡ Sparking Wire</Link>
            </div>
          </div>

          {/* Floating Most Popular Services Card (USAGov style) */}
          <div style={popularServicesGrid}>
            <div style={popularCard}>
              <div style={popularCardHeader}>
                <span style={popularHeading}>Top Civic Services & Quick Actions</span>
              </div>
              <ul style={popularLinksList}>
                <li>
                  <Link to="/create-issue" style={popularLinkItem}>
                    <Sparkles size={16} color="#d97706" />
                    <span><b>Report a Grievance with GenAI</b> — Auto-extract title, department & priority</span>
                    <ChevronRight size={14} style={{ marginLeft: "auto", color: "#94a3b8" }} />
                  </Link>
                </li>
                <li>
                  <Link to="/public-issues" style={popularLinkItem}>
                    <Activity size={16} color="#1e40af" />
                    <span><b>Track Public Grievances by City & Ward</b> — Monitor live on-ground repair status</span>
                    <ChevronRight size={14} style={{ marginLeft: "auto", color: "#94a3b8" }} />
                  </Link>
                </li>
                <li>
                  <Link to="/emergency-alerts" style={popularLinkItem}>
                    <Clock size={16} color="#dc2626" />
                    <span><b>Live Civic Alerts & Municipal Advisories</b> — Water cuts, road closures & weather</span>
                    <ChevronRight size={14} style={{ marginLeft: "auto", color: "#94a3b8" }} />
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard" style={popularLinkItem}>
                    <ShieldCheck size={16} color="#059669" />
                    <span><b>Citizen Resolution Verification Portal</b> — Only you can confirm on-ground closure</span>
                    <ChevronRight size={14} style={{ marginLeft: "auto", color: "#94a3b8" }} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STATS BAR */}
      <section style={statsSection}>
        <div className="civic-container">
          <div style={statsGrid}>
            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ backgroundColor: "#f1f5f9" }}>
                <Activity size={22} color="#0f2942" />
              </div>
              <div>
                <div className="stat-num">34,180+</div>
                <div className="stat-label">Grievances Registered</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ backgroundColor: "#ecfdf5" }}>
                <CheckCircle2 size={22} color="#059669" />
              </div>
              <div>
                <div className="stat-num">31,420+</div>
                <div className="stat-label">Citizen-Verified Closures</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ backgroundColor: "#f1f5f9" }}>
                <Clock size={22} color="#0f2942" />
              </div>
              <div>
                <div className="stat-num">&lt; 24 Hours</div>
                <div className="stat-label">Mandatory Municipal SLA</div>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon-wrapper" style={{ backgroundColor: "#f1f5f9" }}>
                <Building2 size={22} color="#0f2942" />
              </div>
              <div>
                <div className="stat-num">50+ Smart Cities</div>
                <div className="stat-label">1,480+ Connected Wards</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CITIZEN CIVIC OATH / SWACHHATA PLEDGE BANNER (Image 4 inspo) */}
      <section style={pledgeSection}>
        <div className="civic-container">
          <div style={pledgeCard}>
            <div style={pledgeImageCol}>
              <img
                src="/pledge_photo.png"
                alt="Indian Citizens taking Swachhata Civic Pledge"
                style={pledgeImage}
              />
            </div>

            <div style={pledgeTextCol}>
              <span style={sectionTag}>My City, My Pride • Swachhata Pledge</span>
              <h2 style={pledgeHeading}>Indian Citizens United for Clean & Safe Cities</h2>
              <div style={pledgeQuoteBox}>
                <p style={pledgeQuoteText}>
                  "I solemnly pledge to keep my neighborhood clean, to never dump solid waste in the open, to protect public infrastructure, and to actively report civic hazards to build a cleaner, safer India."
                </p>
              </div>

              <div style={pledgeActionRow}>
                <button
                  onClick={handlePledge}
                  style={{
                    ...pledgeBtn,
                    backgroundColor: pledgeTaken ? "#059669" : "#d97706",
                  }}
                >
                  {pledgeTaken ? "✓ Pledge Taken Successfully!" : "✋ Take the Citizen Civic Pledge"}
                </button>
                <div style={pledgeCounterBadge}>
                  <b>{pledgeCount.toLocaleString()}</b> Citizens have taken the pledge
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ALL-INDIA 50+ CITIES & MUNICIPAL DIRECTORY (Image 5 inspo) */}
      <section className="section-padding" style={{ backgroundColor: "#ffffff", borderTop: "1px solid #e2e8f0" }}>
        <div className="civic-container">
          <div style={sectionHeader}>
            <span style={sectionTag}>Pan-India Municipal Coverage</span>
            <h2 style={sectionTitle}>Find Grievances in Your City & Ward</h2>
            <p style={sectionSubtitle}>
              CivicVoice covers 50+ smart cities and urban municipal corporations across India. Select your region or search your city to view live complaints and repair status.
            </p>
          </div>

          {/* Region Tabs & City Search */}
          <div style={cityDirectoryControlBar}>
            <div style={regionTabsGroup}>
              {["All", "North", "West", "South", "Central", "East"].map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  style={{
                    ...regionTabBtn,
                    ...(selectedRegion === region ? activeRegionTab : {}),
                  }}
                >
                  {region === "All" ? "All Regions" : `${region} India`}
                </button>
              ))}
            </div>

            <div style={citySearchBox}>
              <Search size={15} color="#64748b" />
              <input
                type="text"
                placeholder="Search by city or state (e.g. Bhopal, Jaipur, Delhi)..."
                value={cityFilterText}
                onChange={(e) => setCityFilterText(e.target.value)}
                style={citySearchInput}
              />
            </div>
          </div>

          {/* City Grid */}
          <div style={citiesGridContainer}>
            {filteredCities.map((city) => (
              <Link
                key={city.name}
                to={`/public-issues?city=${encodeURIComponent(city.name.split(" ")[0])}`}
                style={cityCardItem}
              >
                <div style={cityCardHeader}>
                  <span style={cityNameText}>{city.name}</span>
                  <span style={cityIssueCount}>{city.activeIssues} Active</span>
                </div>
                <div style={cityCardFooter}>
                  <span style={cityStateText}>{city.state}</span>
                  <span style={cityArrow}>View Ward Issues →</span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Link to="/public-issues" className="btn btn-outline-navy">
              Explore All Grievances in Public Directory
            </Link>
          </div>
        </div>
      </section>

      {/* 5. GENAI SMART ISSUE ANALYSIS SPOTLIGHT */}
      <section className="section-padding" style={aiSection}>
        <div className="civic-container">
          <div style={sectionHeader}>
            <span style={sectionTag}>GenAI Smart Assistant</span>
            <h2 style={sectionTitle}>Instant AI Grievance Classification</h2>
            <p style={sectionSubtitle}>
              Enter or speak your complaint in plain language (English, Hindi, or Hinglish). The AI extracts the exact title, department, severity, and auto-fills your form in one click.
            </p>
          </div>

          <div style={aiDemoCard}>
            <div style={aiDemoGrid}>
              {/* Left: Input Example */}
              <div style={aiInputCol}>
                <span style={colHeading}>Citizen Natural Input:</span>
                <div style={speechBubble}>
                  <p style={{ margin: 0, fontStyle: "italic", color: "#0f2942" }}>
                    "Bhaiya hamare sector 14 ke samne bahut bada gaddha ho gaya hai aur pani bhar raha hai, do gaadi fisal gayi."
                  </p>
                </div>
                <div style={aiFeatureBullets}>
                  <div style={featureItem}>✓ Supports English, Hindi & Hinglish</div>
                  <div style={featureItem}>✓ Extracts concerned municipal department automatically</div>
                  <div style={featureItem}>✓ 1-Click Auto-Fill directly into Complaint Form</div>
                </div>
              </div>

              {/* Right: AI Output Extraction */}
              <div style={aiOutputCol}>
                <span style={colHeading}>AI Structured Extraction:</span>
                <div style={extractionCard}>
                  <div style={extractedRow}>
                    <span style={extLabel}>Title:</span>
                    <span style={extVal}>Deep Pothole & Road Hazard on Sector 14</span>
                  </div>
                  <div style={extractedRow}>
                    <span style={extLabel}>Category:</span>
                    <span style={extVal}>Roads & Potholes</span>
                  </div>
                  <div style={extractedRow}>
                    <span style={extLabel}>Department:</span>
                    <span style={extVal}>Public Works Department (PWD)</span>
                  </div>
                  <div style={extractedRow}>
                    <span style={extLabel}>Severity:</span>
                    <span style={{ ...extVal, color: "#dc2626", fontWeight: "700" }}>High / Urgent</span>
                  </div>
                  <div style={extractedRow}>
                    <span style={extLabel}>Summary:</span>
                    <span style={extVal}>Large road crater filled with water causing vehicle slippage and traffic obstruction.</span>
                  </div>
                </div>

                <Link to="/create-issue" className="btn btn-primary" style={{ width: "100%", marginTop: "14px" }}>
                  <Sparkles size={16} /> Try AI Complaint Form Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CIVIC CATEGORY SHOWCASE WITH IMAGES */}
      <section className="section-padding" style={{ backgroundColor: "#ffffff" }}>
        <div className="civic-container">
          <div style={sectionHeader}>
            <span style={sectionTag}>Common Grievances</span>
            <h2 style={sectionTitle}>Issues We Help You Resolve</h2>
            <p style={sectionSubtitle}>
              Every reported issue is automatically assigned to the concerned municipal department with a clear response SLA.
            </p>
          </div>

          <div style={categoriesGrid}>
            {categories.map((cat) => (
              <div key={cat.id} className="civic-card-interactive" style={catCard}>
                <div style={catImageContainer}>
                  <img src={cat.image} alt={cat.name} style={catImg} />
                </div>

                <div style={catBody}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <h3 style={{ ...catName, margin: 0 }}>{cat.name}</h3>
                    <span style={{ fontSize: "0.75rem", color: "#1e40af", fontWeight: "600" }}>SLA: {cat.sla}</span>
                  </div>
                  <p style={catDesc}>{cat.description}</p>
                  
                  <div style={catDeptRow}>
                    <span style={deptLabel}>Department:</span>
                    <span style={deptVal}>{cat.dept}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. 4-STEP TRANSPARENT WORKFLOW */}
      <section className="section-padding" style={{ backgroundColor: "#f8fafc" }}>
        <div className="civic-container">
          <div style={sectionHeader}>
            <span style={sectionTag}>How It Works</span>
            <h2 style={sectionTitle}>Simple, Transparent Lifecycle</h2>
            <p style={sectionSubtitle}>
              No bureaucracy, no hidden files. Track your complaint from submission to verified on-ground closure.
            </p>
          </div>

          <div style={stepsGrid}>
            <div className="civic-card" style={stepCard}>
              <div style={stepNumber}>1</div>
              <h3 style={stepTitle}>Report with AI</h3>
              <p style={stepDesc}>
                Enter your issue in simple words. AI identifies the category, department, and priority.
              </p>
            </div>

            <div className="civic-card" style={stepCard}>
              <div style={stepNumber}>2</div>
              <h3 style={stepTitle}>GPS & Photo Tagging</h3>
              <p style={stepDesc}>
                Attach photo evidence and precise GPS coordinates to prevent location ambiguity.
              </p>
            </div>

            <div className="civic-card" style={stepCard}>
              <div style={stepNumber}>3</div>
              <h3 style={stepTitle}>24h Auto-Escalation</h3>
              <p style={stepDesc}>
                If authorities fail to initiate action within 24 hours, the issue escalates to senior nodal officers.
              </p>
            </div>

            <div className="civic-card" style={stepCard}>
              <div style={stepNumber}>4</div>
              <h3 style={stepTitle}>Citizen-Verified Closure</h3>
              <p style={stepDesc}>
                Only the original complainant can verify that the repair is done and mark the issue closed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CALL TO ACTION */}
      <section style={ctaSection}>
        <div className="civic-container" style={ctaContent}>
          <h2 style={ctaHeading}>Have an unresolved issue in your neighborhood?</h2>
          <p style={ctaSub}>
            Take 60 seconds to raise a grievance with photo proof and let the system hold authorities accountable.
          </p>
          <div style={ctaBtnGroup}>
            <Link to="/create-issue" className="btn btn-orange btn-lg">
              <Sparkles size={18} /> Report an Issue Now
            </Link>
            <Link to="/public-issues" className="btn btn-outline-navy btn-lg" style={{ backgroundColor: "#ffffff" }}>
              Explore Public Grievances
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

const homePageWrapper = {
  backgroundColor: "#f8fafc",
};

/* National Portal Universal Search Hero Styles */
const nationalHeroSection = {
  position: "relative",
  backgroundImage: "linear-gradient(rgba(10, 25, 47, 0.88), rgba(15, 41, 66, 0.94)), url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1600&q=80')",
  backgroundSize: "cover",
  backgroundPosition: "center",
  color: "#ffffff",
  padding: "50px 0 65px",
  borderBottom: "3px solid #d97706",
};

const heroBackdrop = {
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "radial-gradient(circle at 50% 30%, rgba(30, 64, 175, 0.25), transparent 70%)",
  pointerEvents: "none",
};

const heroMainContainer = {
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  textAlign: "center",
};

const portalEmblemHeader = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "24px",
};

const ashokaEmblemSvg = {
  marginBottom: "4px",
};

const satyamevaText = {
  fontSize: "0.78rem",
  color: "#cbd5e1",
  letterSpacing: "0.1em",
  fontWeight: "600",
  marginBottom: "6px",
};

const portalMainTitle = {
  color: "#ffffff",
  fontSize: "clamp(2.4rem, 4.2vw, 3.4rem)",
  fontWeight: "800",
  lineHeight: 1.1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
};

const govInDot = {
  color: "#d97706",
};

const betaPill = {
  fontSize: "0.72rem",
  backgroundColor: "#d97706",
  color: "#ffffff",
  padding: "2px 8px",
  borderRadius: "4px",
  marginLeft: "8px",
  fontWeight: "700",
  letterSpacing: "0.05em",
};

const portalTagline = {
  color: "#f1f5f9",
  fontSize: "1.15rem",
  fontWeight: "600",
  marginTop: "4px",
  maxWidth: "700px",
};

const portalConverge = {
  color: "#94a3b8",
  fontSize: "0.92rem",
  fontStyle: "italic",
  marginTop: "2px",
};

const universalSearchCard = {
  backgroundColor: "rgba(255, 255, 255, 0.98)",
  borderRadius: "10px",
  padding: "16px 20px",
  width: "100%",
  maxWidth: "880px",
  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
  marginTop: "16px",
};

const universalSearchForm = {
  display: "flex",
  gap: "10px",
  flexWrap: "wrap",
};

const searchFieldGroup = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  padding: "8px 12px",
  flex: "1 1 300px",
};

const universalSearchInput = {
  border: "none",
  background: "transparent",
  width: "100%",
  outline: "none",
  fontFamily: "var(--font-sans)",
  fontSize: "0.95rem",
  color: "#0f2942",
};

const categorySelectGroup = {
  display: "flex",
  alignItems: "center",
};

const universalCategorySelect = {
  padding: "10px 14px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  color: "#0f2942",
  outline: "none",
  cursor: "pointer",
};

const universalSearchBtn = {
  backgroundColor: "#d97706",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  padding: "10px 22px",
  fontFamily: "var(--font-heading)",
  fontSize: "0.95rem",
  fontWeight: "700",
  cursor: "pointer",
  transition: "background 0.15s ease",
};

const trendingSearchesRow = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
  marginTop: "12px",
  paddingTop: "10px",
  borderTop: "1px solid #f1f5f9",
  fontSize: "0.82rem",
};

const trendingLabel = {
  color: "#64748b",
  fontWeight: "600",
};

const trendingPill = {
  backgroundColor: "#f1f5f9",
  color: "#0f2942",
  padding: "3px 10px",
  borderRadius: "14px",
  textDecoration: "none",
  fontSize: "0.8rem",
  fontWeight: "500",
  border: "1px solid #e2e8f0",
};

const popularServicesGrid = {
  width: "100%",
  maxWidth: "880px",
  marginTop: "20px",
};

const popularCard = {
  backgroundColor: "rgba(10, 25, 47, 0.85)",
  border: "1px solid rgba(255, 255, 255, 0.15)",
  borderRadius: "8px",
  padding: "16px 20px",
  backdropFilter: "blur(6px)",
  textAlign: "left",
};

const popularCardHeader = {
  marginBottom: "10px",
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  paddingBottom: "6px",
};

const popularHeading = {
  fontSize: "0.85rem",
  fontWeight: "700",
  color: "#f8fafc",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const popularLinksList = {
  listStyle: "none",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: "8px",
};

const popularLinkItem = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#e2e8f0",
  fontSize: "0.85rem",
  textDecoration: "none",
  padding: "6px 8px",
  borderRadius: "4px",
  backgroundColor: "rgba(255, 255, 255, 0.05)",
  transition: "background 0.15s ease",
};

const statsSection = {
  backgroundColor: "#f8fafc",
  padding: "26px 0",
};

const statsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  gap: "16px",
};

/* Swachhata / Citizen Pledge Styles */
const pledgeSection = {
  backgroundColor: "#ffffff",
  padding: "45px 0",
  borderTop: "1px solid #e2e8f0",
  borderBottom: "1px solid #e2e8f0",
};

const pledgeCard = {
  display: "grid",
  gridTemplateColumns: "0.9fr 1.1fr",
  gap: "35px",
  alignItems: "center",
  backgroundColor: "#f8fafc",
  border: "1.5px solid #e2e8f0",
  borderRadius: "12px",
  overflow: "hidden",
};

const pledgeImageCol = {
  position: "relative",
  height: "100%",
  minHeight: "260px",
};

const pledgeImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const pledgeImageTag = {
  position: "absolute",
  bottom: "12px",
  left: "12px",
  backgroundColor: "rgba(15, 41, 66, 0.9)",
  color: "#ffffff",
  fontSize: "0.78rem",
  fontWeight: "700",
  padding: "4px 10px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const pledgeTextCol = {
  padding: "30px 30px 30px 0",
  display: "flex",
  flexDirection: "column",
};

const pledgeHeading = {
  fontSize: "1.7rem",
  color: "#0f2942",
  marginTop: "4px",
  marginBottom: "10px",
};

const pledgeQuoteBox = {
  backgroundColor: "#ffffff",
  borderLeft: "4px solid #d97706",
  padding: "12px 16px",
  borderRadius: "0 6px 6px 0",
  marginBottom: "18px",
};

const pledgeQuoteText = {
  fontSize: "0.92rem",
  color: "#334155",
  fontStyle: "italic",
  lineHeight: 1.5,
  margin: 0,
};

const pledgeActionRow = {
  display: "flex",
  alignItems: "center",
  gap: "14px",
  flexWrap: "wrap",
};

const pledgeBtn = {
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  padding: "10px 20px",
  fontFamily: "var(--font-heading)",
  fontSize: "0.92rem",
  fontWeight: "700",
  cursor: "pointer",
  transition: "all 0.2s ease",
};

const pledgeCounterBadge = {
  fontSize: "0.85rem",
  color: "#0f2942",
};

/* All India Cities Directory Styles */
const cityDirectoryControlBar = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "14px",
  marginBottom: "20px",
  backgroundColor: "#f8fafc",
  padding: "12px 16px",
  borderRadius: "8px",
  border: "1px solid #e2e8f0",
};

const regionTabsGroup = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
};

const regionTabBtn = {
  backgroundColor: "#ffffff",
  border: "1px solid #cbd5e1",
  color: "#475569",
  padding: "6px 14px",
  borderRadius: "6px",
  fontSize: "0.82rem",
  fontWeight: "600",
  cursor: "pointer",
};

const activeRegionTab = {
  backgroundColor: "#0f2942",
  borderColor: "#0f2942",
  color: "#ffffff",
};

const citySearchBox = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#ffffff",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  padding: "6px 12px",
  width: "280px",
};

const citySearchInput = {
  border: "none",
  background: "transparent",
  outline: "none",
  fontSize: "0.84rem",
  width: "100%",
  color: "#0f2942",
};

const citiesGridContainer = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: "12px",
  maxHeight: "360px",
  overflowY: "auto",
  padding: "4px",
};

const cityCardItem = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "6px",
  padding: "12px 14px",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  transition: "all 0.15s ease",
};

const cityCardHeader = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const cityNameText = {
  fontSize: "0.92rem",
  fontWeight: "700",
  color: "#0f2942",
};

const cityIssueCount = {
  fontSize: "0.74rem",
  fontWeight: "700",
  color: "#d97706",
  backgroundColor: "#fef3c7",
  padding: "2px 6px",
  borderRadius: "3px",
};

const cityCardFooter = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  fontSize: "0.78rem",
};

const cityStateText = {
  color: "#64748b",
};

const cityArrow = {
  color: "#1e40af",
  fontWeight: "600",
};

/* AI Spotlight Styles */
const aiSection = {
  backgroundColor: "#f8fafc",
  borderTop: "1px solid #e2e8f0",
  borderBottom: "1px solid #e2e8f0",
};

const sectionHeader = {
  textAlign: "center",
  maxWidth: "700px",
  margin: "0 auto 36px",
};

const sectionTag = {
  fontSize: "0.8rem",
  fontWeight: "700",
  color: "#1e40af",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
};

const sectionTitle = {
  fontSize: "2rem",
  color: "#0f2942",
  marginTop: "4px",
  marginBottom: "6px",
};

const sectionSubtitle = {
  fontSize: "0.95rem",
  color: "#64748b",
};

const aiDemoCard = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "28px",
  maxWidth: "960px",
  margin: "0 auto",
  boxShadow: "0 2px 8px rgba(0, 0, 0, 0.04)",
};

const aiDemoGrid = {
  display: "grid",
  gridTemplateColumns: "1fr 1.2fr",
  gap: "28px",
  alignItems: "center",
};

const aiInputCol = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

const colHeading = {
  fontSize: "0.82rem",
  fontWeight: "700",
  color: "#0f2942",
  textTransform: "uppercase",
};

const speechBubble = {
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  borderRadius: "8px",
  padding: "16px",
  fontSize: "0.92rem",
  lineHeight: 1.5,
};

const aiFeatureBullets = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
  fontSize: "0.84rem",
  color: "#475569",
};

const featureItem = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const aiOutputCol = {
  display: "flex",
  flexDirection: "column",
};

const extractionCard = {
  backgroundColor: "#f8fafc",
  border: "1.5px solid #bfdbfe",
  borderRadius: "8px",
  padding: "16px 18px",
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const extractedRow = {
  display: "flex",
  flexDirection: "column",
  fontSize: "0.85rem",
};

const extLabel = {
  fontSize: "0.72rem",
  fontWeight: "700",
  color: "#64748b",
  textTransform: "uppercase",
};

const extVal = {
  color: "#0f2942",
  fontWeight: "600",
};

/* Categories Showcase Styles */
const categoriesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
  gap: "20px",
};

const catCard = {
  padding: 0,
  display: "flex",
  flexDirection: "column",
};

const catImageContainer = {
  position: "relative",
  height: "170px",
  overflow: "hidden",
};

const catImg = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

const slaBadge = {
  position: "absolute",
  top: "12px",
  right: "12px",
  backgroundColor: "rgba(15, 41, 66, 0.85)",
  color: "#ffffff",
  fontSize: "0.75rem",
  fontWeight: "700",
  padding: "4px 8px",
  borderRadius: "4px",
};

const catBody = {
  padding: "18px",
  display: "flex",
  flexDirection: "column",
  flex: 1,
};

const catName = {
  fontSize: "1.15rem",
  color: "#0f2942",
  marginBottom: "4px",
};

const catDesc = {
  fontSize: "0.86rem",
  color: "#64748b",
  lineHeight: 1.5,
  marginBottom: "12px",
  flex: 1,
};

const catDeptRow = {
  paddingTop: "10px",
  borderTop: "1px solid #f1f5f9",
  display: "flex",
  flexDirection: "column",
};

const deptLabel = {
  fontSize: "0.7rem",
  color: "#94a3b8",
  fontWeight: "600",
  textTransform: "uppercase",
};

const deptVal = {
  fontSize: "0.84rem",
  color: "#1e40af",
  fontWeight: "600",
};

/* Steps Styles */
const stepsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
  gap: "18px",
};

const stepCard = {
  padding: "22px",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
};

const stepNumber = {
  width: "32px",
  height: "32px",
  borderRadius: "6px",
  backgroundColor: "#0f2942",
  color: "#ffffff",
  fontFamily: "var(--font-heading)",
  fontWeight: "800",
  fontSize: "0.95rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "12px",
};

const stepTitle = {
  fontSize: "1.05rem",
  color: "#0f2942",
  marginBottom: "4px",
};

const stepDesc = {
  fontSize: "0.86rem",
  color: "#64748b",
  lineHeight: 1.5,
};

const ctaSection = {
  backgroundColor: "#0f2942",
  padding: "45px 0",
  color: "#ffffff",
  textAlign: "center",
};

const ctaContent = {
  maxWidth: "700px",
  margin: "0 auto",
};

const ctaHeading = {
  color: "#ffffff",
  fontSize: "1.9rem",
  marginBottom: "8px",
};

const ctaSub = {
  color: "#cbd5e1",
  fontSize: "1rem",
  marginBottom: "20px",
};

const ctaBtnGroup = {
  display: "flex",
  justifyContent: "center",
  gap: "14px",
  flexWrap: "wrap",
};

export default Home;