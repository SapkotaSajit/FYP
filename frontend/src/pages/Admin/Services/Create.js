import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiCollection,
  HiInformationCircle,
  HiPhotograph,
  HiUpload,
  HiArrowLeft,
  HiPlusCircle,
  HiArrowRight,
  HiSelector,
} from "react-icons/hi";

function CreateService() {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    service_image: null,
    name: "",
    description: "",
    parent_id: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetchWithAuth("get", "services");
        setServices(response.data || []);
      } catch (error) {
        toast.error("Failed to load existing services");
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "service_image" && files[0]) {
      setFormData((prevState) => ({ ...prevState, [name]: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.service_image) {
      toast.error("Please provide a service cover image");
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("parent_id", formData.parent_id);
      formDataToSend.append("service_image", formData.service_image);

      const response = await fetchWithAuth(
        "POST",
        "createService",
        formDataToSend,
      );

      if (response.ok || response.status === 201) {
        toast.success("Service created successfully!");
        navigate("/admin/services");
      } else {
        const errorMsg = await response.text();
        toast.error(errorMsg || "Failed to create service");
      }
    } catch (error) {
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/services"
          className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <HiArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create New Service
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Add a fresh service offering to your catalog.
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column - Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiPlusCircle className="text-blue-500" /> Service Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Professional Consultation"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiInformationCircle className="text-blue-500" /> Description
                </label>
                <textarea
                  name="description"
                  placeholder="Tell clients what this service covers..."
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="input-field py-3 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiSelector className="text-blue-500" /> Parent Category
                </label>
                <select
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleChange}
                  className="input-field appearance-none cursor-pointer"
                >
                  <option value="">Top Level Service</option>
                  {services.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <HiPhotograph className="text-blue-500" /> Service Cover
              </label>

              <div className="relative group/upload h-[280px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-all font-bold text-xs uppercase tracking-widest border border-white/30">
                        Change Image
                        <input
                          type="file"
                          name="service_image"
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-white hover:border-blue-400 transition-all cursor-pointer group/inner shadow-inner">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover/inner:scale-110 group-hover/inner:text-blue-600 transition-all text-slate-400">
                      <HiUpload size={28} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center px-6">
                      Click to upload brand assets
                    </span>
                    <p className="text-[10px] text-slate-400 font-medium mt-2 italic">
                      Support: JPG, PNG, WEBP
                    </p>
                    <input
                      type="file"
                      name="service_image"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center px-4">
                Recommended aspect ratio: 1:1 or 4:3 for better catalog display.
              </p>
            </div>
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20 group relative overflow-hidden active:scale-[0.98] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="font-bold tracking-wide">
                    Publish Service
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
}

export default CreateService;
