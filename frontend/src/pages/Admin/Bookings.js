import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../auth/api';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await fetchWithAuth('get', 'bookings');
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
      toast.success('Booking deleted successfully');
        } catch (error) {
          setError(error.message);
          toast.error('Failed to delete user');

        }
      };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto overflow-y-auto h-[100dvh] px-5 my-6">
      <h2 className="text-2xl  font-bold mb-4 my-6">All Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Service</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Booking Time</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Booking Date</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Actions</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Assign</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map((booking, index) => (
              <tr key={booking.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap">{booking.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking_time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300"
                   onClick={() => {
                    if (window.confirm ('Are you sure you want to delete this booking')){
                      handleDeleteBooking(booking.id);
                    }
                   }}>
                    <i className="fa-regular fa-trash-alt"></i></button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <Link to={`/admin/createAssignBooking/${booking.id}`}>
                    <button className="text-blue-500">Assign Staff</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBookings;
