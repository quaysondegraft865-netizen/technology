import React, { useState } from 'react';
import { Phone, Mail, MapPin, Copy, Check, Shield } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface FlyerContactBarProps {
  onOpenAdmin?: () => void;
}

export const FlyerContactBar: React.FC<FlyerContactBarProps> = ({ onOpenAdmin }) => {
  const { settings, isAuthenticated } = useAdmin();
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopy = (text: string, type: 'phone' | 'email') => {
    navigator.clipboard.writeText(text);
    if (type === 'phone') {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } else {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    }
  };

  return (
    <div className="relative bg-[#08182B] text-white pt-12 pb-8 overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Two Contact Action Blocks — Exactly as laid out on the flyer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 pb-10 border-b border-white/10">
          
          {/* Card 1: "Get In Touch" + phone */}
          <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-[#0C223D] border border-blue-500/20 shadow-lg">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#0066CC] flex items-center justify-center shrink-0 shadow-md">
              <Phone className="w-8 h-8 sm:w-9 sm:h-9 text-white stroke-[2.2]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-300 mb-0.5">
                Get In Touch
              </div>
              <a
                href={`tel:${settings.phone}`}
                className="text-2xl sm:text-3xl font-extrabold text-white hover:text-[#00A3FF] transition-colors block truncate tracking-tight tabular-nums"
              >
                {settings.phone}
              </a>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                <span>Direct Mobile Hotline</span>
                <button
                  onClick={() => handleCopy(settings.phone, 'phone')}
                  className="text-sky-400 hover:text-white underline text-[11px] flex items-center gap-1"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: "Email Us" + email */}
          <div className="flex items-center gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl bg-[#0C223D] border border-blue-500/20 shadow-lg">
            <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full bg-[#0080FF] flex items-center justify-center shrink-0 shadow-md">
              <Mail className="w-8 h-8 sm:w-9 sm:h-9 text-white stroke-[2.2]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-sm font-semibold text-slate-300 mb-0.5">
                Email Us
              </div>
              <a
                href={`mailto:${settings.email}`}
                className="text-lg sm:text-xl md:text-2xl font-bold text-white hover:text-[#00A3FF] transition-colors block truncate tracking-tight"
                title={settings.email}
              >
                {settings.email}
              </a>
              <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                <span>Personal Inbox of Founder</span>
                <button
                  onClick={() => handleCopy(settings.email, 'email')}
                  className="text-sky-400 hover:text-white underline text-[11px] flex items-center gap-1"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Executive Secretary Contact Line */}
        <div className="my-6 p-4 rounded-xl bg-slate-900/60 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-slate-300">
              Company Secretary: <strong className="text-white">{settings.secretaryName || 'Mr. George Blay'}</strong> ({settings.secretaryLocation || 'Half Assini'})
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`tel:${settings.secretaryPhone || '0551402188'}`}
              className="text-sky-400 hover:text-white font-mono flex items-center gap-1 font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {settings.secretaryPhone || '0551402188'}</span>
            </a>
            <a
              href={`https://wa.me/233${(settings.secretaryPhone || '0551402188').replace(/^0/, '')}?text=Hello%20Mr.%20George%20Blay,%20I%20am%20reaching%20out%20to%20De-Graft%20Technologies.`}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <span>WhatsApp Secretary</span>
            </a>
          </div>
        </div>

        {/* Bottom Line directly from flyer */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-[#0066CC]/30 border border-[#0066CC] flex items-center justify-center text-[#00A3FF]">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="text-sm font-bold text-white tracking-wide">
                {settings.name}
              </div>
              <div className="text-xs text-slate-400 italic font-medium">
                {settings.vision}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span>Available Monday – Saturday · {settings.location}</span>
            <span>·</span>
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1 text-slate-400 hover:text-sky-300 transition-colors"
              >
                <Shield className="w-3 h-3" />
                <span>{isAuthenticated ? 'Admin Panel (Online)' : 'Admin Login'}</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Geometric Cyan Diagonal Corner Accent (identical to flyer's bottom right graphic) */}
      <div 
        className="absolute bottom-0 right-0 w-32 h-16 bg-[#00A3FF] [clip-path:polygon(40%_100%,100%_0%,100%_100%)] opacity-90 pointer-events-none" 
      />
      <div 
        className="absolute bottom-0 right-0 w-48 h-8 bg-blue-700 [clip-path:polygon(30%_100%,100%_0%,100%_100%)] opacity-70 pointer-events-none" 
      />
    </div>
  );
};
