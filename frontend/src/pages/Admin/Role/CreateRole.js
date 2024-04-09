import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";

function CreateRole() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth("POST", "createRole", formData);

      if (response.status === 201) {
      navigate("/admin/roles");
        toast.success("Role Created Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container  mx-auto px-4 my-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
      <h2 className="text-3xl text-center font-semibold text-gray-700 mb-4">Create Role</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="roleName" className="block mb-2">
            Role Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            autoFocus= "on"
            className="w-full border focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-md outline-none p-2"
          />
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            required
            onChange={handleChange}
            className="w-full border outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-md  p-2"
          />
        </div>
        <div className="grid place-items-center">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md py-2 px-4 hover:bg-blue-600 mt-4 mb-6"
          >
            Create
          </button>
        </div>
      </form>
      </div>
    </div>
  );
}

export default CreateRole;
