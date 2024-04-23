import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import { fetchWithAuth } from '../../../auth/api';
import { toast } from "react-toastify";

const BookingAssignForm = () => {
  const { bookingId } = useParams();
  const [userId, setUserId] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchWithAuth('get', 'usersRole');
        setUsers(response.data);
      } catch (error) {
        setError('Failed to fetch users. Please try again later.');
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = {
        userId,
        bookingId
      };

      const response = await fetchWithAuth('POST', `assignBooking/${bookingId}`, formData);
      navigate("/admin/bookings");
      toast.success('Booking assigned successfully')
      if (response.ok) {
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'An error occurred');
      }
    } catch (error) {
      setError('An error occurred');
    }
  };

  return (
    <div className="max-w-md mx-auto  p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Assign Booking</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userId" className="block mb-2">User ID:</label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="block w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Assign Booking
        </button>
      </form>
    </div>
  );
};

export default BookingAssignForm;