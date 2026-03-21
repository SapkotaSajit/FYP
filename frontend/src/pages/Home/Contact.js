import React, { useState } from "react";
import Nav from "../../components/Home/Nav";
import Footer from "../../components/Home/Footer";
import { Fade } from "react-awesome-reveal";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import {
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiChevronDown,
  HiArrowRight,
  HiChatAlt2,
} from "react-icons/hi";

function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    description: "",
  });

  const [errors, setErrors] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const BASE_URL = `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/`;

  const handleSubmit = async (event) => {
    event.preventDefault();
    let newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Full name required";
    if (!formData.email.trim()) newErrors.email = "Valid email required";
    if (!formData.phone.trim()) newErrors.phone = "Contact number required";
    if (!formData.description.trim())
      newErrors.description = "Please enter your message";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${BASE_URL}createContact`, formData);
      if (response.status === 201) {
        toast.success("Message transmitted successfully");
        navigate("/");
      } else {
        toast.error(response.data.message || "Submission failed");
      }
    } catch (error) {
      toast.error("Network synchronization failed");
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <Nav />

      {/* Map Section */}
      <section className="relative group pt-32">
        <div
          className={`relative w-full overflow-hidden transition-all duration-700 ease-in-out ${isOpen ? "h-[70vh]" : "h-96"}`}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113032.65322787261!2d85.24373135767756!3d27.708935957714655!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600!5e0!3m2!1sen!2snp!4v1707492932344!5m2!1sen!2snp"
            className="w-full h-full border-none filter contrast-125 saturate-50 hover:saturate-100 transition-all duration-1000 grayscale group-hover:grayscale-0"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent pointer-events-none"></div>

          <button
            onClick={handleOpen}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-2xl border border-white flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-900 hover:bg-blue-600 hover:text-white transition-all active:scale-95"
          >
            <HiLocationMarker className={isOpen ? "rotate-180" : ""} />{" "}
            {isOpen ? "Collapse Map" : "Expand Location"}
          </button>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Contact Details */}
          <div className="lg:col-span-5 space-y-12">
            <Fade direction="left" triggerOnce>
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100">
                  <HiChatAlt2 /> Inquiries
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
                  Let's Discuss Your{" "}
                  <span className="text-blue-600">Enterprise</span> Solutions
                </h1>
                <p className="text-slate-500 font-medium leading-relaxed max-w-md">
                  Have a complex waterproofing requirement? Our technical
                  engineers are standing by to architect your structural
                  defense.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: HiPhone,
                    label: "Technical Support",
                    value: "+977 9841435289",
                    color: "text-blue-600",
                    bg: "bg-blue-50",
                  },
                  {
                    icon: HiMail,
                    label: "Digital Correspondence",
                    value: "info@sdenterprise.com",
                    color: "text-emerald-600",
                    bg: "bg-emerald-50",
                  },
                  {
                    icon: HiLocationMarker,
                    label: "Corporate HQ",
                    value: "Naya Baneshwor, Kathmandu",
                    color: "text-indigo-600",
                    bg: "bg-indigo-50",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-5 group cursor-pointer"
                  >
                    <div
                      className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center transition-all group-hover:scale-110 shadow-sm border border-white group-hover:shadow-lg`}
                    >
                      <item.icon size={24} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">
                        {item.label}
                      </p>
                      <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Fade>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <Fade direction="up" triggerOnce>
              <div className="glass rounded-[3rem] p-8 md:p-12 border border-white shadow-2xl shadow-blue-200/20 bg-white/40 backdrop-blur-xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Full Identity
                      </label>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your Full Name"
                        className={`w-full bg-white/50 border ${errors.name ? "border-red-300" : "border-slate-200"} rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none`}
                      />
                      {errors.name && (
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        Digital Mail
                      </label>
                      <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your Email Address"
                        className={`w-full bg-white/50 border ${errors.email ? "border-red-300" : "border-slate-200"} rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none`}
                      />
                      {errors.email && (
                        <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Mobile Frequency
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="98XXXXXXXX"
                      className={`w-full bg-white/50 border ${errors.phone ? "border-red-300" : "border-slate-200"} rounded-2xl px-6 py-4 font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none`}
                    />
                    {errors.phone && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                      Technical Brief
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Describe your structural requirements..."
                      className={`w-full bg-white/50 border ${errors.description ? "border-red-300" : "border-slate-200"} rounded-2xl px-6 py-6 font-bold text-slate-700 focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all outline-none h-40 resize-none`}
                    />
                    {errors.description && (
                      <p className="text-[10px] font-bold text-red-500 uppercase tracking-tight ml-1">
                        {errors.description}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full group py-5 bg-slate-900 text-white rounded-[2rem] font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all shadow-xl hover:shadow-blue-200 active:scale-[0.98] flex items-center justify-center gap-3"
                  >
                    Submit Infiltration Request{" "}
                    <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </Fade>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Contact;
