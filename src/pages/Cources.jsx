import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import SaveButton from "../components/SaveButton";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const duration = searchParams.get("duration") || "";
  const level = searchParams.get("level") || "";

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    if (duration) params.append("duration", duration);
    if (level) params.append("level", level);

    fetch("http://localhost:5000/api/courses?" + params.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load courses");
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setVisibleCount(6);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query, duration, level]);

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <Layout>
      <div className="p-6">
        <div className="mb-8">
          <p className="text-sm font-semibold text-violet-600">
            COURSES
          </p>

          <h1 className="text-3xl font-bold mt-1">
            Upgrade Your Skills
          </h1>

          <p className="text-slate-500 mt-2">
            Learn in-demand skills with curated online courses.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <select 
              value={level} 
              onChange={(e) => handleFilterChange("level", e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>

            <select 
              value={duration} 
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Any Duration</option>
              <option value="4 Weeks">4 Weeks</option>
              <option value="6 Weeks">6 Weeks</option>
              <option value="8 Weeks">8 Weeks</option>
              <option value="Self Paced">Self Paced</option>
            </select>
          </div>
        </div>

        {loading && <p>Loading courses...</p>}

        {error && (
          <p className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {courses.slice(0, visibleCount).map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl border shadow-sm p-5 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">
                      {course.title}
                    </h2>

                    <p className="text-violet-600 font-semibold mt-1">
                      {course.provider}
                    </p>
                  </div>
                  <SaveButton itemId={course._id} itemType="course" />
                </div>

                <p className="mt-3">⏳ {course.duration}</p>

                <p>🎓 {course.level}</p>

                <p className="mt-4 text-slate-600">
                  {course.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={course.courseLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center bg-violet-600 text-white rounded-xl py-3 mt-5 hover:bg-violet-700"
                >
                  View Course
                </a>
              </div>
            ))}
          </div>

          {courses.length > visibleCount && (
            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="rounded-xl border border-violet-600 px-6 py-2.5 font-semibold text-violet-600 transition hover:bg-violet-50"
              >
                Show More
              </button>
            </div>
          )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default Courses;