import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../auth/api';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '../../../components/Home/DeleteConfirmationModal';

const URL = "http://localhost:5000/";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchWithAuth('get', 'services');
        const sortedStaff = response.data.sort((a, b) => b.id - a.id);
        setServices(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchServices();
  }, []);

  const handleDeleteService = async (serviceId) => {
    setDeleteServiceId(serviceId);
    setIsDeleteModalOpen(true);
  };

  return (
    <div className="container mx-auto px-5 overflow-y-auto h-[100dvh] my-6">
      <button className='text-white w-20 md:w-fit mr-6 md:mr-auto text-[9px] md:text-[14px] font-semibold px-4 py-2 rounded-md hover:bg-blue-600 border hover:border-blue-500 bg-blue-500 my-6'>
        <Link to="/admin/createService">Create</Link>
      </button>
      <h2 className="text-2xl font-bold mb-4">Service List</h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      
      <div className="w-full overflow-x-auto">
        <table className="table-auto md:table-fixed w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Description</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Parent Name</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Image</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{service.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.name.length>10 ? service.name.slice(0,10)+"..." : service.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.description.length>20 ? service.description.slice(0,20)+"..." : service.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">{service.parent_name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`${URL}${service.service_image}`} alt="Service Image" className="w-20 h-20 object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/admin/editService/${service.id}`} className="text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-300">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <button
                    className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300 ml-2"
                    onClick={() => handleDeleteService(service.id)}
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
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={async () => {
          try {
            await fetchWithAuth('delete', `deleteService/${deleteServiceId}`);
            setServices(services.filter(service => service.id !== deleteServiceId));
            toast.success('Service Deleted Successfully');
          } catch (error) {
            setError(error.message);
          }
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default AllServices;
