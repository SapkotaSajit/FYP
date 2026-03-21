import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiPlus,
  HiPencilAlt,
  HiTrash,
  HiSearch,
  HiBookOpen,
  HiPhotograph,
  HiFilter,
} from "react-icons/hi";
import DeleteConfirmationModal from "../../../components/Home/DeleteConfirmationModal";

const URL = `${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/`;

const AllGuide = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteGuideId, setDeleteGuideId] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth("get", "guides");
        const sorted = (response.data || []).sort((a, b) => b.id - a.id);
        setGuides(sorted);
      } catch (error) {
        toast.error("Failed to load guides catalog");
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const filteredGuides = guides.filter(
    (guide) =>
      guide.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guide.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteGuide = async () => {
    try {
      await fetchWithAuth("delete", `guides/${deleteGuideId}`);
      setGuides(guides.filter((guide) => guide.id !== deleteGuideId));
      toast.success("Guide removed successfully");
    } catch (error) {
      toast.error("Failed to delete guide");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiBookOpen className="text-blue-600" />
            Instructional Guides
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage step-by-step instructions and user manuals.
          </p>
        </div>
        <Link
          to="/admin/createguide"
          className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100 group"
        >
          <HiPlus className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Guide</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 transition-all focus-within:shadow-md">
        <div className="relative flex-1 w-full text-slate-400 focus-within:text-blue-600">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors" />
          <input
            type="text"
            placeholder="Search guides by title..."
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
                  Guide Content
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Summary
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  ID Tag
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                        Updating guide index...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredGuides.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                  >
                    No guides found in this collection
                  </td>
                </tr>
              ) : (
                filteredGuides.map((guide) => (
                  <tr
                    key={guide.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform overflow-hidden relative">
                          {guide.image_url ? (
                            <img
                              src={`${URL}${guide.image_url}`}
                              alt={guide.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <HiPhotograph className="text-slate-200 text-4xl" />
                          )}
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {guide.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Reference Guide
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 max-w-xs">
                      <p className="text-xs text-slate-500 font-medium leading-relaxed line-clamp-2">
                        {guide.description}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-slate-200">
                        ID-{guide.id}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/editGuide/${guide.id}`}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-star-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
                          title="Edit Guide"
                        >
                          <HiPencilAlt size={20} />
                        </Link>
                        <button
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
                          onClick={() => {
                            setDeleteGuideId(guide.id);
                            setIsDeleteModalOpen(true);
                          }}
                          title="Delete Guide"
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
        onConfirm={handleDeleteGuide}
        title="Remove Guide"
        message="Are you sure you want to delete this guide? This action will remove it from the public directory."
      />
    </div>
  );
};

export default AllGuide;
