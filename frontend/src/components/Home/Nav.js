import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
} from "react-icons/hi";

function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setProfileIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
    { label: "Home", path: "/" },
    { label: "Services", path: "/homeServices" },
    { label: "Guides", path: "/guide" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
      {/* Top Bar */}
      <div
        className={`bg-slate-900 text-slate-300 transition-all duration-500 ease-in-out origin-top border-b border-white/5 ${
          scrolled ? "h-0 opacity-0 -translate-y-full" : "h-11 opacity-100 py-0"
        }`}
      >
        <div className="container mx-auto px-6 h-full flex justify-between items-center text-[10px] font-black uppercase tracking-[0.15em]">
          <div className="flex gap-8 items-center h-full">
            <a
              href="mailto:sapkotasajit2@gmail.com"
              className="flex items-center gap-2.5 hover:text-blue-400 transition-colors"
            >
              <HiMail className="text-blue-500 text-lg opacity-80" />
              sapktosajit2@gmail.com
            </a>
            <span className="hidden md:flex items-center gap-2.5 text-slate-500">
              <HiLocationMarker className="text-blue-500 text-lg opacity-80" />
              New Baneshwor, Nepal
            </span>
          </div>
          <div className="flex items-center gap-6 h-full">
            {!isLoggedIn() ? (
              <div className="flex gap-4">
                <Link
                  to="/login"
                  className="hover:text-white transition-colors py-2"
                >
                  Gateway Access
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-4 animate-in fade-in duration-700">
                <span className="text-blue-500/80 hidden sm:inline-block">
                  System Active
                </span>
                {(isAdmin() || isStaff()) && (
                  <Link
                    to={isAdmin() ? "/admin/dashboard" : "/staffs"}
                    className="px-4 py-1.5 bg-blue-600/10 hover:bg-blue-600 text-blue-400 hover:text-white rounded-lg transition-all border border-blue-500/30 text-[9px] shadow-lg shadow-blue-500/10"
                  >
                    Control Console
                  </Link>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav
        className={`transition-all duration-500 ease-in-out ${
          scrolled
            ? "glass py-2 shadow-2xl shadow-slate-900/5 backdrop-blur-3xl bg-white/80 border-b border-white/40 border-t-0"
            : "bg-white/95 py-3.5 shadow-sm border-b border-slate-100"
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3.5 group">
            <div className="bg-slate-900 p-2.5 rounded-2xl group-hover:rotate-[15deg] transition-all duration-500 shadow-xl shadow-slate-200 border border-white/10 group-hover:scale-105 active:scale-95">
              <span className="text-xl font-black text-white px-1">SD</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-black tracking-tighter text-slate-900 leading-none">
                S.D
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 leading-none mt-1 opacity-80">
                Enterprises
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="text-[11px] font-black text-slate-500 hover:text-slate-900 uppercase tracking-[0.2em] transition-all relative group py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-500 group-hover:w-full rounded-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden xl:flex items-center gap-4 border-l pl-8 border-slate-200/60 h-10">
              <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/40">
                <HiPhone className="text-slate-900 text-lg opacity-80" />
              </div>
              <div className="flex flex-col">
                <span className="text-[9px] uppercase tracking-[0.2em] text-slate-400 font-black">
                  Elite Hub
                </span>
                <a
                  href="tel:9841435289"
                  className="text-xs font-black text-slate-900 hover:text-blue-600 transition-colors tracking-widest"
                >
                  9841435289
                </a>
              </div>
            </div>

            {/* Profile / Auth Toggle */}
            {isLoggedIn() ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className={`flex items-center gap-2.5 p-1 rounded-2xl hover:bg-slate-50 transition-all border border-transparent ${
                    isProfileOpen ? "bg-slate-50 border-slate-100" : ""
                  }`}
                >
                  <div className="w-10 h-10 rounded-[1rem] bg-slate-900 flex items-center justify-center text-white border-4 border-white shadow-xl overflow-hidden transition-transform active:scale-95">
                    <img
                      src="https://ui-avatars.com/api/?name=User&background=0F172A&color=fff&bold=true"
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <HiChevronDown
                    className={`text-slate-400 text-lg transition-transform duration-500 ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-4 w-64 glass rounded-[2rem] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] p-2.5 animate-in fade-in zoom-in-95 slide-in-from-top-4 duration-300 origin-top-right border border-white/80 bg-white/90 backdrop-blur-3xl">
                    <div className="px-4 py-4 mb-2 bg-slate-50/50 rounded-[1.5rem] border border-slate-100/50">
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">
                        Authorized Node
                      </p>
                      <p className="text-sm font-black text-slate-900">
                        System Operator
                      </p>
                    </div>

                    {(isAdmin() || isStaff()) && (
                      <Link
                        to={isAdmin() ? "/admin/dashboard" : "/staffs"}
                        className="flex items-center gap-4 px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-blue-600 hover:text-white rounded-[1.2rem] transition-all mb-1 group"
                        onClick={closeDropdown}
                      >
                        <div className="w-8 h-8 rounded-xl bg-blue-50 group-hover:bg-blue-500/20 flex items-center justify-center text-blue-600 group-hover:text-white transition-colors">
                          <HiUser className="text-lg opacity-80" />
                        </div>
                        Control Dashboard
                      </Link>
                    )}
                    <Link
                      to="/change-password"
                      className="flex items-center gap-4 px-5 py-3.5 text-xs font-bold text-slate-700 hover:bg-blue-600 hover:text-white rounded-[1.2rem] transition-all mb-1 group"
                      onClick={closeDropdown}
                    >
                      <div className="w-8 h-8 rounded-xl bg-orange-50 group-hover:bg-orange-500/20 flex items-center justify-center text-orange-600 group-hover:text-white transition-colors">
                        <HiLockClosed className="text-lg opacity-80" />
                      </div>
                      Identity Security
                    </Link>

                    <div className="h-px bg-slate-100 my-2 mx-3"></div>

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-4 px-5 py-3.5 text-xs font-bold text-red-600 hover:bg-red-500 hover:text-white rounded-[1.2rem] transition-all group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-red-50 group-hover:bg-white/20 flex items-center justify-center transition-colors">
                        <HiLogout className="text-lg opacity-80" />
                      </div>
                      Terminate Session
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="btn-primary py-3 px-8 text-[11px] font-black uppercase tracking-[0.2em] hidden sm:flex items-center gap-2 rounded-2xl shadow-xl shadow-blue-500/20 border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 transition-all"
              >
                Launch Platform
              </Link>
            )}

            {/* Mobile Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-3 rounded-2xl bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all active:scale-95"
            >
              {isOpen ? <HiX size={26} /> : <HiMenu size={26} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden fixed inset-0 top-[70px] bg-white z-[60] overflow-y-auto animate-in slide-in-from-right duration-500 border-t border-slate-100">
            <ul className="flex flex-col p-8 gap-3">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mb-4">
                Navigational Matrix
              </p>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex py-5 px-6 text-xl font-black text-slate-900 hover:bg-blue-50 hover:text-blue-600 rounded-[1.5rem] transition-all active:scale-98 border border-transparent active:border-blue-100 shadow-sm hover:shadow-md"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {!isLoggedIn() && (
                <div className="grid grid-cols-1 gap-4 mt-10">
                  <Link
                    to="/login"
                    className="w-full py-5 bg-slate-900 text-white text-center rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-2xl active:scale-95 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Enter Platform
                  </Link>
                </div>
              )}
            </ul>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Nav;
