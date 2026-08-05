const express = require("express");

const app = express();
const PORT = 5000;

// Middleware to read JSON data
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Data Hub API"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});