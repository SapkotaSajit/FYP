import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../../auth/api";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { HiUserAdd, HiTrash, HiSearch, HiBadgeCheck } from "react-icons/hi";
import DeleteConfirmationModal from "../../../components/Home/DeleteConfirmationModal";

const Staffs = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsLoading(true);
        const response = await fetchWithAuth("get", "usersRole");
        const sortedStaff = (response.data || []).sort((a, b) => b.id - a.id);
        setUsers(sortedStaff);
      } catch (error) {
        setError(error.message);
        toast.error("Failed to load staff list");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await fetchWithAuth("delete", `deleteUser/${userId}`);
      setUsers(users.filter((user) => user.id !== userId));
      toast.success("Staff deleted successfully");
    } catch (error) {
      toast.error("Failed to delete staff");
    }
  };

  const filteredStaff = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Staff Management
          </h2>
          <p className="text-slate-500 text-sm">
            Manage your team members and their roles.
          </p>
        </div>
        <Link
          to="/admin/createUser"
          className="btn-primary flex items-center gap-2 px-6 py-2.5 rounded-xl shadow-lg shadow-blue-100"
        >
          <HiUserAdd size={18} />
          <span>Add Staff Member</span>
        </Link>
      </div>

      <div className="relative group bg-white shadow-sm border border-slate-200/60 rounded-2xl p-1 transition-all focus-within:ring-2 focus-within:ring-blue-500/20">
        <HiSearch className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 text-xl" />
        <input
          type="text"
          placeholder="Search staff by name or email..."
          className="w-full pl-14 pr-6 py-3.5 bg-transparent rounded-xl outline-none text-sm font-medium text-slate-700"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="glass rounded-3xl overflow-hidden shadow-sm border border-slate-200/60 transition-all hover:shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200/60">
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Team Member
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Contact Info
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Role
                </th>
                <th className="px-8 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td colSpan="4" className="px-8 py-16 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
                      <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                        Updating Staff records...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : filteredStaff.length === 0 ? (
                <tr>
                  <td
                    colSpan="4"
                    className="px-8 py-16 text-center text-slate-400 font-bold uppercase tracking-wider text-xs"
                  >
                    No team members found
                  </td>
                </tr>
              ) : (
                filteredStaff.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-slate-50/50 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center border shadow-sm group-hover:scale-105 transition-transform overflow-hidden font-bold text-[10px]">
                          <img
                            src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&bold=true`}
                            alt={user.name}
                          />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 leading-none mb-1.5">
                            {user.name}{" "}
                            <span className="text-[10px] text-slate-400 font-medium">
                              #{user.id}
                            </span>
                          </p>
                          <div className="flex items-center gap-1">
                            <HiBadgeCheck className="text-blue-500" />
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                              Verified Staff
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-sm text-slate-600 font-bold">
                      {user.email}
                    </td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-amber-100">
                        {user.role_name}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        className="p-2.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                        onClick={() => setSelectedUserId(user.id)}
                      >
                        <HiTrash size={20} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={selectedUserId !== null}
        onClose={() => setSelectedUserId(null)}
        onConfirm={() => {
          handleDeleteUser(selectedUserId);
          setSelectedUserId(null);
        }}
        title="Remove Staff"
        message="Are you sure you want to remove this staff member? Their access will be revoked immediately."
      />
    </div>
  );
};

export default Staffs;
