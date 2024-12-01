import React from "react";
import { useState } from "react";
import { Link, useNavigate, useNavigation, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setProfileIsOpen] = useState(false);

  const toggleMenu = () => {
    setTimeout(() => {
      setIsOpen(!isOpen);
    }, 300);
  };
  const navigate = useNavigate();
  const isLoggedIn = () => {
    return Cookies.get("accessToken") && Cookies.get("roleId");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    Cookies.remove("accessToken");
    Cookies.remove("roleId");
    Cookies.remove("userId");
    if (e.target.textContent === "Log Out") {
      navigate("/");
      toast.success("Logout successfully");
    } else if (e.target.textContent === "Change Password") {
      navigate("/change-password");
    }
  };
  const isStaff = () => {
    const roleId = Cookies.get("roleId");
    return roleId === "3";
  };
  const isAdmin = () => {
    const roleId = Cookies.get("roleId");
    return roleId === "1";
  };

  const toggleDropdown = () => {
    setProfileIsOpen(!isProfileOpen);
  };

  const closeDropdown = () => {
    setProfileIsOpen(false);
  };

  return (
    <>
      <div className="nav-head bg-slate-900   m-0 p-0 overflow-hidden ">
        <div className="main lg:px-4 md:m-4 w-full mx-auto  lg:mx-auto  md:w-full  lg:w-4/5  ">
          <div className=" flex justify-between gap-3  w-full md:w-full mx-4 md:mx-0 items-center  bg-slate-900   text-gray-400">
            <div className="grid grid-cols-1 py-4 md:py-0 md:space-x-6 md:grid-cols-2 lg:grid-cols-2  lg:gap-2 ">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sapkotasajit2@gmail.com"
                className="text-sm font-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-regular fa-envelope mr-1 text-blue-500"></i>{" "}
                sapktosajit2@gmail.com
              </a>

              {/* <a
                href="mailto:sapkotasajit2@gmail.com"
                className="text-sm font-light"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fa-regular fa-envelope mr-1 text-blue-500"></i>{" "}
                sapktosajit2@gmail.com
              </a> */}
              

              <a href="/contact" className="text-sm font-light">
                <i className="fa-brands fa-periscope mr-1 text-blue-500"></i>
                Naya Baneshwor. Nepal
              </a>
            </div>

            <div className="grid grid-cols-2 text-sm w-40 pr-4 md:pr-0 md-pl-4 md:w-fit">
              {isLoggedIn() ? (
                <div className="relative">
                  <button
                    onClick={toggleDropdown}
                    className="focus:outline-none"
                  >
                    <img
                      src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1711861254~exp=1711864854~hmac=ebe6d6f8247b131892eced4153914b2cc9c740ddad891206e7bcfe4788be65c7&w=740"
                      alt="Profile"
                      className="w-16 rounded-full"
                    />
                  </button>
                  {isProfileOpen && (
                    <div
                      className="absolute bg-gray-300 z-999 rounded-sm shadow-lg"
                      style={{
                        top: "50%",
                        right: "calc(100% + 10px)",
                        transform: "translateY(-50%)",
                        minWidth: "150px",
                      }}
                      onClick={closeDropdown}
                    >
                    
                      {isStaff() && (
                        <Link
                          to={"/staffs"}
                          className="block w-full px-4 py-2 text-black hover:bg-blue-500 hover:text-slate-900"
                        >
                          Dashboard
                        </Link>
                      )}
                      {isAdmin() && (
                        <Link
                          to={"/admin/roles"}
                          className="block w-full px-4 py-2 text-black hover:bg-blue-500 hover:text-slate-900"
                        >
                          Dashboard
                        </Link>
                      )}
                      <Link
                        className="block w-full px-3 py-2 text-black hover:bg-blue-500 hover:text-slate-900"
                        to="/change-password"
                      >
                        &nbsp;Change Password
                      </Link>
                      <a
                        href="#"
                        className="block px-4 py-2 text-black hover:bg-blue-500 hover:text-slate-900"
                        onClick={handleLogout}
                      >
                        Log Out
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <a href="/login">
                    <button className="text-white w-16 md:w-fit mr-6 md:mr-auto text-[9px] md:text-[14px] font-semibold md:px-4 py-2 rounded-md hover:bg-blue-600 border hover:border-blue-500 border-slate-900 bg-blue-500">
                      Login
                    </button>
                  </a>

                  <a href="/register">
                    <button className="text-white w-16 md:w-fit mr-16 md:mr-6 xl:mr-auto text-[9px] md:text-[14px] font-semibold md:px-4 py-2 rounded-md hover:bg-blue-600 border hover:border-blue-500 border-slate-900 bg-blue-500">
                      Sign Up
                    </button>
                  </a>
                </>
              )}
              {isStaff() ? <Link to={"/staffs"}></Link> : null}
            </div>
          </div>
        </div>
      </div>
      <div className="sticky top-0 z-10  bg-white shadow-md">
        <div className="main border-b-2 w-full lg:w-4/5 mx-auto">
          <nav className="w-full transition-opacity duration-500 ">
            <div className="px-4 py-4 md:flex md:justify-between md:items-center">
              <div className="flex justify-between items-center ">
                <a href="#" className="w-[10rem] relative">
                  <img src="ssss.png" className="S.D Enterprises" alt="" />
                </a>
                <button
                  onClick={toggleMenu}
                  className="block text-gray-800 hover:text-black focus:text-black focus:outline-none md:hidden"
                >
                  {isOpen ? (
                    <svg
                      className="h-6 w-6 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M6.293 7.707a1 1 0 011.414 0L12 12.586l4.293-4.293a1 1 0 111.414 1.414L13.414 14l4.293 4.293a1 1 0 11-1.414 1.414L12 15.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 14 6.293 9.707a1 1 0 010-1.414z"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-6 w-6 fill-current"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4 6a1 1 0 011-1h14a1 1 0 110 2H5a1 1 0 01-1-1zM3 11a1 1 0 011-1h16a1 1 0 110 2H4a1 1 0 01-1-1zM9 16a1 1 0 100 2h6a1 1 0 100-2H9z"
                      />
                    </svg>
                  )}
                </button>
              </div>
              <ul
                className={`md:flex md:flex-row ${
                  isOpen ? "block" : "hidden"
                } md:space-x-4`}
              >
                <li className="border-b border-gray-100 pr-[15px] py-[17px]">
                  <Link
                    to="/"
                    className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 hover:text-blue-500"
                  >
                    Home
                  </Link>
                </li>
                <li className="border-b border-gray-100 pr-[15px] py-[17px]">
                  <Link
                    to="/homeServices"
                    className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 hover:text-blue-500"
                  >
                    Services
                  </Link>
                </li>
                <li className="border-b border-gray-100 pr-[15px] py-[17px]">
                  <Link
                    to="/guide"
                    className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 hover:text-blue-500"
                  >
                    Guides
                  </Link>
                </li>
                <li className="border-b border-gray-100 pr-[15px] py-[17px]">
                  <Link
                    to="/portfolio"
                    className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 hover:text-blue-500"
                  >
                    Portfolio
                  </Link>
                </li>
                <li className="border-b border-gray-100 pr-[15px] py-[17px]">
                  <Link
                    to="/contact"
                    className="nav md:text-[14px] lg:text-[17px] font-semibold text-black transition-colors duration-300 hover:text-blue-500"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
              <div className="p-4 hidden md:block">
                <div className="grid grid-cols-1 justify-center items-center">
                  <div className="flex justify-center items-center text-[35px] lg:px-[10px] h-8 hover:text-blue-500 transition-colors duration-300">
                    <i className="fa-solid fa-phone text-blue-500 mr-3 p-4 shadow-lg rounded-full text-2xl"></i>
                    <div className="md:flex flex-col">
                      <p className="text-[12px] text-gray-400">Call us Now</p>
                      <a
                        href="tel:+9841435289
                        "
                        className="text-[17px] font-semibold"
                      >
                        9841435289
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Nav;
