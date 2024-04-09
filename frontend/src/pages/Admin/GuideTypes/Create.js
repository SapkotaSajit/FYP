import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../auth/api';

function CreateGuideType() {
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    guideTypes_image: null,
    name: '',
    description: '',
    guide_id: ''
  });

  useEffect(() => {
    const fetchGuideTypes = async () => {
      try {
        const response = await fetchWithAuth('get', 'guides');
        setGuides(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGuideTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'guideTypes_image' ? files[0] : value;
    setFormData(prevState => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("guide_id", formData.guide_id);
      formDataToSend.append("guideTypes_image", formData.guideTypes_image);

      const response = await fetchWithAuth("POST", "createGuideTypes", formDataToSend);

      if (response.status === 201) {
        navigate("/GuideTypes");
        toast.success('GuideType Created Successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Unknown error occurred.");
      }
    } catch (error) {
      toast.error('Failed to create guide type');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a name for the guide type.');
      return false;
    }

    if (!formData.description.trim()) {
      toast.error('Please enter a description for the guide type.');
      return false;
    }

    if (!formData.guideTypes_image) {
      toast.error('Please select a guide type image.');
      return false;
    }

    if (!formData.guide_id) {
      toast.error('Please select a guide.');
      return false;
    }

    return true;
  };
  
  return (
    <div className="container mx-auto px-5 my-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl text-gray-700 text-center font-bold mb-4">Create GuideType</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              autoFocus= "on"
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md outline-none p-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full  border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="guideTypes_image" className="block mb-2">GuideType Image:</label>
            <input
              type="file"
              name="guideTypes_image"
              onChange={handleChange}
              className="border focus:ring-2 focus:ring-blue-500 outline-none border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="guide_id" className="block mb-2">Guide:</label>
            <select
              name="guide_id"
              value={formData.guide_id}
              onChange={handleChange}
              className="border focus:ring-2 focus:ring-blue-500 outline-none border-gray-300 rounded-md p-2"
            >
              <option value="">Select Guide</option>
              {guides.map(guide => (
                <option key={guide.id} value={guide.id}>{guide.name}</option>
              ))}
            </select>
          </div>
          <div className="grid place-items-center">
            <button
              type="submit"
              className="bg-blue-500 outline-none focus:ring-2 focus:ring-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
              Create GuideType
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGuideType;
