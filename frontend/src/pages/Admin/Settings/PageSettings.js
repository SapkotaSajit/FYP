import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchWithAuth } from "../../../auth/api";
import {
  HiAdjustments,
  HiCheckCircle,
  HiXCircle,
  HiLightningBolt,
} from "react-icons/hi";

function PageSettings() {
  const [settings, setSettings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetchWithAuth("GET", "page-settings");
      setSettings(response.data || []);
    } catch (error) {
      toast.error("Failed to load page settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      const response = await fetchWithAuth("PUT", `page-settings/${id}`, {
        is_active: !currentStatus,
      });
      if (response.status === 200) {
        setSettings(
          settings.map((s) =>
            s.id === id ? { ...s, is_active: !currentStatus } : s,
          ),
        );
        toast.success(
          `${response.data.setting.display_name} visibility updated`,
        );
      }
    } catch (error) {
      toast.error("Failed to update page visibility");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
          <HiAdjustments className="text-blue-600" />
          Page Visibility Settings
        </h2>
        <p className="text-slate-500 font-medium mt-1">
          Control which pages are visible to the public on the main website.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((setting) => (
          <div
            key={setting.id}
            className={`p-6 rounded-[2rem] border transition-all duration-300 ${
              setting.is_active
                ? "bg-white border-blue-100 shadow-xl shadow-blue-500/5 rotate-0"
                : "bg-slate-50 border-slate-200 grayscale opacity-80 scale-[0.98]"
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-600">
                <HiLightningBolt size={24} />
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={setting.is_active}
                  onChange={() => handleToggle(setting.id, setting.is_active)}
                />
                <div className="w-14 h-7 bg-slate-200 peer-focus:outline-none ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 shadow-inner"></div>
              </label>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mb-1">
              {setting.display_name}
            </h3>
            <p className="text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">
              {setting.page_key} page
            </p>

            <div className="flex items-center gap-2">
              {setting.is_active ? (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 px-3 py-1 bg-emerald-50 rounded-full">
                  <HiCheckCircle /> Visible
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-400 px-3 py-1 bg-slate-100 rounded-full">
                  <HiXCircle /> Hidden
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PageSettings;
