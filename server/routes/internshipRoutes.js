const express = require("express");
const Internship = require("../models/Internship");

const router = express.Router();

// Get all internships
router.get("/", async (req, res) => {
  try {
    const internships = await Internship.find().sort({ createdAt: -1 });

    res.status(200).json(internships);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch internships",
      error: error.message,
    });
  }
});

// Add internship
router.post("/", async (req, res) => {
  try {
    const newInternship = await Internship.create(req.body);

    res.status(201).json(newInternship);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add internship",
      error: error.message,
    });
  }
});

module.exports = router;