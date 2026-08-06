const express = require("express");
const Internship = require("../models/Internship");

const router = express.Router();

// Get all internships
router.get("/", async (req, res) => {
  try {
    const { search, location, stipend, duration } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { company: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } }
      ];
    }
    
    if (location) {
      query.location = { $regex: location, $options: "i" };
    }
    if (stipend) {
      query.stipend = { $regex: stipend, $options: "i" };
    }
    if (duration) {
      query.duration = { $regex: duration, $options: "i" };
    }

    const internships = await Internship.find(query).sort({ createdAt: -1 });

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