import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiBookOpen,
  HiPencilAlt,
  HiPhotograph,
  HiUpload,
  HiArrowLeft,
  HiPlusCircle,
  HiArrowRight,
  HiInformationCircle,
} from "react-icons/hi";

function CreateGuide() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    image_url: null,
    name: "",
    description: "",
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image_url" && files[0]) {
      const file = files[0];
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size exceeds 5MB limit.");
        e.target.value = "";
        return;
      }
      setFormData((prevState) => ({ ...prevState, [name]: file }));
      setPreview(URL.createObjectURL(file));
    } else {
      setFormData((prevState) => ({ ...prevState, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.description.trim() ||
      !formData.image_url
    ) {
      toast.warning("Please complete all required fields and upload an image.");
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("image_url", formData.image_url);

      const response = await fetchWithAuth(
        "POST",
        "createGuide",
        formDataToSend,
      );

      if (response.status === 201 || response.ok) {
        toast.success("Guide published successfully!");
        navigate("/admin/AllGuide");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create guide");
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
          to="/admin/AllGuide"
          className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <HiArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Create Educational Guide
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Draft a new instructional resource for your users.
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
                  <HiPlusCircle className="text-blue-500" /> Guide Title
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Getting Started with Our Service"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiInformationCircle className="text-blue-500" /> Description
                </label>
                <textarea
                  name="description"
                  placeholder="Summarize the purpose and content of this guide..."
                  rows="6"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="input-field py-3 resize-none"
                />
              </div>
            </div>

            {/* Right Column - Media */}
            <div className="space-y-6">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <HiPhotograph className="text-blue-500" /> Guide Cover Image
              </label>

              <div className="relative group/upload h-[300px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-contain bg-slate-100"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-all font-bold text-xs uppercase tracking-widest border border-white/30">
                        Replace Imagery
                        <input
                          type="file"
                          name="image_url"
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
                      Upload illustrative cover
                    </span>
                    <p className="text-[10px] text-slate-400 font-medium mt-2 italic px-4 text-center">
                      Visual aids significantly improve user comprehension.
                    </p>
                    <input
                      type="file"
                      name="image_url"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
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
                  <span className="font-bold tracking-wide text-lg">
                    Publish Resources
                  </span>
                  <HiBookOpen
                    className="group-hover:scale-110 transition-transform duration-300"
                    size={24}
                  />
                  <HiArrowRight
                    className="absolute right-8 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all"
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

export default CreateGuide;
