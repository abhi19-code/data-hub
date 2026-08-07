const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home Route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Data Hub API",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});