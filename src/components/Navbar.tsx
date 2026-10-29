import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, FileText, ArrowRight, Shield } from 'lucide-react';
import { DGLogo } from './DGLogo';
import { useAdmin } from '../context/AdminContext';

interface NavbarProps {
  onOpenFlyer: () => void;
  onScrollToInquiry: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenFlyer, onScrollToInquiry, onOpenAdmin }) => {
  const { settings, isAuthenticated } = useAdmin();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-[#0A1C36]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10'
          : 'bg-[#0A1C36] border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Brand Lockup matching flyer */}
          <a
            href="#"
            className="flex items-center gap-3 shrink-0"
            aria-label="De-Graft Technologies"
          >
            <DGLogo size={38} />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5 font-black text-sm tracking-tight text-white uppercase">
                <span>DE-GRAFT</span>
                <span className="text-[#00A3FF]">TECHNOLOGIES</span>
              </div>
              <span className="text-[9px] tracking-widest text-slate-300 uppercase font-semibold">
                Innovation · Solutions · Impact
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-200">
            <a
              href="#services"
              className="hover:text-[#00A3FF] transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#calculator"
              className="hover:text-[#00A3FF] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-sky-300"
            >
              <span>Cost Calculator</span>
            </a>
            <a
              href="#tracker"
              className="hover:text-[#00A3FF] transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 text-emerald-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Live Tracker</span>
            </a>
            <a
              href="#work"
              className="hover:text-[#00A3FF] transition-colors whitespace-nowrap shrink-0"
            >
              Work
            </a>
            <a
              href="#architecture"
              className="hover:text-[#00A3FF] transition-colors whitespace-nowrap shrink-0"
            >
              Architecture
            </a>
            <a
              href="#about"
              className="hover:text-[#00A3FF] transition-colors whitespace-nowrap shrink-0"
            >
              Team
            </a>
            <a
              href="#faq"
              className="hover:text-[#00A3FF] transition-colors whitespace-nowrap shrink-0"
            >
              FAQ
            </a>
            <a
              href="#inquiry"
              className="hover:text-[#00A3FF] transition-colors whitespace-nowrap shrink-0"
            >
              Inquiry
            </a>
          </nav>

          {/* Zone 3: Direct Actions from Flyer + Admin trigger */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenFlyer}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/15 border border-white/20 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="View original flyer"
            >
              <FileText className="w-3.5 h-3.5 text-[#00A3FF]" />
              <span>Flyer</span>
            </button>

            <a
              href={`tel:${settings.phone}`}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{settings.phone}</span>
            </a>

            <button
              onClick={onScrollToInquiry}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-[#0A1C36] bg-white hover:bg-slate-100 rounded-lg shadow-sm transition-colors whitespace-nowrap shrink-0"
            >
              <span>Get Quote</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#0066CC]" />
            </button>

            {/* Admin entry point */}
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg border transition-colors ${
                isAuthenticated
                  ? 'bg-sky-950/80 border-sky-400 text-sky-300'
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
              }`}
              title={isAuthenticated ? 'Open Admin Panel' : 'Admin Login'}
              aria-label="Admin Portal"
            >
              <Shield className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className={`p-2 rounded-lg border ${
                isAuthenticated
                  ? 'bg-sky-950 border-sky-400 text-sky-300'
                  : 'bg-white/10 border-white/15 text-slate-300'
              }`}
              title="Admin"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenFlyer}
              className="p-2 text-white bg-white/10 rounded-lg"
              title="View flyer"
            >
              <FileText className="w-4 h-4 text-[#00A3FF]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0A1C36] border-b border-white/15 px-6 py-5 text-white max-h-[80vh] overflow-y-auto">
          <nav className="flex flex-col gap-3 text-sm font-semibold">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00A3FF] py-1"
            >
              Our Services
            </a>
            <a
              href="#calculator"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00A3FF] py-1 text-sky-400 flex items-center justify-between"
            >
              <span>Scope & Cost Calculator</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono">GH₵</span>
            </a>
            <a
              href="#tracker"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00A3FF] py-1 text-emerald-400 flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Project Tracker</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">LIVE</span>
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00A3FF] py-1"
            >
              Recent Work
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00A3FF] py-1"
            >
              System Architecture
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00A3FF] py-1"
            >
              Leadership & Team
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00A3FF] py-1"
            >
              Client FAQ
            </a>
            <a
              href="#inquiry"
              onClick={() => setMobileMenuOpen(false)}
              className="hover:text-[#00A3FF] py-1"
            >
              Project Inquiry
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-left hover:text-[#00A3FF] py-1 flex items-center gap-2 text-sky-400 border-t border-white/10 pt-2"
            >
              <Shield className="w-4 h-4" />
              <span>{isAuthenticated ? 'Admin Dashboard (Active)' : 'Admin Portal Login'}</span>
            </button>

            <div className="pt-4 border-t border-white/15 flex flex-col gap-3">
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-bold rounded-lg bg-blue-600 text-white"
              >
                <Phone className="w-4 h-4" />
                <span>Call {settings.phone}</span>
              </a>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScrollToInquiry();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 text-sm font-bold rounded-lg bg-white text-[#0A1C36]"
              >
                <span>Request Project Quote</span>
                <ArrowRight className="w-4 h-4 text-[#0066CC]" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
