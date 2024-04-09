import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from '../../../auth/api';

const URL = "http://localhost:5000/";
function EditService() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    service_image: null,
    name: '',
    description: '',
    parent_id: ''
  });

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

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetchWithAuth('get', `services/${id}`);
        const service = response.data;
        setFormData({
          name: service.name,
          description: service.description,
          parent_id: service.parent_id || '',
          service_image:service.service_image || null
        });
      } catch (error) {
        console.error("Error fetching service:", error.message);
      }
    };
    fetchService();
  }, [id]);

  
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    const newValue = name === 'service_image' ? files[0] : value;
    setFormData(prevState => ({ ...prevState, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("parent_id", formData.parent_id);
      if (formData.service_image) {
        formDataToSend.append("service_image", formData.service_image);
      }
  
      const response = await fetchWithAuth("put", `editService/${id}`, formDataToSend);
  
      if (response.ok) {
        navigate("/admin/services");
        toast.success('Service Updated Successfully');
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Unknown error occurred.");
      }
    } catch (error) {
        navigate("/services");
        toast.success('Service Updated Successfully');
    }
  };
  
  return (
    <div>
      <h2>Edit Service</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Service Image:</label>
          {formData.service_image && (
            <img src={`${URL}${formData.service_image}`} alt="Service Image" style={{ width: '100px', height: '100px' }} />
          )}
          <input
            type="file"
            name="service_image"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Parent Service:</label>
          <select
            name="parent_id"
            value={formData.parent_id}
            onChange={handleChange}
          >
            <option value="">Select Parent Service</option>
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>
        <button type="submit">Update Service</button>
      </form>
    </div>
  );
}

export default EditService;
