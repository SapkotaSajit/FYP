import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiClock,
  HiUser,
  HiPhone,
  HiCalendar,
  HiExclamationCircle,
  HiSearch,
  HiDotsHorizontal,
} from "react-icons/hi";
import { toast } from "react-toastify";

const AssignedPendingBookingsComponentAdmin = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth("get", "pendingBookings");
        setPendingBookings(response.data || []);
      } catch (error) {
        toast.error("Failed to load pending bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBookings();
  }, []);

  const filteredBookings = pendingBookings.filter(
    (booking) =>
      booking.booking?.user?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      booking.booking?.service?.name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiExclamationCircle className="text-amber-500" />
            Pending Assignments
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Bookings currently awaiting staff confirmation or action.
          </p>
        </div>
        <div className="bg-amber-50 text-amber-700 px-4 py-2 rounded-xl border border-amber-100 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
          {pendingBookings.length} In-Queue
        </div>
      </div>

      <div className="flex items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60">
        <div className="relative flex-1 group">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-amber-500 transition-colors" />
          <input
            type="text"
            placeholder="Search pending list..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Customer
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Schedule
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Requested Service
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Progress
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-amber-600/20 border-t-amber-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        Updating queue...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredBookings.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                  >
                    No pending bookings found
                  </td>
                </tr>
              ) : (
                filteredBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border shadow-sm transition-transform group-hover:scale-110">
                          <HiUser className="text-slate-300" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none mb-1.5">
                            {booking.booking.user.name}
                          </p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter flex items-center gap-1">
                            <HiPhone className="text-slate-300" />{" "}
                            {booking.booking.user.phone}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center gap-1">
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 hover:text-blue-600 transition-colors">
                          <HiCalendar /> {booking.booking.booking_date}
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <HiClock /> {booking.booking.booking_time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-amber-100">
                        {booking.booking.service.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200">
                        <HiDotsHorizontal />
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AssignedPendingBookingsComponentAdmin;
