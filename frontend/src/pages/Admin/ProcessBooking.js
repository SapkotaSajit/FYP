import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../auth/api";
import { toast } from "react-toastify";
import {
  HiTrash,
  HiCalendar,
  HiClock,
  HiUser,
  HiMail,
  HiPhone,
  HiBadgeCheck,
  HiSearch,
  HiAdjustments,
  HiClipboardList,
} from "react-icons/hi";
import DeleteConfirmationModal from "../../components/Home/DeleteConfirmationModal";

const AllProcessBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteBookingId, setDeleteBookingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth("get", "assignedBookings");
        setBookings(response.data || []);
      } catch (error) {
        setError("Failed to fetch bookings. Please try again later.");
        toast.error("Failed to load processed bookings");
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      await fetchWithAuth("delete", `deleteBooking/${id}`);
      setBookings(bookings.filter((booking) => booking.id !== id));
      toast.success("Booking record removed");
    } catch (error) {
      toast.error("Failed to remove record");
    }
    setShowDeleteModal(false);
  };

  const filteredBookings = bookings.filter(
    (booking) =>
      booking.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.service?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.user?.phone?.includes(searchTerm),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-3 tracking-tight">
            <HiClipboardList className="text-blue-600" />
            In-Progress Work
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Currently assigned bookings being handled by staff.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 font-bold text-xs uppercase tracking-widest">
          <HiBadgeCheck size={16} />
          <span>{bookings.length} active tasks</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 flex flex-col md:flex-row gap-4 items-center focus-within:ring-2 focus-within:ring-blue-500/10 transition-all">
        <div className="relative flex-1 w-full text-slate-400 focus-within:text-blue-600">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors" />
          <input
            type="text"
            placeholder="Search active bookings..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-700 placeholder:text-slate-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all font-bold text-sm">
          <HiAdjustments size={18} />
          <span>Filters</span>
        </button>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60 text-slate-400">
                <th className="px-6 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  Client
                </th>
                <th className="px-6 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  Service info
                </th>
                <th className="px-6 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em]">
                  Scheduled Date
                </th>
                <th className="px-6 py-5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-right">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        Updating assignment list...
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
                    No active assignments found
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
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border shadow-sm font-bold text-[10px] group-hover:scale-110 transition-transform overflow-hidden">
                          <img
                            src={`https://ui-avatars.com/api/?name=${booking.user.name}&background=6366f1&color=fff&bold=true`}
                            alt={booking.user.name}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 leading-none mb-1.5">
                            {booking.user.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <span className="flex items-center gap-1">
                              <HiMail /> {booking.user.email}
                            </span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="flex items-center gap-1">
                              <HiPhone /> {booking.user.phone}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-emerald-100">
                        {booking.service.name}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                          <HiCalendar className="text-blue-500" />
                          {booking.booking_date}
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
                          <HiClock />
                          {booking.booking_time}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        onClick={() => {
                          setDeleteBookingId(booking.id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <HiTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={() => handleDeleteBooking(deleteBookingId)}
        title="Remove Record"
        message="Are you sure you want to remove this processed booking record? This will delete the entry from the system."
      />
    </div>
  );
};

export default AllProcessBookings;
