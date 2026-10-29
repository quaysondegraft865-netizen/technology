import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Save, Check, RotateCcw } from 'lucide-react';

export const SettingsManager: React.FC = () => {
  const { settings, updateSettings, resetToDefaults } = useAdmin();
  const [formData, setFormData] = useState({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to restore original default settings, leads, and services?')) {
      resetToDefaults();
      setFormData({ ...settings });
    }
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white">
            Company & Contact Settings
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage public contact numbers, executive leadership, and business notices.
          </p>
        </div>
        {savedSuccess && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5">
            <Check className="w-4 h-4" />
            <span>Settings Saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Numbers */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-sky-400">
            Public Contact Channels (From Flyer)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Direct Phone Hotline
              </label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Displayed on the flyer header and bottom contact bar.
              </span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Official Business Email
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-1 block">
                Primary inbox for client project notifications.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                WhatsApp Number (International format without +)
              </label>
              <input
                type="text"
                required
                value={formData.whatsappNumber}
                onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Headquarters Location
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Founder & Brand Lockup */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-sky-400">
            Brand Identity & Founder Leadership
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Founder Full Name
              </label>
              <input
                type="text"
                required
                value={formData.founderName}
                onChange={(e) => setFormData({ ...formData, founderName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Executive Title
              </label>
              <input
                type="text"
                required
                value={formData.founderTitle}
                onChange={(e) => setFormData({ ...formData, founderTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Vision Tagline
              </label>
              <input
                type="text"
                value={formData.vision}
                onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Availability Notice (Status Pill)
              </label>
              <input
                type="text"
                value={formData.availabilityNotice}
                onChange={(e) => setFormData({ ...formData, availabilityNotice: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>
        </div>

        {/* Company Secretary Settings */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider text-sky-400">
            Company Secretary & Administration
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Secretary Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Mr. George Blay"
                value={formData.secretaryName || ''}
                onChange={(e) => setFormData({ ...formData, secretaryName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Secretary Position / Title
              </label>
              <input
                type="text"
                placeholder="e.g. Company Secretary & Executive Administration"
                value={formData.secretaryTitle || ''}
                onChange={(e) => setFormData({ ...formData, secretaryTitle: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Secretary Location / Hometown
              </label>
              <input
                type="text"
                placeholder="e.g. Half Assini, Western Region, Ghana"
                value={formData.secretaryLocation || ''}
                onChange={(e) => setFormData({ ...formData, secretaryLocation: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Secretary Telephone (Direct Call & WhatsApp)
              </label>
              <input
                type="text"
                placeholder="e.g. 0551402188"
                value={formData.secretaryPhone || ''}
                onChange={(e) => setFormData({ ...formData, secretaryPhone: e.target.value })}
                className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 font-mono"
              />
            </div>
          </div>

          <div className="text-[11px] text-slate-500">
            Official Secretary Photo: <span className="font-mono text-slate-400">/assets/aistudio/IMG-20261026-WA0029_b23e3555.jpg</span> (active)
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-400 hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl shadow-md transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>

    </div>
  );
};
