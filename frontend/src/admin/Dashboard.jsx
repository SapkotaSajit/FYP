import React, { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  HiMenuAlt2,
  HiX,
  HiViewGrid,
  HiUserGroup,
  HiBriefcase,
  HiBookmark,
  HiBookOpen,
  HiAnnotation,
  HiShieldCheck,
  HiLogout,
  HiChevronDown,
  HiLockClosed,
  HiUsers,
  HiGlobe,
  HiCollection,
  HiAdjustments,
  HiPhotograph,
} from "react-icons/hi";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isBookingsOpen, setIsBookingsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Handle window resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-close sidebar on mobile when route changes
  React.useEffect(() => {
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("roleId");
    Cookies.remove("userId");
    navigate("/");
    toast.success("Logged out successfully");
  };

  const navItems = [
    { label: "Dashboard", icon: HiViewGrid, path: "dashboard" },
    { label: "Roles", icon: HiShieldCheck, path: "roles" },
    { label: "Users", icon: HiUserGroup, path: "users" },
    { label: "Staffs", icon: HiUsers, path: "staffs" },
    {
      label: "Service Categories",
      icon: HiCollection,
      path: "service-categories",
    },
    { label: "Service List", icon: HiBriefcase, path: "services" },
    { label: "Portfolio", icon: HiPhotograph, path: "portfolios" },
    {
      label: "Page Settings",
      icon: HiAdjustments,
      path: "page-settings",
    },
  ];

  const bookingSubItems = [
    { label: "Unassigned", path: "bookings" },
    { label: "Processing", path: "processBookings" },
    { label: "Pending", path: "allPen" },
    { label: "Accepted", path: "allAccept" },
    { label: "Rejected", path: "allReject" },
    { label: "Completed", path: "allCompleted" },
  ];

  const personalTaskItems = [
    { label: "My Pending", path: "myPending" },
    { label: "My Accepted", path: "myAccepted" },
    { label: "My Rejected", path: "myRejected" },
    { label: "My Completed", path: "myCompleted" },
  ];

  const guideItems = [
    { label: "Guides", icon: HiBookOpen, path: "AllGuide" },
    { label: "Guide Types", icon: HiBookmark, path: "AllGuideTypes" },
    { label: "Guide Steps", icon: HiAnnotation, path: "AllGuideSteps" },
    { label: "Contacts", icon: HiAnnotation, path: "allContacts" },
  ];

  const isActive = (path) => {
    const currentPath = location.pathname;
    return currentPath.includes(path);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 transition-all duration-300 ease-in-out w-72 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="h-full glass border-r border-slate-200/60 flex flex-col p-6 overflow-y-auto custom-scrollbar bg-white">
          <div className="flex items-center justify-between gap-3 mb-10 px-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                <HiBriefcase size={22} />
              </div>
              <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                S.D <span className="text-blue-600">Enterprise</span>
              </h2>
            </div>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <HiX size={20} />
            </button>
          </div>

          <nav className="flex-grow space-y-8">
            {/* Main Menu */}
            <div>
              <p className="px-3 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                General
              </p>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => {
                      if (window.innerWidth < 768) setIsSidebarOpen(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                        : "text-slate-600 hover:bg-white hover:text-blue-600 hover:shadow-sm"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </Link>
                ))}

                {/* Bookings with Submenu */}
                <div className="space-y-1">
                  <button
                    onClick={() => setIsBookingsOpen(!isBookingsOpen)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive("all") || isBookingsOpen
                        ? "text-blue-600 bg-white shadow-sm"
                        : "text-slate-600 hover:bg-white hover:text-blue-600"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <HiBookmark size={20} />
                      <span className="font-semibold text-sm">Bookings</span>
                    </div>
                    <HiChevronDown
                      className={`transition-transform duration-200 ${isBookingsOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {isBookingsOpen && (
                    <div className="ml-9 space-y-1 animate-in slide-in-from-top-2 duration-200">
                      {bookingSubItems.map((sub) => (
                        <Link
                          key={sub.path}
                          to={sub.path}
                          onClick={() => {
                            if (window.innerWidth < 768)
                              setIsSidebarOpen(false);
                          }}
                          className={`block px-4 py-2 text-sm rounded-lg transition-colors ${
                            isActive(sub.path)
                              ? "text-blue-600 font-bold"
                              : "text-slate-500 hover:text-blue-600"
                          }`}
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <p className="px-3 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                My Operations
              </p>
              <div className="space-y-1">
                {personalTaskItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-emerald-600 text-white shadow-lg shadow-emerald-100"
                        : "text-slate-600 hover:bg-white hover:text-emerald-600"
                    }`}
                  >
                    <HiShieldCheck size={20} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Content Menu */}
            <div>
              <p className="px-3 mb-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Content Management
              </p>
              <div className="space-y-1">
                {guideItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-100"
                        : "text-slate-600 hover:bg-white hover:text-blue-600"
                    }`}
                  >
                    <item.icon size={20} />
                    <span className="font-semibold text-sm">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-auto pt-6 border-t border-slate-200/60">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 w-full text-red-500 hover:bg-red-50 rounded-xl transition-colors font-semibold text-sm"
            >
              <HiLogout size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 glass border-b border-slate-200/60 flex items-center justify-between px-6 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
            >
              <HiMenuAlt2 size={24} />
            </button>
            <h1 className="text-xl font-bold text-slate-900 hidden md:block">
              {navItems.find((i) => isActive(i.path))?.label || "Admin Console"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="hidden md:flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-600 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm"
            >
              <HiGlobe size={18} />
              Visit Site
            </Link>
            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 p-1.5 pr-3 hover:bg-slate-100 rounded-2xl transition-all"
              >
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 border border-blue-200 overflow-hidden shadow-sm">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"
                    alt="Admin"
                  />
                </div>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-bold text-slate-900 leading-tight">
                    Admin User
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 uppercase tracking-tighter">
                    Super Admin
                  </p>
                </div>
                <HiChevronDown
                  className={`text-slate-400 transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isProfileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsProfileOpen(false)}
                  ></div>
                  <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200/60 p-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <Link
                      to="/change-password"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-slate-50 rounded-xl transition-all font-medium"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <HiLockClosed size={18} className="text-slate-400" />
                      Change Password
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 w-full text-sm text-red-500 hover:bg-red-50 rounded-xl transition-all font-medium"
                    >
                      <HiLogout size={18} />
                      Log Out
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50/50 p-6 md:p-8 custom-scrollbar">
          <div className="max-w-[1400px] mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminDashboard;
