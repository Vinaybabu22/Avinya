import { useEffect, useState, useContext } from "react";
import Layout from "../layouts/Layout";
import AuthContext from "../context/AuthContext";
import RecommendationCard from "../components/RecommendationCard";

function Saved() {
  const { user } = useContext(AuthContext);
  const [savedData, setSavedData] = useState({ jobs: [], internships: [], courses: [] });
  const [loading, setLoading] = useState(true);

  const handleSaveToggle = (isSaved, itemId, itemType) => {
    if (!isSaved) {
      setSavedData(prev => {
        const type = itemType.toLowerCase();
        const stateKey = type === 'course' ? 'courses' : type + 's';
        return {
          ...prev,
          [stateKey]: prev[stateKey].filter(item => item._id !== itemId)
        };
      });
    }
  };

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    fetch("http://localhost:5000/api/users/saved", {
      headers: { Authorization: `Bearer ${user.token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setSavedData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <Layout>
        <div className="p-6">
          <h1 className="text-3xl font-bold">Saved Items</h1>
          <p className="mt-4 text-slate-500">Please log in to view your saved items.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-8">Your Saved Items</h1>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-12">
            
            {/* Saved Jobs */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-violet-600 border-b pb-2">Saved Jobs</h2>
              {savedData.jobs?.length === 0 ? (
                <p className="text-slate-500">No saved jobs yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {savedData.jobs.map(job => (
                    <RecommendationCard 
                      key={job._id} _id={job._id} title={job.title} company={job.company} type="Job" skills={job.skills} isSavedInitially={true} onSaveToggle={handleSaveToggle}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Saved Internships */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-violet-600 border-b pb-2">Saved Internships</h2>
              {savedData.internships?.length === 0 ? (
                <p className="text-slate-500">No saved internships yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {savedData.internships.map(internship => (
                    <RecommendationCard 
                      key={internship._id} _id={internship._id} title={internship.title} company={internship.company} type="Internship" skills={internship.skills} isSavedInitially={true} onSaveToggle={handleSaveToggle}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Saved Courses */}
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-violet-600 border-b pb-2">Saved Courses</h2>
              {savedData.courses?.length === 0 ? (
                <p className="text-slate-500">No saved courses yet.</p>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                  {savedData.courses.map(course => (
                    <RecommendationCard 
                      key={course._id} _id={course._id} title={course.title} company={course.provider} type="Course" skills={course.skills} isSavedInitially={true} onSaveToggle={handleSaveToggle}
                    />
                  ))}
                </div>
              )}
            </section>

          </div>
        )}
      </div>
    </Layout>
  );
}

export default Saved;