import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Search,
  Filter,
  MapPin,
  Clock,
  ThumbsUp,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Plus,
  Navigation,
  Building
} from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function PublicIssues() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCity = searchParams.get("city") || "All";

  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedArea, setSelectedArea] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [upvoted, setUpvoted] = useState({});

  const cities = [
    { name: "All Cities", value: "All", region: "All", state: "All India" },
    // North
    { name: "New Delhi & NCR", value: "Delhi", region: "North", state: "Delhi NCR", areas: ["All Areas", "MG Road / Sector 14", "Indirapuram", "Saket", "Dwarka", "Rohini", "Connaught Place"] },
    { name: "Noida & Greater Noida", value: "Noida", region: "North", state: "Uttar Pradesh", areas: ["All Areas", "Sector 18", "Sector 62", "Gaur City", "Pari Chowk"] },
    { name: "Gurgaon (Gurugram)", value: "Gurgaon", region: "North", state: "Haryana", areas: ["All Areas", "Cyber City", "Golf Course Road", "Sohna Road", "Sector 56"] },
    { name: "Ghaziabad", value: "Ghaziabad", region: "North", state: "Uttar Pradesh", areas: ["All Areas", "Indirapuram", "Vaishali", "Raj Nagar Extension", "Crossings Republik"] },
    { name: "Chandigarh", value: "Chandigarh", region: "North", state: "Chandigarh UT", areas: ["All Areas", "Sector 17", "Sector 35", "Manimajra", "Industrial Area"] },
    { name: "Lucknow", value: "Lucknow", region: "North", state: "Uttar Pradesh", areas: ["All Areas", "Gomti Nagar", "Hazratganj", "Aliganj", "Indira Nagar", "Charbagh"] },
    { name: "Kanpur", value: "Kanpur", region: "North", state: "Uttar Pradesh", areas: ["All Areas", "Civil Lines", "Kakadeo", "Swaroop Nagar", "Kidwai Nagar"] },
    { name: "Varanasi", value: "Varanasi", region: "North", state: "Uttar Pradesh", areas: ["All Areas", "Lanka", "Godowlia", "Sigra", "Cantt Area"] },
    { name: "Agra", value: "Agra", region: "North", state: "Uttar Pradesh", areas: ["All Areas", "Sanjay Place", "Tajganj", "Kamla Nagar", "Dayalbagh"] },
    { name: "Dehradun", value: "Dehradun", region: "North", state: "Uttarakhand", areas: ["All Areas", "Rajpur Road", "Clock Tower", "Prem Nagar", "Dalanwala"] },
    { name: "Ludhiana", value: "Ludhiana", region: "North", state: "Punjab", areas: ["All Areas", "Model Town", "Sarabha Nagar", "Ferozepur Road", "Civil Lines"] },
    { name: "Amritsar", value: "Amritsar", region: "North", state: "Punjab", areas: ["All Areas", "Ranjit Avenue", "Mall Road", "Lawrence Road", "Chheharta"] },
    { name: "Jaipur", value: "Jaipur", region: "North", state: "Rajasthan", areas: ["All Areas", "Civil Lines", "Mansarovar", "Malviya Nagar", "Vaishali Nagar", "Raja Park"] },
    { name: "Jodhpur", value: "Jodhpur", region: "North", state: "Rajasthan", areas: ["All Areas", "Shastri Nagar", "Ratanada", "Sardarpura", "Pal Road"] },
    { name: "Kota", value: "Kota", region: "North", state: "Rajasthan", areas: ["All Areas", "Talwandi", "Vigyan Nagar", "Kunhari", "Gumanpura"] },

    // Central & West
    { name: "Bhopal", value: "Bhopal", region: "Central", state: "Madhya Pradesh", areas: ["All Areas", "Arera Colony (Ward 42)", "MP Nagar", "Kolar Road", "TT Nagar", "Hoshangabad Road"] },
    { name: "Indore", value: "Indore", region: "Central", state: "Madhya Pradesh", areas: ["All Areas", "Vijay Nagar", "Palasia", "Bhawarkua", "Rajwada", "Sudama Nagar"] },
    { name: "Jabalpur", value: "Jabalpur", region: "Central", state: "Madhya Pradesh", areas: ["All Areas", "Civil Lines", "Wright Town", "Gorakhpur", "Adhartal"] },
    { name: "Gwalior", value: "Gwalior", region: "Central", state: "Madhya Pradesh", areas: ["All Areas", "City Center", "Lashkar", "Morar", "Thatipur"] },
    { name: "Mumbai", value: "Mumbai", region: "West", state: "Maharashtra", areas: ["All Areas", "Andheri West", "Bandra West", "Dadar", "Powai", "Thane Central", "Borivali"] },
    { name: "Pune", value: "Pune", region: "West", state: "Maharashtra", areas: ["All Areas", "Kothrud", "Viman Nagar", "Baner", "Hinjewadi", "Wakad", "Hadapsar"] },
    { name: "Nagpur", value: "Nagpur", region: "West", state: "Maharashtra", areas: ["All Areas", "Dharampeth", "Sitabuldi", "Wardha Road", "Manish Nagar"] },
    { name: "Thane", value: "Thane", region: "West", state: "Maharashtra", areas: ["All Areas", "Ghubunder Road", "Majiwada", "Naupada", "Kopri"] },
    { name: "Nashik", value: "Nashik", region: "West", state: "Maharashtra", areas: ["All Areas", "College Road", "Gangapur Road", "Indira Nagar", "CIDCO"] },
    { name: "Ahmedabad", value: "Ahmedabad", region: "West", state: "Gujarat", areas: ["All Areas", "SG Highway", "Satellite", "Navrangpura", "Maninagar", "Bopal"] },
    { name: "Surat", value: "Surat", region: "West", state: "Gujarat", areas: ["All Areas", "Adajan", "Vesu", "Varachha", "Piplod", "Katargam"] },
    { name: "Vadodara", value: "Vadodara", region: "West", state: "Gujarat", areas: ["All Areas", "Alkapuri", "Gotri", "Manjalpur", "Karelibaug"] },
    { name: "Rajkot", value: "Rajkot", region: "West", state: "Gujarat", areas: ["All Areas", "Kalawad Road", "Yagnik Road", "University Road", "Kotecha Chowk"] },

    // South
    { name: "Bengaluru", value: "Bengaluru", region: "South", state: "Karnataka", areas: ["All Areas", "Koramangala 5th Block", "Indiranagar", "HSR Layout", "Whitefield", "Jayanagar", "Hebbal"] },
    { name: "Mysuru", value: "Mysuru", region: "South", state: "Karnataka", areas: ["All Areas", "Gokulam", "Jayalakshmipuram", "Kuvempunagar", "Vijayanagar"] },
    { name: "Hyderabad", value: "Hyderabad", region: "South", state: "Telangana", areas: ["All Areas", "Gachibowli", "Madhapur", "Banjara Hills", "Jubilee Hills", "Kukatpally", "Secunderabad"] },
    { name: "Chennai", value: "Chennai", region: "South", state: "Tamil Nadu", areas: ["All Areas", "T. Nagar", "Adyar", "Anna Nagar", "Velachery", "Mylapore", "OMR Road"] },
    { name: "Coimbatore", value: "Coimbatore", region: "South", state: "Tamil Nadu", areas: ["All Areas", "RS Puram", "Gandhipuram", "Peelamedu", "Saibaba Colony"] },
    { name: "Madurai", value: "Madurai", region: "South", state: "Tamil Nadu", areas: ["All Areas", "KK Nagar", "Anna Nagar", "Simmakkal", "Tallakulam"] },
    { name: "Visakhapatnam", value: "Visakhapatnam", region: "South", state: "Andhra Pradesh", areas: ["All Areas", "MVP Colony", "Siripuram", "Gajuwaka", "Madhurawada"] },
    { name: "Vijayawada", value: "Vijayawada", region: "South", state: "Andhra Pradesh", areas: ["All Areas", "Benz Circle", "MG Road", "Governorpet", "Patamata"] },
    { name: "Kochi (Cochin)", value: "Kochi", region: "South", state: "Kerala", areas: ["All Areas", "Kakkanad", "Edappally", "Fort Kochi", "Marine Drive", "Palarivattom"] },
    { name: "Thiruvananthapuram", value: "Thiruvananthapuram", region: "South", state: "Kerala", areas: ["All Areas", "Pattom", "Kowdiar", "Vellayambalam", "Kazhakkoottam"] },

    // East & North East
    { name: "Kolkata", value: "Kolkata", region: "East", state: "West Bengal", areas: ["All Areas", "Salt Lake Sector V", "Park Street", "New Town", "Ballygunge", "Dum Dum", "Howrah"] },
    { name: "Howrah", value: "Howrah", region: "East", state: "West Bengal", areas: ["All Areas", "Shibpur", "Santragachi", "Salkia", "Liluah"] },
    { name: "Patna", value: "Patna", region: "East", state: "Bihar", areas: ["All Areas", "Boring Road", "Kankarbagh", "Bailey Road", "Patliputra Colony", "Danapur"] },
    { name: "Ranchi", value: "Ranchi", region: "East", state: "Jharkhand", areas: ["All Areas", "Main Road", "Harmu", "Doranda", "Hinoo", "Morabadi"] },
    { name: "Jamshedpur", value: "Jamshedpur", region: "East", state: "Jharkhand", areas: ["All Areas", "Bistupur", "Sakchi", "Kadma", "Sonari", "Telco"] },
    { name: "Bhubaneswar", value: "Bhubaneswar", region: "East", state: "Odisha", areas: ["All Areas", "Saheed Nagar", "Patia", "Nayapalli", "Chandrasekharpur", "Khandagiri"] },
    { name: "Cuttack", value: "Cuttack", region: "East", state: "Odisha", areas: ["All Areas", "Badambadi", "CDA Sector 6", "Buxi Bazaar", "Choudhury Bazaar"] },
    { name: "Guwahati", value: "Guwahati", region: "East", state: "Assam", areas: ["All Areas", "GS Road", "Paltan Bazaar", "Dispur", "Six Mile", "Ulubari"] }
  ];

  const fetchIssues = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/issues");
      setIssues(res.data.issues || []);
    } catch (err) {
      console.log(err);
      setIssues([
        {
          _id: "demo1",
          title: "Dangerous Potholes and Asphalt Damage near MG Road",
          description: "Large 2-foot wide craters on the main carriageway near metro pillar #142 causing vehicle damage and traffic bottlenecks.",
          category: "Roads & Potholes",
          city: "Delhi",
          area: "MG Road / Sector 14",
          location: "Sector 14, MG Road, New Delhi",
          status: "In Progress",
          createdAt: "2026-08-24T10:00:00Z",
          image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=700&q=80",
          supportCount: 48,
          department: "Public Works Department (PWD)",
        },
        {
          _id: "demo2",
          title: "Solid Waste Dump Uncollected Near Community Center",
          description: "Municipal trash bins overflowing for over 4 days, causing foul odor and blocking the pedestrian walkway.",
          category: "Garbage & Sanitation",
          city: "Delhi",
          area: "Indirapuram",
          location: "Block C, Indirapuram, Ghaziabad / Delhi NCR",
          status: "Pending",
          createdAt: "2026-08-24T18:00:00Z",
          image: "https://images.unsplash.com/photo-1605600659908-0ef719419d41?auto=format&fit=crop&w=700&q=80",
          supportCount: 34,
          department: "Solid Waste Management",
        },
        {
          _id: "demo3",
          title: "Series of Broken Street Lights in Residential Corridor",
          description: "Multiple lampposts are dark from street #4 to #8, creating safety issues for pedestrians after sunset.",
          category: "Street Lighting",
          city: "Bengaluru",
          area: "Koramangala 5th Block",
          location: "5th Block, Koramangala, Bengaluru",
          status: "Resolved",
          createdAt: "2026-08-23T12:00:00Z",
          image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=700&q=80",
          supportCount: 62,
          department: "Electricity Board",
        },
        {
          _id: "demo4",
          title: "Potable Main Water Pipeline Leakage Flooding Road",
          description: "Underground supply pipeline leak wasting thousands of liters of treated clean water daily.",
          category: "Water Supply",
          city: "Jaipur",
          area: "Civil Lines",
          location: "Civil Lines, Near Circuit House, Jaipur",
          status: "In Progress",
          createdAt: "2026-08-24T08:00:00Z",
          image: "https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&w=700&q=80",
          supportCount: 89,
          department: "Jal Board / Water Works",
        },
        {
          _id: "demo5",
          title: "Sewage Backflow & Open Manhole in Residential Lane",
          description: "Uncovered drain overflowing near community school boundary posing health hazard.",
          category: "Drainage & Sewage",
          city: "Bhopal",
          area: "Arera Colony (Ward 42)",
          location: "E-7, Arera Colony, Bhopal, MP",
          status: "Pending",
          createdAt: "2026-08-24T14:30:00Z",
          image: "https://images.unsplash.com/photo-1590496793929-36417d3117de?auto=format&fit=crop&w=700&q=80",
          supportCount: 55,
          department: "Municipal Drainage Board",
        },
        {
          _id: "demo6",
          title: "High Voltage Transformer Sparking on Street Corner",
          description: "Loose junction pillar sparking continuously near vegetable market.",
          category: "Electricity Hazards",
          city: "Mumbai",
          area: "Andheri West",
          location: "Near Station Road, Andheri West, Mumbai",
          status: "In Progress",
          createdAt: "2026-08-25T05:00:00Z",
          image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=700&q=80",
          supportCount: 71,
          department: "Electricity Board",
        }
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchIssues();
  }, [fetchIssues]);

  // Sync with URL query parameter
  useEffect(() => {
    const cityParam = searchParams.get("city");
    if (cityParam) {
      setSelectedCity(cityParam);
    }
  }, [searchParams]);

  const handleCitySelect = (cityVal) => {
    setSelectedCity(cityVal);
    setSelectedArea("All");
    if (cityVal === "All") {
      searchParams.delete("city");
      setSearchParams(searchParams);
    } else {
      setSearchParams({ city: cityVal });
    }
  };

  const handleDetectLocation = () => {
    if ("geolocation" in navigator) {
      toast.info("Detecting your nearest municipal city...");
      navigator.geolocation.getCurrentPosition(
        () => {
          // Detect nearest city (e.g., Delhi or based on coordinates)
          setSelectedCity("Delhi");
          setSelectedArea("All");
          setSearchParams({ city: "Delhi" });
          toast.success("Location detected: Showing grievances in New Delhi & NCR");
        },
        () => {
          toast.error("Location permission denied. Please select city manually.");
        }
      );
    } else {
      toast.error("Geolocation not supported by your browser.");
    }
  };

  const handleSupport = (id) => {
    setUpvoted((prev) => {
      const isCurrentlyUpvoted = !!prev[id];
      const newUpvoted = { ...prev, [id]: !isCurrentlyUpvoted };
      
      setIssues((currentIssues) =>
        currentIssues.map((issue) => {
          if (issue._id === id) {
            const currentCount = issue.supportCount || 0;
            return {
              ...issue,
              supportCount: isCurrentlyUpvoted ? currentCount - 1 : currentCount + 1,
            };
          }
          return issue;
        })
      );

      if (!isCurrentlyUpvoted) {
        toast.info("Supported grievance. Prioritized for municipal action.");
      }
      return newUpvoted;
    });
  };

  const categories = [
    "All",
    "Roads & Potholes",
    "Garbage & Sanitation",
    "Street Lighting",
    "Water Supply",
    "Drainage & Sewage",
    "Electricity Hazards",
  ];

  // Current available areas for selected city
  const currentCityObj = cities.find((c) => c.value === selectedCity);
  const availableAreas = currentCityObj?.areas || ["All Areas"];

  const filteredIssues = issues.filter((issue) => {
    const text = search.toLowerCase();
    const matchesSearch =
      (issue.title || "").toLowerCase().includes(text) ||
      (issue.description || "").toLowerCase().includes(text) ||
      (issue.location || "").toLowerCase().includes(text) ||
      (issue.category || "").toLowerCase().includes(text);

    // City Filter (matches issue.city or location string)
    const matchesCity =
      selectedCity === "All" ||
      (issue.city || "").toLowerCase() === selectedCity.toLowerCase() ||
      (issue.location || "").toLowerCase().includes(selectedCity.toLowerCase());

    // Specific Area Filter
    const matchesArea =
      selectedArea === "All" ||
      selectedArea === "All Areas" ||
      (issue.area || "").toLowerCase().includes(selectedArea.toLowerCase()) ||
      (issue.location || "").toLowerCase().includes(selectedArea.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || (issue.category || "").includes(selectedCategory);

    const matchesStatus =
      selectedStatus === "All" || issue.status === selectedStatus;

    return matchesSearch && matchesCity && matchesArea && matchesCategory && matchesStatus;
  });

  return (
    <div style={pageWrapper}>
      {/* Header Banner */}
      <section style={headerBanner}>
        <div className="civic-container">
          <div style={headerContent}>
            <div>
              <span style={govTag}>City & Ward Intelligence Feed</span>
              <h1 style={pageHeading}>Public Grievances by City & Area</h1>
              <p style={pageSubtitle}>
                Select your city and specific neighborhood to monitor active civic complaints, road hazards, sanitation reports, and water supply issues near you.
              </p>
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignSelf: "center" }}>
              <button onClick={handleDetectLocation} className="btn btn-outline-navy btn-sm" title="Detect Nearest City">
                <Navigation size={14} color="#1e40af" />
                <span>Detect My City</span>
              </button>
              <Link to="/create-issue" className="btn btn-orange btn-sm">
                <Plus size={16} /> Report Local Issue
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="civic-container" style={{ paddingBottom: "60px" }}>
        {/* City Selection Bar with 50+ All-India Cities */}
        <div style={cityTabsSection}>
          <div style={cityLabelRow}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Building size={16} color="#0f2942" />
              <span style={citySectionTitle}>Select City / Municipal Corporation (50+ Cities):</span>
            </div>
            <span style={cityActiveBadge}>
              Active: <b>{cities.find(c => c.value === selectedCity)?.name || "All India"}</b>
            </span>
          </div>

          {/* Quick Major Metro Hubs + All Cities Dropdown */}
          <div style={citySelectControlRow}>
            <div style={quickCityPillsWrap}>
              {["All", "Delhi", "Mumbai", "Bengaluru", "Bhopal", "Jaipur", "Pune", "Hyderabad", "Kolkata", "Lucknow", "Ahmedabad", "Chandigarh", "Patna", "Indore"].map((cityVal) => {
                const cObj = cities.find(c => c.value === cityVal);
                if (!cObj) return null;
                return (
                  <button
                    key={cObj.value}
                    onClick={() => handleCitySelect(cObj.value)}
                    style={{
                      ...cityPillBtn,
                      ...(selectedCity === cObj.value ? activeCityPill : {}),
                    }}
                  >
                    {cObj.name}
                  </button>
                );
              })}
            </div>

            {/* Complete All-India Dropdown */}
            <div style={allCitiesDropdownWrapper}>
              <select
                value={selectedCity}
                onChange={(e) => handleCitySelect(e.target.value)}
                style={allCitiesSelect}
              >
                <option value="All">All Cities across India (50+)</option>
                <optgroup label="North India">
                  {cities.filter(c => c.region === "North").map(c => (
                    <option key={c.value} value={c.value}>{c.name} ({c.state})</option>
                  ))}
                </optgroup>
                <optgroup label="Central & West India">
                  {cities.filter(c => c.region === "Central" || c.region === "West").map(c => (
                    <option key={c.value} value={c.value}>{c.name} ({c.state})</option>
                  ))}
                </optgroup>
                <optgroup label="South India">
                  {cities.filter(c => c.region === "South").map(c => (
                    <option key={c.value} value={c.value}>{c.name} ({c.state})</option>
                  ))}
                </optgroup>
                <optgroup label="East & North East India">
                  {cities.filter(c => c.region === "East").map(c => (
                    <option key={c.value} value={c.value}>{c.name} ({c.state})</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>
        </div>

        {/* Detailed Search & Area Filter Bar */}
        <div style={filterBarCard}>
          {/* Keyword Search */}
          <div style={searchBox}>
            <Search size={16} color="#64748b" />
            <input
              type="text"
              placeholder="Search keyword, landmark, or department..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={searchInput}
            />
          </div>

          {/* Specific Area / Ward Dropdown */}
          {selectedCity !== "All" && (
            <div style={selectWrapper}>
              <MapPin size={15} color="#1e40af" />
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                style={selectBox}
              >
                {availableAreas.map((area) => (
                  <option key={area} value={area}>
                    {area === "All Areas" ? "All Areas / Wards" : area}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Category Dropdown */}
          <div style={selectWrapper}>
            <Filter size={15} color="#64748b" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={selectBox}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c === "All" ? "All Categories" : c}
                </option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            style={selectBox}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        {/* Results Counter & Breadcrumb */}
        <div style={counterRow}>
          <p style={counterText}>
            Showing <b>{filteredIssues.length}</b> grievances in <b>{selectedCity === "All" ? "All Cities" : cities.find(c => c.value === selectedCity)?.name}</b>
            {selectedArea !== "All" && selectedArea !== "All Areas" && ` → ${selectedArea}`}
          </p>
          {(selectedCity !== "All" || selectedArea !== "All" || selectedCategory !== "All" || selectedStatus !== "All" || search) && (
            <button
              onClick={() => {
                setSelectedCity("All");
                setSelectedArea("All");
                setSelectedCategory("All");
                setSelectedStatus("All");
                setSearch("");
                setSearchParams({});
              }}
              style={resetFilterBtn}
            >
              Reset All Filters
            </button>
          )}
        </div>

        {/* Issues List Grid */}
        {loading ? (
          <div style={loadingBox}>
            <div style={{ color: "#0f2942", fontWeight: "600" }}>
              Loading grievances...
            </div>
          </div>
        ) : filteredIssues.length === 0 ? (
          <div style={emptyBox}>
            <AlertTriangle size={40} color="#94a3b8" />
            <h3 style={{ marginTop: "14px", color: "#0f2942" }}>No Grievances in this City / Area</h3>
            <p style={{ color: "#64748b", maxWidth: "440px", margin: "6px auto" }}>
              No complaints currently match your selected location and filters. Be the first citizen to report an issue in this neighborhood!
            </p>
            <Link to="/create-issue" className="btn btn-orange btn-sm" style={{ marginTop: "12px" }}>
              Report an Issue in this Area
            </Link>
          </div>
        ) : (
          <div style={issuesGrid}>
            {filteredIssues.map((issue) => (
              <div key={issue._id} className="civic-card-interactive" style={cardContainer}>
                {issue.image && (
                  <div style={imageContainer}>
                    <img
                      src={issue.image.startsWith("http") ? issue.image : `http://localhost:5000${issue.image}`}
                      alt="Civic Proof"
                      style={issueImage}
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  </div>
                )}

                <div style={cardHeaderRow}>
                  <span className={`civic-badge badge-${(issue.status || "pending").toLowerCase().replace(" ", "")}`}>
                    {issue.status === "Resolved" && <CheckCircle2 size={12} />}
                    {issue.status}
                  </span>

                  <span style={categoryText}>
                    {issue.category || "General"}
                  </span>
                </div>

                <h3 style={issueTitle}>{issue.title}</h3>
                <p style={issueDesc}>{issue.description}</p>

                <div style={metaBox}>
                  <div style={metaItem}>
                    <MapPin size={14} color="#1e40af" />
                    <span><b>{issue.location || "Location Tagged"}</b></span>
                  </div>
                  <div style={metaItem}>
                    <Clock size={13} color="#64748b" />
                    <span>{issue.createdAt ? new Date(issue.createdAt).toLocaleDateString() : "Recently Added"}</span>
                  </div>
                </div>

                <div style={cardFooter}>
                  <button
                    onClick={() => handleSupport(issue._id)}
                    style={{
                      ...supportBtn,
                      backgroundColor: upvoted[issue._id] ? "#eff6ff" : "#ffffff",
                      borderColor: upvoted[issue._id] ? "#1e40af" : "#cbd5e1",
                      color: upvoted[issue._id] ? "#1e40af" : "#334155",
                    }}
                  >
                    <ThumbsUp size={14} fill={upvoted[issue._id] ? "#1e40af" : "none"} />
                    <span>Support ({issue.supportCount || 0})</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      toast.success("Grievance link copied!");
                    }}
                    style={shareBtn}
                    title="Share Grievance"
                  >
                    <Share2 size={15} />
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

const pageWrapper = {
  backgroundColor: "#f8fafc",
  minHeight: "100vh",
};

const headerBanner = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
  padding: "36px 0",
  marginBottom: "24px",
};

const headerContent = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
};

const govTag = {
  display: "inline-block",
  fontSize: "0.78rem",
  fontWeight: "700",
  color: "#1e40af",
  backgroundColor: "#eff6ff",
  padding: "3px 8px",
  borderRadius: "4px",
  marginBottom: "6px",
};

const pageHeading = {
  fontSize: "2rem",
  color: "#0f2942",
  marginBottom: "6px",
};

const pageSubtitle = {
  color: "#475569",
  maxWidth: "640px",
  fontSize: "0.95rem",
};

const cityTabsSection = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "16px 20px",
  marginBottom: "16px",
};

const cityLabelRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
  flexWrap: "wrap",
  gap: "8px",
};

const citySectionTitle = {
  fontSize: "0.88rem",
  fontWeight: "700",
  color: "#0f2942",
};

const cityActiveBadge = {
  fontSize: "0.82rem",
  color: "#1e40af",
};

const cityPillBtn = {
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  color: "#334155",
  padding: "6px 14px",
  borderRadius: "20px",
  fontSize: "0.85rem",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.15s ease",
};

const activeCityPill = {
  backgroundColor: "#0f2942",
  borderColor: "#0f2942",
  color: "#ffffff",
  fontWeight: "700",
};

const citySelectControlRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
};

const quickCityPillsWrap = {
  display: "flex",
  gap: "6px",
  flexWrap: "wrap",
  flex: "1 1 500px",
};

const allCitiesDropdownWrapper = {
  minWidth: "220px",
};

const allCitiesSelect = {
  width: "100%",
  padding: "7px 12px",
  borderRadius: "6px",
  border: "1.5px solid #cbd5e1",
  backgroundColor: "#f8fafc",
  fontFamily: "var(--font-sans)",
  fontSize: "0.85rem",
  fontWeight: "600",
  color: "#0f2942",
  outline: "none",
  cursor: "pointer",
};

const filterBarCard = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  padding: "14px 18px",
  display: "flex",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "12px",
  marginBottom: "18px",
};

const searchBox = {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  backgroundColor: "#f8fafc",
  border: "1px solid #cbd5e1",
  borderRadius: "6px",
  padding: "8px 12px",
  flex: "1",
  minWidth: "220px",
};

const searchInput = {
  border: "none",
  background: "transparent",
  width: "100%",
  outline: "none",
  fontFamily: "var(--font-sans)",
  fontSize: "0.9rem",
  color: "#0f2942",
};

const selectWrapper = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const selectBox = {
  padding: "8px 12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  backgroundColor: "#ffffff",
  fontFamily: "var(--font-sans)",
  fontSize: "0.88rem",
  color: "#0f2942",
  outline: "none",
  cursor: "pointer",
};

const counterRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "16px",
  flexWrap: "wrap",
  gap: "8px",
};

const counterText = {
  fontSize: "0.9rem",
  color: "#475569",
};

const resetFilterBtn = {
  background: "none",
  border: "none",
  color: "#dc2626",
  fontSize: "0.82rem",
  fontWeight: "600",
  cursor: "pointer",
  textDecoration: "underline",
};

const issuesGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
  gap: "20px",
};

const cardContainer = {
  padding: 0,
  display: "flex",
  flexDirection: "column",
};

const imageContainer = {
  height: "170px",
  overflow: "hidden",
};

const issueImage = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
};

const cardHeaderRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "16px 18px 0",
};

const categoryText = {
  fontSize: "0.78rem",
  fontWeight: "600",
  color: "#1e40af",
};

const issueTitle = {
  fontSize: "1.12rem",
  color: "#0f2942",
  padding: "10px 18px 0",
  lineHeight: 1.35,
};

const issueDesc = {
  fontSize: "0.88rem",
  color: "#475569",
  lineHeight: 1.5,
  padding: "8px 18px 0",
  flex: 1,
};

const metaBox = {
  padding: "12px 18px",
  display: "flex",
  flexDirection: "column",
  gap: "4px",
  fontSize: "0.82rem",
  color: "#64748b",
};

const metaItem = {
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

const cardFooter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "12px 18px",
  borderTop: "1px solid #f1f5f9",
  backgroundColor: "#ffffff",
};

const supportBtn = {
  display: "inline-flex",
  alignItems: "center",
  gap: "6px",
  padding: "6px 12px",
  borderRadius: "6px",
  border: "1px solid #cbd5e1",
  fontSize: "0.84rem",
  fontWeight: "600",
  cursor: "pointer",
};

const shareBtn = {
  background: "#f8fafc",
  border: "1px solid #e2e8f0",
  padding: "6px 8px",
  borderRadius: "6px",
  cursor: "pointer",
  color: "#64748b",
};

const loadingBox = {
  textAlign: "center",
  padding: "50px 0",
};

const emptyBox = {
  textAlign: "center",
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "12px",
  padding: "50px 20px",
};

export default PublicIssues;
