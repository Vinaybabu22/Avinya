import { Search, Bell } from "lucide-react";

function Navbar() {
  return (
    <div className="bg-white rounded-3xl px-6 py-4 shadow-md flex justify-between items-center">

      <div className="relative">

        <Search
          size={18}
          className="absolute left-4 top-3.5 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search jobs, internships, courses..."
          className="w-[500px] bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-400"
        />

      </div>

      <div className="flex items-center gap-6">

        <div className="relative cursor-pointer">

          <Bell size={22} />

          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>

        </div>

        <div className="flex items-center gap-3">

          <div className="w-11 h-11 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
            S
          </div>

          <div>
            <p className="font-semibold">
              Srihari
            </p>

            <p className="text-xs text-slate-500">
              Student
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Navbar;