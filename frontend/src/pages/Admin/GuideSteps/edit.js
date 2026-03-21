import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiClipboardList,
  HiPencilAlt,
  HiPhotograph,
  HiUpload,
  HiArrowLeft,
  HiSave,
  HiArrowRight,
  HiInformationCircle,
  HiSelector,
} from "react-icons/hi";

const URL = "http://localhost:5000/";

function EditGuideSteps() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [guides, setGuides] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    guideSteps_image: null,
    name: "",
    description: "",
    guide_id: "",
  });
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        const response = await fetchWithAuth("get", "guides"); // Note: previously it was 'guideSteps' here too, but the parent guide is usually from 'guides'
        setGuides(response.data || []);
      } catch (error) {
        toast.error("Failed to load guide catalog");
      }
    };
    fetchGuides();
  }, []);

  useEffect(() => {
    const fetchStep = async () => {
      try {
        const response = await fetchWithAuth("get", `guideSteps/${id}`);
        const step = response.data;
        setFormData({
          name: step.name,
          description: step.description,
          guide_id: step.guide_id || "",
          guideSteps_image: step.guideSteps_image || null,
        });
        if (step.guideSteps_image) {
          setPreview(`${URL}${step.guideSteps_image}`);
        }
      } catch (error) {
        toast.error("Failed to retrieve step details");
      }
    };
    fetchStep();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "guideSteps_image" && files[0]) {
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
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("guide_id", formData.guide_id);

      if (formData.guideSteps_image instanceof File) {
        formDataToSend.append("guideSteps_image", formData.guideSteps_image);
      }

      const response = await fetchWithAuth(
        "PUT",
        `editguideSteps/${id}`,
        formDataToSend,
      );

      if (response.status === 200 || response.ok) {
        toast.success("Step configurations updated");
        navigate("/admin/AllGuideSteps");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update step");
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
          to="/admin/AllGuideSteps"
          className="p-2 hover:bg-white rounded-xl text-slate-400 hover:text-blue-600 transition-all shadow-sm"
        >
          <HiArrowLeft size={20} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiPencilAlt className="text-blue-600" />
            Modify Workflow Step
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Fine-tune the requirements and narrative for step #{id}.
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
                  Step Headline
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
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <HiSelector className="text-blue-500" /> Parent Resource
                </label>
                <select
                  className="input-field appearance-none cursor-pointer"
                  name="guide_id"
                  value={formData.guide_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Associated Guide</option>
                  {guides.map((guide) => (
                    <option key={guide.id} value={guide.id}>
                      {guide.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Step Description
                </label>
                <textarea
                  className="input-field py-3 min-h-[140px] resize-none"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="4"
                  required
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <HiPhotograph className="text-indigo-500" /> Current Step Asset
              </label>

              <div className="relative group/upload h-[280px]">
                {preview ? (
                  <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-white shadow-xl">
                    <img
                      src={preview}
                      alt="Step Asset"
                      className="w-full h-full object-contain bg-slate-100"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center">
                      <label className="bg-white/20 backdrop-blur-md text-white px-6 py-2 rounded-xl cursor-pointer hover:bg-white/30 transition-all font-bold text-xs uppercase tracking-widest border border-white/30">
                        Swap Imagery
                        <input
                          type="file"
                          name="guideSteps_image"
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
                      Update visual aid
                    </span>
                    <input
                      type="file"
                      name="guideSteps_image"
                      onChange={handleChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex items-start gap-4 p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 shadow-sm">
                <HiInformationCircle className="text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-indigo-700/80 font-bold leading-relaxed">
                  Updates to step assets will be synchronized across all guides
                  utilizing this workflow configuration.
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
                    Save Configuration
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

export default EditGuideSteps;
