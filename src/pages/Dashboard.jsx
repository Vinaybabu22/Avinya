import { useState } from "react";
import Layout from "../layouts/Layout";
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
    <Layout>
        <h1 className="text-3xl md:text-4xl font-bold">
            Welcome Back 👋
        </h1>

        <p className="text-slate-500 mt-2">
            Explore jobs, internships and courses.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
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
            <h2 className="text-xl md:text-2xl font-bold mb-5">
                Recommended For You
            </h2>

            <div className="flex overflow-x-auto pb-2 mb-4 md:mb-6 gap-2 md:gap-4 scrollbar-hide">
                <button
                onClick={() => setActiveTab("jobs")}
                className={`whitespace-nowrap flex-shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-2xl font-medium transition-all duration-300 ${
                    activeTab === "jobs"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : "bg-white"
                }`}
                >
                Jobs
                </button>

                <button
                onClick={() => setActiveTab("internships")}
                className={`whitespace-nowrap flex-shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-2xl font-medium transition-all duration-300 ${
                    activeTab === "internships"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : "bg-white"
                }`}
                >
                Internships
                </button>

                <button
                onClick={() => setActiveTab("courses")}
                className={`whitespace-nowrap flex-shrink-0 px-4 md:px-6 py-2 md:py-3 rounded-2xl font-medium transition-all duration-300 ${
                    activeTab === "courses"
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : "bg-white"
                }`}
                >
                Courses
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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
    </Layout>
  );
}

export default Dashboard;