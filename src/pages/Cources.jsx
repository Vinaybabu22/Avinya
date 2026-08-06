import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import SaveButton from "../components/SaveButton";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load courses");
        }
        return response.json();
      })
      .then((data) => {
        setCourses(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
        </div>

        {loading && <p>Loading courses...</p>}

        {error && (
          <p className="bg-red-50 text-red-600 p-4 rounded-xl">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {courses.map((course) => (
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
        )}
      </div>
    </Layout>
  );
}

export default Courses;