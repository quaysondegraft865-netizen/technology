import React from 'react';
import { Phone, ArrowRight, MessageSquare, FileText, Shield } from 'lucide-react';
import { DGLogo, BrandLockup } from './DGLogo';
import { useAdmin } from '../context/AdminContext';
import { COMPANY_INFO } from '../data/companyData';

interface FlyerHeroProps {
  onOpenFlyer: () => void;
  onScrollToContact: () => void;
  onOpenAdmin: () => void;
}

export const FlyerHero: React.FC<FlyerHeroProps> = ({ onOpenFlyer, onScrollToContact, onOpenAdmin }) => {
  const { settings, isAuthenticated } = useAdmin();

  return (
    <div className="relative bg-[#0A1C36] text-white pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Subtle graphic accent matching flyer's deep blue curve */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Header Row on Hero: Brand Lockup & "Code Build Innovate" */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-10 border-b border-white/10 gap-6">
          <div className="flex items-center gap-3">
            <DGLogo size={46} />
            <BrandLockup light={true} />
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="font-handwriting text-2xl sm:text-3xl text-sky-300 font-bold tracking-wide transform -rotate-1">
                {settings.motto}
              </div>
              <div className="text-[10px] tracking-widest text-slate-400 uppercase font-mono">
                Engineering Slogan
              </div>
            </div>

            {/* Quick Admin Portal Button on Hero Header */}
            <button
              onClick={onOpenAdmin}
              className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-sky-300 bg-sky-950/60 border border-sky-500/30 hover:bg-sky-900/60 transition-colors"
              title="Open Admin Portal"
            >
              <Shield className="w-3.5 h-3.5 text-sky-400" />
              <span>{isAuthenticated ? 'Admin Panel (Active)' : 'Admin Portal'}</span>
            </button>
          </div>
        </div>

        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center pt-10">
          
          {/* Left Column: Headline and CTAs directly from flyer */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] mb-4">
              <span className="block text-white">Turning Your</span>
              <span className="block text-white">Ideas Into</span>
              <span className="block text-[#00A3FF]">Powerful Software</span>
            </h1>

            {/* Subheadline from flyer with blue accent underline */}
            <div className="relative inline-block mb-6">
              <p className="text-xl sm:text-2xl font-semibold text-slate-100">
                Custom Solutions for a Smarter Tomorrow.
              </p>
              <div className="w-24 h-1 bg-[#00A3FF] mt-2 rounded-full" />
            </div>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              We design and build bespoke website systems, iOS & Android mobile applications, 
              custom business software, and secure databases. Work directly with senior engineers dedicated to your technical vision.
            </p>

            {/* Direct Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <button
                onClick={onScrollToContact}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-[#0A1C36] bg-white hover:bg-slate-100 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>

              <a
                href={`tel:${settings.phone}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Phone className="w-4 h-4" />
                <span>Call {settings.phone}</span>
              </a>

              <a
                href={`https://wa.me/${settings.whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3.5 text-sm font-semibold text-emerald-400 bg-slate-900/80 border border-emerald-500/40 rounded-xl hover:bg-slate-900 transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Flyer Quick View Pill */}
            <div className="flex items-center gap-3 text-xs text-slate-300">
              <button
                onClick={onOpenFlyer}
                className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white underline underline-offset-4"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>View Official Company Flyer</span>
              </button>
              <span className="text-slate-500">·</span>
              <span>Based in {settings.location} · Worldwide Delivery</span>
            </div>
          </div>

          {/* Right Column: High-Res Executive Asset from the Flyer */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Photo Card styled cleanly like the flyer */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 bg-[#0B213F]">
                <img
                  src={COMPANY_INFO.flyerImagePath}
                  alt={`${settings.founderName}, Founder and Software Engineer at De-Graft Technologies`}
                  className="w-full h-auto object-cover object-top"
                  referrerPolicy="no-referrer"
                />

                {/* Bottom Overlay Pill on Photo */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#0A1C36] via-[#0A1C36]/90 to-transparent p-5 pt-12">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs uppercase font-bold text-[#00A3FF] tracking-wider">
                        {settings.founderTitle}
                      </div>
                      <div className="text-lg font-bold text-white">
                        {settings.founderName}
                      </div>
                      <div className="text-xs text-slate-300 italic">
                        "{settings.vision}"
                      </div>
                    </div>

                    <button
                      onClick={onOpenFlyer}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-sm transition-colors"
                    >
                      Inspect Flyer
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Elegant Curved Cut Transition into the Crisp White Section */}
      <div className="absolute bottom-0 inset-x-0 h-8 sm:h-12 bg-white [clip-path:polygon(0_100%,100%_100%,100%_0%)]" />
    </div>
  );
};
