function Profile() {
  return (
    <div style={page}>
      <div style={card}>
        <h1>My Profile</h1>
        <p><b>Name:</b> Akshita</p>
        <p><b>Email:</b> test2@gmail.com</p>
        <p><b>Role:</b> Citizen</p>
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
};

const card = {
  background: "#1e293b",
  padding: "35px",
  borderRadius: "15px",
  width: "350px",
};

export default Profile;