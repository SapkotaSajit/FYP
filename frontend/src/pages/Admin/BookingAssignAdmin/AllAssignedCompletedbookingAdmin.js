import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { useLocation } from "react-router-dom";
import {
  HiCheckCircle,
  HiUser,
  HiPhone,
  HiClock,
  HiCalendar,
  HiBadgeCheck,
  HiSearch,
  HiOutlineCollection,
} from "react-icons/hi";
import { toast } from "react-toastify";

const AssignedCompletedBookingsComponentAdmin = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth("get", "completedBookings");
        setPendingBookings(response.data || []);
      } catch (error) {
        toast.error("Failed to load completed bookings");
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
            <HiBadgeCheck className="text-blue-600" />
            Completed Bookings
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            History of all successfully finalized service requests.
          </p>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-xl border border-blue-100 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
          <HiOutlineCollection />
          {pendingBookings.length} Finished
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center transition-all focus-within:ring-2 focus-within:ring-blue-500/10">
        <div className="relative flex-1 w-full text-slate-400 focus-within:text-blue-600">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors" />
          <input
            type="text"
            placeholder="Search completion history..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-700"
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
                  Customer Details
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Timeline
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Service Type
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        Loading history...
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
                    No completed bookings found
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
                        <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center border shadow-sm group-hover:bg-blue-50 transition-colors">
                          <HiUser className="text-slate-400 group-hover:text-blue-500" />
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
                        <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                          <HiCalendar className="text-blue-500" />{" "}
                          {booking.booking.booking_date}
                        </span>
                        <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                          <HiClock /> {booking.booking.booking_time}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-slate-200">
                        {booking.booking.service.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 text-blue-700 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-200 shadow-sm shadow-blue-50">
                        <HiCheckCircle />
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

export default AssignedCompletedBookingsComponentAdmin;
