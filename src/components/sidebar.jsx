import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Briefcase,
  GraduationCap,
  BookOpen,
  Heart,
  Sparkles,
  FileText,
  User,
  Settings,
} from "lucide-react";

function Sidebar() {
  const location = useLocation();
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard , path: "/" },
    { name: "Jobs", icon: Briefcase , path: "/jobs" },
    { name: "Internships", icon: GraduationCap, path: "/internships" },
    { name: "Courses", icon: BookOpen, path: "/courses" },
    { name: "Saved", icon: Heart, path: "/saved" },
    { name: "Recommendations", icon: Sparkles, path: "/recommendations" },
    { name: "Resume Analyzer", icon: FileText, path: "/resume-analyzer" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="w-72 bg-white min-h-screen p-6 shadow-xl">

      <div className="mb-10">
        <h1 className="text-4xl font-extrabold text-violet-600">
          AVINYA
        </h1>

        <p className="text-sm text-slate-500 mt-1">
          Learn • Apply • Grow
        </p>
      </div>

      <ul className="space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              to={item.path}
              key={item.name}
            >
              <li
                className={`flex items-center gap-3 p-4 rounded-2xl transition-all duration-300 ${
                  location.pathname === item.path
                    ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg"
                    : "hover:bg-violet-50 hover:translate-x-2"
                }`}
              >
                <Icon size={20} />
                {item.name}
              </li>
            </Link>
          );
        })}
      </ul>
    </div>
  );
}

export default Sidebar;