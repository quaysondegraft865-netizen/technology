/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { Navbar } from './components/Navbar';
import { FlyerHero } from './components/FlyerHero';
import { FlyerServices } from './components/FlyerServices';
import { PortfolioSection } from './components/PortfolioSection';
import { FounderSection } from './components/FounderSection';
import { InteractiveInquiry } from './components/InteractiveInquiry';
import { CostCalculator } from './components/CostCalculator';
import { ProjectTracker } from './components/ProjectTracker';
import { TechArchitectureExplorer } from './components/TechArchitectureExplorer';
import { ClientFaq } from './components/ClientFaq';
import { FlyerContactBar } from './components/FlyerContactBar';
import { FlyerModal } from './components/FlyerModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { MessageSquare, Phone, Shield, ExternalLink, LogOut } from 'lucide-react';

function AppContent() {
  const { isAuthenticated, logout, settings, leads } = useAdmin();
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isFlyerOpen, setIsFlyerOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Website Development');
  const [prefilledDetails, setPrefilledDetails] = useState<string>('');
  const [prefilledBudget, setPrefilledBudget] = useState<string>('');

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  const scrollToInquiry = () => {
    const el = document.getElementById('inquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (serviceTitle: string) => {
    setSelectedService(serviceTitle);
    scrollToInquiry();
  };

  const handleApplyEstimate = (scopeText: string, serviceName: string, budgetRange: string) => {
    setSelectedService(serviceName);
    setPrefilledDetails(scopeText);
    setPrefilledBudget(budgetRange);
    scrollToInquiry();
  };

  const handleOpenAdmin = () => {
    if (isAuthenticated) {
      setIsAdminMode(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  // If in Admin Dashboard mode and authenticated
  if (isAdminMode && isAuthenticated) {
    return <AdminLayout onReturnToSite={() => setIsAdminMode(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#0066CC] selection:text-white">
      
      {/* Admin Quick Banner when authenticated */}
      {isAuthenticated && (
        <div className="bg-[#08182B] text-white px-4 py-2 text-xs flex items-center justify-between border-b border-white/10 z-50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="font-semibold">Logged in as {settings.founderName} (Super Admin)</span>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-mono text-[11px] border border-sky-500/30">
                {newLeadsCount} new lead{newLeadsCount > 1 ? 's' : ''}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminMode(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs transition-colors shadow-xs"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Open Admin Dashboard</span>
            </button>

            <button
              onClick={logout}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-rose-400 transition-colors"
              title="Sign out of admin"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar
        onOpenFlyer={() => setIsFlyerOpen(true)}
        onScrollToInquiry={scrollToInquiry}
        onOpenAdmin={handleOpenAdmin}
      />

      <main className="flex-1">
        {/* Top Hero Section matching the flyer's navy header and executive photo */}
        <FlyerHero
          onOpenFlyer={() => setIsFlyerOpen(true)}
          onScrollToContact={scrollToInquiry}
          onOpenAdmin={handleOpenAdmin}
        />

        {/* "Our Services" Section — Exact 6 services and icons on clean white background */}
        <FlyerServices onSelectService={handleSelectService} />

        {/* Interactive Scope & Cost Calculator in Ghana Cedis */}
        <CostCalculator onApplyEstimate={handleApplyEstimate} />

        {/* Live Client Project Tracker by Reference Code */}
        <ProjectTracker />

        {/* Real-World Client Work */}
        <PortfolioSection />

        {/* Technical Architecture & System Engineering Rigor */}
        <TechArchitectureExplorer />

        {/* Founder & Secretary Leadership Team */}
        <FounderSection onOpenFlyer={() => setIsFlyerOpen(true)} />

        {/* Client Frequently Asked Questions (Source Code, Milestones, Offline) */}
        <ClientFaq />

        {/* Interactive Consultation / Inquiry Form */}
        <InteractiveInquiry
          selectedService={selectedService}
          prefilledDetails={prefilledDetails}
          prefilledBudget={prefilledBudget}
        />

        {/* Bottom Contact Section directly matching the flyer's contact banner */}
        <FlyerContactBar onOpenAdmin={handleOpenAdmin} />
      </main>

      {/* Full Flyer Lightbox Modal to inspect the uploaded image */}
      <FlyerModal
        isOpen={isFlyerOpen}
        onClose={() => setIsFlyerOpen(false)}
      />

      {/* Admin Login Modal */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => setIsAdminMode(true)}
      />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <a
          href={`https://wa.me/${settings.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-full shadow-2xl shadow-emerald-950/40 transition-all hover:scale-105 active:scale-95"
          title={`Chat with ${settings.founderName} on WhatsApp`}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="hidden sm:inline">WhatsApp Us</span>
        </a>
        <a
          href={`tel:${settings.phone}`}
          className="p-3 bg-[#0066CC] hover:bg-blue-600 text-white rounded-full shadow-2xl shadow-blue-950/40 transition-all hover:scale-105 active:scale-95 sm:hidden"
          title={`Call ${settings.phone}`}
        >
          <Phone className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <AppContent />
    </AdminProvider>
  );
}
