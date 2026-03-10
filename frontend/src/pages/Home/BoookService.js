import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../auth/api";
import { toast } from "react-toastify";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import {
  HiCalendar,
  HiClock,
  HiCheckCircle,
  HiArrowRight,
  HiShieldCheck,
} from "react-icons/hi";

const BookingForm = () => {
  const { serviceId } = useParams();
  const [bookingTime, setBookingTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bookingTime || !bookingDate) {
      toast.warning("Please select both date and time");
      return;
    }

    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    const selectedDate = new Date(bookingDate);

    if (selectedDate < currentDate) {
      toast.error("Past dates are invalid for scheduling");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetchWithAuth("post", `bookService/${serviceId}`, {
        booking_time: bookingTime,
        booking_date: bookingDate,
      });

      if (response.status === 201 || response.ok) {
        toast.success("Schedule Registered Successfully");
        navigate("/homeServices");
      } else {
        toast.error("Scheduling system unavailable");
      }
    } catch (error) {
      toast.error("Failed to connect to booking server");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex items-center justify-center py-20 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="w-full max-w-2xl relative z-10 animate-in fade-in slide-in-from-bottom-6 duration-700">
          <div className="glass rounded-[3rem] border border-white p-8 md:p-12 shadow-2xl shadow-blue-200/20 backdrop-blur-xl">
            <div className="text-center mb-10">
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-xl shadow-blue-200 rotate-3 transition-transform hover:rotate-0">
                <HiShieldCheck size={32} />
              </div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
                Secure Your Slot
              </h2>
              <p className="text-slate-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis">
                Expert assessment for Service ID: {serviceId}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <HiCalendar className="text-blue-500" /> Preferred Date
                  </label>
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                    required
                  />
                </div>

                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                    <HiClock className="text-blue-500" /> Preferred Time
                  </label>
                  <input
                    type="time"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full bg-white/50 border border-slate-200 rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all cursor-pointer"
                    required
                  />
                </div>
              </div>

              <div className="p-6 bg-blue-50/50 rounded-3xl border border-blue-100">
                <div className="flex gap-4">
                  <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                    <HiCheckCircle size={20} />
                  </div>
                  <p className="text-xs text-blue-800 leading-relaxed font-medium">
                    By submitting, you agree to our{" "}
                    <span className="font-bold underline cursor-pointer">
                      Service terms
                    </span>
                    . Our engineers prioritize on-time arrivals for every
                    assessment.
                  </p>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full group py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-wait"
              >
                <span className="flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Initialize Booking{" "}
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </span>
              </button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingForm;
