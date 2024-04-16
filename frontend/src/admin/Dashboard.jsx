import React, { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";
import Cookies from 'js-cookie';

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = async () => {
    Cookies.remove('accessToken');
    Cookies.remove('roleId');
    Cookies.remove('userId');
    navigate("/");
    toast.success('Logout successfully');
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const toggleBookings = () => {
    const bookingList = document.getElementById("bookingList");
    if (bookingList) {
      bookingList.classList.toggle("hidden");
    }
  };

  return (
    <div className="flex   bg-white">
      <aside
        className={`   bg-slate-800 duration-700  text-white" ${
          isSidebarOpen ? " w-[40%] xl:w-[19%] p-2 mx-4 my-3 rounded-xl"  : "w-0  "
        }`}
      >
        <h2
          className="text-lg font-semibold  my-4
      text-white  px-5 py-2 rounded-sm"        >
          <i className="fa-solid fa-igloo mr-4"></i> S.D Enterprises
        </h2>
        <div className="border-gray-400   h-[100vh] overflow-y-auto ">
        <div className=" border-t-2 ">
          <Link to="dashboard">
            <p className="text-md my-3 font-medium  hover:text-gray-300 w-full text-white bg-slate-500 px-5 py-3">
                <i className="fa-solid fa-house mr-1 text-sm"></i> Dashboard
                </p>
            </Link>
          <p className="mt-4 text-gray-500 text-[14px] font-semibold">LAYOUTS & PAGES</p>
          <ul className="w-full">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="roles">
                <i className="fa-solid fa-dice-d20 mr-1 text-sm"></i> Roles
              </Link>
            </li>
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="users">
                <i className="fa-regular fa-user mr-1 text-sm"></i> Users
              </Link>
            </li>
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="staffs">
                <i className="fa-regular fa-user mr-1 text-sm"></i> Staffs
              </Link>
            </li>
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="services">
                <i className="fa-solid fa-bell-concierge mr-1 text-sm"></i> Services
              </Link>
            </li>
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="bookings" className="flex justify-between" >
                <p>
                <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> Bookings
                </p>
                <div onClick={toggleBookings} className=""> <p> <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9l-7 6l-7-6"/></svg> </p> </div>
              </Link>
              <ul className="hidden" id="bookingList">
                {/* <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  <Link to="processBookings">
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> Process Booking
                  </Link>
                </li> */}
                <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  <Link to="allPen">
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All BookingPendings
                  </Link>
                </li>
                
                <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  <Link to="allAccept">
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All Accepted Booking
                  </Link>
                </li>
                <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  <Link to="allReject">
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All Rejected Booking
                  </Link>
                </li>
                <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  <Link to="allCompleted">
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All Completed Booking
                  </Link>
                </li>
              </ul>
            </li>
         
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="AllGuide">
                <i className="fa-solid fa-dice-d20 mr-1 text-sm"></i> All Guide
              </Link>
            </li>
            {/* <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="createGuideTypes">
                <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> createGuideTypes
              </Link>
            </li> */}
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="AllGuideTypes">
                <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All Guide Types
              </Link>
            </li>
{/*             
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="createGuideSteps">
                <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> createGuideSteps
              </Link>
            </li>
             */}
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="AllGuideSteps">
                <i className="fa-solid fa-dice-d20 mr-1 text-sm"></i> All Guide Step
              </Link>
            </li>
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              <Link to="ContactList">
                <i className="fa-solid fa-dice-d20 mr-1 text-sm"></i> All Contact
              </Link>
            </li>
          </ul>
        </div>
        </div>
      </aside>
      <div className="flex-1">
        <header className="bg-white border border-b p-4 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <button onClick={toggleSidebar} className={`mr-4 text-black duration-700 ${isSidebarOpen?"rotate-0":"rotate-180"}`}>
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
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
                  className="absolute right-0 mt-2 w-28 rounded-md shadow-lg"
                  onClick={closeDropdown}
                >
                  {/* <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Dashboard</a>
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Edit Profile</a> */}
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogout}>Log Out</a>
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

export default AdminDashboard;
