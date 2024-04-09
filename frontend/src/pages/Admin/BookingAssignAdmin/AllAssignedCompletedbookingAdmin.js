import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../auth/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AssignedCompletedBookingsComponentAdmin = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchPendingBookings = async () => {
      try {
        const response = await fetchWithAuth('get', 'completedBookings');
        setPendingBookings(response.data);
        console.warn(response.data)
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch pending bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchPendingBookings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mx-auto overflow-y-auto h-[100dvh] px-5 my-6 '>
      <h2 className="text-2xl  font-bold mb-4 my-6">Completed Bookings</h2>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className='bg-gray-100'>
            <tr>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">User Phone</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Booking Time</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Booking Date</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Service Name</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody>
            {pendingBookings.map((booking, index) => (
              <tr key={booking.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.booking_time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.booking_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedCompletedBookingsComponentAdmin;
