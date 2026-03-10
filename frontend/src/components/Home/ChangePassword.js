import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import Cookies from "js-cookie";
import {
  HiLockClosed,
  HiEye,
  HiEyeOff,
  HiShieldCheck,
  HiArrowRight,
} from "react-icons/hi";
import { Fade } from "react-awesome-reveal";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!Cookies.get("accessToken")) {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required";
    }

    if (!formData.newPassword.trim()) {
      newErrors.newPassword = "New password is required";
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Must be at least 8 characters";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/.test(formData.newPassword)
    ) {
      newErrors.newPassword = "Include uppercase, number & symbol";
    }

    if (formData.newPassword === formData.currentPassword) {
      newErrors.newPassword = "Must be different from current";
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/change-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`,
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const successData = await response.json();
        const roleId = Cookies.get("roleId");
        toast.success(successData.msg || "Security credentials updated");
        if (roleId === "1") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg || "Updating credentials failed");
      }
    } catch (error) {
      toast.error("Security synchronization error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Nav />

      <main className="flex-1 flex items-center justify-center py-24 px-6 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 opacity-60"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 opacity-60"></div>

        <div className="w-full max-w-xl relative z-10">
          <Fade direction="up" triggerOnce>
            <div className="glass rounded-[3rem] border border-white p-8 md:p-14 shadow-2xl shadow-blue-200/20 backdrop-blur-3xl bg-white/70">
              <div className="text-center mb-12">
                <div className="w-20 h-20 bg-slate-900 rounded-[2rem] flex items-center justify-center text-white mx-auto mb-8 shadow-2xl shadow-slate-200 rotate-6 transition-transform hover:rotate-0 duration-500 border-4 border-white">
                  <HiLockClosed size={36} />
                </div>
                <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
                  Update Identity
                </h2>
                <p className="text-slate-500 font-bold uppercase tracking-[0.15em] text-[10px]">
                  Secure Your Digital Access
                </p>
              </div>

              <form onSubmit={handleChangePassword} className="space-y-8">
                {/* Current Password */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    <HiShieldCheck className="text-blue-500" /> Validation Point
                  </label>
                  <div className="relative group">
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      placeholder="Current Secret Key"
                      className={`w-full bg-slate-50 border ${errors.currentPassword ? "border-red-300" : "border-slate-200"} rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
                      required
                    />
                    {errors.currentPassword && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight mt-2 ml-1 animate-in fade-in slide-in-from-left-2">
                        {errors.currentPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* New Password */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    New credentials
                  </label>
                  <div className="relative group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      placeholder="Enter New Secret Key"
                      className={`w-full bg-slate-50 border ${errors.newPassword ? "border-red-300" : "border-slate-200"} rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-blue-600 transition-colors"
                    >
                      {showPassword ? (
                        <HiEyeOff size={22} />
                      ) : (
                        <HiEye size={22} />
                      )}
                    </button>
                    {errors.newPassword && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight mt-2 ml-1 animate-in fade-in slide-in-from-left-2">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                    Redundancy Check
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmNewPassword"
                    value={formData.confirmNewPassword}
                    onChange={handleInputChange}
                    placeholder="Verify New Secret Key"
                    className={`w-full bg-slate-50 border ${errors.confirmNewPassword ? "border-red-300" : "border-slate-200"} rounded-2xl px-6 py-4 font-bold text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all`}
                    required
                  />
                  {errors.confirmNewPassword && (
                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight mt-2 ml-1 animate-in fade-in slide-in-from-left-2">
                      {errors.confirmNewPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200 active:scale-[0.98] disabled:opacity-50 disabled:cursor-wait mt-4"
                >
                  <span className="flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <>
                        Commit Updates{" "}
                        <HiArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
                      </>
                    )}
                  </span>
                </button>
              </form>
            </div>
          </Fade>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ChangePassword;
