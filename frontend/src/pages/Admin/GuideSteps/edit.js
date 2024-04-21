import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../auth/api';

const URL = "http://localhost:5000/";

function EditGuideSteps() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    guideSteps_image: null,
    name: '',
    description: '',
    guide_id:'',
  });

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetchWithAuth('get', 'guideSteps');
        setGuides(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchGuides();
  }, []);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetchWithAuth('get', `guideSteps/${id}`);
        const guide = response.data;
        setFormData({
          name: guide.name,
          description: guide.description,
          guide_id: guide.guide_id || '',
          guideSteps_image: guide.guideSteps_image || null
        });
      } catch (error) {
        console.error("Error fetching guide:", error.message);
      }
    };
    fetchGuide();
  }, [id]);
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'guideSteps_image' ? files[0] : value;
    setFormData(prevState => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("guide_id", formData.guide_id);
      if (formData.guideSteps_image) {
        formDataToSend.append("guideSteps_image", formData.guideSteps_image);
      }

      const response = await fetchWithAuth("PUT", `editguideSteps/${id}`, formDataToSend);

      if (response.status === 200) {
        navigate("/admin/AllGuideSteps");
        toast.success('Guide steps Updated Successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Unknown error occurred.");
      }
    } catch (error) {
        navigate("/admin/AllGuideSteps");
        toast.error('Guide steps Update Failed');
    }
  };

  return (
    <div className="px-4">
      <div className="container mx-auto shadow-lg px-5  my-6">
        <h2 className="text-center font-semibold text-3xl">Edit guide Types</h2>
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
            <label className="mb-1">Guide Image:</label>
            {formData.guideSteps_image && (
              <img
                className="my-2 rounded-md"
                src={`${URL}${formData.guideSteps_image}`}
                alt="Guide Image"
                style={{ width: '100px', height: '100px' }}
              />
            )}
            <input
              type="file"
              name="guideSteps_image"
              onChange={handleChange}
              className="border focus:ring-2 outline-none focus:ring-blue-500 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1">Parent guide:</label>
            <select
              className="border focus:ring-2 outline-none focus:ring-blue-500 border-gray-300 w-fit rounded-md p-2"
              name="guide_id"
              value={formData.guide_id}
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

export default EditGuideSteps;
