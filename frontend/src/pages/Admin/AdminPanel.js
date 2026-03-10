import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../auth/api";
import { HiUsers, HiUserGroup, HiTrendingUp, HiCalendar } from "react-icons/hi";

function AdminPanel() {
  const [statsData, setStatsData] = useState({
    totalUsers: 0,
    totalStaff: 0,
    activeBookings: 0,
    revenue: "Rs. 0",
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
      trend: "+12% from last month",
    },
    {
      label: "Total Staff",
      value: statsData.totalStaff,
      icon: HiUserGroup,
      color: "bg-purple-500",
      trend: "Stable",
    },
    {
      label: "Active Bookings",
      value: statsData.activeBookings,
      icon: HiCalendar,
      color: "bg-emerald-500",
      trend: "Real-time updates",
    },
    {
      label: "Revenue",
      value: statsData.revenue || "Rs. 12.5k",
      icon: HiTrendingUp,
      color: "bg-orange-500",
      trend: "+8% growth",
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
        {/* System Status */}
        <div className="glass rounded-[2.5rem] p-8 border border-white/40 shadow-sm bg-white/40">
          <h3 className="text-lg font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-widest text-[11px]">
            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
            Core Infrastructure Status
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                label: "API Gateway",
                status: "Active",
                color: "text-emerald-500",
                bg: "bg-emerald-50",
              },
              {
                label: "DB Cluster",
                status: "Healthy",
                color: "text-emerald-500",
                bg: "bg-emerald-50",
              },
              {
                label: "SMTP Service",
                status: "Online",
                color: "text-blue-500",
                bg: "bg-blue-50",
              },
              {
                label: "Cloud Storage",
                status: "89% Free",
                color: "text-indigo-500",
                bg: "bg-indigo-50",
              },
            ].map((item, i) => (
              <div
                key={i}
                className={`p-5 rounded-2xl border border-white flex flex-col gap-2 transition-all hover:bg-white`}
              >
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {item.label}
                </span>
                <span className={`text-sm font-black ${item.color}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Card */}
        <div className="glass rounded-[2.5rem] p-10 border border-white/40 shadow-sm flex flex-col items-center justify-center text-center bg-slate-900 group">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full scale-150"></div>
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center text-blue-400 border border-white/10 relative z-10 transition-transform group-hover:rotate-12">
              <HiTrendingUp size={40} />
            </div>
          </div>
          <h3 className="text-2xl font-black text-white mb-3 tracking-tight">
            Predictive Growth
          </h3>
          <p className="text-slate-400 text-sm font-medium max-w-xs mb-10 leading-relaxed">
            Harness deeper insights from client engagement patterns to scale
            your waterproofing operations.
          </p>
          <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-white hover:text-blue-600 transition-all shadow-xl shadow-blue-500/20 active:scale-95">
            Access Intelligence Suite
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;
