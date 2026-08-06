const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    provider: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "Self Paced",
    },
    level: {
      type: String,
      default: "Beginner",
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    courseLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);