import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  HiPlus,
  HiPencilAlt,
  HiTrash,
  HiSearch,
  HiFilter,
  HiCollection,
  HiPhotograph,
} from "react-icons/hi";
import DeleteConfirmationModal from "../../../components/Home/DeleteConfirmationModal";

const URL = "http://localhost:5000/";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetchWithAuth("get", "services");
        const sorted = (response.data || []).sort((a, b) => b.id - a.id);
        setServices(sorted);
      } catch (error) {
        toast.error("Failed to load services");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const filteredServices = services.filter(
    (service) =>
      service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.parent_name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
            <HiCollection className="text-blue-600" />
            Service Catalog
          </h2>
          <p className="text-slate-500 text-sm font-medium">
            Manage and organize your available service offerings.
          </p>
        </div>
        <Link
          to="/admin/createService"
          className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100 group"
        >
          <HiPlus className="group-hover:rotate-90 transition-transform duration-300" />
          <span>New Service</span>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 transition-all focus-within:shadow-md">
        <div className="relative flex-1 w-full text-slate-400 focus-within:text-blue-600">
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-xl transition-colors" />
          <input
            type="text"
            placeholder="Search services by name or category..."
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
                  Service Item
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Description
                </th>
                <th className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                  Category
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
                        Loading catalog...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredServices.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs"
                  >
                    No services found in this catalog
                  </td>
                </tr>
              ) : (
                filteredServices.map((service) => (
                  <tr
                    key={service.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform overflow-hidden relative">
                          {service.service_image ? (
                            <img
                              src={`${URL}${service.service_image}`}
                              alt={service.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <HiPhotograph className="text-slate-200 text-3xl" />
                          )}
                          <div className="absolute top-1 right-1 bg-white/90 backdrop-blur rounded-lg px-1.5 py-0.5 border border-slate-100 text-[8px] font-black text-slate-400">
                            #{service.id}
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                            {service.name}
                          </p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                            Global Service
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 max-w-xs transition-opacity overflow-hidden">
                      <p className="text-xs text-slate-500 font-medium leading-relaxed truncate group-hover:whitespace-normal group-hover:overflow-visible transition-all">
                        {service.description}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-indigo-100">
                        {service.parent_name || "Primary"}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/editService/${service.id}`}
                          className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
                          title="Edit Service"
                        >
                          <HiPencilAlt size={20} />
                        </Link>
                        <button
                          className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all shadow-sm bg-white border border-slate-100"
                          onClick={() => {
                            setDeleteServiceId(service.id);
                            setIsDeleteModalOpen(true);
                          }}
                          title="Delete Service"
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
        onConfirm={async () => {
          try {
            await fetchWithAuth("delete", `deleteService/${deleteServiceId}`);
            setServices(services.filter((s) => s.id !== deleteServiceId));
            toast.success("Service removed from catalog");
          } catch (error) {
            toast.error("Deletion failed");
          }
          setIsDeleteModalOpen(false);
        }}
        title="Remove Service"
        message="Are you sure you want to delete this service? All related data will be archived."
      />
    </div>
  );
};

export default AllServices;
