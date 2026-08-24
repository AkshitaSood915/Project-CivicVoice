import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function CreateIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

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

      toast.success("Complaint added successfully");

      setForm({
        title: "",
        description: "",
        category: "",
        location: "",
      });

      setImage(null);
      e.target.reset();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={headingStyle}>Raise Complaint</h1>
        <p style={subText}>Report civic issues with details and photo proof.</p>

        <form onSubmit={handleSubmit}>
          <input
            name="title"
            placeholder="Issue Title"
            value={form.title}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            style={textareaStyle}
            required
          />

          <input
            name="category"
            placeholder="Category e.g. Road, Garbage, Street Lights"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <input
            name="location"
            placeholder="Location"
            value={form.location}
            onChange={handleChange}
            style={inputStyle}
            required
          />

          <label style={labelStyle}>Upload Issue Image</label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            style={fileInputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}

const pageStyle = {
  minHeight: "100vh",
  background: "#0f172a",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "25px",
};

const cardStyle = {
  background: "#1e293b",
  padding: "35px",
  borderRadius: "18px",
  width: "430px",
  textAlign: "center",
  boxShadow: "0 0 25px rgba(56,189,248,0.18)",
};

const headingStyle = {
  color: "#38bdf8",
  marginBottom: "8px",
};

const subText = {
  color: "#94a3b8",
  marginBottom: "25px",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#334155",
  color: "white",
  boxSizing: "border-box",
};

const textareaStyle = {
  ...inputStyle,
  minHeight: "90px",
  resize: "none",
};

const labelStyle = {
  display: "block",
  color: "#cbd5e1",
  textAlign: "left",
  marginBottom: "8px",
};

const fileInputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "18px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#334155",
  color: "white",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "8px",
  background: "#0ea5e9",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default CreateIssue;