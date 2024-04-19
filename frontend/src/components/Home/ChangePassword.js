import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import Cookies from "js-cookie";

function ChangePassword() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);

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
      newErrors.newPassword = "New password must be at least 8 characters long";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/.test(formData.newPassword)
    ) {
      newErrors.newPassword =
        "New password must contain at least one uppercase letter, one number, and one special character";
    }

    if (formData.newPassword !== formData.confirmNewPassword) {
      newErrors.confirmNewPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/change-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${Cookies.get("accessToken")}`, // Add this line
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const successData = await response.json();
        const roleId = Cookies.get("roleId");
        if (roleId === "1") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
        toast.success(successData.msg);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg);
      }
    } catch (error) {
      console.error("Error during password change:", error.message);
      toast.error("Failed to change password");
    }
  };

  return (
    <div className="m-0 p-0">
      <Nav />

      <div className="container mx-auto overflow-hidden flex px-6 justify-center items-center">
        <div className="flex items-center justify-center h-[100dvh]">
          <div className="flex flex-col md:w-[40dvw] shadow-2xl gap-3 rounded-sm bg-gray-50 border px-6 md:px-[50px] py-[30px] ">
            <div className="flex flex-col justify-center items-center">
              <p className="text-3xl flex font-semibold text-start">
                Change Password
              </p>
            </div>
            <form
              onSubmit={handleChangePassword}
              className="flex flex-col gap-3 w-full"
            >
              <div className="flex flex-col gap-2">
                <label className="text-black">Current Password</label>
                <input
                  type="password"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`h-12 pl-2 text-black focus:ring-2 focus:ring-blue-500 bg-white ${
                    errors.currentPassword ? "border-red-500 border" : ""
                  } border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                  autoComplete="off"
                  placeholder="Enter your current password"
                />
                {errors.currentPassword && (
                  <p className="text-red-500 text-sm ">
                    {errors.currentPassword}
                  </p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-black">New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`h-12 pl-2 text-black focus:ring-2 focus:ring-blue-500 ${
                    errors.newPassword ? "border-red-500 border" : ""
                  } bg-white border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                  autoComplete="off"
                  placeholder="Enter your new password"
                />
                {errors.newPassword && (
                  <p className="text-red-500 text-sm">{errors.newPassword}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 relative">
                <label className="text-black">Confirm New Password</label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmNewPassword"
                  value={formData.confirmNewPassword}
                  onChange={handleInputChange}
                  className={`h-12 pl-2 text-black focus:ring-2 focus:ring-blue-500 ${
                    errors.confirmNewPassword ? "border-red-500 border" : ""
                  } bg-white border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                  autoComplete="off"
                  placeholder="Re-enter your new password"
                />
                <div
                  className="absolute top-[48px] right-5 cursor-pointer"
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
                        d="M12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16Zm0-1.8q-1.125 0-1.913-.788T9.3 11.5q0-1.125.788-1.913T12 8.8q1.125 0 1.913.788T14.7 11.5q0 1.125-.787 1.913T12 14.2Zm0 4.8q-3.65 0-6.65-2.038T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19Zm0-1.8q3.125 0 5.45-2.225t2.325-5.45q-1.225 2.45-3.775 4.288T12 17.2q-2.45 0-4.288-1.55T4.225 11.5q1.225 2.45 3.775 4.288T12 17.2Z"
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
                        d="M12 7q-1.875 0-3.188 1.313T7.5 11.5q0 1.875 1.313 3.188T12 16q1.875 0 3.188-1.313T16.5 11.5q0-1.875-1.313-3.188T12 7Zm-6.65 5.462T1 11.5q1.35-3.425 4.35-5.463T12 4q3.65 0 6.65 2.038T23 11.5q-1.35 3.425-4.35 5.463T12 19q-3.65 0-6.65-2.038T1 11.5Zm6.65 6.125T4.225 11.5q1.225 2.45 3.775 4.288T12 17.2q2.45 0 4.288-1.55t2.325-5.45q-1.225 2.45-3.775 4.288T12 17.2ZM12 6q-3.125 0-5.45 2.225T4.225 11.5q1.225-2.45 3.775-4.288T12 6Z"
                      />
                    </svg>
                  )}
                </div>
                {errors.confirmNewPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmNewPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ChangePassword;
