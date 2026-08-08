require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db");
const User = require("./models/User");
const Post = require("./models/Post");

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

// Create a new post
app.post("/posts", async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({
        message: "Title, content and author are required",
      });
    }

    const post = await Post.create({
      title,
      content,
      author,
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create post",
      error: error.message,
    });
  }
});

// Get all posts with author information
app.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find().populate("author");

    res.json(posts);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch posts",
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