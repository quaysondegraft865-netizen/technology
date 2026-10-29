import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { PortfolioProject } from '../../types';
import { Plus, Edit2, Trash2, CheckCircle2, X, ExternalLink } from 'lucide-react';

export const PortfolioManager: React.FC = () => {
  const { portfolio, addPortfolioProject, updatePortfolioProject, deletePortfolioProject } = useAdmin();
  const [modalMode, setModalMode] = useState<'create' | 'edit' | null>(null);
  const [activeProject, setActiveProject] = useState<PortfolioProject | null>(null);

  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState('Website & UI/UX Design');
  const [formClient, setFormClient] = useState('');
  const [formDescription, setFormDescription] = useState('');
  const [formImpact, setFormImpact] = useState('');
  const [formStack, setFormStack] = useState('');

  const openCreateModal = () => {
    setFormTitle('');
    setFormCategory('Software Systems & Database');
    setFormClient('');
    setFormDescription('');
    setFormImpact('');
    setFormStack('React, Node.js, PostgreSQL');
    setActiveProject(null);
    setModalMode('create');
  };

  const openEditModal = (proj: PortfolioProject) => {
    setActiveProject(proj);
    setFormTitle(proj.title);
    setFormCategory(proj.category);
    setFormClient(proj.client);
    setFormDescription(proj.description);
    setFormImpact(proj.impact);
    setFormStack(proj.stack.join(', '));
    setModalMode('edit');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDescription.trim()) return;

    const stackArray = formStack.split(',').map((s) => s.trim()).filter(Boolean);

    if (modalMode === 'create') {
      addPortfolioProject({
        title: formTitle,
        category: formCategory,
        client: formClient || 'Confidential Client',
        description: formDescription,
        impact: formImpact || 'Streamlined operations & reduced error rates',
        stack: stackArray,
      });
    } else if (modalMode === 'edit' && activeProject) {
      updatePortfolioProject({
        ...activeProject,
        title: formTitle,
        category: formCategory,
        client: formClient,
        description: formDescription,
        impact: formImpact,
        stack: stackArray,
      });
    }

    setModalMode(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Bar */}
      <div className="flex items-center justify-between p-5 rounded-2xl bg-slate-900 border border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white">
            Client Solutions & Case Studies
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Manage showcase projects displayed in the "Recent Client Solutions" section.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Case Study</span>
        </button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {portfolio.map((proj) => (
          <div
            key={proj.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-semibold text-sky-400 uppercase tracking-wide">
                  {proj.category}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => openEditModal(proj)}
                    className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                    title="Edit project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${proj.title}"?`)) {
                        deletePortfolioProject(proj.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-400 rounded-lg hover:bg-slate-800 transition-colors"
                    title="Delete project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mb-1.5 leading-snug">
                {proj.title}
              </h3>

              <div className="text-xs text-slate-400 mb-3 font-medium">
                Client: {proj.client}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {proj.description}
              </p>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 text-xs text-slate-300 mb-4 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span><strong>Impact:</strong> {proj.impact}</span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex flex-wrap gap-1">
              {proj.stack.map((s, idx) => (
                <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 font-mono">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalMode && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setModalMode(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-base font-bold text-white">
                {modalMode === 'create' ? 'Add New Client Solution' : 'Edit Solution'}
              </h3>
              <button
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Title <span className="text-sky-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Multi-Branch Wholesale Invoicing System"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                  >
                    <option value="Software Systems & Database">Software Systems & Database</option>
                    <option value="Website & UI/UX Design">Website & UI/UX Design</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="IT Consulting & Cloud">IT Consulting & Cloud</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Client Name or Sector
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Logistics Network / Private Clinic"
                    value={formClient}
                    onChange={(e) => setFormClient(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Overview <span className="text-sky-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="What does this software system do?"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Measurable Impact
                </label>
                <input
                  type="text"
                  placeholder="e.g. Cut invoice processing time from 4 hours to 10 minutes"
                  value={formImpact}
                  onChange={(e) => setFormImpact(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Tech Stack (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, PostgreSQL, Docker"
                  value={formStack}
                  onChange={(e) => setFormStack(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 font-mono"
                />
              </div>

              <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl"
                >
                  {modalMode === 'create' ? 'Publish Project' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
