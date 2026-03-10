import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiPencilAlt,
  HiCollection,
  HiPhotograph,
  HiUpload,
  HiArrowLeft,
  HiSave,
  HiSelector,
  HiInformationCircle,
} from "react-icons/hi";

const URL = "http://localhost:5000/";

function EditService() {
  const { id } = useParams();
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
        toast.error("Failed to load catalog");
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetchWithAuth("get", `services/${id}`);
        const service = response.data;
        setFormData({
          name: service.name,
          description: service.description,
          parent_id: service.parent_id || "",
          service_image: service.service_image || null,
        });
        if (service.service_image) {
          setPreview(`${URL}${service.service_image}`);
        }
      } catch (error) {
        toast.error("Failed to fetch service details");
      }
    };
    fetchService();
  }, [id]);

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
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("parent_id", formData.parent_id);
      if (formData.service_image instanceof File) {
        formDataToSend.append("service_image", formData.service_image);
      }

      const response = await fetchWithAuth(
        "put",
        `editService/${id}`,
        formDataToSend,
      );

      if (response.status === 200 || response.ok) {
        toast.success("Service updated successfully!");
        navigate("/admin/services");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update service");
      }
    } catch (error) {
      toast.error("Network error. Update aborted.");
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
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiPencilAlt className="text-blue-600" />
            Modify Service
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Fine-tune the configurations for service #{id}.
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column - Form */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Service Title
                </label>
                <input
                  className="input-field"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Service Summary
                </label>
                <textarea
                  className="input-field py-3 min-h-[120px] resize-none"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiSelector className="text-blue-500" /> Organizational
                  Hierarchy
                </label>
                <select
                  className="input-field appearance-none cursor-pointer"
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleChange}
                >
                  <option value="">Root Service (Core)</option>
                  {services
                    .filter((s) => s.id !== parseInt(id))
                    .map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Right Column - Media */}
            <div className="space-y-6">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <HiPhotograph className="text-indigo-500" /> Current Asset
              </label>

              <div className="relative group/upload h-[280px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={preview}
                      alt="Service Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-all font-bold text-xs uppercase tracking-widest border border-white/30">
                        Replace Imagery
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
                  <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-white transition-all cursor-pointer group/inner">
                    <HiUpload
                      size={32}
                      className="text-slate-300 group-hover/inner:text-blue-500 mb-2"
                    />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      No primary asset found
                    </span>
                    <input
                      type="file"
                      name="service_image"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex items-start gap-3 p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100">
                <HiInformationCircle className="text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-indigo-700/70 font-bold leading-relaxed">
                  Changing the service image will update it across all
                  client-facing pages immediately.
                </p>
              </div>
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
                    Update Service Catalog
                  </span>
                  <HiSave
                    className="group-hover:scale-110 transition-transform duration-300"
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

export default EditService;
