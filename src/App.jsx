import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Internships from "./pages/Internships";
import Courses from "./pages/Cources";
import Saved from "./pages/Saved";
import Recommendations from "./pages/Recommendations";
import ResumeAnalyzer from "./pages/ResumeAnalyser";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/internships" element={<Internships />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/resume-analyzer" element={<ResumeAnalyzer />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;