import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../auth/api';
import { Link } from "react-router-dom";

const AllProcessBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetchWithAuth('get', 'assignedBookings');
        setBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleDeleteBooking = async (id) => {
    try {
      await fetchWithAuth('delete', `deleteBooking/${id}`);
      setBookings(bookings.filter(booking => booking.id !== id));
        } catch (error) {
          setError(error.message);
        }
      };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-5 overflow-y-auto h-[100dvh]   my-6">
      <h2 className="text-2xl  font-bold mb-4 my-6">Process Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">User</th>
              <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Phone</th>
              <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Email</th>
              <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Service</th>
              <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Booking Time</th>
              <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Booking Date</th>
              <th scope="col" className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking, index) => (
              <tr key={booking.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap text-md">{booking.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md">{booking.user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md">{booking.user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md">{booking.service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md">{booking.booking_time}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md">{booking.booking_date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-md">
                  <button onClick={() => handleDeleteBooking(booking.id)} className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300"><i className="fa-regular fa-trash-alt"></i></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProcessBookings;
