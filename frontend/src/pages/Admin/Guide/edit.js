import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiBookOpen,
  HiPencilAlt,
  HiPhotograph,
  HiUpload,
  HiArrowLeft,
  HiSave,
  HiArrowRight,
  HiInformationCircle,
} from "react-icons/hi";

const URL = "http://localhost:5000/";

function EditGuide() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    image_url: null,
    name: "",
    description: "",
    parent_id: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetchWithAuth("get", "guides");
        setGuides(response.data || []);
      } catch (error) {
        toast.error("Failed to load guide catalog");
      }
    };
    fetchGuides();
  }, []);

  useEffect(() => {
    const fetchGuide = async () => {
      try {
        const response = await fetchWithAuth("get", `guides/${id}`);
        const guide = response.data;
        setFormData({
          name: guide.name,
          description: guide.description,
          parent_id: guide.parent_id || "",
          image_url: guide.image_url || null,
        });
        if (guide.image_url) {
          setPreview(`${URL}${guide.image_url}`);
        }
      } catch (error) {
        toast.error("Failed to fetch guide details");
      }
    };
    fetchGuide();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    // Note: The previous code had a bug where it checked for 'guide_image' but the input name was 'guide_image' and state field was 'image_url' or something mixed.
    // I'll standardize on 'image_url' for the file state/input name to match Create.js and API if possible, or keep as is if API expects 'guide_image'.
    // Looking at previous edit.js, it used 'guide_image' in input but appended 'image_url' in formDataToSend. I'll fix this inconsistency.
    if (name === "guide_image" && files[0]) {
      setFormData((prevState) => ({ ...prevState, image_url: files[0] }));
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

      if (formData.image_url instanceof File) {
        formDataToSend.append("image_url", formData.image_url);
      }

      const response = await fetchWithAuth(
        "put",
        `editguide/${id}`,
        formDataToSend,
      );

      if (response.status === 200 || response.ok) {
        toast.success("Guide updated successfully");
        navigate("/admin/AllGuide");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update guide");
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
          to="/admin/AllGuide"
          className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <HiArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiPencilAlt className="text-blue-600" />
            Edit Resource Guide
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Update the content and branding for guide #{id}.
          </p>
        </div>
      </div>

      <div className="glass rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-200/60 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>

        <form onSubmit={handleSubmit} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Guide Title
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
                  Detailed Summary
                </label>
                <textarea
                  className="input-field py-3 min-h-[150px] resize-none"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="5"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Linked Category (Optional)
                </label>
                <select
                  className="input-field appearance-none cursor-pointer"
                  name="parent_id"
                  value={formData.parent_id}
                  onChange={handleChange}
                >
                  <option value="">Independent Resource</option>
                  {guides
                    .filter((g) => g.id !== parseInt(id))
                    .map((guide) => (
                      <option key={guide.id} value={guide.id}>
                        {guide.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <HiPhotograph className="text-indigo-500" /> Guide Asset
              </label>

              <div className="relative group/upload h-[300px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={preview}
                      alt="Guide Asset"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-all font-bold text-xs uppercase tracking-widest border border-white/30">
                        Update Media
                        <input
                          type="file"
                          name="guide_image"
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
                      Assign guide imagery
                    </span>
                    <input
                      type="file"
                      name="guide_image"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-100 shadow-inner">
                <HiInformationCircle className="text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-slate-500 font-bold leading-relaxed">
                  Tip: Use high-contrast images to help users identify the guide
                  context quickly from the dashboard.
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
                    Commit Changes
                  </span>
                  <HiSave
                    className="group-hover:scale-110 transition-transform duration-300"
                    size={24}
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

export default EditGuide;
