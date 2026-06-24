import { useState } from "react";
import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">
      
      {/* Mobile overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      {/* Main content */}
      <div className="flex-1 p-4 md:p-6 lg:p-10 w-full overflow-hidden">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="mt-6 md:mt-8">
          {children}
        </div>
      </div>

    </div>
  );
}

export default Layout;