const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");
const internshipRoutes = require("./routes/internshipRoutes");
const courseRoutes = require("./routes/courseRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const statsRoutes = require("./routes/statsRoutes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());
app.use("/api/jobs", jobRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/stats", statsRoutes);

app.get("/", (req, res) => {
  res.send("Avinya backend is running");
});

// DEBUG
const Job = require("./models/Job");
const Internship = require("./models/Internship");
app.get("/api/debug-db", async (req, res) => {
  const salaries = await Job.distinct("salary");
  const stipends = await Internship.distinct("stipend");
  res.json({ salaries, stipends });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});