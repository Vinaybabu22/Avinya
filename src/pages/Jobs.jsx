import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "../layouts/Layout";
import SaveButton from "../components/SaveButton";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const type = searchParams.get("type") || "";
  const location = searchParams.get("location") || "";
  const salary = searchParams.get("salary") || "";

  useEffect(() => {
    const params = new URLSearchParams();
    if (query) params.append("search", query);
    if (type) params.append("type", type);
    if (location) params.append("location", location);
    if (salary) params.append("salary", salary);
    
    fetch("http://localhost:5000/api/jobs?" + params.toString())
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load jobs");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setVisibleCount(6);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [query, type, location, salary]);

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
          <p className="text-sm font-semibold text-violet-600">OPPORTUNITIES</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Find your next job
          </h1>
          <p className="mt-2 text-slate-500">
            Explore job opportunities collected for your career journey.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">
            <select 
              value={type} 
              onChange={(e) => handleFilterChange("type", e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">All Types</option>
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>

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
              value={salary} 
              onChange={(e) => handleFilterChange("salary", e.target.value)}
              className="bg-white border border-slate-200 text-slate-700 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="">Any Salary</option>
              <option value="4-6 LPA">4-6 LPA</option>
              <option value="5-7 LPA">5-7 LPA</option>
              <option value="6-8 LPA">6-8 LPA</option>
              <option value="8-12 LPA">8-12 LPA</option>
              <option value="Not disclosed">Not disclosed</option>
            </select>
          </div>
        </div>

        {loading && (
          <p className="text-slate-500">Loading jobs...</p>
        )}

        {error && (
          <p className="rounded-xl bg-red-50 p-4 text-red-600">
            {error}. Make sure the backend is running on port 5000.
          </p>
        )}

        {!loading && !error && jobs.length === 0 && (
          <p className="rounded-xl bg-slate-100 p-4 text-slate-600">
            No jobs available yet.
          </p>
        )}

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {jobs.slice(0, visibleCount).map((job) => (
            <div
              key={job._id}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    {job.title}
                  </h2>
                  <p className="mt-1 font-medium text-violet-600">
                    {job.company}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                    {job.type}
                  </span>
                  <SaveButton itemId={job._id} itemType="job" />
                </div>
              </div>

              <p className="mt-4 text-sm text-slate-500">
                📍 {job.location}
              </p>

              <p className="mt-2 text-sm text-slate-500">
                💰 {job.salary}
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {job.description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <a
                href={job.applyLink}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-violet-600 px-4 py-3 font-semibold text-white transition hover:bg-violet-700"
              >
                Apply now
              </a>
            </div>
          ))}
        </div>

        {jobs.length > visibleCount && (
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="rounded-xl border border-violet-600 px-6 py-2.5 font-semibold text-violet-600 transition hover:bg-violet-50"
            >
              Show More
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Jobs;