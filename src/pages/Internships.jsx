import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import SaveButton from "../components/SaveButton";

function Internships() {
  const [internships, setInternships] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const location = searchParams.get("location") || "";
  const stipend = searchParams.get("stipend") || "";
  const duration = searchParams.get("duration") || "";

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    if (location) params.append("location", location);
    if (stipend) params.append("stipend", stipend);
    if (duration) params.append("duration", duration);

    fetch("http://localhost:5000/api/internships?" + params.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load internships");
        }
        return response.json();
      })
      .then((data) => {
        setInternships(data);
        setVisibleCount(6);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query, location, stipend, duration]);

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
            INTERNSHIPS
          </p>

          <h1 className="text-3xl font-bold mt-1">
            Explore Internship Opportunities
          </h1>

          <p className="text-slate-500 mt-2">
            Find internships to gain real-world experience.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <select 
              value={location} 
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">All Locations</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Noida">Noida</option>
              <option value="Gurgaon">Gurgaon</option>
              <option value="Pune">Pune</option>
              <option value="Chennai">Chennai</option>
              <option value="Delhi">Delhi</option>
            </select>

            <select 
              value={duration} 
              onChange={(e) => handleFilterChange("duration", e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Any Duration</option>
              <option value="3 Months">3 Months</option>
              <option value="6 Months">6 Months</option>
            </select>

            <select 
              value={stipend} 
              onChange={(e) => handleFilterChange("stipend", e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Any Stipend</option>
              <option value="Unpaid">Unpaid</option>
              <option value="5000/month">5000 /month</option>
              <option value="10000/month">10000 /month</option>
              <option value="15000/month">15000 /month</option>
              <option value="Not disclosed">Not disclosed</option>
            </select>
          </div>
        </div>

        {loading && <p>Loading internships...</p>}

        {error && (
          <p className="text-red-600 bg-red-50 p-4 rounded-xl">
            {error}
          </p>
        )}

        {!loading && !error && (
          <>
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {internships.slice(0, visibleCount).map((internship) => (
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
          
          {internships.length > visibleCount && (
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

export default Internships;