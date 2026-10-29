import React, { useState } from 'react';
import { useAdmin } from '../context/AdminContext';
import { Search, CheckCircle2, Clock, ShieldCheck, UserCheck, ArrowRight, MessageSquare, AlertCircle } from 'lucide-react';
import { LeadInquiry } from '../types';

export const ProjectTracker: React.FC = () => {
  const { leads, settings } = useAdmin();
  const [searchCode, setSearchCode] = useState('');
  const [searchedLead, setSearchedLead] = useState<LeadInquiry | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    const cleaned = searchCode.trim().toUpperCase();
    const found = leads.find((l) => l.refCode.toUpperCase() === cleaned);
    setSearchedLead(found || null);
    setHasSearched(true);
  };

  const handleSelectDemo = (code: string) => {
    setSearchCode(code);
    const found = leads.find((l) => l.refCode.toUpperCase() === code.toUpperCase());
    setSearchedLead(found || null);
    setHasSearched(true);
  };

  const stages = [
    { number: '01', title: 'Intake & Discovery', minProgress: 20 },
    { number: '02', title: 'Architecture & UI/UX', minProgress: 45 },
    { number: '03', title: 'Engineering & DB', minProgress: 75 },
    { number: '04', title: 'Testing & Launch', minProgress: 100 },
  ];

  return (
    <section id="tracker" className="py-20 bg-slate-900/60 border-t border-slate-800 text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-sky-400 uppercase tracking-widest mb-2">
            <Clock className="w-3.5 h-3.5" />
            <span>Client Live Project Tracker</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Track Your Software Build Live
          </h2>
          <p className="mt-2 text-slate-400 text-sm leading-relaxed">
            Every project at De-Graft Technologies has a transparent tracking code. Enter your reference 
            to check engineering milestone progress, assigned leads, and delivery timelines.
          </p>

          {/* Quick Demo Test Pills */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs">
            <span className="text-slate-500">Try demo codes:</span>
            {['DGT-7104', 'DGT-8491', 'DGT-6239', 'DGT-5112'].map((code) => (
              <button
                key={code}
                onClick={() => handleSelectDemo(code)}
                className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-sky-300 font-mono text-[11px] border border-slate-700 transition-colors"
              >
                {code}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="flex gap-2 p-1.5 rounded-2xl bg-slate-950 border border-slate-800 shadow-xl">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                required
                placeholder="Enter Project Ref Code (e.g. DGT-7104)..."
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-xs text-white bg-transparent placeholder:text-slate-600 focus:outline-none uppercase font-mono tracking-wider"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors flex items-center gap-1.5"
            >
              <span>Track Build</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Search Result Display */}
        {hasSearched && (
          <div className="max-w-3xl mx-auto animate-in fade-in duration-200">
            {searchedLead ? (
              <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl">
                
                {/* Result Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800/80 gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm font-bold text-sky-400">
                        {searchedLead.refCode}
                      </span>
                      <span className="text-slate-600">·</span>
                      <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-950 border border-sky-500/30 text-sky-300 font-semibold">
                        {searchedLead.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      {searchedLead.service} System Build
                    </h3>
                    <div className="text-xs text-slate-400">
                      Client Organization: <strong className="text-slate-200">{searchedLead.name}</strong>
                    </div>
                  </div>

                  <div className="text-left sm:text-right">
                    <div className="text-xs text-slate-400">Estimated Delivery:</div>
                    <div className="text-sm font-bold text-emerald-400 tabular-nums">
                      {searchedLead.estimatedCompletionDate || 'On Schedule (Under Review)'}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Budget: {searchedLead.estimatedBudget || 'Standard Contract'}
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="text-slate-300 font-semibold">
                      Engineering Completion Progress
                    </span>
                    <span className="font-mono font-bold text-sky-400 text-sm tabular-nums">
                      {searchedLead.milestoneProgress || 20}%
                    </span>
                  </div>

                  <div className="w-full h-3 rounded-full bg-slate-900 border border-slate-800 overflow-hidden p-0.5">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-sky-500 to-blue-600 transition-all duration-700 shadow-sm shadow-sky-500/50"
                      style={{ width: `${searchedLead.milestoneProgress || 20}%` }}
                    />
                  </div>
                </div>

                {/* Current Active Milestone Note */}
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 mb-8">
                  <div className="text-[11px] font-bold text-sky-400 uppercase tracking-wider mb-1">
                    Current Milestone In Progress:
                  </div>
                  <div className="text-sm font-semibold text-white">
                    {searchedLead.currentMilestone || 'Sprint Active: Requirement Specifications & Schema Modeling'}
                  </div>
                </div>

                {/* 4 Pipeline Stages */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                  {stages.map((stg) => {
                    const isDone = (searchedLead.milestoneProgress || 20) >= stg.minProgress;
                    return (
                      <div
                        key={stg.number}
                        className={`p-3 rounded-xl border text-center transition-colors ${
                          isDone
                            ? 'bg-sky-950/40 border-sky-500/40 text-white'
                            : 'bg-slate-900/40 border-slate-800 text-slate-500'
                        }`}
                      >
                        <div className="text-[10px] font-mono mb-1">{stg.number}</div>
                        <div className="text-xs font-bold leading-tight mb-1">{stg.title}</div>
                        <div className="text-[10px]">
                          {isDone ? (
                            <span className="text-emerald-400 flex items-center justify-center gap-1">
                              <CheckCircle2 className="w-3 h-3" />
                              <span>Active / Done</span>
                            </span>
                          ) : (
                            <span>Pending</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Assigned Personnel */}
                <div className="pt-6 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-xs">
                      QD
                    </div>
                    <div>
                      <div className="text-white font-bold">{settings.founderName}</div>
                      <div className="text-[10px] text-sky-400">Lead Systems Engineer</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/50 border border-slate-800">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-300">
                      SEC
                    </div>
                    <div>
                      <div className="text-white font-bold">{settings.secretaryName || 'Company Secretary'}</div>
                      <div className="text-[10px] text-slate-400">Client Operations & Intake</div>
                    </div>
                  </div>
                </div>

                {/* Direct Action */}
                <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-400">
                    Have questions about this build milestone?
                  </span>
                  <a
                    href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20Quayson,%20I%20am%20checking%20in%20on%20project%20build%20${searchedLead.refCode}%20(${encodeURIComponent(searchedLead.service)}).`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                </div>

              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                <AlertCircle className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h4 className="text-base font-bold text-white mb-1">
                  No Project Found for "{searchCode.toUpperCase()}"
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto mb-4">
                  Please verify your reference code or try one of the active demo project codes above (e.g. DGT-7104).
                </p>
                <a
                  href="#inquiry"
                  className="inline-flex items-center gap-1.5 text-xs text-sky-400 hover:text-white font-semibold underline"
                >
                  <span>Submit a New Project Brief Instead</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        )}

      </div>
    </section>
  );
};
