import React, { useState, useEffect } from "react";
import {
  HiClock,
  HiCheckCircle,
  HiXCircle,
  HiBadgeCheck,
  HiLightningBolt,
  HiRefresh,
  HiArrowRight,
  HiCollection,
} from "react-icons/hi";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function StaffPanel() {
  const [stats, setStats] = useState({
    pending: 0,
    accepted: 0,
    rejected: 0,
    completed: 0,
    totalAssigned: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const token = Cookies.get("accessToken");
      const response = await axios.get(`${process.env.REACT_APP_API_URL || `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}`}/api/staffStats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching staff stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Pending Review",
      value: stats.pending,
      icon: HiClock,
      color: "amber",
      path: "/staffs/assignedUsers",
      description: "Tasks awaiting your initial assessment",
    },
    {
      label: "Active Operations",
      value: stats.accepted,
      icon: HiCheckCircle,
      color: "emerald",
      path: "/staffs/acceptAssigned",
      description: "Projects currently under implementation",
    },
    {
      label: "On Hold / Issues",
      value: stats.rejected,
      icon: HiXCircle,
      color: "red",
      path: "/staffs/rejectAssigned",
      description: "Tasks stalled or requiring clarification",
    },
    {
      label: "Finalized Jobs",
      value: stats.completed,
      icon: HiBadgeCheck,
      color: "blue",
      path: "/staffs/completedAssigned",
      description: "Successfully archived field operations",
    },
  ];

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
          Synchronizing Operations...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <Fade direction="down" triggerOnce>
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider mb-4 border border-blue-100">
              <HiLightningBolt className="animate-pulse" /> System Active
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight mb-2">
              Operational Overview
            </h1>
            <p className="text-slate-500 font-medium text-sm">
              Quantifying field performance and structural milestones.
            </p>
          </div>
        </Fade>

        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all shadow-sm active:scale-95 group"
        >
          <HiRefresh className="group-hover:rotate-180 transition-transform duration-500" />{" "}
          Refresh Metrics
        </button>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <Fade key={index} delay={index * 100} direction="up" triggerOnce>
            <Link to={card.path} className="group h-full">
              <div className="glass h-full bg-white/40 p-6 rounded-[2rem] border border-white hover:border-blue-200 hover:shadow-2xl hover:shadow-blue-200/20 transition-all duration-500 flex flex-col justify-between overflow-hidden relative">
                {/* Decorative background icon */}
                <card.icon
                  className={`absolute -right-4 -top-4 text-${card.color}-500 opacity-5 group-hover:opacity-10 transition-opacity`}
                  size={120}
                />

                <div className="relative z-10">
                  <div
                    className={`w-12 h-12 bg-${card.color}-50 text-${card.color}-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}
                  >
                    <card.icon size={26} />
                  </div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    {card.label}
                  </p>
                  <h3 className="text-4xl font-black text-slate-900 mb-4">
                    {card.value}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="mt-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 group-hover:translate-x-2 transition-transform duration-300">
                  Open Register <HiArrowRight />
                </div>
              </div>
            </Link>
          </Fade>
        ))}
      </div>

      {/* Secondary Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          <Fade direction="left" triggerOnce>
            <div className="glass bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl">
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="shrink-0">
                  <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-[2rem] border border-white/10 flex items-center justify-center">
                    <HiCollection size={40} className="text-blue-400" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-black mb-3">
                    Total Assignments Logged
                  </h2>
                  <p className="text-blue-200/60 font-medium leading-relaxed max-w-lg mb-6 text-sm">
                    You have successfully handled{" "}
                    <span className="text-white font-bold">
                      {stats.totalAssigned}
                    </span>{" "}
                    field requests since your activation in the system. Your
                    technical feedback is vital to our structural integrity
                    protocols.
                  </p>
                  <div className="flex gap-4">
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      Efficiency: 98.4%
                    </div>
                    <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest">
                      Active Site: Naya Baneshwor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fade>
        </div>

        <div className="lg:col-span-4 h-full">
          <Fade direction="right" triggerOnce className="h-full">
            <div className="glass bg-white/40 border border-white rounded-[2.5rem] p-8 h-full shadow-lg">
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6">
                Field Guidelines
              </h4>
              <ul className="space-y-4">
                {[
                  "Always document pre-application moisture levels.",
                  "Verify material batch numbers before mixing.",
                  "Upload high-resolution progress captures.",
                  "Notify system of any structural anomalies.",
                ].map((note, i) => (
                  <li key={i} className="flex gap-4 items-start group">
                    <div className="w-5 h-5 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors text-[10px] font-black">
                      {i + 1}
                    </div>
                    <p className="text-xs text-slate-500 font-bold leading-relaxed">
                      {note}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default StaffPanel;
