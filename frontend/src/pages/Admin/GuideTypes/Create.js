import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiTag,
  HiPencilAlt,
  HiPhotograph,
  HiUpload,
  HiArrowLeft,
  HiPlusCircle,
  HiArrowRight,
  HiInformationCircle,
  HiSelector,
} from "react-icons/hi";

function CreateGuideType() {
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    guideTypes_image: null,
    name: "",
    description: "",
    guide_id: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetchWithAuth("get", "guides");
        setGuides(response.data || []);
      } catch (error) {
        toast.error("Failed to load root guides");
      }
    };
    fetchGuides();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "guideTypes_image" && files[0]) {
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
      !formData.guide_id ||
      !formData.guideTypes_image
    ) {
      toast.warning("Incomplete classification data. Please fill all fields.");
      return;
    }

    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("guide_id", formData.guide_id);
      formDataToSend.append("guideTypes_image", formData.guideTypes_image);

      const response = await fetchWithAuth(
        "POST",
        "createGuideTypes",
        formDataToSend,
      );

      if (response.status === 201 || response.ok) {
        toast.success("Classification created successfully!");
        navigate("/admin/AllGuideTypes");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to create category");
      }
    } catch (error) {
      toast.error("Network error. Operation aborted.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/AllGuideTypes"
          className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <HiArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Define Guide Classification
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Create a new organizational tier for your documentation system.
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiPlusCircle className="text-blue-500" /> Category Name
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="e.g. Technical Manuals"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiSelector className="text-blue-500" /> Parent Resource
                </label>
                <select
                  name="guide_id"
                  value={formData.guide_id}
                  onChange={handleChange}
                  className="input-field appearance-none cursor-pointer"
                  required
                >
                  <option value="">Select Root Guide</option>
                  {guides.map((guide) => (
                    <option key={guide.id} value={guide.id}>
                      {guide.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiInformationCircle className="text-blue-500" />{" "}
                  Specification
                </label>
                <textarea
                  name="description"
                  placeholder="Describe the scope of this classification..."
                  rows="4"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="input-field py-3 resize-none"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <HiPhotograph className="text-blue-500" /> Symbolic Icon/Image
              </label>

              <div className="relative group/upload h-[280px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={preview}
                      alt="Type Preview"
                      className="w-full h-full object-contain bg-slate-100"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-all font-bold text-xs uppercase tracking-widest border border-white/30">
                        Swap Media
                        <input
                          type="file"
                          name="guideTypes_image"
                          onChange={handleChange}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-white transition-all cursor-pointer group/inner shadow-inner">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover/inner:scale-110 group-hover/inner:text-blue-600 transition-all text-slate-400">
                      <HiUpload size={28} />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest text-center px-6">
                      Upload classification icon
                    </span>
                    <input
                      type="file"
                      name="guideTypes_image"
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
                    Confirm Classification
                  </span>
                  <HiTag
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

export default CreateGuideType;
