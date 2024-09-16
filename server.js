const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow requests from any origin
app.use(bodyParser.json()); // Parse JSON bodies

app.post("/api/register", (req, res) => {
  const { firstName, lastName, email, password, mobileNumber } = req.body;

  // Simple validation (you can expand this)
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Mock response for successful registration
  res.status(200).json({ message: "User registered successfully" });
});

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Simple validation (you can expand this)
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  // Mock response for successful login
  res.status(200).json({ token: "mock-jwt-token" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
