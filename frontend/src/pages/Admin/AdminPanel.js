import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchWithAuth } from "../../auth/api";
import { HiUsers, HiUserGroup, HiTrendingUp, HiCalendar } from "react-icons/hi";

function AdminPanel() {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalStaff: 0,
    activeBookings: 0,
    revenue: 0,
    breakdown: {
      pending: 0,
      accepted: 0,
      rejected: 0,
      completed: 0,
    },
    additional: {
      services: 0,
      portfolios: 0,
      contacts: 0,
    },
    recentContacts: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetchWithAuth("get", "dashboardStats");
      if (response && response.data) {
        setStatsData(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const stats = [
    {
      label: "Total Users",
      value: statsData.totalUsers,
      icon: HiUsers,
      color: "bg-blue-500",
      trend: "System Users",
    },
    {
      label: "Total Staff",
      value: statsData.totalStaff,
      icon: HiUserGroup,
      color: "bg-purple-500",
      trend: "Active Staff",
    },
    {
      label: "Active Bookings",
      value: statsData.activeBookings,
      icon: HiCalendar,
      color: "bg-emerald-500",
      trend: `${statsData.breakdown?.pending || 0} Pending`,
    },
    {
      label: "Completed",
      value: statsData.breakdown?.completed || 0,
      icon: HiTrendingUp,
      color: "bg-orange-500",
      trend: "Total Success",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">
          Synchronizing System Data...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Dashboard Overview
          </h1>
          <p className="text-slate-500 font-medium text-sm mt-1">
            Welcome back, System Administrator. Here's a snapshot of your
            operations.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-5 py-2.5 text-xs font-black text-blue-600 bg-blue-50 border border-blue-100 rounded-2xl shadow-sm">
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="glass rounded-[2rem] p-7 shadow-sm hover:shadow-2xl hover:shadow-blue-200/40 transition-all duration-500 group relative overflow-hidden border border-white/40"
          >
            <div
              className={`absolute top-0 right-0 w-32 h-32 ${stat.color}/5 rounded-full -mr-12 -mt-12 transition-transform duration-700 group-hover:scale-150`}
            ></div>

            <div className="relative z-10">
              <div
                className={`${stat.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-xl shadow-${stat.color.split("-")[1]}-200 transition-transform group-hover:-translate-y-1`}
              >
                <stat.icon size={28} />
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">
                {stat.label}
              </p>
              <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
                {stat.value}
              </h3>
              <div className="mt-5 flex items-center gap-2">
                <span className="px-2 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-lg uppercase tracking-wider">
                  {stat.trend.split(" ")[0]}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                  {stat.trend.split(" ").slice(1).join(" ")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Booking Breakdown */}
        <div className="glass rounded-[2.5rem] p-8 border border-white/40 shadow-sm bg-white/40">
          <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-widest text-[11px]">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            Booking Status Breakdown
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl border border-white bg-white/50 space-y-2">
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest">
                Pending
              </span>
              <p className="text-2xl font-black text-slate-900">
                {statsData.breakdown?.pending || 0}
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-white bg-white/50 space-y-2">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                Accepted
              </span>
              <p className="text-2xl font-black text-slate-900">
                {statsData.breakdown?.accepted || 0}
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-white bg-white/50 space-y-2">
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">
                Rejected
              </span>
              <p className="text-2xl font-black text-slate-900">
                {statsData.breakdown?.rejected || 0}
              </p>
            </div>
            <div className="p-5 rounded-2xl border border-white bg-white/50 space-y-2">
              <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                Completed
              </span>
              <p className="text-2xl font-black text-slate-900">
                {statsData.breakdown?.completed || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Content Stats */}
        <div className="glass rounded-[2.5rem] p-8 border border-white/40 shadow-sm bg-white/40">
          <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-widest text-[11px]">
            <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
            Website Content Overview
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/30 flex flex-col gap-1">
              <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                Services
              </span>
              <span className="text-xl font-black text-indigo-600">
                {statsData.additional?.services || 0}
              </span>
            </div>
            <div className="p-5 rounded-2xl border border-blue-100 bg-blue-50/30 flex flex-col gap-1">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">
                Portfolio
              </span>
              <span className="text-xl font-black text-blue-600">
                {statsData.additional?.portfolios || 0}
              </span>
            </div>
            <div className="p-5 rounded-2xl border border-emerald-100 bg-emerald-50/30 flex flex-col gap-1">
              <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">
                Contacts
              </span>
              <span className="text-xl font-black text-emerald-600">
                {statsData.additional?.contacts || 0}
              </span>
            </div>
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="glass rounded-[2.5rem] p-8 border border-white/40 shadow-sm bg-slate-900 overflow-hidden">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-black text-white flex items-center gap-3 uppercase tracking-widest text-[11px]">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              Recent Digital Correspondence
            </h3>
            <Link
              to="/contacts"
              className="text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-white transition-colors"
            >
              View All
            </Link>
          </div>

          <div className="space-y-4">
            {statsData.recentContacts?.length > 0 ? (
              statsData.recentContacts.map((contact, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 font-black text-xs">
                      {contact.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {contact.name}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium truncate max-w-[150px]">
                        {contact.email}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-20 text-center">
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  No recent inquiries
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
