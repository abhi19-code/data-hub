const express = require("express");

const app = express();
const PORT = 5000;

// Read JSON data
app.use(express.json());

// Temporary database
let users = [
  {
    id: 1,
    name: "Abhi",
    course: "Node.js"
  }
];

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Data Hub API"
  });
});

// Get all users
app.get("/users", (req, res) => {
  res.json(users);
});

// Add new user
app.post("/users", (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name,
    course: req.body.course
  };

  users.push(newUser);

  res.status(201).json({
    message: "User added",
    user: newUser
  });
});

// Update user
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  user.name = req.body.name || user.name;
  user.course = req.body.course || user.course;

  res.json({
    message: "User updated",
    user
  });
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((item) => item.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found"
    });
  }

  users = users.filter((item) => item.id !== id);

  res.json({
    message: "User deleted"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});