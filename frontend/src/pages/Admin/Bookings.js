import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../auth/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiTrash,
  HiCalendar,
  HiClock,
  HiUser,
  HiMail,
  HiPhone,
  HiChevronRight,
  HiSearch,
  HiFilter,
  HiOutlineTicket,
} from "react-icons/hi";
import DeleteConfirmationModal from "../../components/Home/DeleteConfirmationModal";

const AllBookings = () => {
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
        const response = await fetchWithAuth("get", "bookings");
        setBookings(response.data || []);
      } catch (error) {
        setError("Failed to fetch bookings. Please try again later.");
        toast.error("Failed to load bookings");
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
      toast.success("Booking deleted successfully");
    } catch (error) {
      toast.error("Failed to delete booking");
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
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Recent Bookings
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage all incoming service requests and assignments.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl border border-blue-100 font-bold text-xs uppercase tracking-widest">
          <HiOutlineTicket size={16} />
          <span>{bookings.length} Total Bookings</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 transition-all focus-within:shadow-md">
        <div className="relative flex-1 w-full">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
          <input
            type="text"
            placeholder="Search by customer, service, or phone..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all font-bold text-sm">
          <HiFilter size={18} />
          <span>Refine</span>
        </button>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Customer
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Service Details
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Schedule
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Operation
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
                        Retrieving bookings...
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
                    No matching bookings found
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
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform overflow-hidden font-bold">
                          <img
                            src={`https://ui-avatars.com/api/?name=${booking.user.name}&background=random&color=fff&bold=true`}
                            alt={booking.user.name}
                          />
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900 leading-none">
                            {booking.user.name}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
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
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-lg border border-indigo-100 text-[11px] font-bold uppercase tracking-wider">
                        {booking.service.name}
                      </div>
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
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/createAssignBooking/${booking.id}`}
                          className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-200 active:scale-95"
                        >
                          Assign <HiChevronRight size={14} />
                        </Link>
                        <button
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          onClick={() => {
                            setDeleteBookingId(booking.id);
                            setShowDeleteModal(true);
                          }}
                        >
                          <HiTrash size={20} />
                        </button>
                      </div>
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
        title="Cancel Booking"
        message="Are you sure you want to remove this booking request? This action cannot be reversed."
      />
    </div>
  );
};

export default AllBookings;
