import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiPlus,
  HiPencilAlt,
  HiTrash,
  HiSearch,
  HiCollection,
  HiPhotograph,
  HiFilter,
  HiTag,
} from "react-icons/hi";
import DeleteConfirmationModal from "../../../components/Home/DeleteConfirmationModal";

const URL = "http://localhost:5000/";

const AllGuideTypes = () => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteGuideId, setDeleteGuideId] = useState(null);

  useEffect(() => {
    const fetchGuides = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth("get", "guidesTypes");
        const sorted = (response.data || []).sort((a, b) => b.id - a.id);
        setGuides(sorted);
      } catch (error) {
        toast.error("Failed to load guide categories");
      } finally {
        setLoading(false);
      }
    };
    fetchGuides();
  }, []);

  const filteredTypes = guides.filter(
    (type) =>
      type.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      type.description?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteType = async () => {
    try {
      await fetchWithAuth("delete", `deleteGuideType/${deleteGuideId}`);
      setGuides(guides.filter((guide) => guide.id !== deleteGuideId));
      toast.success("Guide category removed");
    } catch (error) {
      toast.error("Deletion failed");
    }
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiTag className="text-blue-600" />
            Guide Classifications
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Organize your instructional content into logical categories.
          </p>
        </div>
        <Link
          to="/admin/createguidetypes"
          className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100 group"
        >
          <HiPlus className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Category</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 transition-all focus-within:shadow-md">
        <div className="relative flex-1 w-full text-slate-400 focus-within:text-blue-600">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm font-medium text-slate-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center gap-2 px-5 py-3 text-slate-600 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all font-bold text-sm">
          <HiFilter size={18} />
          <span>Sort</span>
        </button>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60">
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Type Name
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Description
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Reference
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
                        Updating classification index...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredTypes.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                  >
                    No guide types identified
                  </td>
                </tr>
              ) : (
                filteredTypes.map((type) => (
                  <tr
                    key={type.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform overflow-hidden relative shrink-0">
                          {type.guideTypes_image ? (
                            <img
                              src={`${URL}${type.guideTypes_image}`}
                              alt={type.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <HiPhotograph className="text-slate-200 text-3xl" />
                          )}
                        </div>
                        <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {type.name}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-xs text-slate-500 font-medium line-clamp-2 max-w-xs">
                        {type.description}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-2 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-slate-200">
                        TYPE-{type.id}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/editguideTypes/${type.id}`}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-star-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
                          title="Edit Classification"
                        >
                          <HiPencilAlt size={20} />
                        </Link>
                        <button
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
                          onClick={() => {
                            setDeleteGuideId(type.id);
                            setIsDeleteModalOpen(true);
                          }}
                          title="Delete Classification"
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
        onConfirm={handleDeleteType}
        title="Remove Guide Category"
        message="Are you sure you want to delete this classification? This may affect the categorization of multiple guides."
      />
    </div>
  );
};

export default AllGuideTypes;
