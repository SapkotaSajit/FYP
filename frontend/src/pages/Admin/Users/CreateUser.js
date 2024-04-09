import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
    phone:"",
    confPassword: "",
  });
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetchWithAuth("get", "roleLists");
        setRoles(response.data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchRoles();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confPassword) {
      setErrors({ ...errors, confPassword: "Passwords do not match" });
      return;
    }
    try {
      const response = await fetchWithAuth("post", "createUser", formData);
      if (response.status === 201) {
        navigate("/admin/users");
        toast.success("User Created Successfully");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="px-4">
    <div className="container shadow-lg px-5 mx-auto overflow-hidden   my-6">
      <h2 className="text-3xl text-gray-700 font-semibold my-6 text-center">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
          <div>
            <label htmlFor="name" className="block">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter user name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border focus:ring-2 outline-none focus:ring-blue-500 rounded-md px-4 py-2 w-full"
              autoFocus = "on"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter user email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border focus:ring-2 outline-none focus:ring-blue-500 rounded-md px-4 py-2 w-full"
            />
          </div>
          <div className="flex flex-col ">
                <label className="text-black">Phone</label>
                <input
                  type="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="border  focus:ring-2 rounded-md outline-none focus:ring-blue-500 px-4 py-2 "
                  autoComplete="off"
                  placeholder="Enter phone number"
                  required
                  
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <label htmlFor="password" className="block">
              Password:
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border focus:ring-2 outline-none focus:ring-blue-500 rounded-md px-4 py-2 w-full"
            />
            <button
              type="button"
              className="absolute top-11 transform -translate-y-1/2 right-2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    d="M16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="relative">
            <label htmlFor="confPassword" className="block">
              Confirm Password:
            </label>
            <input
              type={showConfPassword ? "text" : "password"}
              id="confPassword"
              name="confPassword"
              placeholder="Confirm password"
              value={formData.confPassword}
              onChange={handleChange}
              required
              className="border focus:ring-2 outline-none focus:ring-blue-500 rounded-md px-4 py-2 w-full"
            />
            <button
              type="button"
              className="absolute top-11 transform -translate-y-1/2 right-2"
              onClick={() => setShowConfPassword(!showConfPassword)}
            >
              {showConfPassword ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    d="M16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="black"
                    d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-7.5Zm0 5.5q2.825 0 5.188-1.488T20.8 11.5q-1.25-2.525-3.613-4.013T12 6Q9.175 6 6.812 7.488T3.2 11.5q1.25 2.525 3.613 4.013T12 17Z"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
        <div>
          <label htmlFor="role_id" className="block">
            Role ID:
          </label>
          <select
            id="role_id"
            name="role_id"
            value={formData.role_id}
            onChange={handleChange}
            required
            className="border focus:ring-2 outline-none focus:ring-blue-500 rounded-md px-4 py-2 w-full"
          >
            <option value="">Select Role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="grid place-items-center">
        <button
          type="submit"
          className="bg-blue-500 focus:ring-2 outline-none focus:ring-blue-500 text-white px-4 my-6 py-2 rounded-md hover:bg-blue-600 items-center justify-center place-items-center"
        >
          Create User
        </button>
        </div>
     
      </form>
    </div>
    </div>
  );
};

export default CreateUser;
