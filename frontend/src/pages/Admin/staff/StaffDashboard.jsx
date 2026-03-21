import React, { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  HiMenuAlt2,
  HiX,
  HiHome,
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiBadgeCheck,
  HiLogout,
  HiUserCircle,
  HiKey,
  HiChevronRight,
} from "react-icons/hi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function StaffDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("roleId");
    Cookies.remove("userId");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const isActive = (path) => location.pathname.includes(path);

  const navItems = [
    { label: "Dashboard", icon: HiHome, path: "dashboard", color: "blue" },
    {
      label: "Pending Tasks",
      icon: HiClock,
      path: "assignedUsers",
      color: "amber",
    },
    {
      label: "Accepted Work",
      icon: HiCheckCircle,
      path: "acceptAssigned",
      color: "emerald",
    },
    {
      label: "Rejected/On Hold",
      icon: HiXCircle,
      path: "rejectAssigned",
      color: "red",
    },
    {
      label: "Completed Jobs",
      icon: HiBadgeCheck,
      path: "completedAssigned",
      color: "indigo",
    },
  ];

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-white md:relative z-50 transition-all duration-300 ease-in-out border-r border-slate-200/60 flex flex-col ${
          isSidebarOpen
            ? "translate-x-0 w-72"
            : "-translate-x-full md:translate-x-0 md:w-20"
        } overflow-hidden`}
      >
        <div className="p-6 flex items-center gap-3 shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 shrink-0">
            <span className="text-white font-black text-xl">SD</span>
          </div>
          {isSidebarOpen && (
            <span className="font-bold text-slate-800 tracking-tight text-lg truncate">
              Staff Portal
            </span>
          )}
        </div>

        <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar pt-4">
          <p
            className={`px-4 mb-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] transition-opacity ${!isSidebarOpen && "md:opacity-0"}`}
          >
            Main Navigation
          </p>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group relative ${
                isActive(item.path)
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-200"
                  : "text-slate-500 hover:bg-white hover:text-blue-600"
              }`}
            >
              <item.icon
                size={22}
                className={`shrink-0 transition-transform group-hover:scale-110 ${isActive(item.path) ? "text-white" : "text-slate-400 group-hover:text-blue-600"}`}
              />
              {isSidebarOpen && (
                <span className="font-bold text-sm truncate">{item.label}</span>
              )}
              {isActive(item.path) && isSidebarOpen && (
                <HiChevronRight className="ml-auto opacity-60" />
              )}
              {!isSidebarOpen && (
                <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {item.label}
                </div>
              )}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-200/60 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3.5 text-slate-500 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all group"
          >
            <HiLogout
              size={22}
              className="group-hover:translate-x-1 transition-transform"
            />
            {isSidebarOpen && (
              <span className="font-bold text-sm">Sign Out</span>
            )}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-4 md:px-6 flex items-center justify-between shrink-0 z-40">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2.5 hover:bg-slate-100 rounded-xl text-slate-600 transition-all active:scale-95 shrink-0"
            >
              {isSidebarOpen ? <HiX size={24} /> : <HiMenuAlt2 size={24} />}
            </button>

            <div className="flex items-center gap-3">
              {/* Show logo in header on mobile only when sidebar is closed */}
              {!isSidebarOpen && (
                <div className="md:hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-100">
                  <span className="text-white font-black text-xs">SD</span>
                </div>
              )}
              <h1 className="text-lg md:text-xl font-bold text-slate-800 truncate">
                Operation Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right mr-2 hidden md:block">
              <p className="text-sm font-bold text-slate-900 leading-none mb-1">
                Field Staff
              </p>
              <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider">
                Online • Active
              </p>
            </div>

            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="p-0.5 rounded-2xl border-2 border-slate-100 hover:border-blue-400 transition-all active:scale-95 overflow-hidden w-11 h-11 shadow-sm"
              >
                <img
                  src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1711861254~exp=1711864854~hmac=ebe6d6f8247b131892eced4153914b2cc9c740ddad891206e7bcfe4788be65c7&w=740"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="p-4 border-b border-slate-100 mb-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-widest mb-1">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-slate-900">
                        Operation Staff #12
                      </p>
                    </div>
                    <Link
                      to="dashboard"
                      className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all font-bold text-xs"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <HiUserCircle size={18} /> Profile Overview
                    </Link>
                    <Link
                      to="/change-password"
                      className="flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all font-bold text-xs"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <HiKey size={18} /> Security Settings
                    </Link>
                    <div className="h-px bg-slate-100 my-2"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-all font-bold text-xs"
                    >
                      <HiLogout size={18} /> Terminate Session
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StaffDashboard;
