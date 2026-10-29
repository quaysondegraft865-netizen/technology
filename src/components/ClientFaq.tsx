import React, { useState } from 'react';
import { ChevronDown, HelpCircle, CheckCircle2 } from 'lucide-react';

export const ClientFaq: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Do I get complete ownership of the source code and database?',
      a: 'Yes, 100%. Upon final project settlement, all intellectual property, Git repositories, database credentials, design files, and domain/server access are formally transferred to your company. You are never locked into proprietary platforms.'
    },
    {
      q: 'How does payment work for software development projects?',
      a: 'We use a milestone-based schedule in Ghana Cedis (GH₵): 50% mobilization deposit before engineering begins, 30% upon approval of Milestone 2 (functional demo / core features), and the final 20% upon production deployment and team training. Payments are accepted via Mobile Money (MTN MoMo, Telecel Cash) or direct bank transfer.'
    },
    {
      q: 'Can you build software systems that operate offline in areas with unstable internet?',
      a: 'Yes. We specialize in offline-first architectures using local device storage (SQLite / IndexedDB). Your sales reps, clinic nurses, or warehouse staff can create invoices, record inventory, or log patient visits without internet; the software automatically reconciles and syncs data when connectivity is restored.'
    },
    {
      q: 'How long does a website, mobile app, or management system take to build?',
      a: 'A focused corporate website or prototype typically takes 2 to 4 weeks. Cross-platform iOS/Android mobile apps and custom multi-branch management systems take 4 to 8 weeks depending on database complexity and custom integrations. We provide an exact delivery date in our formal proposal.'
    },
    {
      q: 'What kind of support is provided after the system is launched?',
      a: 'Every software release includes 3 months of complimentary post-launch technical warranty covering bug fixes, server monitoring, and minor tweaks. We also offer ongoing monthly maintenance retainers to manage cloud hosting, backups, and feature enhancements.'
    },
    {
      q: 'Who will I be dealing with during the build?',
      a: 'You communicate directly with Quayson De-Graft (Lead Software Engineer) on system logic, and our Company Secretary for appointment coordination, official invoices, and milestone documentation. There are no junior middlemen or outsourced agency reps.'
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Common Questions</span>
          </div>
          <h2 className="text-3xl font-extrabold text-[#0A1C36] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-2 text-slate-600 text-sm max-w-xl mx-auto">
            Everything you need to know about our engineering process, payment terms in Ghana Cedis, 
            and post-launch guarantees.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left transition-colors hover:bg-slate-100/60"
                >
                  <span className="text-sm font-bold text-[#0A1C36] pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-blue-600 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-200/60 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
