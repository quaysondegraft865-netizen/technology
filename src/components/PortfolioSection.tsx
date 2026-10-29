import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { CheckCircle2 } from 'lucide-react';

export const PortfolioSection: React.FC = () => {
  const { portfolio } = useAdmin();

  return (
    <section id="work" className="py-20 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="mb-14">
          <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
            Proven Results
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1C36] tracking-tight">
            Recent Client Solutions
          </h2>
          <div className="w-16 h-1 bg-[#0066CC] mt-2 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {portfolio.map((proj) => (
            <div
              key={proj.id}
              className="flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200"
            >
              <div>
                <div className="text-xs font-semibold text-[#0066CC] mb-2 uppercase tracking-wide">
                  {proj.category}
                </div>

                <h3 className="text-xl font-bold text-[#0A1C36] mb-2 leading-snug">
                  {proj.title}
                </h3>

                <div className="text-xs text-slate-500 mb-4 font-medium">
                  Client: {proj.client}
                </div>

                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {proj.description}
                </p>

                <div className="p-3.5 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-slate-700 font-medium mb-6 flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0066CC] shrink-0 mt-0.5" />
                  <span><strong>Impact:</strong> {proj.impact}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex flex-wrap gap-1.5">
                {proj.stack.map((item, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
