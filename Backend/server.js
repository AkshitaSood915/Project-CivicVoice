const multer = require("multer");
const path = require("path");
const cors = require("cors");
const Issue = require("./models/Issue");
const protect = require("./middleware/authMiddleware");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

  const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.send("Home working");
});

app.post("/api/auth/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      message: "User saved with encrypted password",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid Password",
      });
    }

   const token = jwt.sign(
  { id: user._id, email: user.email },
  process.env.JWT_SECRET,
  { expiresIn: "7d" }
);

res.json({
  success: true,
  message: "Login Successful",
  token,
});
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});
app.get("/api/auth/profile", protect, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

app.post("/api/issues", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY:", req.body);
    console.log("FILE:", req.file);
    
    const { title, description, category, location } = req.body;

    const issue = await Issue.create({
      title,
      description,
      category,
      location,
      image: req.file ? `/uploads/${req.file.filename}` : "",
    });

    res.status(201).json({
      success: true,
      message: "Issue created successfully",
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


app.get("/api/issues", async (req, res) => {
  try {
    const issues = await Issue.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      issues,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.put("/api/issues/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const issue = await Issue.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json({
      success: true,
      message: "Issue status updated",
      issue,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.delete("/api/issues/:id", async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Complaint deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});