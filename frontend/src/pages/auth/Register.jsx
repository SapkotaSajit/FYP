import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    confPassword: "",
  });
  const [errors, setErrors] = useState({});

  const [showpassword, setshowpassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();
    setErrors({});

    const newErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number";
    } else if (formData.phone.includes("-")) {
      newErrors.phone = "Phone number cannot contain negative numbers";
    } else if (formData.phone.length > 10) {
      newErrors.phone = "Phone number cannot be more than 10 digits";
    }
    
    
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters long";
    } else if (
      !/(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/.test(formData.password)
    ) {
      newErrors.password =
        "Password must contain at least one uppercase letter, one number, and one special character";
    }
    if (formData.password !== formData.confPassword) {
      newErrors.confPassword = "Passwords do not match";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const successData = await response.json();
        navigate("/login");
        toast.success(successData.msg);
      } else {
        const errorData = await response.json();
        toast.error(errorData.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error.message);
    }
  };

  return (
    <div className="m-0 p-0">
      <Nav />

      <div className="container mx-auto overflow-hidden flex px-6 justify-center items-center">
        <div className="flex items-center   justify-center h-[100dvh]">
          <div className="flex flex-col  md:w-[40dvw] shadow-2xl gap-3 rounded-sm bg-gray-50 border px-6 md:px-[50px] py-[30px] ">
            <div className="flex flex-col  justify-center items-center">
              <p className="text-3xl  flex font-semibold text-start">SignUp</p>
            </div>
            <form
              onSubmit={handleRegistration}
              className="flex flex-col gap-3 w-full"
            >
              <div className="flex flex-col gap-2">
                <label className="text-black">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`h-12 pl-2 text-black focus:ring-2 focus:ring-blue-500 bg-white ${errors.name?"border-red-500 border":""} border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                  autoComplete="off"
                  autoFocus="on"
                  placeholder="Enter your Full Name"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm ">{errors.name}</p>
                )}
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-black">Email</label>
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`h-12 pl-2 text-black focus:ring-2 focus:ring-blue-500 ${errors.email?"border-red-500 border":""} bg-white border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                    autoComplete="off"
                  
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email}</p>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label  className="text-black">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    autoComplete="off"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={`h-12 pl-2 text-black bg-white ${errors.phone?"border-red-500 border":""} border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)] focus:ring-2 focus:ring-blue-500`}
                  
                    
                    placeholder="Enter your phone number"
                  
                  
                   
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">{errors.phone}</p>
                  )}
                </div>
              </div>
              <div className="relative flex flex-col gap-2">
                <label className="text-black">Set Password</label>
                <input
                  type={showpassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`h-12 pl-2 text-black bg-white ${errors.password?"border-red-500 border":""} border focus:ring-2 focus:ring-blue-500 rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                  autoComplete="off"
                 
                  placeholder="Create password"
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

              <div className="relative flex flex-col gap-2">
                <label className="text-black">Confirm Password</label>
                <input
                  type={showpassword ? "text" : "password"}
                  className={`h-12 pl-2 text-black focus:ring-2 focus:ring-blue-500 bg-white ${errors.confPassword?"border-red-500 border":""} border rounded outline-none shadow-[0_3px_10px_rgb(0,0,0,0.2)]`}
                  name="confPassword"
                  value={formData.confPassword}
                  onChange={handleInputChange}
                  autoComplete="off"
                 
                  placeholder="Re-Enter password"
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
                {errors.confPassword && (
                  <p className="text-red-500 text-sm">{errors.confPassword}</p>
                )}
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 outline-none focus:ring-2 focus:ring-blue-500 text-white h-10">
                Signup
              </button>
            </form>
            <hr></hr>
            <div className="flex justify-center items-center">
              <p>Already have an account? </p>
              <Link
                className="font-semibold text-blue-500 tracking-wider  hover:text-blue-600"
                to="/login"
              >
                &nbsp; login
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Register;
