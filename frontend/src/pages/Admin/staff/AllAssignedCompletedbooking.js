import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../auth/api';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const AssignedCompletedBookingsComponent= () => {
  const [assignedBookings, setAssignedBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMemberId, setSelectedMemberId] = useState(null); 
  const [formData, setFormData] = useState({
    status: "",
  });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchAssignedBookings = async () => {
      try {
        const userId = Cookies.get('userId');
        const response = await fetchWithAuth('get', `assignUsersCompletedBookings/${userId}`);
        setAssignedBookings(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch assigned bookings. Please try again later.');
        setLoading(false);
      }
    };

    fetchAssignedBookings();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleStatusChange = async (e, id, oldStatus) => {
    e.preventDefault();
    try {
      const newStatus = e.target.value;
      const response = await fetchWithAuth(
        "patch",
        `bookingAssign/${id}/status`,
        { status: newStatus } 
      );
      if (response.status === 200) {

        setAssignedBookings(prevBookings =>
          prevBookings.map(booking =>
            booking.id === id ? { ...booking, status: newStatus } : booking
          )
        );
        setSelectedMemberId(id);
        setFormData({ ...formData, status: newStatus }); 
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='container mx-auto overflow-y-auto h-[100dvh] px-5 my-6'>
      <h2 className="text-2xl  font-bold mb-4 my-6">Completed Client</h2>
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className='bg-gray-100'>
            <tr>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">User Phone</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Booking Time</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Booking Date</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Service Name</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Old Status</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">New Status</th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {assignedBookings.map((booking, index) => (
              <tr key={booking.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.user.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.booking_time}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.booking_date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.booking.service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{booking.status}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <select value={formData.status} onChange={(e) => handleStatusChange(e, booking.id, booking.status)}>
                    <option value={booking.status}>{booking.status}</option>
                    <option value="Pending">Pending</option>
                    <option value="Accept">Accept</option>
                    <option value="Reject">Reject</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssignedCompletedBookingsComponent;
