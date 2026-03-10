import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchWithAuth } from "../../../auth/api";
import { toast } from "react-toastify";
import {
  HiUserCircle,
  HiArrowLeft,
  HiBadgeCheck,
  HiShieldCheck,
  HiArrowRight,
} from "react-icons/hi";

const BookingAssignForm = () => {
  const { bookingId } = useParams();
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsFetching(true);
        const response = await fetchWithAuth("get", "usersRole");
        setUsers(response.data || []);
      } catch (error) {
        toast.error("Failed to load staff list");
      } finally {
        setIsFetching(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userId) {
      toast.warning("Please select a staff member");
      return;
    }

    setIsLoading(true);
    try {
      await fetchWithAuth("POST", `assignBooking/${bookingId}`, {
        userId,
        bookingId,
      });
      toast.success("Staff assigned successfully");
      navigate("/admin/bookings");
    } catch (error) {
      toast.error("Assignment failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/bookings"
          className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <HiArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Assign Staff
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Select a team member to handle booking #{bookingId}.
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-10 shadow-xl border border-slate-200/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full -mr-24 -mt-24 transition-transform duration-700 group-hover:scale-110"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-2 ml-1">
              <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                <HiShieldCheck size={18} />
              </div>
              <label className="text-sm font-bold text-slate-700">
                Choose Staff Member
              </label>
            </div>

            <div className="relative group/select">
              <HiUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl transition-colors group-focus-within/select:text-blue-500" />
              <select
                id="userId"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                disabled={isFetching}
                className="input-field pl-12 pr-10 appearance-none cursor-pointer bg-slate-50 border-slate-200 text-slate-700 font-medium"
                required
              >
                <option value="">
                  {isFetching
                    ? "Loading staff..."
                    : "Select available staff..."}
                </option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role_name})
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-1">
              Only verified staff members are listed for assignment.
            </p>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || isFetching}
              className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 group relative overflow-hidden active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="font-bold tracking-wide">
                    Confirm Assignment
                  </span>
                  <HiBadgeCheck
                    size={20}
                    className="group-hover:scale-110 transition-transform"
                  />
                  <HiArrowRight className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingAssignForm;
