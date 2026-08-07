const express = require("express");
const jwt = require("jsonwebtoken");
const Job = require("../models/Job");
const Internship = require("../models/Internship");
const Course = require("../models/Course");
const User = require("../models/User");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const jobsCount = await Job.countDocuments();
    const internshipsCount = await Internship.countDocuments();
    const coursesCount = await Course.countDocuments();
    
    let savedCount = 0;
    
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "avinya_secret_key");
        const user = await User.findById(decoded.id);
        if (user) {
          savedCount = 
            (user.savedJobs ? user.savedJobs.length : 0) + 
            (user.savedInternships ? user.savedInternships.length : 0) + 
            (user.savedCourses ? user.savedCourses.length : 0);
        }
      } catch (error) {
        // Token error, ignore and return 0 for saved
      }
    }
    
    res.json({
      jobs: jobsCount,
      internships: internshipsCount,
      courses: coursesCount,
      saved: savedCount
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
