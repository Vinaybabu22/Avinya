import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import RecommendationCard from "../components/RecommendationCard";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("jobs");
    const jobs = [
        {
            title: "Python Developer",
            company: "TCS",
            type: "Job",
            skills: ["Python", "Django", "SQL"]
        },
        {
            title: "Backend Developer",
            company: "Infosys",
            type: "Job",
            skills: ["Node.js", "MongoDB"]
        },
        {
            title: "Data Analyst",
            company: "Wipro",
            type: "Job",
            skills: ["Python", "Power BI"]
        }
    ];

    const internships = [
        {
            title: "Data Science Intern",
            company: "Infosys",
            type: "Internship",
            skills: ["Python", "ML"]
        },
        {
            title: "Web Developer Intern",
            company: "TCS",
            type: "Internship",
            skills: ["React", "JavaScript"]
        },
        {
            title: "AI Intern",
            company: "Accenture",
            type: "Internship",
            skills: ["Python", "AI"]
        }
    ];

    const courses = [
        {
            title: "Python for Everybody",
            company: "Coursera",
            type: "Course",
            skills: ["Python"]
        },
        {
            title: "React Development",
            company: "Udemy",
            type: "Course",
            skills: ["React"]
        },
        {
            title: "Machine Learning",
            company: "NPTEL",
            type: "Course",
            skills: ["ML", "Python"]
        }
    ];
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">

      <Sidebar />

      <div className="flex-1 p-10">

        <Navbar />

        <div className="mt-8">

            <h1 className="text-4xl font-bold">
                Welcome Back 👋
            </h1>

            <p className="text-slate-500 mt-2">
                Explore jobs, internships and courses.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">

                <StatsCard
                    title="Jobs Available"
                    value="245"
                    color="text-violet-600"
                />

                <StatsCard
                    title="Internships Available"
                    value="86"
                    color="text-green-600"
                />

                <StatsCard
                    title="Courses Available"
                    value="120"
                    color="text-blue-600"
                />

                <StatsCard
                    title="Saved Opportunities"
                    value="12"
                    color="text-orange-500"
                />

            </div>
            <div className="mt-10">

                <h2 className="text-2xl font-bold mb-5">
                    Recommended For You
                </h2>

                <div className="flex gap-4 mb-6">

                    <button
                    onClick={() => setActiveTab("jobs")}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                        activeTab === "jobs"
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                        : "bg-white"
                    }`}
                    >
                    Jobs
                    </button>

                    <button
                    onClick={() => setActiveTab("internships")}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                        activeTab === "internships"
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                        : "bg-white"
                    }`}
                    >
                    Internships
                    </button>

                    <button
                    onClick={() => setActiveTab("courses")}
                    className={`px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                        activeTab === "courses"
                        ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                        : "bg-white"
                    }`}
                    >
                    Courses
                    </button>

                </div>

                <div className="grid grid-cols-3 gap-6">

                    {(activeTab === "jobs"
                    ? jobs
                    : activeTab === "internships"
                    ? internships
                    : courses
                    ).map((item, index) => (

                    <RecommendationCard
                        key={index}
                        title={item.title}
                        company={item.company}
                        type={item.type}
                        skills={item.skills}
                    />

                    ))}

                </div>

            </div>

        </div>
      </div>

    </div>
  );
}

export default Dashboard;