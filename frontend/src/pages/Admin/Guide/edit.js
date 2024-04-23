
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../auth/api';

const URL = "http://localhost:5000/";

function EditGuide() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guides, setguides] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    image_url: null,
    name: '',
    description: '',
   
  });

  useEffect(() => {
    const fetchguides = async () => {
      try {
        const response = await fetchWithAuth('get', 'guides');
        setguides(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchguides();
  }, []);

  useEffect(() => {
    const fetchguide = async () => {
      try {
        const response = await fetchWithAuth('get', `guides/${id}`);
        const guide = response.data;
        setFormData({
          name: guide.name,
          description: guide.description,
          parent_id: guide.parent_id || '',
          image_url:guide.image_url || null
        });
      } catch (error) {
        console.error("Error fetching guide:", error.message);
      }
    };
    fetchguide();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'guide_image' ? files[0] : value;
    setFormData(prevState => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("parent_id", formData.parent_id);
      if (formData.guide_image) {
        formDataToSend.append("guide_image", formData.image_url);
      }
  
      const response = await fetchWithAuth("put", `editguide/${id}`, formDataToSend);
  
      if (response.status === 200) {
        navigate("/admin/AllGuide");
        toast.success('Guide Updated Successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Unknown error occurred.");
      }
    } catch (error) {
        navigate("/admin/AllGuide");
        toast.error('Guide Update Failed');
    }
  };
  
  return (
    <div className="px-4">
    <div className="container mx-auto shadow-lg px-5  my-6">
  <h2 className="text-center font-semibold text-3xl">Edit guide</h2>
  <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
    <div className="flex flex-col">
      <label className="mb-1">Name:</label>
      <input
        className="border focus:ring-2 outline-none focus:ring-blue-500 border-gray-300 rounded-md p-2"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        autoFocus= "on"
      />
    </div>
    <div className="flex flex-col">
      <label className="mb-1">Description:</label>
      <textarea
        className="border focus:ring-2 outline-none focus:ring-blue-500 border-gray-300 rounded-md p-2"
        name="description"
        value={formData.description}
        onChange={handleChange}
      />
    </div>
    <div className="flex flex-col">
      <label className="mb-1">guide Image:</label>
      {formData.image_url && (
        <img
          className="my-2 rounded-md"
          src={`${URL}${formData.image_url}`}
          alt="guide Image"
          style={{ width: '100px', height: '100px' }}
        />
      )}
      <input
        type="file"
        name="guide_image"
        onChange={handleChange}
        className="border focus:ring-2 outline-none focus:ring-blue-500 border-gray-300 rounded-md p-2"
      />
    </div>
    <div className="flex flex-col">
      <label className="mb-1">Parent guide:</label>
      <select
        className="border focus:ring-2 outline-none focus:ring-blue-500 border-gray-300 w-fit rounded-md p-2"
        name="parent_id"
        value={formData.parent_id}
        onChange={handleChange}
      >
        <option value="">Select Parent guide</option>
        {guides.map(guide => (
          <option key={guide.id} value={guide.id}>{guide.name}</option>
        ))}
      </select>
    </div>
    <button
      className="bg-blue-500 focus:ring-2 outline-none focus:ring-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 self-center"
      type="submit"
    >
      Update guide
    </button>
  </form>
</div>
</div>

  );
}

export default EditGuide;
