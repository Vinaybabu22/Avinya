import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import StatsCard from "../components/StatsCard";
import RecommendationCard from "../components/RecommendationCard";

function Dashboard() {
    const [activeTab, setActiveTab] = useState("jobs");
    const [jobs, setJobs] = useState([]);
    const [internships, setInternships] = useState([]);
    const [courses, setCourses] = useState([]);
    const [stats, setStats] = useState({ jobs: 0, internships: 0, courses: 0, saved: 0 });
    const { user } = useContext(AuthContext);
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";

    useEffect(() => {
        const qs = query ? `?search=${query}` : "";
        fetch("http://localhost:5000/api/jobs" + qs).then(res => res.json()).then(data => setJobs(data.slice(0, 3)));
        fetch("http://localhost:5000/api/internships" + qs).then(res => res.json()).then(data => setInternships(data.slice(0, 3)));
        fetch("http://localhost:5000/api/courses" + qs).then(res => res.json()).then(data => setCourses(data.slice(0, 3)));
    }, [query]);

    useEffect(() => {
        const headers = {};
        if (user && user.token) {
            headers.Authorization = `Bearer ${user.token}`;
        }
        fetch("http://localhost:5000/api/stats", { headers })
            .then(res => res.json())
            .then(data => {
                if(data && !data.message) {
                    setStats(data);
                }
            })
            .catch(err => console.error(err));
    }, [user]);
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
                value={stats.jobs}
                color="text-violet-600"
            />

            <StatsCard
                title="Internships Available"
                value={stats.internships}
                color="text-green-600"
            />

            <StatsCard
                title="Courses Available"
                value={stats.courses}
                color="text-blue-600"
            />

            <StatsCard
                title="Saved Opportunities"
                value={stats.saved}
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
                    key={item._id || index}
                    _id={item._id}
                    title={item.title}
                    company={item.company || item.provider}
                    type={activeTab === "jobs" ? "Job" : activeTab === "internships" ? "Internship" : "Course"}
                    skills={item.skills}
                />
                ))}
            </div>
        </div>
    </Layout>
  );
}

export default Dashboard;