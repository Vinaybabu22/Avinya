const mongoose = require("mongoose");

const internshipSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      default: "3 Months",
    },
    stipend: {
      type: String,
      default: "Not disclosed",
    },
    skills: {
      type: [String],
      default: [],
    },
    description: {
      type: String,
      default: "",
    },
    applyLink: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Internship", internshipSchema);