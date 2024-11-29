import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); 
    setSuccess(""); 

    if (!email.trim()) {
      setError("Email is required");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess(data.msg);
        toast.success("Reset code is sent to your email");
        setRedirect(true);
       
        localStorage.setItem("emailVerified", true);
      } else {
        setError(data.msg);
        toast.error("Email address doesn't exist");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      setError("Failed to send password reset token. Please try again later.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center px-4 justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 focus:ring-2 focus:ring-blue-500 outline-none"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoFocus="on"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
          </div>
          <div className="flex justify-between items-center">
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                loading && "opacity-50 cursor-not-allowed"
              }`}
              type="submit"
              disabled={loading}
            >
              {loading ? "Loading..." : "Reset Password"}
            </button>
            <Link
              to="/login"
              className="text-blue-500 font-semibold hover:text-blue-800"
            >
              Back to Login
            </Link>
          </div>
        </form>
      </div>
      {redirect && <Navigate to="/enter-code" />}
    </div>
  );
}

export default ForgotPassword;
