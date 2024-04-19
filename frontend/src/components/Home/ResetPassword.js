import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

function ResetPassword() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/api/";
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    email:"",
    password:"",
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(`${BASE_URL}reset-password`, formData);
  
      if (response.status === 200) {
        navigate("/");
        toast.success("Password reset successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to reset password");
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code"
              type="text" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter the 4-digit code"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="confirmPassword"
            >
            password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code"
              type="text" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter the 4-digit code"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          {success && (
            <div className="text-green-500 text-sm mb-4">{success}</div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : "Reset Password"}
          </button>
          <Link
            to="/login"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
