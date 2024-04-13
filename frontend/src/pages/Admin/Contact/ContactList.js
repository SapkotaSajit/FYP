import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { fetchWithAuth } from '../../../auth/api';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteConfirmationModal from '../../../components/Home/DeleteConfirmationModal';

const ContactList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
  
        try {
          const response = await fetchWithAuth('get', 'contacts');
          setRoles(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
 
    fetchRoles();
  }, []);

  const handleDeleteRole = async () => {
    try {
      await fetchWithAuth('delete', `deleteRole/${selectedRoleId}`);
      setRoles(roles.filter(role => role.id !== selectedRoleId));
      toast.success('Role deleted successfully');
      setSelectedRoleId(null);
    } catch (error) {
      setError(error.message);
      toast.error('Failed to delete role');
    }
  };

  const openDeleteConfirmation = (roleId) => {
    setSelectedRoleId(roleId);
  };

  const closeDeleteConfirmation = () => {
    setSelectedRoleId(null);
  };

  return (
    <div className="container mx-auto px-5 overflow-y-auto h-[100dvh] my-6">
      <button className='text-white w-20 md:w-fit mr-6 md:mr-auto text-[9px] md:text-[14px] font-semibold px-4 py-2 rounded-md hover:bg-blue-600 border hover:border-blue-500 bg-blue-500 my-6'>
        <Link to="/admin/createRole">Create</Link>
      </button>
      <h2 className="text-2xl font-bold mb-4">Role List</h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      <div className="overflow-x-auto">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Action</th>
              
            </tr>
          </thead>
          <tbody>
            {roles.map((role, index) => (
              <tr key={role.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{role.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{role.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{role.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/admin/editRole/${role.id}`} className="text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-300 mr-2">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <button
                    className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300"
                    onClick={() => openDeleteConfirmation(role.id)}
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
        isOpen={selectedRoleId !== null}
        onClose={closeDeleteConfirmation}
        onConfirm={handleDeleteRole}
      />
    </div>
  );
}

export default ContactList;

