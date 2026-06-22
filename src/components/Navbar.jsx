import { Search, Bell, Menu } from "lucide-react";

function Navbar({ onMenuClick }) {
  return (
    <div className="bg-white rounded-3xl px-4 md:px-6 py-4 shadow-md flex justify-between items-center">

      <div className="flex items-center gap-3 w-full md:w-auto">
        {onMenuClick && (
          <button onClick={onMenuClick} className="md:hidden text-slate-500 hover:text-violet-600 transition-colors">
            <Menu size={24} />
          </button>
        )}
        <div className="relative flex-1 md:flex-none">
          <Search
            size={18}
            className="absolute left-4 top-3.5 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            className="w-full md:w-[300px] lg:w-[500px] bg-slate-50 border border-slate-200 rounded-2xl py-3 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-400"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6 ml-4">
        
        <div className="relative cursor-pointer hidden sm:block">
          <Bell size={22} className="text-slate-600" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 md:w-11 md:h-11 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center text-white font-bold">
            S
          </div>
          <div className="hidden md:block">
            <p className="font-semibold text-sm">
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