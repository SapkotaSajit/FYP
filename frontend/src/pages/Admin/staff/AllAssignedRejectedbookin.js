import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import Cookies from "js-cookie";
import {
  HiXCircle,
  HiUser,
  HiPhone,
  HiClock,
  HiCalendar,
  HiCollection,
  HiBan,
} from "react-icons/hi";
import { toast } from "react-toastify";

const AssignedRejectedBookingsComponent = () => {
  const [assignedBookings, setAssignedBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignedBookings = async () => {
      try {
        const userId = Cookies.get("userId");
        const response = await fetchWithAuth(
          "get",
          `assignUsersRejectedBookings/${userId}`,
        );
        setAssignedBookings(response.data || []);
      } catch (error) {
        toast.error("Failed to sync history");
      } finally {
        setLoading(false);
      }
    };
    fetchAssignedBookings();
  }, []);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiXCircle className="text-red-500" />
            Rejected & Voided Jobs
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Log of tasks that were declined or cancelled from the queue.
          </p>
        </div>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Client Reference
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Original Schedule
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  System State
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-red-600/10 border-t-red-500 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        Scanning voided queue...
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
                    No rejected entries found
                  </td>
                </tr>
              ) : (
                assignedBookings.map((booking) => (
                  <tr
                    key={booking.id}
                    className="hover:bg-red-50/30 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 shrink-0 border border-slate-100 shadow-sm">
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
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tight border border-slate-200">
                          <HiCollection className="opacity-50" />{" "}
                          {booking.booking.service.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex flex-col gap-2">
                        <span className="px-3 py-1.5 bg-slate-50 text-slate-500 rounded-xl text-[10px] font-bold flex items-center gap-2 border border-slate-100">
                          <HiCalendar size={14} />{" "}
                          {booking.booking.booking_date}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-red-50 text-red-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-100">
                        <HiBan size={14} /> Rectified
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

export default AssignedRejectedBookingsComponent;
