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


  const fetchData = async () => {
    try {
      setLoading(true);
     
      const usersResponse = await axios.get('/totalUsers');
     
      const staffResponse = await axios.get('/totalStaff');
     
      setTotalUsers(usersResponse.data.totalUsers);
      setTotalStaff(staffResponse.data.totalStaff);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      setError('Failed to fetch data. Please try again later.');
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);
  

 
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

        
          <div className="rounded-lg border shadow-sm bg-white">
            <div className="p-4">
              <h3 className="text-xl font-semibold">Total Staff</h3>
            </div>
            <div className="py-5 px-4 flex items-center justify-center">
              <div className="text-2xl font-bold">
                {userCount}
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default AdminPanel;
