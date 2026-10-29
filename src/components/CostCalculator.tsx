import React, { useState, useMemo } from 'react';
import { Calculator, Check, ArrowRight, Sparkles, Layers, Clock, Cpu } from 'lucide-react';
import { SERVICES_LIST } from '../data/companyData';

interface CostCalculatorProps {
  onApplyEstimate: (scopeText: string, selectedServiceName: string, calculatedBudget: string) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({ onApplyEstimate }) => {
  const [selectedService, setSelectedService] = useState<string>('Website Development');
  const [platform, setPlatform] = useState<'web' | 'mobile' | 'both'>('web');
  const [complexity, setComplexity] = useState<'mvp' | 'growth' | 'enterprise'>('mvp');
  const [selectedModules, setSelectedModules] = useState<string[]>([
    'MTN MoMo / Card Payment Gateway',
    'SMS & WhatsApp Notifications'
  ]);

  const ghanaModules = [
    { id: 'momo', label: 'MTN MoMo / Card Payment Gateway', baseGHS: 3500 },
    { id: 'sms', label: 'SMS & WhatsApp Notifications (Hubtel/Arkesel)', baseGHS: 2000 },
    { id: 'offline', label: 'Offline-First SQLite Cache & Auto-Sync', baseGHS: 4000 },
    { id: 'barcode', label: 'Barcode & QR Waybill Scanner', baseGHS: 3000 },
    { id: 'multi-branch', label: 'Multi-Branch Inventory & Stock Dispatch', baseGHS: 5000 },
    { id: 'pdf', label: 'Automated PDF Invoices & Receipt Printing', baseGHS: 2500 },
  ];

  const toggleModule = (label: string) => {
    if (selectedModules.includes(label)) {
      setSelectedModules(selectedModules.filter((m) => m !== label));
    } else {
      setSelectedModules([...selectedModules, label]);
    }
  };

  // Calculation in Ghana Cedis
  const calculation = useMemo(() => {
    let base = 8000;
    if (selectedService === 'Mobile App Development') base = 16000;
    if (selectedService === 'Software Systems') base = 22000;
    if (selectedService === 'Database Design') base = 10000;
    if (selectedService === 'UI/UX Design') base = 7000;
    if (selectedService === 'IT Consulting') base = 6000;

    if (platform === 'both') base += 10000;
    if (platform === 'mobile' && selectedService !== 'Mobile App Development') base += 8000;

    if (complexity === 'growth') base *= 1.35;
    if (complexity === 'enterprise') base *= 1.85;

    selectedModules.forEach((modLabel) => {
      const match = ghanaModules.find((m) => m.label === modLabel);
      if (match) base += match.baseGHS;
    });

    const lowEstimate = Math.round(base * 0.9 / 500) * 500;
    const highEstimate = Math.round((base * 1.25) / 500) * 500;

    let weeks = '2 – 4 Weeks';
    if (complexity === 'growth' || platform === 'both') weeks = '4 – 7 Weeks';
    if (complexity === 'enterprise') weeks = '8 – 12 Weeks';

    return {
      formattedRange: `GH₵${lowEstimate.toLocaleString()} – GH₵${highEstimate.toLocaleString()}`,
      weeks,
      tier: complexity === 'mvp' ? 'Startup MVP' : complexity === 'growth' ? 'Growth Scale' : 'Enterprise Custom',
    };
  }, [selectedService, platform, complexity, selectedModules]);

  const handleApply = () => {
    const scopeSummary = `Configured Architecture: ${selectedService} (${calculation.tier}) | Platform: ${platform.toUpperCase()} | Modules: ${selectedModules.join(', ')} | Projected Timeline: ${calculation.weeks} | Estimated Budget: ${calculation.formattedRange}`;
    onApplyEstimate(scopeSummary, selectedService, calculation.formattedRange);
  };

  return (
    <section id="calculator" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
            Scope & Pricing Transparency
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1C36] tracking-tight">
            Interactive Project Cost & Scope Estimator
          </h2>
          <div className="w-16 h-1 bg-[#0066CC] mt-2 rounded-full" />
          <p className="mt-3 text-slate-600 text-sm max-w-2xl leading-relaxed">
            Configure your technical scope, deployment platforms, and specialized Ghanaian integrations 
            to generate an instant, transparent estimate in Ghana Cedis (GH₵).
          </p>
        </div>

        {/* 2-Column Split: Configurator + Output Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left 7 cols: Controls */}
          <div className="lg:col-span-7 space-y-6 bg-slate-50 rounded-2xl border border-slate-200 p-6 sm:p-8">
            
            {/* 1. Primary Service */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                1. Select Core Service Pillar
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SERVICES_LIST.map((srv) => (
                  <button
                    key={srv.id}
                    type="button"
                    onClick={() => setSelectedService(srv.title)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold text-left transition-all ${
                      selectedService === srv.title
                        ? 'bg-[#0A1C36] text-white border-[#0A1C36] shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <span className="block truncate">{srv.title}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Target Platform */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                2. Target Platform Architecture
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'web', label: 'Web Platform', sub: 'Responsive browser' },
                  { id: 'mobile', label: 'Mobile Apps', sub: 'iOS & Android' },
                  { id: 'both', label: 'Web + Mobile', sub: 'Unified system' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setPlatform(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      platform === item.id
                        ? 'bg-blue-50 border-[#0066CC] text-[#0A1C36] ring-1 ring-[#0066CC]'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] text-slate-500">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Scope Complexity */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                3. Business Scale & Complexity
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'mvp', label: 'Startup MVP', sub: 'First market release' },
                  { id: 'growth', label: 'Growth Scale', sub: 'Multi-user & APIs' },
                  { id: 'enterprise', label: 'Enterprise Custom', sub: 'High throughput' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setComplexity(item.id as any)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      complexity === item.id
                        ? 'bg-blue-50 border-[#0066CC] text-[#0A1C36] ring-1 ring-[#0066CC]'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <div className="text-xs font-bold">{item.label}</div>
                    <div className="text-[11px] text-slate-500">{item.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Specialized Ghanaian Modules */}
            <div>
              <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">
                4. Select Specialized Modules (Multi-Select)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {ghanaModules.map((mod) => {
                  const isChecked = selectedModules.includes(mod.label);
                  return (
                    <button
                      key={mod.id}
                      type="button"
                      onClick={() => toggleModule(mod.label)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-left transition-all text-xs ${
                        isChecked
                          ? 'bg-white border-blue-500 text-slate-900 shadow-xs'
                          : 'bg-white/60 border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <span className="font-medium pr-2 truncate">{mod.label}</span>
                      <div className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                        isChecked ? 'bg-[#0066CC] border-[#0066CC] text-white' : 'border-slate-300'
                      }`}>
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right 5 cols: Live Estimate Output Card */}
          <div className="lg:col-span-5 bg-[#0A1C36] text-white rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#00A3FF]">
                  Project Investment Summary
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-600 text-white text-[11px] font-bold">
                  {calculation.tier}
                </span>
              </div>

              {/* Big Estimate Display */}
              <div className="p-5 rounded-2xl bg-[#08182B] border border-blue-500/20 mb-6">
                <div className="text-xs text-slate-400 mb-1">
                  Estimated Investment in Ghana Cedis:
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight tabular-nums mb-2">
                  {calculation.formattedRange}
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timeline: {calculation.weeks}</span>
                </div>
              </div>

              <div className="space-y-3 mb-6 text-xs text-slate-300">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Pillar:</span>
                  <span className="font-semibold text-white">{selectedService}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Target Platform:</span>
                  <span className="font-semibold text-white capitalize">{platform}</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-slate-400">Active Modules:</span>
                  <span className="font-semibold text-white">{selectedModules.length} selected</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 leading-relaxed mb-6">
                <strong className="text-white block mb-1">Payment Schedule:</strong>
                50% Mobilization Deposit · 30% Milestone 2 Delivery · 20% Production Signoff. Includes source code handover and 3 months free maintenance.
              </div>
            </div>

            <button
              onClick={handleApply}
              className="w-full py-3.5 px-6 rounded-xl bg-white hover:bg-slate-100 text-[#0A1C36] font-bold text-xs shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Transfer Scope to Inquiry Form</span>
              <ArrowRight className="w-4 h-4 text-[#0066CC]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
