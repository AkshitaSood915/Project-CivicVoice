import { useState } from "react";
import axios from "axios";

function CreateIssue() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/issues", form);
      alert("Complaint added successfully");

      setForm({
        title: "",
        description: "",
        category: "",
        location: "",
      });
    } catch (error) {
  console.log(error);
  alert(error.response?.data?.message || error.message || "Something went wrong");
}
  };

  return (
    <div style={pageStyle}>
      <div style={cardStyle}>
        <h1 style={{ color: "#38bdf8" }}>Raise Complaint</h1>

        <form onSubmit={handleSubmit}>
          <input name="title" placeholder="Issue Title" value={form.title} onChange={handleChange} style={inputStyle} />

          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} style={inputStyle} />

          <input name="category" placeholder="Category e.g. Road, Garbage" value={form.category} onChange={handleChange} style={inputStyle} />

          <input name="location" placeholder="Location" value={form.location} onChange={handleChange} style={inputStyle} />

          <button style={buttonStyle}>Submit Complaint</button>
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
};

const cardStyle = {
  background: "#1e293b",
  padding: "35px",
  borderRadius: "15px",
  width: "420px",
  textAlign: "center",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #475569",
  background: "#334155",
  color: "white",
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