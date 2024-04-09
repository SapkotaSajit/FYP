import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../auth/api';

function CreateGuideStep() {
  const navigate = useNavigate();
  const [guideTypes, setGuideTypes] = useState([]);
  const [formData, setFormData] = useState({
    guideSteps_image: null,
    name: '',
    description: '',
    guideTypes_id: ''
  });

  useEffect(() => {
    const fetchGuideTypes = async () => {
      try {
        const response = await fetchWithAuth('get', 'guideTypes');
        setGuideTypes(response.data);
      } catch (error) {
        console.error("Error fetching guide types:", error.message);
      }
    };
    fetchGuideTypes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'guideSteps_image' ? files[0] : value;
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
      formDataToSend.append("guideTypes_id", formData.guideTypes_id);
      formDataToSend.append("guideSteps_image", formData.guideSteps_image);

      const response = await fetchWithAuth("POST", "createGuideSteps", formDataToSend);

      if (response.status === 201) {
        toast.success('GuideStep Created Successfully');
        navigate("/admin/guideSteps");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Unknown error occurred.");
      }
    } catch (error) {
      toast.error('Failed to create guide step');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a name for the guide step.');
      return false;
    }

    if (!formData.description.trim()) {
      toast.error('Please enter a description for the guide step.');
      return false;
    }

    if (!formData.guideTypes_id) {
      toast.error('Please select a guide type.');
      return false;
    }

    if (!formData.guideSteps_image) {
      toast.error('Please select a guide step image.');
      return false;
    }

    return true;
  };
  
  return (
    <div className="px-4">
    <div className="container mx-auto shadow-lg px-5  my-6">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Create GuideStep</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              autoFocus= "on"
              value={formData.name}
              onChange={handleChange}
              className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-gray-300 rounded-md p-2 "
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border focus:ring-2 focus:ring-blue-500 outline-none border-gray-300 rounded-md p-2 "
            />
          </div>
          <div>
            <label htmlFor="guideSteps_image" className="block mb-1">GuideStep Image:</label>
            <input
              type="file"
              name="guideSteps_image"
              onChange={handleChange}
              className="border focus:ring-2 focus:ring-blue-500 outline-none border-gray-300 rounded-md p-2"
            />
          </div>
          <div>
            <label htmlFor="guideTypes_id" className="block mb-1">Guide Type:</label>
            <select
              name="guideTypes_id"
              value={formData.guideTypes_id}
              onChange={handleChange}
              className="border focus:ring-2 focus:ring-blue-500 outline-none border-gray-300 rounded-md p-2"
            >
              <option value="">Select Guide Type</option>
              {guideTypes.map(guideType => (
                <option key={guideType.id} value={guideType.id}>{guideType.name}</option>
              ))}
            </select>
          </div>
          <div className="grid place-items-center">
            <button
              type="submit"
              className="bg-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
              Create GuideStep
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CreateGuideStep;
