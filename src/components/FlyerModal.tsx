import React from 'react';
import { X, ZoomIn, Phone, Mail, ExternalLink, Download } from 'lucide-react';
import { COMPANY_INFO } from '../data/companyData';

interface FlyerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FlyerModal: React.FC<FlyerModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flyer-modal-title"
    >
      <div
        className="relative max-w-2xl w-full bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-800 bg-slate-900/90">
          <div>
            <h2 id="flyer-modal-title" className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400"></span>
              Official Company Flyer — De-Graft Technologies
            </h2>
            <p className="text-xs text-slate-400">Innovation · Solutions · Impact</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Image view container */}
        <div className="relative overflow-y-auto p-4 bg-slate-950 flex items-center justify-center min-h-[360px]">
          <img
            src={COMPANY_INFO.flyerImagePath}
            alt="De-Graft Technologies Official Company Flyer featuring Founder Quayson De-Graft"
            className="max-h-[70vh] w-auto rounded-xl shadow-lg object-contain border border-slate-800"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Footer info bar */}
        <div className="px-5 py-3.5 border-t border-slate-800 bg-slate-900 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-300">
            <a
              href={COMPANY_INFO.phoneTel}
              className="flex items-center gap-1.5 hover:text-sky-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-sky-400" />
              <span>{COMPANY_INFO.phone}</span>
            </a>
            <span className="text-slate-600">·</span>
            <a
              href={COMPANY_INFO.emailMailto}
              className="flex items-center gap-1.5 hover:text-sky-400 transition-colors truncate max-w-[220px]"
            >
              <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
              <span className="truncate">{COMPANY_INFO.email}</span>
            </a>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={COMPANY_INFO.flyerImagePath}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Full Size</span>
            </a>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-sky-600 hover:bg-sky-500 transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
