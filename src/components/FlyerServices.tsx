import React, { useState } from 'react';
import { 
  WebsiteIcon, 
  MobileIcon, 
  SoftwareIcon, 
  DatabaseIcon, 
  UIUXIcon, 
  ConsultingIcon 
} from './FlyerIcons';
import { useAdmin } from '../context/AdminContext';
import { ServiceItem } from '../types';
import { ArrowRight, CheckCircle2, X } from 'lucide-react';

interface FlyerServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const FlyerServices: React.FC<FlyerServicesProps> = ({ onSelectService }) => {
  const { services } = useAdmin();
  const [activeModalService, setActiveModalService] = useState<ServiceItem | null>(null);

  const renderIcon = (iconType: string) => {
    switch (iconType) {
      case 'website':
        return <WebsiteIcon className="w-12 h-12 text-[#0066CC]" size={48} />;
      case 'mobile':
        return <MobileIcon className="w-12 h-12 text-[#0066CC]" size={48} />;
      case 'software':
        return <SoftwareIcon className="w-12 h-12 text-[#0066CC]" size={48} />;
      case 'database':
        return <DatabaseIcon className="w-12 h-12 text-[#0066CC]" size={48} />;
      case 'uiux':
        return <UIUXIcon className="w-12 h-12 text-[#0066CC]" size={48} />;
      case 'consulting':
        return <ConsultingIcon className="w-12 h-12 text-[#0066CC]" size={48} />;
      default:
        return <SoftwareIcon className="w-12 h-12 text-[#0066CC]" size={48} />;
    }
  };

  return (
    <section id="services" className="bg-white text-slate-900 py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* "Our Services" Title matching the flyer */}
        <div className="mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1C36] tracking-tight">
            Our Services
          </h2>
          <div className="w-16 h-1 bg-[#0066CC] mt-2 rounded-full" />
        </div>

        {/* 6 Services Grid — Exact structure as on the flyer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-12">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => setActiveModalService(service)}
              className="group cursor-pointer flex flex-col items-start p-6 rounded-2xl bg-slate-50/70 hover:bg-blue-50/50 border border-slate-200/80 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md"
            >
              {/* Royal Blue Outlined Icon from flyer */}
              <div className="mb-5 p-2 rounded-xl bg-white shadow-xs group-hover:scale-105 transition-transform duration-200">
                {renderIcon(service.icon)}
              </div>

              {/* Service Title */}
              <h3 className="text-xl font-bold text-[#0A1C36] mb-2 group-hover:text-[#0066CC] transition-colors">
                {service.title}
              </h3>

              {/* Exact Copy from the flyer */}
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {service.shortDesc}
              </p>

              {/* Subtle interactive affordance */}
              <div className="mt-auto pt-3 flex items-center gap-1.5 text-xs font-semibold text-[#0066CC] group-hover:translate-x-1 transition-transform">
                <span>View Deliverables & Options</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Service Detail Modal */}
      {activeModalService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150"
          onClick={() => setActiveModalService(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-50">
                  {renderIcon(activeModalService.icon)}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#0A1C36]">
                    {activeModalService.title}
                  </h3>
                  <p className="text-xs text-blue-600 font-medium">
                    De-Graft Technologies Capability
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveModalService(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-6">
              {activeModalService.fullDesc}
            </p>

            <div className="mb-6">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                What We Deliver:
              </div>
              <div className="space-y-2">
                {activeModalService.deliverables.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-[#0066CC] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Technologies Used:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {activeModalService.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  onSelectService(activeModalService.title);
                  setActiveModalService(null);
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-[#0066CC] hover:bg-blue-700 shadow-md transition-colors flex items-center justify-center gap-2"
              >
                <span>Request {activeModalService.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveModalService(null)}
                className="py-3 px-4 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
