import React from 'react';
import { useAdmin } from '../context/AdminContext';
import { COMPANY_INFO } from '../data/companyData';
import { Phone, Mail, FileText, CheckCircle2, MessageSquare, Briefcase, Award, MapPin } from 'lucide-react';

interface FounderSectionProps {
  onOpenFlyer: () => void;
}

export const FounderSection: React.FC<FounderSectionProps> = ({ onOpenFlyer }) => {
  const { settings } = useAdmin();

  const secretaryImage = settings.secretaryImagePath || COMPANY_INFO.secretaryImagePath;

  return (
    <section id="about" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
            Leadership & Key Personnel
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1C36] tracking-tight">
            The Team Behind De-Graft Technologies
          </h2>
          <div className="w-16 h-1 bg-[#0066CC] mt-2 rounded-full" />
          <p className="mt-3 text-slate-600 text-sm max-w-2xl leading-relaxed">
            Committed leadership combining technical engineering expertise and professional administration 
            to deliver reliable software for our clients across Ghana and worldwide.
          </p>
        </div>

        {/* 2-Column Team Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Card 1: Founder & Principal Software Engineer */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col sm:flex-row hover:border-blue-400 transition-all duration-200">
            {/* Photo Column */}
            <div className="sm:w-5/12 relative aspect-[4/5] sm:aspect-auto bg-slate-900 shrink-0">
              <img
                src={COMPANY_INFO.flyerImagePath}
                alt={`${settings.founderName}, Founder & Principal Software Engineer`}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#0A1C36]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-white font-handwriting text-sm font-bold">
                {settings.motto}
              </div>
            </div>

            {/* Info Column */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-600 uppercase tracking-wider mb-1">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>Founder & Tech Lead</span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#0A1C36] mb-1">
                  {settings.founderName}
                </h3>
                <div className="text-xs font-semibold text-[#0066CC] mb-3">
                  {settings.founderTitle}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Oversees full-stack system architecture, database design, mobile app delivery, 
                  and technical strategy. Works directly with clients to ensure software codebases are fast, maintainable, and scalable.
                </p>

                <div className="text-xs text-slate-500 italic mb-4">
                  "{settings.vision}"
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0A1C36] hover:bg-blue-900 text-white text-xs font-bold transition-colors shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-[#00A3FF]" />
                  <span>Call: {settings.phone}</span>
                </a>

                <button
                  onClick={onOpenFlyer}
                  className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 font-semibold"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Flyer</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Company Secretary */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden flex flex-col sm:flex-row hover:border-blue-400 transition-all duration-200">
            {/* Photo Column */}
            <div className="sm:w-5/12 relative aspect-[4/5] sm:aspect-auto bg-slate-900 shrink-0">
              <img
                src={secretaryImage}
                alt={`${settings.secretaryName || 'Company Secretary'} at De-Graft Technologies`}
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 left-3 bg-[#0A1C36]/90 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20 text-white text-[11px] font-semibold">
                Executive Administration
              </div>
            </div>

            {/* Info Column */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-1">
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5">
                  <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-600 uppercase tracking-wider">
                    <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                    <span>Company Secretary</span>
                  </div>
                  <span className="text-slate-300">·</span>
                  <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <MapPin className="w-3 h-3 text-emerald-600" />
                    <span>From Half Assini</span>
                  </div>
                </div>

                <h3 className="text-2xl font-extrabold text-[#0A1C36] mb-1">
                  {settings.secretaryName || 'Mr. George Blay'}
                </h3>
                <div className="text-xs font-semibold text-[#0066CC] mb-3">
                  {settings.secretaryTitle || 'Company Secretary & Executive Administration'}
                </div>

                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
                  Based from Half Assini, Mr. George Blay oversees corporate executive administration, client project intake, contract schedules, and client communications for De-Graft Technologies.
                </p>

                <div className="space-y-1.5 text-xs text-slate-700 font-medium mb-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Executive Intake & Client Documentation</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Direct Telephone Line: <strong className="font-mono text-slate-900">{settings.secretaryPhone || '0551402188'}</strong></span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2.5">
                <a
                  href={`tel:${settings.secretaryPhone || '0551402188'}`}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors shadow-sm"
                  title={`Call Mr. George Blay at ${settings.secretaryPhone || '0551402188'}`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call: {settings.secretaryPhone || '0551402188'}</span>
                </a>

                <a
                  href={`https://wa.me/233${(settings.secretaryPhone || '0551402188').replace(/^0/, '')}?text=Hello%20Mr.%20George%20Blay,%20I%20am%20reaching%20out%20regarding%20a%20software%20project%20with%20De-Graft%20Technologies.`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors shadow-sm"
                  title={`WhatsApp Mr. George Blay at ${settings.secretaryPhone || '0551402188'}`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href={`mailto:${settings.email}?subject=Attention:%20Mr.%20George%20Blay%20(Company%20Secretary)%20—%20De-Graft%20Technologies`}
                  className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                  title="Email Secretary"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span className="hidden sm:inline">Email</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Company Principles & Commitment Banner */}
        <div className="p-8 rounded-2xl bg-[#0A1C36] text-white">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8">
              <div className="text-xs font-bold uppercase tracking-wider text-[#00A3FF] mb-2">
                Our Guarantee to Every Client
              </div>
              <h3 className="text-xl sm:text-2xl font-bold mb-3">
                Transparent Engineering · Dedicated Executive Support
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Whether consulting with our Company Secretary on timelines and contracts, or collaborating directly with Quayson De-Graft on system logic, your project benefits from senior attention, clear milestones, and complete codebase ownership.
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3">
              <a
                href="#inquiry"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0A1C36] hover:bg-slate-100 text-xs font-bold transition-colors shadow-md"
              >
                <span>Book a Discovery Consultation</span>
              </a>
              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Hotline ({settings.phone})</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
