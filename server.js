require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");

const app = express();

app.use(express.json());

connectDB();

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Data Hub API is running",
  });
});

// Get all users
app.get("/users", (req, res) => {
  res.json({
    message: "Get users route is working",
  });
});

// Add a user
app.post("/users", (req, res) => {
  res.json({
    message: "Post user route is working",
    data: req.body,
  });
});

// Update a user
app.put("/users/:id", (req, res) => {
  res.json({
    message: "Update user route is working",
    id: req.params.id,
    data: req.body,
  });
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  res.json({
    message: "Delete user route is working",
    id: req.params.id,
  });
});

// Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password are required",
    });
  }

  res.json({
    message: "Login successful",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});