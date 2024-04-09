import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";

function CreateService() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    service_image: null,
    name: "",
    description: "",
    parent_id: "",
  });

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchWithAuth("get", "services");
        setServices(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === "service_image" ? files[0] : value;
    setFormData((prevState) => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!formData.service_image) {
        toast.error("Please select a service image.");
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("parent_id", formData.parent_id);
      formDataToSend.append("service_image", formData.service_image);

      const response = await fetchWithAuth("POST", "createService", formDataToSend);

      if (response.ok) {
        navigate("/services");
        toast.success("Service Created Successfully");
      } else {
        if (response.status === 422) {
          const errorData = await response.text();
          toast.error(errorData);
        } else {
          const errorData = await response.json();
          toast.error(errorData.message || "Unknown error occurred.");
        }
      }
    } catch (error) {
      navigate("/admin/services");
      toast.success("Service Created Successfully");
    }
  };

  return (
    <div className="container mx-auto px-5  my-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl text-center text-gray-700 font-bold mb-4">Create Service</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              autoFocus= "on"
              className="w-full border border-gray-300 rounded-md p-2 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border w-full outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Service Image:</label>
            <input
              type="file"
              name="service_image"
              onChange={handleChange}
              className="border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-blue-500 p-2 w-full cursor-pointer"
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Parent Service:</label>
            <select
              name="parent_id"
              value={formData.parent_id}
              onChange={handleChange}
              className="border border-gray-300 outline-none focus:ring-2 focus:ring-blue-500 rounded-md p-2 w-fit cursor-pointer"
            >
              <option value="">Select Parent Service</option>
              {services.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid place-items-center">
          <button
            type="submit"
            className="bg-blue-500 focus:ring-2 outline-none focus:ring-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600"
          >
            Create Service
          </button>
          </div>
       
        </form>
      </div>
    </div>
  );
}

export default CreateService;
