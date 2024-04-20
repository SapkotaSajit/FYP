import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchWithAuth } from '../../auth/api';


function AdminPanel() {
  const [totalUsers, setTotalUsers] = useState(null);
  const [totalStaff, setTotalStaff] = useState(null);
  const [users, setUsers] = useState([]);
  const [userCount, setCount] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch total number of users and staff from the backend
  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch total number of users
      const usersResponse = await axios.get('/totalUsers');
      // Fetch total number of staff
      const staffResponse = await axios.get('/totalStaff');
      // Update state variables with fetched data
      setTotalUsers(usersResponse.data.totalUsers);
      setTotalStaff(staffResponse.data.totalStaff);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };

  // Call fetchData function when component mounts
  useEffect(() => {
    fetchData();
  }, []);
  

  // Function to handle data refresh
  const handleRefresh = () => {
    fetchData();
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchWithAuth('get', 'users');
        const sortedUser = response.data.sort((a, b) => b.id - a.id);
        setUsers(sortedUser);
        setCount(sortedUser.length); 
      } catch (error) {
        setError(error.message);
      }
    };
  
    fetchUsers();
  }, []);
  
  return (
    <div className="admin-panel">
      <div className="flex items-center justify-center h-[220px] bg-gray-300">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Card 1: Total Users */}
          <div className="rounded-lg border shadow-sm bg-white">
            <div className="p-4">
              <h3 className="text-xl font-semibold">Total Users</h3>
            </div>
            <div className="py-5 px-4 flex items-center justify-center">
              <div className="text-2xl font-bold">
                {userCount}
              </div>
            </div>
          </div>

          {/* Card 2: Total Staff */}
          <div className="rounded-lg border shadow-sm bg-white">
            <div className="p-4">
              <h3 className="text-xl font-semibold">Total Staff</h3>
            </div>
            <div className="py-5 px-4 flex items-center justify-center">
              <div className="text-2xl font-bold">
                {loading ? 'Loading...' : error ? 'Error' : totalStaff}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Display error message if there's an error */}
      {error && (
        <div className="text-red-500 text-center mt-4">{error}</div>
      )}

      {/* Button to refresh data */}
      <div className="flex justify-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRefresh}
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
