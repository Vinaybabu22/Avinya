import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-slate-200">

      <Sidebar />

      <div className="flex-1 p-10">

        <Navbar />

        <div className="mt-8">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;