const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

// Get all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

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