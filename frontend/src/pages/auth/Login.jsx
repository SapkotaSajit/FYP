import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Home/Nav";
import Cookies from "js-cookie";
import Footer from "../../components/Home/Footer";
import ForgotPassword from "../../components/Home/ForgotPassword";

function Login() {
  const navigate = useNavigate();

  const [showpassword, setshowpassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setErrors({});
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const { accessToken, roleId, userId } = await response.json();
        Cookies.set("accessToken", accessToken, { expires: 30 / 1440 });
        Cookies.set("roleId", roleId, { expires: 30 / 1440 });
        Cookies.set("userId", userId, { expires: 30 / 1440 });
        if (roleId === 1) {
          navigate("/admin/roles");
        } else {
          navigate("/");
        }
        toast.success("Login successful!");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Invalid Username or Password");
      }
    } catch (error) {}
  };
  return (
    <div className="m-0  p-0 ">
      <Nav />
      <div className="container  mx-auto overflow-hidden flex justify-center items-center ">
        <div className="flex items-center  justify-center h-screen">
          <div className="flex flex-col md:w-[60dvw]  lg:w-[40dvw] shadow-2xl gap-3 rounded-sm bg-gray-50 border px-8 md:px-[50px] py-[30px]">
            <p className="text-3xl my-3  text-center font-semibold">Login</p>
            <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full">
              <div className="flex flex-col gap-2">
                <label className="text-black">Email</label>

                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter Your email"
                  className={`px-4 py-3 focus:ring-2 focus:ring-blue-500 text-black bg-white ${errors.email?"border-red-500 border":""} border rounded-sm outline-none`}
                  autoComplete="off"
                  autoFocus="on"
                />

                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>

              <div className="relative flex flex-col gap-2">
                <label className="text-black ">Password</label>

                <input
                  type={showpassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter Your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`px-4 py-3 text-black focus:ring-2 focus:ring-blue-500 bg-white border ${errors.password?"border-red-500 border":""} rounded-sm outline-none`}
                  autoComplete="off"
                 
                />

                <div
                  className="absolute top-[48px] right-5"
                  onClick={() => setshowpassword(!showpassword)}
                >
                  {showpassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="black"
                        d="m16.1 13.3l-1.45-1.45q.225-1.175-.675-2.2t-2.325-.8L10.2 7.4q.425-.2.863-.3T12 7q1.875 0 3.188 1.313T16.5 11.5q0 .5-.1.938t-.3.862Zm3.2 3.15l-1.45-1.4q.95-.725 1.688-1.587T20.8 11.5q-1.25-2.525-3.588-4.013T12 6q-.725 0-1.425.1T9.2 6.4L7.65 4.85q1.025-.425 2.1-.638T12 4q3.575 0 6.425 1.887T22.7 10.8q.075.125.1.313t.025.387q0 .2-.037.388t-.088.312q-.575 1.275-1.437 2.35t-1.963 1.9Zm-.2 5.45l-3.5-3.45q-.875.275-1.762.413T12 19q-3.575 0-6.425-1.888T1.3 12.2q-.075-.125-.1-.312t-.025-.388q0-.2.025-.375t.1-.3Q1.825 9.7 2.55 8.75T4.15 7L2.075 4.9Q1.8 4.625 1.8 4.212t.3-.712q.275-.275.7-.275t.7.275l17 17q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275ZM5.55 8.4q-.725.65-1.325 1.425T3.2 11.5q1.25 2.525 3.588 4.013T12 17q.5 0 .975-.063t.975-.137l-.9-.95q-.275.075-.525.113T12 16q-1.875 0-3.188-1.312T7.5 11.5q0-.275.038-.525t.112-.525L5.55 8.4Zm7.975 2.325ZM9.75 12.6Z"
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
                </div>

                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
              <div className="flex justify-end my-1">
                <Link
                  className="font-semibold hover:text-blue-800"
                  to="/forgot-password"
                >
                  &nbsp;Forgot Password?
                </Link>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 p-3 text-white">
                Login
              </button>
            </form>

            <hr></hr>

            <div className="flex justify-center items-center">
              <p>Don't have an account?</p>

              <Link
                className="font-semibold tracking-wider   text-blue-500  hover:text-blue-600"
                to="/register"
              >
                &nbsp; Register Now
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
