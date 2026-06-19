import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import Internships from "./pages/Internships";
import Courses from "./pages/Cources";
import Saved from "./pages/Saved";
import Recommendations from "./pages/Recommendations";
import ResumeAnalyzer from "./pages/ResumeAnalyser";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";

function App() {
  return (
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
      </Routes>
    </BrowserRouter>
  );
}

export default App;