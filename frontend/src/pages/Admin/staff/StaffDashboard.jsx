import React, { useState } from "react";
import { Link, useNavigate, useNavigation, Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
function StaffDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    Cookies.remove("accessToken");
    Cookies.remove("roleId");
    Cookies.remove("userId");
    navigate("/");
    toast.success("Logout successfully");
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  return (
    <div className="flex   bg-white">
      <aside
        className={`bg-slate-900 duration-700  text-white" ${
          isSidebarOpen ? "w-56 p-2" : "w-0"
        }`}
      >
        <h2
          className="text-lg font-semibold  my-4
      text-white border-white border-2 px-5 py-2 rounded-sm"
        >
          <i class="fa-solid fa-igloo mr-4"></i> S.D Enterprises
        </h2>
        <div className="border-gray-400 h-[100dvh] overflow-y-auto ">
          <div className="">
            <Link to="dashboard">
              <p className="text-md my-3 font-medium  hover:text-gray-300 w-full text-white bg-slate-500 px-5 py-3">
                <i class="fa-solid fa-house mr-1 text-sm"></i> Dashboard
              </p>
            </Link>
            <p className="mt-4 text-gray-500 text-[14px] font-semibold">
              LAYOUTS & PAGES
            </p>
            <ul className="w-full">
              <Link to="assignedUsers">
                <li className="text-[16px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
                  <i class="fa-solid fa-dice-d20 mr-1 text-sm"></i> Pending
                  Client
                </li>
              </Link>
            
              <Link to="acceptAssigned">
                <li className="text-[16px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
                  <i class="fa-solid fa-dice-d20 mr-1 text-sm"></i> Accepted
                  Client
                </li>
              </Link>
              <Link to="rejectAssigned">
                <li className="text-[16px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
                  <i class="fa-solid fa-dice-d20 mr-1 text-sm"></i> Rejected
                  Client
                </li>
              </Link>
              <Link to="completedAssigned">
                <li className="text-[16px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
                  <i class="fa-solid fa-dice-d20 mr-1 text-sm"></i> Completed
                  Client
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </aside>
      <div className="flex-1">
        <header className="bg-white border border-b p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className={`mr-4 text-black duration-700 ${
                  isSidebarOpen ? "rotate-0" : "rotate-180"
                }`}
              >
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <h1 className="text-xl font-semibold">Staff Dashboard</h1>
              <a href="/"><button className="w-fit bg-blue-500 rounded-md hover:bg-blue-600 text-white px-4 py-2" >Back</button></a>
              
            </div>
            
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                  src="https://img.freepik.com/free-vector/user-circles-set_78370-4704.jpg?t=st=1711861254~exp=1711864854~hmac=ebe6d6f8247b131892eced4153914b2cc9c740ddad891206e7bcfe4788be65c7&w=740"
                  alt="Profile"
                  className="w-16 rounded-full"
                />
              </button>
              {isOpen && (
                <div
                  className="absolute right-0 mt-2 w-full text-sm h-fit bg-slate-200 rounded-md shadow-lg"
                  style={{
                    top: "150%",
                    right: "calc(10% + 10px)",
                    transform: "translateY(-50%)",
                    minWidth: "150px",
                  }}
                  onClick={closeDropdown}
                >
                  <a href="#" className="block px-4 py-2 w-full text-black hover:bg-blue-600 hover:text-slate-900">Dashboard</a>
                  <Link
                        className="block px-4 py-2 w-fit text-black hover:bg-blue-600 hover:text-slate-900"
                        to="/change-password"
                      >
                        &nbsp;Change Password
                      </Link>
         
                  <a
                    href="#"
                    className="block px-6 py-2 w-full text-black hover:bg-blue-600 hover:text-slate-900"
                    onClick={handleLogout}
                  >
                    Log Out
                  </a>
                </div>
              )}
            </div>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default StaffDashboard;
