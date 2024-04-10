import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../auth/api';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmationModal from '../../../components/Home/DeleteConfirmationModal';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetchWithAuth('get', 'users');
        const sortedUser = response.data.sort((a, b) => b.id - a.id);
        setUsers(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await fetchWithAuth('delete', `deleteUser/${userId}`);
      setUsers(users.filter(user => user.id !== userId));
      toast.success('User deleted successfully');
    } catch (error) {
      setError(error.message);
      toast.error('Failed to delete user');
    }
  };

  const openDeleteConfirmation = (userId) => {
    setSelectedUserId(userId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedUserId(null);
  };

  return (
    <div className="container overflow-y-auto h-[100dvh] mx-auto  px-5   my-6">
      <button className='text-white w-20 md:w-fit  mr-6 md:mr-auto text-[9px] md:text-[14px] font-semibold px-4 py-2 rounded-md  hover:bg-blue-600 border hover:border-blue-500 bg-blue-500 my-6'>
        <Link to="/admin/createUser">Create</Link>
      </button>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      {error ? (
        <p className="text-red-500 mb-4">Error: {error}</p>
      ) : (
        <div className="overflow-x-auto">
          <div className=" ">
            <table className="table-auto min-w-full divide-y   divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user, index) => (
                  <tr key={user.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                    <td className="px-6 py-4 whitespace-nowrap  text-gray-700">{user.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap ">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap ">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap ">{user.role_name}</td>
                    <td className="px-6 py-4 whitespace-nowrap ">
                      <button
                        className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300"
                        onClick={() => openDeleteConfirmation(user.id)}
                      >
                        <i className="fa-regular fa-trash-alt"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DeleteConfirmationModal
            isOpen={selectedUserId !== null}
            onClose={closeDeleteConfirmation}
            onConfirm={() => {
              handleDeleteUser(selectedUserId);
              closeDeleteConfirmation();
            }}
            title="Delete User"
            message="Are you sure you want to delete this user? This action cannot be undone."
          />
        </div>
      )}
    </div>
  );
};

export default Users;
