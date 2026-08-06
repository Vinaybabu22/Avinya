const express = require("express");
const User = require("../models/User");
const { protect } = require("../middleware/auth");

const router = express.Router();

// @route   POST /api/users/save
// @desc    Save or unsave an item (job, internship, course)
// @access  Private
router.post("/save", protect, async (req, res) => {
  try {
    const { itemType, itemId } = req.body;
    
    if (!["job", "internship", "course"].includes(itemType)) {
      return res.status(400).json({ message: "Invalid item type" });
    }

    const user = await User.findById(req.user._id);
    
    let arrayName = "";
    if (itemType === "job") arrayName = "savedJobs";
    if (itemType === "internship") arrayName = "savedInternships";
    if (itemType === "course") arrayName = "savedCourses";

    const isSaved = user[arrayName].includes(itemId);

    if (isSaved) {
      // Remove it (unsave)
      user[arrayName] = user[arrayName].filter(id => id.toString() !== itemId);
    } else {
      // Add it (save)
      user[arrayName].push(itemId);
    }

    await user.save();
    res.status(200).json({ message: isSaved ? "Item unsaved" : "Item saved", isSaved: !isSaved });

  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

// @route   GET /api/users/saved
// @desc    Get all saved items for the user
// @access  Private
router.get("/saved", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .populate("savedJobs")
      .populate("savedInternships")
      .populate("savedCourses")
      .select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      jobs: user.savedJobs,
      internships: user.savedInternships,
      courses: user.savedCourses
    });

  } catch (error) {
    console.error("Get Saved Error:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

module.exports = router;
