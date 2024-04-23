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
      text-white  px-5 py-2 rounded-sm">
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
          <Link to="roles">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
             
                <i className="fa-solid fa-dice-d20 mr-1 text-sm"></i> Roles
              
            </li>
            </Link>
            <Link to="users">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              
                <i className="fa-regular fa-user mr-1 text-sm"></i> Users
              
            </li>
            </Link>
            <Link to="staffs">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
             
                <i className="fa-regular fa-user mr-1 text-sm"></i> Staffs
              
            </li>
            </Link>
            <Link to="services">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              
                <i className="fa-solid fa-bell-concierge mr-1 text-sm"></i> Services
          
            </li>
            </Link>
            <Link to="bookings" className="flex justify-between"  >
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
               
                <p>
                <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> Bookings
                </p>
                <div onClick={toggleBookings} className=""> <p> <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m19 9l-7 6l-7-6"/></svg> </p> </div>
             
              <ul className="hidden" id="bookingList">
               
                <Link to="allPen">
                <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All BookingPendings
                  
                </li>
                </Link>
                <Link to="allAccept">
                <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All Accepted Booking
                  
                </li>
                </Link>
                <Link to="allReject">
                <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All Rejected Booking
                  
                </li>
                </Link>
                <Link to="allCompleted">
                <li className="text-[13px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-900 px-5 py-3">
                  
                    <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All Completed Booking
                  
                </li>
                </Link>
              </ul>
            </li>
            </Link>
                
            <Link to="AllGuide">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              
                <i className="fa-solid fa-dice-d20 mr-1 text-sm"></i> All Guide
              
            </li>
            </Link>
         
            <Link to="AllGuideTypes">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              
                <i className="fa-solid fa-book-bookmark mr-1 text-sm"></i> All Guide Types
              
            </li>
            </Link>

              <Link to="AllGuideSteps">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
             
                <i className="fa-solid fa-dice-d20 mr-1 text-sm"></i> All Guide Step
             
            </li>
            </Link>
            <Link to="allContacts">
            <li className="text-[15px] my-3 font-light  text-gray-300 w-full hover:text-white hover:bg-slate-500 px-5 py-3">
              
                <i className="fa-solid fa-dice-d20 mr-1 text-sm"></i> All Contact
              
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
              <button onClick={toggleSidebar} className={`mr-4 text-black duration-700 ${isSidebarOpen?"rotate-0":"rotate-180"}`}>
                {isSidebarOpen ? <FaTimes /> : <FaBars />}
              </button>
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
            <div className="grid  grid-cols-2 text-sm  w-40 pr-4 md:pr-0 md-pl-4 md:w-fit  ">
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
                  className="absolute bg-gray-300 z-999 rounded-md shadow-lg"
                  style={{
                    top: "50%",
                    right: "calc(100% + 10px)",
                    transform: "translateY(-50%)",
                    minWidth: "150px",
                  }}
                  onClick={closeDropdown}
                >
                 
                  <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-200" onClick={handleLogout}>Log Out</a>
                <Link
                        className="block px-4 py-2 w-fit text-black hover:bg-gray-200 hover:text-slate-900"
                        to="/change-password"
                      >
                        &nbsp;Change Password
                      </Link>  
                </div>
              )}
            </div>
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
