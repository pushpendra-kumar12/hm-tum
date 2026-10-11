require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/userRoutes");

const app = express();

// ===============================
// Middleware
// ===============================
app.use(cors());
app.use(express.json());

// ===============================
// Home Route
// ===============================
app.get("/", (req, res) => {
  res.send("HAM-TUM Backend Server is Running");
});

// ===============================
// Test API
// ===============================
app.get("/api/test", (req, res) => {
  res.json({
    message: "API is working successfully",
  });
});

// ===============================
// User Routes
// ===============================
app.use("/api/users", userRoutes);

// ===============================
// MongoDB Connection
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully");

    // Render PORT automatically deta hai
    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error.message);
  });