import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

function EnterCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BASE_URL = `http://localhost:5000/api/`;

  const [formData, setFormData] = useState({
    code: "",
  });

  useEffect(() => {
    // Check if email is verified
    const isEmailVerified = localStorage.getItem("emailVerified");
    if (!isEmailVerified) {
      toast.error("Please enter your email first");
      navigate("/forgot-password");
    }
  }, [navigate]);

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
      const response = await axios.post(`${BASE_URL}verify-reset-code`, formData);
  
      if (response.status === 201) {
        navigate("/reset-password");
        toast.success("Code verified successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Failed to verify code");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Enter 4-Digit Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="code"
            >
              Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
              id="code"
              type="text" 
              name="code"
              value={formData.code}
              autoFocus = "on"
              onChange={handleChange}
              placeholder="Enter the 4-digit code"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="submit"
          >
            Submit
          </button>
        </form>
        <div className="mt-4 text-center">
          <Link
            to="/"
            className="text-blue-500 font-semibold hover:text-blue-800"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnterCode;
