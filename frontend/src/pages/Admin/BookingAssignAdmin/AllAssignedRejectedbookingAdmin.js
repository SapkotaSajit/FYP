import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { useLocation } from "react-router-dom";
import {
  HiXCircle,
  HiUser,
  HiPhone,
  HiClock,
  HiCalendar,
  HiBan,
  HiSearch,
} from "react-icons/hi";
import { toast } from "react-toastify";

const AssignedRejectedBookingsComponentAdmin = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth("get", "rejectBookings");
        setPendingBookings(response.data || []);
      } catch (error) {
        toast.error("Failed to load rejected bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingBookings();
  }, [location.key]);

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
            <HiXCircle className="text-rose-500" />
            Rejected Bookings
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Record of bookings that were declined or cancelled.
          </p>
        </div>
        <div className="bg-rose-50 text-rose-700 px-4 py-2 rounded-xl border border-rose-100 font-bold text-xs uppercase tracking-widest">
          {pendingBookings.length} Dismissed
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60">
        <div className="relative group">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl group-focus-within:text-rose-500 transition-colors" />
          <input
            type="text"
            placeholder="Search rejection archives..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-sm font-medium text-slate-700"
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
                  Client Name
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Original Schedule
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Service
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-rose-600/20 border-t-rose-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        Updating archives...
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
                    Clear history - no rejections found
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
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border shadow-sm group-hover:bg-rose-50 transition-colors">
                          <HiUser className="text-slate-300 group-hover:text-rose-400" />
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
                        <span className="text-xs font-bold text-slate-400 line-through decoration-rose-300 flex items-center gap-1.5">
                          <HiCalendar /> {booking.booking.booking_date}
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-300 uppercase tracking-widest flex items-center gap-1">
                          <HiClock /> {booking.booking.booking_time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-400 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-slate-200">
                        {booking.booking.service.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-rose-100">
                        <HiBan />
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

export default AssignedRejectedBookingsComponentAdmin;
