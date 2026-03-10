import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiUserCircle,
  HiMail,
  HiPhone,
  HiLockClosed,
  HiShieldCheck,
  HiArrowLeft,
  HiEye,
  HiEyeOff,
  HiArrowRight,
} from "react-icons/hi";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role_id: "",
    phone: "",
    confPassword: "",
  });
  const [roles, setRoles] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetchWithAuth("get", "roleLists");
        setRoles(response.data || []);
      } catch (error) {
        toast.error("Failed to load roles");
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
    setIsLoading(true);
    try {
      const response = await fetchWithAuth("post", "createUser", formData);
      if (response.status === 201) {
        toast.success("User Created Successfully");
        navigate("/admin/users");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create user");
      }
    } catch (error) {
      toast.error("An error occurred during submission");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/users"
          className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <HiArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create New Account
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Register a new user or staff member in the system.
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>

        <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Full Name
              </label>
              <div className="relative">
                <HiUserCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl transition-colors group-focus-within:text-blue-500" />
                <input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field pl-12"
                  autoFocus
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <HiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                <input
                  type="email"
                  name="email"
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Phone Number
              </label>
              <div className="relative">
                <HiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                <input
                  type="text"
                  name="phone"
                  placeholder="+977 98XXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="input-field pl-12"
                />
              </div>
            </div>

            {/* Role selection */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Assign Role
              </label>
              <div className="relative">
                <HiShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                <select
                  name="role_id"
                  value={formData.role_id}
                  onChange={handleChange}
                  required
                  className="input-field pl-12 appearance-none cursor-pointer text-slate-700"
                >
                  <option value="">Select a role...</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="input-field pl-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <HiEyeOff size={20} /> : <HiEye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <HiLockClosed className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
                <input
                  type={showConfPassword ? "text" : "password"}
                  name="confPassword"
                  placeholder="••••••••"
                  value={formData.confPassword}
                  onChange={handleChange}
                  required
                  className={`input-field pl-12 pr-12 ${errors.confPassword ? "border-red-300 bg-red-50" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfPassword(!showConfPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfPassword ? (
                    <HiEyeOff size={20} />
                  ) : (
                    <HiEye size={20} />
                  )}
                </button>
              </div>
              {errors.confPassword && (
                <p className="text-red-500 text-xs font-bold mt-1 ml-1">
                  {errors.confPassword}
                </p>
              )}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 group relative overflow-hidden active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="font-bold tracking-wide">
                    Create Account
                  </span>
                  <HiArrowRight
                    className="group-hover:translate-x-1.5 transition-transform duration-300"
                    size={20}
                  />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
