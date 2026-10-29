import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Phone, 
  Mail, 
  MessageSquare, 
  Plus, 
  X, 
  CheckCircle2, 
  Download, 
  Trash2, 
  FileText,
  Printer,
  Sliders,
  DollarSign
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { LeadInquiry, LeadStatus } from '../../types';
import { SERVICES_LIST } from '../../data/companyData';
import { DGLogo, BrandLockup } from '../DGLogo';

export const LeadsManager: React.FC = () => {
  const { leads, updateLeadStatus, updateLeadMilestone, addLeadNote, deleteLead, addLead, settings } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [activeLead, setActiveLead] = useState<LeadInquiry | null>(null);
  const [newNoteText, setNewNoteText] = useState('');
  const [isManualModalOpen, setIsManualModalOpen] = useState(false);
  const [quotationModalLead, setQuotationModalLead] = useState<LeadInquiry | null>(null);

  // Milestone edit state inside drawer
  const [editProgress, setEditProgress] = useState<number>(20);
  const [editMilestoneName, setEditMilestoneName] = useState<string>('');
  const [editPaymentStatus, setEditPaymentStatus] = useState<LeadInquiry['paymentStatus']>('Pending Deposit');
  const [milestoneSavedToast, setMilestoneSavedToast] = useState(false);

  // Manual lead form state
  const [manualName, setManualName] = useState('');
  const [manualPhone, setManualPhone] = useState('');
  const [manualEmail, setManualEmail] = useState('');
  const [manualService, setManualService] = useState('Website Development');
  const [manualBudget, setManualBudget] = useState('GH₵15,000 – GH₵30,000');
  const [manualDetails, setManualDetails] = useState('');

  // Synchronize milestone state when active lead opens
  const openLeadDrawer = (lead: LeadInquiry) => {
    setActiveLead(lead);
    setEditProgress(lead.milestoneProgress || 20);
    setEditMilestoneName(lead.currentMilestone || 'Phase 1: Project Scope Intake & Discovery Assessment');
    setEditPaymentStatus(lead.paymentStatus || 'Pending Deposit');
    setMilestoneSavedToast(false);
  };

  const handleSaveMilestone = (leadId: string) => {
    updateLeadMilestone(leadId, editProgress, editMilestoneName, editPaymentStatus);
    setMilestoneSavedToast(true);
    setTimeout(() => setMilestoneSavedToast(false), 2000);
  };

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesStatus = selectedStatus === 'All' || lead.status === selectedStatus;
      const q = searchQuery.toLowerCase().trim();
      const matchesQuery = 
        !q ||
        lead.name.toLowerCase().includes(q) ||
        lead.phone.includes(q) ||
        lead.email.toLowerCase().includes(q) ||
        lead.refCode.toLowerCase().includes(q) ||
        lead.service.toLowerCase().includes(q) ||
        lead.details.toLowerCase().includes(q);
      return matchesStatus && matchesQuery;
    });
  }, [leads, selectedStatus, searchQuery]);

  // Lead metrics
  const stats = useMemo(() => {
    const total = leads.length;
    const newCount = leads.filter((l) => l.status === 'New').length;
    const inDiscovery = leads.filter((l) => l.status === 'In Discovery' || l.status === 'Proposal Sent').length;
    const wonCount = leads.filter((l) => l.status === 'Won / Active').length;
    return { total, newCount, inDiscovery, wonCount };
  }, [leads]);

  const handleAddManualLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualName.trim() || !manualPhone.trim() || !manualDetails.trim()) return;

    addLead({
      name: manualName,
      phone: manualPhone,
      email: manualEmail || 'Not provided',
      service: manualService,
      budget: manualBudget,
      details: manualDetails,
    });

    setManualName('');
    setManualPhone('');
    setManualEmail('');
    setManualDetails('');
    setIsManualModalOpen(false);
  };

  const handleAddNote = (leadId: string) => {
    if (!newNoteText.trim()) return;
    addLeadNote(leadId, newNoteText);
    setNewNoteText('');
    const updated = leads.find((l) => l.id === leadId);
    if (updated) {
      setActiveLead({
        ...updated,
        internalNotes: [...(updated.internalNotes || []), `[${new Date().toLocaleDateString()}] ${newNoteText}`]
      });
    }
  };

  const exportLeadsCSV = () => {
    const headers = ['Ref Code', 'Name', 'Phone', 'Email', 'Service', 'Status', 'Budget', 'Progress', 'Created Date', 'Details'];
    const rows = leads.map((l) => [
      `"${l.refCode}"`,
      `"${l.name}"`,
      `"${l.phone}"`,
      `"${l.email}"`,
      `"${l.service}"`,
      `"${l.status}"`,
      `"${l.estimatedBudget || ''}"`,
      `"${l.milestoneProgress || 0}%"`,
      `"${new Date(l.createdAt).toLocaleDateString()}"`,
      `"${l.details.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `degraft_technologies_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: LeadStatus) => {
    switch (status) {
      case 'New':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-sky-900/40 text-sky-300 border border-sky-500/30">New</span>;
      case 'In Discovery':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-900/40 text-amber-300 border border-amber-500/30">In Discovery</span>;
      case 'Proposal Sent':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-purple-900/40 text-purple-300 border border-purple-500/30">Proposal Sent</span>;
      case 'Won / Active':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-900/40 text-emerald-300 border border-emerald-500/30">Won / Active</span>;
      case 'Closed':
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-400 border border-slate-700">Closed</span>;
      default:
        return <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-800 text-slate-300">{status}</span>;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="text-xs font-medium text-slate-400 mb-1">Total Inbound Leads</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tabular-nums tracking-tight">
            {stats.total}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">All time records</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="text-xs font-medium text-sky-400 mb-1">New / Action Required</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-sky-400 tabular-nums tracking-tight">
            {stats.newCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Awaiting discovery call</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="text-xs font-medium text-amber-400 mb-1">In Discovery & Proposal</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tabular-nums tracking-tight">
            {stats.inDiscovery}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Active negotiation pipeline</div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
          <div className="text-xs font-medium text-emerald-400 mb-1">Won / Active Projects</div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tabular-nums tracking-tight">
            {stats.wonCount}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Currently in engineering</div>
        </div>
      </div>

      {/* Control Bar: Search, Filters & Action Buttons */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search leads by name, phone, email, ref..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-500 focus:outline-none focus:border-sky-500"
          />
        </div>

        {/* Status Filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {['All', 'New', 'In Discovery', 'Proposal Sent', 'Won / Active', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setSelectedStatus(st)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedStatus === st
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={exportLeadsCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            title="Download CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>

          <button
            onClick={() => setIsManualModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 shadow-md transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Inbound Lead</span>
          </button>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Ref Code</th>
                <th className="py-3.5 px-4 font-semibold">Client Name</th>
                <th className="py-3.5 px-4 font-semibold">Phone / WhatsApp</th>
                <th className="py-3.5 px-4 font-semibold">Service</th>
                <th className="py-3.5 px-4 font-semibold">Progress</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    onClick={() => openLeadDrawer(lead)}
                    className="hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="py-3.5 px-4 font-mono font-semibold text-sky-400 whitespace-nowrap">
                      {lead.refCode}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-white whitespace-nowrap">
                      {lead.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-300 whitespace-nowrap">
                      {lead.phone}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                      {lead.service}
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{ width: `${lead.milestoneProgress || 20}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-slate-400 tabular-nums">
                          {lead.milestoneProgress || 20}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {getStatusBadge(lead.status)}
                    </td>
                    <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setQuotationModalLead(lead)}
                          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title="Generate Official Quotation PDF"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                        <a
                          href={`tel:${lead.phone}`}
                          className="p-1.5 text-slate-400 hover:text-sky-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title={`Call ${lead.name}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                        <a
                          href={`https://wa.me/${lead.phone.replace(/^0/, '233')}?text=Hello%20${encodeURIComponent(lead.name)},%20this%20is%20Quayson%20De-Graft%20from%20De-Graft%20Technologies%20regarding%20your%20project%20inquiry%20${lead.refCode}.`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors"
                          title={`WhatsApp ${lead.name}`}
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                        </a>
                        <button
                          onClick={() => openLeadDrawer(lead)}
                          className="px-2.5 py-1 text-[11px] font-semibold text-sky-400 bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/30 rounded-lg transition-colors"
                        >
                          Manage
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

      {/* Lead Detail & Management Drawer / Modal */}
      {activeLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setActiveLead(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-2xl w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8 max-h-[92vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-800 mb-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-sm font-bold text-sky-400">
                    {activeLead.refCode}
                  </span>
                  <span>·</span>
                  {getStatusBadge(activeLead.status)}
                </div>
                <h3 className="text-xl font-bold text-white">
                  {activeLead.name}
                </h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setQuotationModalLead(activeLead)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Generate Quotation</span>
                </button>
                <button
                  onClick={() => setActiveLead(null)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="space-y-6 overflow-y-auto pr-1">
              
              {/* Quick Communication Actions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href={`tel:${activeLead.phone}`}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-sky-500 hover:text-sky-300 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-400" />
                  <span>Call {activeLead.phone}</span>
                </a>

                <a
                  href={`https://wa.me/${activeLead.phone.replace(/^0/, '233')}?text=Hello%20${encodeURIComponent(activeLead.name)},%20this%20is%20Quayson%20De-Graft%20from%20De-Graft%20Technologies%20regarding%20your%20project%20inquiry%20${activeLead.refCode}.`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold hover:bg-emerald-900/60 transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-400" />
                  <span>WhatsApp Client</span>
                </a>

                <a
                  href={`mailto:${activeLead.email}?subject=De-Graft%20Technologies%20—%20Proposal%20for%20${encodeURIComponent(activeLead.service)}%20(${activeLead.refCode})`}
                  className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 text-xs font-semibold hover:border-sky-500 hover:text-sky-300 transition-colors truncate"
                >
                  <Mail className="w-4 h-4 text-sky-400" />
                  <span className="truncate">Email Client</span>
                </a>
              </div>

              {/* Status Update selector */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Update Lead Pipeline Status:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['New', 'In Discovery', 'Proposal Sent', 'Won / Active', 'Closed'] as LeadStatus[]).map((st) => (
                    <button
                      key={st}
                      type="button"
                      onClick={() => {
                        updateLeadStatus(activeLead.id, st);
                        setActiveLead({ ...activeLead, status: st });
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        activeLead.status === st
                          ? 'bg-sky-600 text-white shadow-sm'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Milestone & Live Project Tracking Editor */}
              <div className="p-4 rounded-xl bg-slate-950 border border-sky-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      Live Client Project Tracker Controls
                    </span>
                  </div>
                  {milestoneSavedToast && (
                    <span className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Live Tracker Updated!</span>
                    </span>
                  )}
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5">
                    <span className="text-slate-400">Engineering Completion:</span>
                    <span className="font-mono font-bold text-sky-400">{editProgress}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={editProgress}
                    onChange={(e) => setEditProgress(Number(e.target.value))}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div>
                  <label className="block text-xs text-slate-400 mb-1">
                    Current Milestone Description (Visible on Client Tracker):
                  </label>
                  <input
                    type="text"
                    value={editMilestoneName}
                    onChange={(e) => setEditMilestoneName(e.target.value)}
                    placeholder="e.g. Phase 3: Mobile Money API & Dispatch Gateway..."
                    className="w-full px-3 py-2 text-xs bg-slate-900 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="text-slate-400">Payment:</span>
                    <select
                      value={editPaymentStatus}
                      onChange={(e) => setEditPaymentStatus(e.target.value as any)}
                      className="px-2 py-1 text-xs bg-slate-900 border border-slate-800 text-white rounded-lg focus:outline-none"
                    >
                      <option value="Pending Deposit">Pending Deposit</option>
                      <option value="Deposit Paid">Deposit Paid (50%)</option>
                      <option value="Milestone 2 Active">Milestone 2 Active</option>
                      <option value="Fully Settled">Fully Settled</option>
                    </select>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleSaveMilestone(activeLead.id)}
                    className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 transition-colors shadow-sm"
                  >
                    Save & Update Tracker
                  </button>
                </div>
              </div>

              {/* Project Scope & Requirements */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Target Service:</span>
                  <span className="font-bold text-white">{activeLead.service}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Estimated Budget (Ghana Cedis):</span>
                  <span className="font-semibold text-emerald-400">{activeLead.estimatedBudget || 'Not specified'}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Submission Timestamp:</span>
                  <span className="text-slate-300 tabular-nums">
                    {new Date(activeLead.createdAt).toLocaleString()}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <div className="text-xs text-slate-400 mb-1 font-semibold">Client Project Specifications:</div>
                  <p className="text-xs text-slate-200 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-850 whitespace-pre-line">
                    {activeLead.details}
                  </p>
                </div>
              </div>

              {/* Internal Notes History */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Internal Engineering & Meeting Notes:
                </div>

                <div className="space-y-2 max-h-36 overflow-y-auto">
                  {(activeLead.internalNotes && activeLead.internalNotes.length > 0) ? (
                    activeLead.internalNotes.map((note, idx) => (
                      <div key={idx} className="text-xs text-slate-300 p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                        {note}
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-slate-500 italic">No notes added yet.</div>
                  )}
                </div>

                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Add an internal note or meeting summary..."
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddNote(activeLead.id)}
                    className="flex-1 px-3 py-2 text-xs bg-slate-900 border border-slate-800 text-white rounded-lg focus:outline-none focus:border-sky-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddNote(activeLead.id)}
                    className="px-3 py-2 text-xs font-semibold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors"
                  >
                    Add Note
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-800 mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Are you sure you want to delete lead ${activeLead.refCode}?`)) {
                    deleteLead(activeLead.id);
                    setActiveLead(null);
                  }
                }}
                className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Lead</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveLead(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Official Quotation / Proposal Sheet Modal */}
      {quotationModalLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-150 overflow-y-auto"
          onClick={() => setQuotationModalLead(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-3xl w-full bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden p-8 sm:p-12 my-8 border border-slate-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Action Bar (Top) */}
            <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-8 print:hidden">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                Official Quotation Document Preview
              </span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0A1C36] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <Printer className="w-4 h-4 text-sky-400" />
                  <span>Print / Save as PDF</span>
                </button>
                <button
                  onClick={() => setQuotationModalLead(null)}
                  className="p-2 text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Document Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-8 border-b-2 border-slate-900">
              <div className="flex items-center gap-3">
                <DGLogo size={42} />
                <BrandLockup light={false} />
              </div>
              <div className="text-left sm:text-right text-xs text-slate-600">
                <div className="font-bold text-slate-900 uppercase">Engineering Headquarters</div>
                <div>Accra, Ghana</div>
                <div>Hotline: {settings.phone}</div>
                <div>Email: {settings.email}</div>
              </div>
            </div>

            {/* Document Title & Reference */}
            <div className="my-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
                  Formal Software Development Proposal
                </div>
                <h3 className="text-2xl font-black text-[#0A1C36] tracking-tight">
                  PROJECT SPECIFICATION & QUOTATION
                </h3>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono">
                <div>Quote Ref: <strong>INV-{quotationModalLead.refCode}</strong></div>
                <div>Date: {new Date().toLocaleDateString()}</div>
                <div>Currency: <strong>Ghana Cedis (GH₵)</strong></div>
              </div>
            </div>

            {/* Client Info */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <div className="text-slate-500 font-semibold mb-1">PREPARED FOR:</div>
                <div className="text-sm font-bold text-slate-900">{quotationModalLead.name}</div>
                <div className="text-slate-600 font-mono">{quotationModalLead.phone}</div>
                <div className="text-slate-600">{quotationModalLead.email}</div>
              </div>
              <div>
                <div className="text-slate-500 font-semibold mb-1">TECHNICAL LEAD:</div>
                <div className="text-sm font-bold text-slate-900">{settings.founderName} ({settings.phone})</div>
                <div className="text-slate-600">{settings.founderTitle}</div>
                <div className="text-slate-600 mt-1">
                  <strong>Company Secretary:</strong> {settings.secretaryName || 'Mr. George Blay'} · Tel: <span className="font-mono">{settings.secretaryPhone || '0551402188'}</span> ({settings.secretaryLocation || 'Half Assini'})
                </div>
              </div>
            </div>

            {/* Scope Deliverables Table */}
            <div className="mb-8">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 uppercase font-bold text-[10px] tracking-wider border-y border-slate-300">
                    <th className="py-2.5 px-3">Milestone Deliverable</th>
                    <th className="py-2.5 px-3">Phase Description</th>
                    <th className="py-2.5 px-3 text-right">Payment Split</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-3 px-3 font-bold text-slate-900">Milestone 1: Mobilization & Architecture</td>
                    <td className="py-3 px-3 text-slate-600">Requirement analysis, clickable Figma prototype, database schema modeling, and repository initialization.</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">50% Upfront</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-slate-900">Milestone 2: Functional Core & APIs</td>
                    <td className="py-3 px-3 text-slate-600">Full-stack feature engineering, MTN MoMo / Card integration, SMS gateway, and client demo review.</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">30% Milestone</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-bold text-slate-900">Milestone 3: Deployment & Signoff</td>
                    <td className="py-3 px-3 text-slate-600">Quality assurance, cloud server deployment, SSL configuration, team onboarding, and source code handover.</td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-slate-900">20% Signoff</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Total Budget Card */}
            <div className="p-5 rounded-xl bg-slate-900 text-white flex items-center justify-between mb-8">
              <div>
                <div className="text-xs text-slate-400">Total Agreed Contract Sum:</div>
                <div className="text-2xl font-black text-sky-400 font-mono tracking-tight">
                  {quotationModalLead.estimatedBudget || 'GH₵25,000'}
                </div>
              </div>
              <div className="text-right text-xs text-slate-300">
                <div>Includes 3 Months Technical Warranty</div>
                <div>Full Intellectual Property Handover</div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 text-xs mb-8">
              <div className="font-bold text-slate-900 mb-2 uppercase tracking-wide">
                Official Payment Details:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
                <div>Mobile Money: <strong>{settings.phone}</strong> (MTN MoMo - Quayson De-Graft)</div>
                <div>Bank Transfer: Available upon request</div>
                <div>Payment Reference: <strong>INV-{quotationModalLead.refCode}</strong></div>
              </div>
            </div>

            {/* Signatures */}
            <div className="pt-8 border-t border-slate-200 grid grid-cols-2 gap-8 text-xs text-slate-700">
              <div>
                <div className="h-10 border-b border-slate-300 mb-1 flex items-end font-handwriting text-xl text-blue-900 font-bold">
                  {settings.founderName}
                </div>
                <div className="font-bold">{settings.founderName}</div>
                <div className="text-slate-500">{settings.founderTitle}</div>
              </div>
              <div>
                <div className="h-10 border-b border-slate-300 mb-1 flex items-end font-handwriting text-xl text-blue-900 font-bold">
                  {settings.secretaryName || 'Mr. George Blay'}
                </div>
                <div className="font-bold">{settings.secretaryName || 'Mr. George Blay'}</div>
                <div className="text-slate-500">Company Secretary & Corporate Administration</div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Manual Inbound Lead Modal */}
      {isManualModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-150"
          onClick={() => setIsManualModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-lg w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="text-lg font-bold text-white">
                Record Inbound Client Lead
              </h3>
              <button
                onClick={() => setIsManualModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddManualLead} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Client Full Name <span className="text-sky-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Anthony Arthur"
                  value={manualName}
                  onChange={(e) => setManualName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Phone Number <span className="text-sky-400">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0244XXXXXX"
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. client@domain.com"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Service Required
                  </label>
                  <select
                    value={manualService}
                    onChange={(e) => setManualService(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                  >
                    {SERVICES_LIST.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="Custom Enterprise Solution">Custom Enterprise Solution</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Estimated Budget in Ghana Cedis
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GH₵15,000 – GH₵30,000"
                    value={manualBudget}
                    onChange={(e) => setManualBudget(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Project Notes / Scope <span className="text-sky-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Notes from call or consultation..."
                  value={manualDetails}
                  onChange={(e) => setManualDetails(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs bg-slate-950 border border-slate-800 text-white rounded-xl focus:outline-none focus:border-sky-500 resize-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsManualModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-xl"
                >
                  Save Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
