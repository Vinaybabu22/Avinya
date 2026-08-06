import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";
import SaveButton from "../components/SaveButton";

function Internships() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/internships")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load internships");
        }
        return response.json();
      })
      .then((data) => {
        setInternships(data);
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
            INTERNSHIPS
          </p>

          <h1 className="text-3xl font-bold mt-1">
            Explore Internship Opportunities
          </h1>

          <p className="text-slate-500 mt-2">
            Find internships to gain real-world experience.
          </p>
        </div>

        {loading && <p>Loading internships...</p>}

        {error && (
          <p className="text-red-600 bg-red-50 p-4 rounded-xl">
            {error}
          </p>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
            {internships.map((internship) => (
              <div
                key={internship._id}
                className="bg-white rounded-2xl shadow-sm border p-5 hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold">
                      {internship.title}
                    </h2>

                    <p className="text-violet-600 font-semibold mt-1">
                      {internship.company}
                    </p>
                  </div>
                  <SaveButton itemId={internship._id} itemType="internship" />
                </div>

                <p className="mt-3">📍 {internship.location}</p>

                <p>⏳ {internship.duration}</p>

                <p>💰 {internship.stipend}</p>

                <p className="mt-4 text-slate-600">
                  {internship.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {internship.skills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-violet-100 text-violet-700 px-3 py-1 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <a
                  href={internship.applyLink}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center bg-violet-600 text-white rounded-xl py-3 mt-5 hover:bg-violet-700"
                >
                  Apply Now
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Internships;