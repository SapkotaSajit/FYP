import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";

function EditRole() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const response = await fetchWithAuth("get", `roles/${id}`);
        const role = response.data.role;
        setFormData({
          name: role.name,
          description: role.description,
        });
      } catch (error) {
        console.error("Error fetching role:", error.message);
      }
    };
    fetchRole();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetchWithAuth("put", `editRole/${id}`, formData);

      if (response.status === 200) {
        navigate("/admin/roles");
        toast.success("Role Updated Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="container   mx-auto px-4 my-6">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-3xl py-6 text-gray-700   text-center font-semibold ">
          Edit Role
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="roleName" className="block mb-1">
              Role Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              autoFocus="on"
              value={formData.name || ""}
              onChange={handleChange}
              className="w-full border focus:ring-2 focus:ring-blue-500 border-gray-300 rounded-md  outline-none p-2"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
              className="w-full border focus:ring-2 outline-none focus:ring-blue-500 border-gray-300 rounded-md   p-2"
            />
          </div>
          <div className="pt-2 pb-6 mx-4 grid place-items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditRole;
