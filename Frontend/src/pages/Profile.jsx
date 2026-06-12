import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("http://localhost:5000/api/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (error) {
      alert("Failed to load profile");
    }
  };

  if (!user) {
    return <div style={page}>Loading...</div>;
  }

  return (
    <div style={page}>
      <div style={card}>
        <div style={avatar}>{user.name?.charAt(0).toUpperCase()}</div>

        <h1 style={heading}>My Profile</h1>

        <div style={infoBox}>
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>Role:</b> Citizen</p>
        </div>
      </div>
    </div>
  );
}

const page = {
  minHeight: "100vh",
  background: "#0f172a",
  color: "white",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px",
  boxSizing: "border-box",
};

const card = {
  background: "#1e293b",
  width: "100%",
  maxWidth: "420px",
  padding: "32px",
  borderRadius: "18px",
  boxShadow: "0 0 25px rgba(56,189,248,0.2)",
  textAlign: "center",
};

const avatar = {
  width: "75px",
  height: "75px",
  borderRadius: "50%",
  background: "#38bdf8",
  color: "#0f172a",
  fontSize: "32px",
  fontWeight: "bold",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0 auto 18px",
};

const heading = {
  fontSize: "38px",
  margin: "0 0 24px",
};

const infoBox = {
  background: "#334155",
  padding: "18px",
  borderRadius: "12px",
  lineHeight: "1.8",
  textAlign: "left",
};

export default Profile;