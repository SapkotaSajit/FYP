import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiPlus,
  HiPencil,
  HiTrash,
  HiPhotograph,
  HiSearch,
  HiFilter,
} from "react-icons/hi";

function PortfolioList() {
  const [portfolios, setPortfolios] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth("GET", "portfolios");
      setPortfolios(response.data || []);
    } catch (error) {
      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        "Failed to load portfolio items";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this portfolio item?")
    ) {
      try {
        await fetchWithAuth("DELETE", `deletePortfolio/${id}`);
        toast.success("Portfolio item deleted successfully");
        fetchPortfolios();
      } catch (error) {
        toast.error("Failed to delete portfolio item");
      }
    }
  };

  const filteredPortfolios = portfolios.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Portfolio Management
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Showcase your legendary projects and partners.
          </p>
        </div>
        <Link
          to="/admin/create-portfolio"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 active:scale-95"
        >
          <HiPlus size={20} />
          Add New Project
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <HiSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative w-full md:w-64">
          <HiFilter
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={20}
          />
          <select
            className="w-full pl-12 pr-10 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-medium appearance-none cursor-pointer"
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            <option value="notable">Notable Projects</option>
            <option value="significant">Significant Projects</option>
            <option value="partner">Institutional Partners</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-200/60 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Project / Partner
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Category
                </th>
                <th className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
                      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">
                        Loading Repository...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredPortfolios.length > 0 ? (
                filteredPortfolios.map((item) => (
                  <tr
                    key={item.id}
                    className="group hover:bg-slate-50/50 transition-colors"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden border border-slate-100 shadow-sm shrink-0">
                          {item.image ? (
                            <img
                              src={`http://localhost:5000/${item.image}`}
                              alt={item.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-slate-50 flex items-center justify-center text-slate-300">
                              <HiPhotograph size={24} />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </p>
                          <p className="text-xs text-slate-400 font-medium line-clamp-1 mt-0.5">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                          item.category === "notable"
                            ? "bg-orange-50 text-orange-600"
                            : item.category === "significant"
                              ? "bg-blue-50 text-blue-600"
                              : "bg-emerald-50 text-emerald-600"
                        }`}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <Link
                          to={`/admin/edit-portfolio/${item.id}`}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                        >
                          <HiPencil size={18} />
                        </Link>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                        >
                          <HiTrash size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-2 text-slate-300">
                      <HiSearch size={48} />
                      <p className="text-slate-500 font-bold mt-4 uppercase tracking-widest text-sm">
                        No Projects Found
                      </p>
                      <p className="text-slate-400 text-xs">
                        Try adjusting your filters or search terms.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default PortfolioList;
