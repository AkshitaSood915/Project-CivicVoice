import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Sparkles, MapPin, Upload, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CreateIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Roads & Potholes",
    location: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const categories = [
    "Roads & Potholes",
    "Garbage & Sanitation",
    "Street Lighting",
    "Water Supply & Leaks",
    "Drainage & Sewage",
    "Electricity Hazards",
    "Public Safety & Others"
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleGetLocation = () => {
    if ("geolocation" in navigator) {
      toast.info("Fetching your GPS coordinates...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setForm((prev) => ({
            ...prev,
            location: `GPS: ${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E (Auto-Tagged)`,
          }));
          toast.success("Location tagged successfully!");
        },
        () => {
          toast.error("Could not fetch location. Please type manually.");
        }
      );
    } else {
      toast.error("Geolocation not supported by your browser.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("location", form.location);

      if (image) {
        formData.append("image", image);
      }

      await axios.post("http://localhost:5000/api/issues", formData);

      toast.success("Complaint registered successfully! Municipal department notified.");

      setForm({
        title: "",
        description: "",
        category: "Roads & Potholes",
        location: "",
      });
      setImage(null);
      setImagePreview(null);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while submitting complaint."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={pageStyle}>
      <div className="civic-container" style={{ maxWidth: "720px" }}>
        <div className="civic-card" style={cardStyle}>
          {/* Header */}
          <div style={headerBox}>
            <div style={badgeWrapper}>
              <Sparkles size={24} color="#ffffff" />
            </div>
            <div>
              <h1 style={headingStyle}>Raise Civic Complaint</h1>
              <p style={subText}>Report public infrastructure hazards with photo proof & GPS location.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} style={formContainer}>
            {/* Title */}
            <div>
              <label className="civic-label">Complaint Title / Headline</label>
              <input
                name="title"
                placeholder="e.g. Deep Dangerous Potholes on Main Junction"
                value={form.title}
                onChange={handleChange}
                className="civic-input"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="civic-label">Detailed Description of Problem</label>
              <textarea
                name="description"
                placeholder="Describe the issue, landmarks, and severity in natural language..."
                value={form.description}
                onChange={handleChange}
                className="civic-textarea"
                rows={4}
                required
              />
            </div>

            {/* Category & Location 2-col Grid */}
            <div className="grid-2">
              <div>
                <label className="civic-label">Department / Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="civic-select"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <label className="civic-label">Location / Ward</label>
                  <button
                    type="button"
                    onClick={handleGetLocation}
                    style={gpsBtn}
                  >
                    <MapPin size={13} /> Fetch GPS
                  </button>
                </div>
                <input
                  name="location"
                  placeholder="e.g. Sector 14, Ring Road Underpass"
                  value={form.location}
                  onChange={handleChange}
                  className="civic-input"
                  required
                />
              </div>
            </div>

            {/* Image Upload Area */}
            <div>
              <label className="civic-label">Upload Photo Proof (Recommended)</label>
              <div style={uploadZone}>
                <input
                  type="file"
                  id="image-file"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <label htmlFor="image-file" style={uploadLabel}>
                  {imagePreview ? (
                    <div style={{ textAlign: "center" }}>
                      <img src={imagePreview} alt="Preview" style={previewImg} />
                      <span style={changePhotoText}>Click to replace photo</span>
                    </div>
                  ) : (
                    <div style={uploadPlaceholder}>
                      <Upload size={28} color="#1e40af" />
                      <span style={uploadMainText}>Click or drag photo proof here</span>
                      <span style={uploadSubText}>PNG, JPG or JPEG up to 10MB</span>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-saffron btn-lg"
              style={{ width: "100%", marginTop: "10px" }}
              disabled={submitting}
            >
              {submitting ? "Registering Grievance..." : (
                <>
                  <CheckCircle2 size={18} /> Submit Complaint & Notify Authorities
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "85vh",
  backgroundColor: "#f8fafc",
  padding: "45px 20px 70px",
};

const cardStyle = {
  padding: "36px",
  boxShadow: "0 10px 30px rgba(15, 41, 66, 0.06)",
  borderRadius: "20px",
};

const headerBox = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
  marginBottom: "28px",
  paddingBottom: "20px",
  borderBottom: "1px solid #f1f5f9",
};

const badgeWrapper = {
  width: "50px",
  height: "50px",
  borderRadius: "12px",
  background: "linear-gradient(135deg, #1e40af, #ea580c)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};

const headingStyle = {
  fontSize: "1.75rem",
  color: "#0f2942",
  marginBottom: "2px",
};

const subText = {
  color: "#64748b",
  fontSize: "0.92rem",
  margin: 0,
};

const formContainer = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

const gpsBtn = {
  background: "none",
  border: "none",
  color: "#1e40af",
  fontSize: "0.78rem",
  fontWeight: "700",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "4px",
  padding: "0",
};

const uploadZone = {
  border: "2px dashed #cbd5e1",
  borderRadius: "12px",
  padding: "20px",
  backgroundColor: "#f8fafc",
  textAlign: "center",
  cursor: "pointer",
  transition: "border-color 0.2s",
};

const uploadLabel = {
  cursor: "pointer",
  display: "block",
};

const uploadPlaceholder = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "6px",
};

const uploadMainText = {
  fontSize: "0.92rem",
  fontWeight: "600",
  color: "#0f2942",
};

const uploadSubText = {
  fontSize: "0.78rem",
  color: "#64748b",
};

const previewImg = {
  maxWidth: "100%",
  maxHeight: "180px",
  borderRadius: "8px",
  objectFit: "cover",
  marginBottom: "8px",
};

const changePhotoText = {
  fontSize: "0.8rem",
  color: "#1e40af",
  fontWeight: "600",
  display: "block",
};

export default CreateIssue;