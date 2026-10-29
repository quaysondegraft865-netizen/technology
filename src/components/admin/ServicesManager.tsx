import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ServiceItem } from '../../types';
import { Check, Edit2, Plus, Trash2, ArrowRight } from 'lucide-react';
import { 
  WebsiteIcon, 
  MobileIcon, 
  SoftwareIcon, 
  DatabaseIcon, 
  UIUXIcon, 
  ConsultingIcon 
} from '../FlyerIcons';

export const ServicesManager: React.FC = () => {
  const { services, updateService } = useAdmin();
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [saveToast, setSaveToast] = useState(false);

  const renderServiceIcon = (type: string) => {
    switch (type) {
      case 'website': return <WebsiteIcon size={32} className="text-[#0066CC]" />;
      case 'mobile': return <MobileIcon size={32} className="text-[#0066CC]" />;
      case 'software': return <SoftwareIcon size={32} className="text-[#0066CC]" />;
      case 'database': return <DatabaseIcon size={32} className="text-[#0066CC]" />;
      case 'uiux': return <UIUXIcon size={32} className="text-[#0066CC]" />;
      case 'consulting': return <ConsultingIcon size={32} className="text-[#0066CC]" />;
      default: return <SoftwareIcon size={32} className="text-[#0066CC]" />;
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    updateService(editingService);
    setEditingService(null);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white">
            Core Service Offerings
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage the 6 engineering capabilities displayed on the public flyer website.
          </p>
        </div>
        {saveToast && (
          <div className="px-3 py-1.5 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-1.5 animate-in fade-in">
            <Check className="w-4 h-4" />
            <span>Service Updated on Live Website</span>
          </div>
        )}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  {renderServiceIcon(srv.icon)}
                </div>
                <button
                  onClick={() => setEditingService({ ...srv })}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
                >
                  <Edit2 className="w-3 h-3 text-sky-400" />
                  <span>Edit</span>
                </button>
              </div>

              <h3 className="text-base font-bold text-white mb-1.5">
                {srv.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                {srv.shortDesc}
              </p>

              <div className="mb-4">
                <div className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1.5">
                  Deliverables ({srv.deliverables.length})
                </div>
                <ul className="text-[11px] text-slate-300 space-y-1">
                  {srv.deliverables.slice(0, 3).map((d, i) => (
                    <li key={i} className="truncate flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-sky-400"></span>
                      <span className="truncate">{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-1">
              {srv.techStack.map((tech, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setEditingService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-xl w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-base font-bold text-white">
                Edit Service: {editingService.title}
              </h3>
              <button
                onClick={() => setEditingService(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Service Title
                </label>
                <input
                  type="text"
                  required
                  value={editingService.title}
                  onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Flyer Short Summary (shown on main services grid)
                </label>
                <input
                  type="text"
                  required
                  value={editingService.shortDesc}
                  onChange={(e) => setEditingService({ ...editingService, shortDesc: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Full Description (shown in modal details)
                </label>
                <textarea
                  rows={3}
                  required
                  value={editingService.fullDesc}
                  onChange={(e) => setEditingService({ ...editingService, fullDesc: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deliverables (one per line)
                </label>
                <textarea
                  rows={4}
                  value={editingService.deliverables.join('\n')}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    deliverables: e.target.value.split('\n').filter(Boolean)
                  })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  value={editingService.techStack.join(', ')}
                  onChange={(e) => setEditingService({
                    ...editingService,
                    techStack: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  })}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl"
                >
                  Save & Publish
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
