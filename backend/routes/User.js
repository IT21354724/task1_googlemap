const express = require("express");
const User = require("../models/User");
const router = express.Router();

 
router.post("/register", async (req, res) => {
  const { name, email, password, location } = req.body;

  if (!location || !location.lat || !location.lng) {
    return res.status(400).json({ error: "Location is required" });
  }

  try {
    const newUser = new User({ name, email, password, location });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

 
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
