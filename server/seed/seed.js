const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);


const path = require("path");
require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

const connectDB = require("../config/db");

const Job = require("../models/Job");
const Internship = require("../models/Internship");
const Course = require("../models/Course");

const jobs = require("./jobs.json");
const internships = require("./internships.json");
const courses = require("./courses.json");

const seedDatabase = async () => {
  try {
    await connectDB();

    await Job.deleteMany({});
    await Internship.deleteMany({});
    await Course.deleteMany({});

    console.log("Old data deleted");

    await Job.insertMany(jobs);
    await Internship.insertMany(internships);
    await Course.insertMany(courses);

    console.log("Database Seeded Successfully!");

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();