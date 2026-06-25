const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
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
    type: {
      type: String,
      default: "Full Time",
    },
    skills: {
      type: [String],
      default: [],
    },
    salary: {
      type: String,
      default: "Not disclosed",
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

module.exports = mongoose.model("Job", jobSchema);