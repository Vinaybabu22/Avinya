const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// Get all courses
router.get("/", async (req, res) => {
  try {
    const { search, duration, level } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { provider: { $regex: search, $options: "i" } },
        { skills: { $regex: search, $options: "i" } }
      ];
    }
    
    if (duration) {
      query.duration = { $regex: duration, $options: "i" };
    }
    if (level) {
      query.level = level;
    }

    const courses = await Course.find(query).sort({ createdAt: -1 });

    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch courses",
      error: error.message,
    });
  }
});

// Add a course
router.post("/", async (req, res) => {
  try {
    const newCourse = await Course.create(req.body);

    res.status(201).json(newCourse);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add course",
      error: error.message,
    });
  }
});

module.exports = router;