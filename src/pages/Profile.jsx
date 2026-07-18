import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../layouts/Layout";
import AuthContext from "../context/AuthContext";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setProfileData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Layout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-slate-900 mb-8">My Profile</h1>

        {loading ? (
          <p className="text-slate-500">Loading profile...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : profileData ? (
          <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex items-center gap-6 mb-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-violet-100 text-3xl font-bold text-violet-600">
                {profileData.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{profileData.name}</h2>
                <p className="text-slate-500">{profileData.email}</p>
                <p className="text-sm text-slate-400 mt-1">ID: #{profileData._id.slice(-8).toUpperCase()}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-6">
              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-50 px-6 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Log out
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Layout>
  );
}

export default Profile;