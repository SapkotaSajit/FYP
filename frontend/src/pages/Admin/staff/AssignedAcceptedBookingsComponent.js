import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import Cookies from "js-cookie";
import { useNavigate, useLocation } from "react-router-dom";
import {
  HiCheckCircle,
  HiUser,
  HiPhone,
  HiClock,
  HiCalendar,
  HiCollection,
  HiSelector,
  HiArrowRight,
} from "react-icons/hi";
import { toast } from "react-toastify";

const AssignedAcceptedBookingsComponent = () => {
  const [assignedBookings, setAssignedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchAssignedBookings = async () => {
      setLoading(true);
      try {
        const userId = Cookies.get("userId");
        const response = await fetchWithAuth(
          "get",
          `assignUsersAcceptedBookings/${userId}`,
        );
        setAssignedBookings(response.data || []);
      } catch (error) {
        toast.error("Failed to sync assignments.");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedBookings();
  }, [location.key]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      const response = await fetchWithAuth(
        "patch",
        `bookingAssign/${id}/status`,
        { status: newStatus },
      );
      if (response.status === 200 || response.ok) {
        toast.success(`Marked as ${newStatus}`);
        setAssignedBookings((prev) => prev.filter((b) => b.id !== id));

        const roleId = Cookies.get("roleId");
        navigate(
          roleId === "1" ? "/admin/myCompleted" : "/staffs/completedAssigned",
        );
      } else {
        toast.error("Status update failed");
      }
    } catch (error) {
      toast.error("Connection error");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiCheckCircle className="text-emerald-500" />
            Accepted Client Tasks
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Work on assignments you've accepted and mark them as complete.
          </p>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Client & Service
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Schedule
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Status Control
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        Retrieving work queue...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : assignedBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                  >
                    No active accepted tasks
                  </td>
                </tr>
              ) : (
                assignedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                            <HiUser size={20} />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">
                              {booking.booking.user.name}
                            </p>
                            <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 uppercase tracking-tighter">
                              <HiPhone className="inline shrink-0" />{" "}
                              {booking.booking.user.phone}
                            </p>
                          </div>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tight border border-slate-200">
                          <HiCollection className="text-blue-500" />{" "}
                          {booking.booking.service.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex flex-col gap-2">
                        <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-bold flex items-center gap-2 border border-indigo-100/50">
                          <HiCalendar size={14} />{" "}
                          {booking.booking.booking_date}
                        </span>
                        <span className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-bold flex items-center gap-2 border border-blue-100/50">
                          <HiClock size={14} /> {booking.booking.booking_time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="relative inline-block w-48 group/select">
                        <select
                          onChange={(e) =>
                            handleStatusChange(booking.id, e.target.value)
                          }
                          className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 appearance-none cursor-pointer transition-all"
                        >
                          <option value={booking.status}>
                            {booking.status}
                          </option>
                          <option value="Completed">Mark as Completed</option>
                        </select>
                        <HiSelector className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden divide-y divide-slate-100">
          {loading ? (
            <div className="px-6 py-20 text-center">
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                  Retrieving work queue...
                </span>
              </div>
            </div>
          ) : assignedBookings.length === 0 ? (
            <div className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
              No active accepted tasks
            </div>
          ) : (
            assignedBookings.map((booking) => (
              <div key={booking.id} className="p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                      <HiUser size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">
                        {booking.booking.user.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-bold flex items-center gap-1 uppercase tracking-tighter">
                        <HiPhone /> {booking.booking.user.phone}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-[9px] font-bold border border-indigo-100">
                      {booking.booking.booking_date}
                    </span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-lg text-[9px] font-bold border border-blue-100">
                      {booking.booking.booking_time}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 text-slate-600 rounded-lg text-[10px] font-black uppercase tracking-tight border border-slate-100">
                    <HiCollection className="text-blue-500" />{" "}
                    {booking.booking.service.name}
                  </div>
                  <div className="relative">
                    <select
                      onChange={(e) =>
                        handleStatusChange(booking.id, e.target.value)
                      }
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none"
                    >
                      <option value={booking.status}>{booking.status}</option>
                      <option value="Completed">Mark as Completed</option>
                    </select>
                    <HiSelector className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AssignedAcceptedBookingsComponent;
