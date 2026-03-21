import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import {
  HiMenu,
  HiX,
  HiChevronDown,
  HiLogout,
  HiUser,
  HiLockClosed,
  HiMail,
  HiLocationMarker,
  HiPhone,
  HiHome,
  HiBriefcase,
  HiBookOpen,
  HiPhotograph,
  HiChatAlt2,
  HiShieldCheck,
  HiViewGrid,
  HiMenuAlt3,
} from "react-icons/hi";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setProfileIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pageSettings, setPageSettings] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchPageSettings = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const response = await axios.get(`${apiUrl}/api/page-settings`);
        setPageSettings(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching page settings:", error);
        setPageSettings([]);
      }
    };
    fetchPageSettings();
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleDropdown = () => setProfileIsOpen(!isProfileOpen);
  const closeDropdown = () => setProfileIsOpen(false);

  const isLoggedIn = () => Cookies.get("accessToken") && Cookies.get("roleId");
  const isStaff = () => Cookies.get("roleId") === "3";
  const isAdmin = () => Cookies.get("roleId") === "1";

  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("accessToken");
    Cookies.remove("roleId");
    Cookies.remove("userId");
    navigate("/");
    toast.success("Logout successfully");
    closeDropdown();
  };

  const navLinks = [
    { label: "Home", path: "/", key: "home", icon: <HiHome /> },
    {
      label: "Services",
      path: "/homeServices",
      key: "services",
      icon: <HiBriefcase />,
    },
    { label: "Guides", path: "/guide", key: "guides", icon: <HiBookOpen /> },
    {
      label: "Portfolio",
      path: "/portfolio",
      key: "portfolio",
      icon: <HiPhotograph />,
    },
    {
      label: "Contact",
      path: "/contact",
      key: "contact",
      icon: <HiChatAlt2 />,
    },
  ].filter((link) => {
    if (link.key === "home") return true;
    if (!Array.isArray(pageSettings) || pageSettings.length === 0) return true;
    const setting = pageSettings.find((s) => s.page_key === link.key);
    return setting ? setting.is_active : true;
  });

  return (
    <header className="fixed top-0 left-0 w-full z-[100]">
      {/* Top Bar - Premium Desktop View */}
      <div
        className={`bg-slate-900 text-white/90 transition-all duration-500 hidden sm:block ${
          scrolled ? "h-0 opacity-0 overflow-hidden" : "h-10 opacity-100"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
          <div className="flex items-center gap-8">
            <a
              href="mailto:sdenterprise10@gmail.com"
              className="flex items-center gap-2 hover:text-blue-400 transition-colors"
            >
              <HiMail size={14} className="text-blue-500" />
              sdenterprise10@gmail.com
            </a>
            <span className="hidden lg:flex items-center gap-2 text-slate-400">
              <HiLocationMarker size={14} className="text-blue-500" />
              Basundhara, Kathmandu
            </span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="tel:9851351110"
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <HiPhone size={14} />
              +977 9851351110
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`w-full transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md py-3 shadow-xl border-b border-slate-100"
            : "bg-white py-4 md:py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center text-white shadow-xl shadow-slate-200 group-hover:bg-blue-600 transition-all duration-300 group-hover:-rotate-6">
              <span className="text-sm md:text-base font-black tracking-tighter">
                SD
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-base md:text-xl font-black text-slate-900 leading-none tracking-tight group-hover:text-blue-600 transition-colors">
                S.D
              </span>
              <span className="text-[8px] md:text-[10px] font-black text-blue-600 uppercase tracking-[0.3em] mt-0.5">
                Enterprises
              </span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-xs xl:text-sm font-bold transition-all relative py-2 group ${
                  location.pathname === link.path
                    ? "text-blue-600"
                    : "text-slate-600 hover:text-blue-600"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${
                    location.pathname === link.path
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </Link>
            ))}

            <div className="h-8 w-px bg-slate-200 mx-2"></div>

            {isLoggedIn() ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 transition-all ${
                    isProfileOpen ? "bg-slate-50" : ""
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-100">
                    {isAdmin() ? "AD" : "ST"}
                  </div>
                  <HiChevronDown
                    className={`text-slate-400 transition-transform duration-300 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <>
                    {/* Fixed Overlay - Click outside to close */}
                    <div
                      className="fixed inset-0 z-[100] bg-transparent cursor-default"
                      onClick={closeDropdown}
                    ></div>

                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-[110] animate-in fade-in zoom-in-95 duration-200">
                      <div className="px-3 py-2 border-b border-slate-50 mb-2">
                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                          Operator
                        </p>
                        <p className="text-xs font-bold text-slate-900">
                          {isAdmin() ? "Administrator" : "Staff Member"}
                        </p>
                      </div>
                      <Link
                        to={isAdmin() ? "/admin/dashboard" : "/staffs"}
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                        onClick={closeDropdown}
                      >
                        <HiViewGrid size={16} />
                        {isAdmin() ? "Admin Dashboard" : "Staff Dashboard"}
                      </Link>
                      <Link
                        to="/change-password"
                        className="flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 hover:text-blue-600 rounded-xl transition-all"
                        onClick={closeDropdown}
                      >
                        <HiLockClosed size={16} />
                        Security
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2.5 w-full text-xs font-bold text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      >
                        <HiLogout size={16} />
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-blue-600 transition-all shadow-lg shadow-slate-200 active:scale-95"
              >
                Launch Console
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all border border-slate-200 active:scale-90"
          >
            {isOpen ? <HiX size={24} /> : <HiMenuAlt3 size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 bg-white z-[200] transition-all duration-500 ease-in-out transform shadow-2xl ${
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
        style={{ width: "100vw" }}
      >
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 bg-white sticky top-0 z-[10]">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="text-sm font-black">SD</span>
              </div>
              <span className="text-sm font-black text-slate-900 uppercase tracking-widest">
                Enterprises
              </span>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-600"
            >
              <HiX size={24} />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <div className="px-6 py-8 flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 border-l-4 border-blue-600 pl-4 leading-none">
              Navigation
            </p>
            <div className="space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-5 p-4 rounded-2xl transition-all border ${
                    location.pathname === link.path
                      ? "bg-blue-600 text-white border-blue-600 shadow-xl shadow-blue-100"
                      : "bg-white text-slate-700 border-slate-100 hover:border-blue-200"
                  }`}
                >
                  <div
                    className={`text-xl ${location.pathname === link.path ? "text-white" : "text-blue-600"}`}
                  >
                    {link.icon}
                  </div>
                  <span className="text-base font-bold tracking-tight">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-12">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-8 border-l-4 border-slate-900 pl-4 leading-none">
                System Access
              </p>
              {isLoggedIn() ? (
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to={isAdmin() ? "/admin/dashboard" : "/staffs"}
                    onClick={() => setIsOpen(false)}
                    className="flex flex-col items-center gap-3 p-6 bg-slate-50 rounded-2xl border border-slate-100 text-slate-900"
                  >
                    <HiViewGrid size={24} className="text-blue-600" />
                    <span className="text-[10px] font-bold text-center">
                      {isAdmin() ? "Admin Console" : "Staff Console"}
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex flex-col items-center gap-3 p-6 bg-red-50 rounded-2xl border border-red-100 text-red-600"
                  >
                    <HiLogout size={24} />
                    <span className="text-xs font-bold">Logout</span>
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-5 bg-slate-900 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all"
                >
                  <HiShieldCheck size={18} className="text-blue-500" />
                  Launch Console
                </Link>
              )}
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center">
              © 2024 S.D Enterprises • Bassundhara
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Nav;
