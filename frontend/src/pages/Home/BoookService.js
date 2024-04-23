import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchWithAuth } from "../../auth/api";
import { toast } from "react-toastify";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";

const BookingForm = () => {
  const { serviceId } = useParams();
  const [bookingTime, setBookingTime] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const selectedDate = new Date(bookingDate);

    if (selectedDate < currentDate) {
      toast.error("Cannot book a service for a past date");
      return;
    }

    try {
      const response = await fetchWithAuth("post", `bookService/${serviceId}`, {
        booking_time: bookingTime,
        booking_date: bookingDate,
      });

      if (response.status === 201) {
        console.log("success");
        toast.success("Your booking has been registered successfully");
        navigate("/homeServices");
      } else {
        toast.error("Failed to book service");
        navigate("/homeServices");
      }
    } catch (error) {
      toast.error("Failed to book service");
    }
  };

  return (
    <>
      <Nav />

      <div className="main mx-auto px-4 my-6 lg:w-4/5">
        <h2 className="text-2xl font-bold mb-4">Book Service</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid sm:grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <label htmlFor="bookingTime" className="font-semibold">
                Booking Time:
              </label>
              <br />
              <input
                id="bookingTime"
                type="time"
                value={bookingTime}
                onChange={(e) => setBookingTime(e.target.value)}
                className="border w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label htmlFor="bookingDate" className="font-semibold">
                Booking Date:
              </label>
              <br />
              <input
                id="bookingDate"
                type="date"
                value={bookingDate}
                onChange={(e) => setBookingDate(e.target.value)}
                className="border w-full border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-6 py-2 rounded-sm hover:bg-blue-600 transition duration-300"
          >
            Submit Booking
          </button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default BookingForm;
