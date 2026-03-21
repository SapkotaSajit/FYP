import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiCollection,
  HiInformationCircle,
  HiPhotograph,
  HiUpload,
  HiArrowLeft,
  HiPencilAlt,
  HiArrowRight,
  HiSelector,
} from "react-icons/hi";

function EditPortfolio() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    description: "",
    category: "notable",
  });
  const [preview, setPreview] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const response = await fetchWithAuth("GET", `portfolios/${id}`);
        const data = response.data;
        setFormData({
          title: data.title,
          description: data.description,
          category: data.category,
          image: null,
        });
        setExistingImage(data.image);
      } catch (error) {
        toast.error("Failed to load portfolio item");
      }
    };
    fetchPortfolio();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files[0]) {
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
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      if (formData.image) {
        formDataToSend.append("image", formData.image);
      }

      const response = await fetchWithAuth(
        "PUT",
        `editPortfolio/${id}`,
        formDataToSend,
      );

      if (response.ok || response.status === 200) {
        toast.success("Portfolio item updated successfully!");
        navigate("/admin/portfolios");
      } else {
        toast.error("Failed to update portfolio item");
      }
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Network error. Please try again.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center gap-4 mb-8">
        <Link
          to="/admin/portfolios"
          className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <HiArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
            Edit Portfolio Item
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Refine the details of your professional milestone.
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column - Details */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiPencilAlt className="text-orange-500" /> Project Title
                </label>
                <input
                  type="text"
                  name="title"
                  placeholder="e.g. Skyline Apartments Complex"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 font-medium outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all h-14"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiSelector className="text-orange-500" /> Portfolio Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 font-medium outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all h-14 appearance-none cursor-pointer"
                >
                  <option value="notable">Notable Project</option>
                  <option value="significant">Significant Project</option>
                  <option value="partner">Institutional Partner</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiInformationCircle className="text-orange-500" />{" "}
                  Description
                </label>
                <textarea
                  name="description"
                  placeholder="Provide context and details about this entry..."
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 font-medium outline-none focus:ring-4 focus:ring-orange-500/10 focus:border-orange-500 transition-all resize-none"
                />
              </div>
            </div>

            {/* Right Column - Image Upload */}
            <div className="space-y-6">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <HiPhotograph className="text-orange-500" /> Project Image
              </label>

              <div className="relative group/upload h-[320px]">
                {preview || existingImage ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={preview || `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/${existingImage}`}
                      alt="Preview"
                      className="w-full h-full object-contain bg-slate-100"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-all font-bold text-xs uppercase tracking-widest border border-white/30">
                        Replace Visual
                        <input
                          type="file"
                          name="image"
                          onChange={handleChange}
                          className="hidden"
                          accept="image/*"
                        />
                      </label>
                    </div>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50 hover:bg-white hover:border-orange-400 transition-all cursor-pointer group/inner shadow-inner">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-4 group-hover/inner:scale-110 group-hover/inner:text-orange-600 transition-all text-slate-400">
                      <HiUpload size={28} />
                    </div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center px-6 leading-relaxed">
                      Update project visual evidence
                    </span>
                    <input
                      type="file"
                      name="image"
                      onChange={handleChange}
                      className="hidden"
                      accept="image/*"
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
              className="w-full py-4.5 bg-slate-900 text-white rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-slate-200 group relative overflow-hidden active:scale-[0.98] transition-all disabled:opacity-70 h-16"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span className="font-bold tracking-widest uppercase text-xs">
                    Update Repository
                  </span>
                  <HiArrowRight
                    className="group-hover:translate-x-1.5 transition-transform duration-300 text-orange-400"
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

export default EditPortfolio;
