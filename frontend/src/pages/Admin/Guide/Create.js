import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../auth/api';

function CreateGuide() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image_url: null,
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'image_url' ? files[0] : value;
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
      formDataToSend.append("image_url", formData.image_url);

      const response = await fetchWithAuth("POST", "createGuide", formDataToSend);

      if (response.status === 201) {
        navigate("/admin/guide");
        toast.success('Guide Created Successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Unknown error occurred.");
      }
    } catch (error) {
      toast.error('Failed to create guide');
    }
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter a name for the guide.');
      return false;
    }

    if (!formData.description.trim()) {
      toast.error('Please enter a description for the guide.');
      return false;
    }

    if (!formData.image_url) {
      toast.error('Please select a guide image.');
      return false;
    }

    return true;
  };
  
  return (
    <div className="px-4">
    <div className="container mx-auto shadow-lg px-5  my-6">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-3xl font-semibold text-center text-gray-700 mb-4">Create Guide</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoFocus= "on"
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 outline-none focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="image_url" className="block mb-1">Guide Image:</label>
            <input
              type="file"
              name="image_url"
              onChange={handleChange}
              className="border outline-none focus:ring-2 focus:ring-blue-500  border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="grid place-items-center">
            <button
              type="submit"
              className="bg-blue-500 focus:ring-2 focus:ring-blue-500 outline-none text-white rounded-md py-2 px-4 hover:bg-blue-600"
            >
              Create Guide
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

export default CreateGuide;
