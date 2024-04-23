import React, { useState, useEffect } from 'react';
import { fetchWithAuth } from '../../../auth/api';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import DeleteConfirmationModal from '../../../components/Home/DeleteConfirmationModal';

const URL = "http://localhost:5000/";

const AllGuideSteps = () => {
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteGuideId, setDeleteGuideId] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetchWithAuth('get', 'guideSteps');
        const sortedGuideSteps = response.data.sort((a, b) => b.id - a.id);
        setGuides(sortedGuideSteps);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGuides();
  }, []);

  const handleDeleteGuide = async (guideId) => {
    try {
      await fetchWithAuth('delete', `deleteGuideStep/${guideId}`);
      setGuides(guides.filter(guide => guide.id !== guideId));
      toast.success('Guide step deleted successfully');
    } catch (error) {
      console.error('Error deleting guide:', error);
      setError(error.message);
      toast.error('Failed to delete guide step');
    }
  };

  return (
    <div className="container mx-auto px-5 overflow-y-auto h-[100dvh] my-6">
      <button className='text-white w-20 md:w-fit mr-6 md:mr-auto text-[9px] md:text-[14px] font-semibold px-4 py-2 rounded-md hover:bg-blue-600 border hover:border-blue-500 bg-blue-500 my-6'>
        <Link to="/admin/createGuideSteps">Create</Link>
      </button>
      <h2 className="text-2xl font-bold mb-4">Guide Steps List</h2>
      {error && <div className="text-red-500 mb-4">Error: {error}</div>}

      <div className="w-full overflow-x-auto">
        <table className="table-auto md:table-fixed w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">ID</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Description</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Image</th>
              <th className="py-3 px-6 text-left text-md font-medium text-gray-700 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody>
            {guides.map((guide, index) => (
              <tr key={guide.id} className={index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"}>
                <td className="px-6 py-4 whitespace-nowrap text-gray-700">{guide.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.name.length > 10 ? guide.name.slice(0, 10) + "..." : guide.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{guide.description.length > 20 ? guide.description.slice(0, 20) + "..." : guide.description}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <img src={`${URL}${guide.guideSteps_image}`} alt="Guide Image" className="w-20 h-20 object-cover" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/admin/editGuideSteps/${guide.id}`} className="text-white bg-blue-500 px-3 py-2 rounded-md hover:bg-blue-300">
                    <i className="fa-regular fa-pen-to-square"></i>
                  </Link>
                  <button
                    className="text-white bg-red-500 px-3 py-2 rounded-md hover:bg-red-300 ml-2"
                    onClick={() => {
                      setDeleteGuideId(guide.id);
                      setIsDeleteModalOpen(true);
                    }}
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
            await fetchWithAuth('delete', `deleteGuideStep/${deleteGuideId}`);
            setGuides(guides.filter(guide => guide.id !== deleteGuideId));
            toast.success('Guide step deleted successfully');
          } catch (error) {
            setError(error.message);
            toast.error('Failed to delete guide step');
          }
          setIsDeleteModalOpen(false);
        }}
      />
    </div>
  );
};

export default AllGuideSteps;
