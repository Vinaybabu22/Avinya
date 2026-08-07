const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

const escapeRegex = (text) => text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const { keyword, search, type, location, salary } = req.query;
    let query = {};

    const searchTerm = search || keyword;

    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { company: { $regex: searchTerm, $options: "i" } },
        { skills: { $regex: searchTerm, $options: "i" } }
      ];
    }
    if (type) {
      query.type = type;
    }
    if (location) {
      query.location = { $regex: escapeRegex(location), $options: "i" };
    }
    if (salary) {
      query.salary = { $regex: escapeRegex(salary), $options: "i" };
    }

    const jobs = await Job.find(query).sort({ createdAt: -1 }).limit(50);

    res.status(200).json(jobs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch jobs",
      error: error.message,
    });
  }
});

// Add a job manually
router.post("/", async (req, res) => {
  try {
    const newJob = await Job.create(req.body);

    res.status(201).json(newJob);
  } catch (error) {
    res.status(400).json({
      message: "Failed to add job",
      error: error.message,
    });
  }
});

module.exports = router;