import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../auth/api';
import { Link } from "react-router-dom";
import { Toast } from 'react-toastify/dist/components';

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const URL = "http://localhost:5000/";

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchWithAuth('get', 'services');
        setServices(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchServices();
  }, []);

  const handleDeleteService = async (serviceId) => {
    try {
      await fetchWithAuth('delete', `deleteService/${serviceId}`);
      setServices(services.filter(service => service.id !== serviceId));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container overflow-y-auto h-[100dvh] mx-auto">
      <Link to="/admin/createService">Create</Link>
      <h2 className="text-2xl font-bold mb-4">Service List</h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}
      <div className="overflow-x-auto">
        <div className="max-h-[700px] ">
          <table className="table-auto min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Parent Name</th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service, index) => (
                <tr key={service.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-700">{service.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{service.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{service.description}</td>
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
      </div>
    </div>
  );
}

export default AllServices;
