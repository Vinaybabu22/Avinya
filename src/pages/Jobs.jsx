import { useEffect, useState } from "react";
import Layout from "../layouts/Layout";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not load jobs");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
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
          <p className="text-sm font-semibold text-violet-600">OPPORTUNITIES</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Find your next job
          </h1>
          <p className="mt-2 text-slate-500">
            Explore job opportunities collected for your career journey.
          </p>
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
          {jobs.map((job) => (
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

                <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                  {job.type}
                </span>
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
      </div>
    </Layout>
  );
}

export default Jobs;