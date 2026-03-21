import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiPlus,
  HiPencilAlt,
  HiTrash,
  HiSearch,
  HiOutlineViewList,
  HiPhotograph,
  HiFilter,
  HiClipboardList,
} from "react-icons/hi";
import DeleteConfirmationModal from "../../../components/Home/DeleteConfirmationModal";

const URL = `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/`;

const AllGuideSteps = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteGuideId, setDeleteGuideId] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth("get", "guideSteps");
        const sorted = (response.data || []).sort((a, b) => b.id - a.id);
        setGuides(sorted);
      } catch (error) {
        toast.error("Failed to load guide steps");
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const filteredSteps = guides.filter(
    (step) =>
      step.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      step.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteStep = async () => {
    try {
      await fetchWithAuth("delete", `deleteGuideStep/${deleteGuideId}`);
      setGuides(guides.filter((guide) => guide.id !== deleteGuideId));
      toast.success("Process step removed");
    } catch (error) {
      toast.error("Failed to delete step");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiClipboardList className="text-blue-600" />
            Guide Workflow Steps
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Configure individual steps for your instructional processes.
          </p>
        </div>
        <Link
          to="/admin/createGuideSteps"
          className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100 group"
        >
          <HiPlus className="group-hover:rotate-90 transition-transform duration-300" />
          <span>Add Step</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 transition-all focus-within:shadow-md">
        <div className="relative flex-1 w-full text-slate-400 focus-within:text-blue-600">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors" />
          <input
            type="text"
            placeholder="Search steps by instruction..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all font-bold text-sm">
          <HiFilter size={18} />
          <span>Refine</span>
        </button>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Step Narrative
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Reference ID
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Settings
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        Updating workflow...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredSteps.length === 0 ? (
                <tr>
                  <td
                    colSpan="3"
                    className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                  >
                    No workflow steps defined
                  </td>
                </tr>
              ) : (
                filteredSteps.map((step) => (
                  <tr
                    key={step.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-start gap-4">
                        <div className="w-24 h-16 bg-white rounded-xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform overflow-hidden relative shrink-0">
                          {step.guideSteps_image ? (
                            <img
                              src={`${URL}${step.guideSteps_image}`}
                              alt={step.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <HiPhotograph className="text-slate-200 text-3xl" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {step.name}
                          </p>
                          <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-blue-100">
                        STEP-{step.id}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/editGuideSteps/${step.id}`}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
                          title="Modify Step"
                        >
                          <HiPencilAlt size={20} />
                        </Link>
                        <button
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
                          onClick={() => {
                            setDeleteGuideId(step.id);
                            setIsDeleteModalOpen(true);
                          }}
                          title="Delete Step"
                        >
                          <HiTrash size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteStep}
        title="Remove Workflow Step"
        message="Deleting this step might affect the continuity of the associated guide. Proceed?"
      />
    </div>
  );
};

export default AllGuideSteps;
