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

// GET all users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();

    res.json(users);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users",
      error: error.message,
    });
  }
});

// POST create a new user
app.post("/users", async (req, res) => {
  try {
    const { name, course } = req.body;

    if (!name || !course) {
      return res.status(400).json({
        message: "Name and course are required",
      });
    }

    const user = await User.create({
      name,
      course,
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create user",
      error: error.message,
    });
  }
});

// PUT update a user
app.put("/users/:id", async (req, res) => {
  try {
    const { name, course } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        course,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update user",
      error: error.message,
    });
  }
});

// DELETE a user
app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json({
      message: "User deleted successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete user",
      error: error.message,
    });
  }
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