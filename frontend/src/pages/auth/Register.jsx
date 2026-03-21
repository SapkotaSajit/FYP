import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import {
  HiUser,
  HiMail,
  HiPhone,
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiArrowRight,
} from "react-icons/hi";

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Minimum 8 characters";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/.test(formData.password)
    ) {
      newErrors.password = "Need uppercase, number & symbol";
    }

    if (formData.password !== formData.confPassword) {
      newErrors.confPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || "http://localhost:5000"}`}/api/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const successData = await response.json();
        toast.success(successData.msg || "Account created!");
        navigate("/login");
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Registration failed");
      }
    } catch (error) {
      toast.error("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Nav />

      <main className="flex-grow flex items-center justify-center p-4 pt-32 pb-20">
        <div className="w-full max-w-[550px] animate-in fade-in zoom-in duration-500">
          <div className="glass rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <div className="text-center mb-10">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  Create Account
                </h1>
                <p className="text-slate-500">Join S.D Enterprises today</p>
              </div>

              <form onSubmit={handleRegistration} className="space-y-5">
                {/* Name Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Full Name
                  </label>
                  <div className="relative group">
                    <HiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-xl" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className={`input-field pl-12 ${errors.name ? "border-red-500 focus:ring-red-500/20" : ""}`}
                      autoFocus
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email Field */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                      Email
                    </label>
                    <div className="relative group">
                      <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-xl" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="Enter your email"
                        className={`input-field pl-12 ${errors.email ? "border-red-500 focus:ring-red-500/20" : ""}`}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-xs text-red-500 font-medium ml-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700 ml-1">
                      Phone Number
                    </label>
                    <div className="relative group">
                      <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-xl" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="98XXXXXXXX"
                        className={`input-field pl-12 ${errors.phone ? "border-red-500 focus:ring-red-500/20" : ""}`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 font-medium ml-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Password
                  </label>
                  <div className="relative group">
                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-xl" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={`input-field pl-12 pr-12 ${errors.password ? "border-red-500 focus:ring-red-500/20" : ""}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <HiEyeOff size={20} />
                      ) : (
                        <HiEye size={20} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Field */}
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-slate-700 ml-1">
                    Confirm Password
                  </label>
                  <div className="relative group">
                    <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors text-xl" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confPassword"
                      value={formData.confPassword}
                      onChange={handleInputChange}
                      placeholder="••••••••"
                      className={`input-field pl-12 ${errors.confPassword ? "border-red-500 focus:ring-red-500/20" : ""}`}
                    />
                  </div>
                  {errors.confPassword && (
                    <p className="text-xs text-red-500 font-medium ml-1">
                      {errors.confPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full py-3.5 mt-4 flex items-center justify-center gap-2 group relative overflow-hidden disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-10 pt-8 border-t border-slate-200/60 text-center">
                <p className="text-sm text-slate-500">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-bold text-blue-600 hover:text-blue-700 ml-1"
                  >
                    Log in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Register;
