


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from 'axios';

function EnterCode() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5000/api/";

  const [formData, setFormData] = useState({
    code: "",
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
      const response = await axios.post(`${BASE_URL}verify-reset-code`, formData);
  
      if (response.status === 201) {
        navigate("/reset-password");
        toast.success("Message submitted successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error)
      console.error("Error:", error.message);
      toast.error("Failed to submit message");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
        <h2 className="text-2xl font-bold mb-4">Enter 4-Digit Code</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="code"
            >
              Code
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="code"
              type="text" 
              name="code"
              value={formData.code}
              onChange={handleChange}
              placeholder="Enter the 4-digit code"
              required
            />
          </div>
          {error && (
            <div className="text-red-500 text-sm mb-4">{error}</div>
          )}
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EnterCode;
