import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../../../auth/api";
import { toast } from "react-toastify";
import { HiPlus, HiPencilAlt, HiTrash } from "react-icons/hi";
import DeleteConfirmationModal from "../../../components/Home/DeleteConfirmationModal";

const RoleList = () => {
  const [roles, setRoles] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        setIsLoading(true);
        const response = await fetchWithAuth("get", "roleLists");
        const sortedRoles = (response.data || []).sort((a, b) => b.id - a.id);
        setRoles(sortedRoles);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load roles");
      } finally {
        setIsLoading(false);
      }
    };
    fetchRoles();
  }, []);

  const handleDeleteRole = async () => {
    try {
      await fetchWithAuth("delete", `deleteRole/${selectedRoleId}`);
      setRoles(roles.filter((role) => role.id !== selectedRoleId));
      toast.success("Role deleted successfully");
      setSelectedRoleId(null);
    } catch (error) {
      setError(error.message);
      toast.error("Failed to delete role");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">System Roles</h2>
          <p className="text-slate-500 text-sm">
            Manage user permissions and access levels.
          </p>
        </div>
        <Link
          to="/admin/createRole"
          className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100"
        >
          <HiPlus size={18} />
          <span>New Role</span>
        </Link>
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  ID
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Role Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-medium">
                        Loading roles...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : roles.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-12 text-center text-slate-400 font-medium"
                  >
                    No roles found. Create one to get started.
                  </td>
                </tr>
              ) : (
                roles.map((role) => (
                  <tr
                    key={role.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-bold text-slate-400">
                      #{role.id}
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">
                        {role.name}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                      {role.description}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          to={`/admin/editRole/${role.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Role"
                        >
                          <HiPencilAlt size={18} />
                        </Link>
                        <button
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          onClick={() => setSelectedRoleId(role.id)}
                          title="Delete Role"
                        >
                          <HiTrash size={18} />
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
        isOpen={selectedRoleId !== null}
        onClose={() => setSelectedRoleId(null)}
        onConfirm={handleDeleteRole}
      />
    </div>
  );
};

export default RoleList;
