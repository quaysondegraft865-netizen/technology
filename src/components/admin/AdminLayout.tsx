import React, { useState } from 'react';
import { 
  Users, 
  Layers, 
  FolderKanban, 
  Settings, 
  LogOut, 
  ExternalLink, 
  ArrowLeft, 
  ShieldCheck, 
  Bell,
  Menu,
  X
} from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';
import { DGLogo } from '../DGLogo';
import { LeadsManager } from './LeadsManager';
import { ServicesManager } from './ServicesManager';
import { PortfolioManager } from './PortfolioManager';
import { SettingsManager } from './SettingsManager';

interface AdminLayoutProps {
  onReturnToSite: () => void;
}

type TabType = 'leads' | 'services' | 'portfolio' | 'settings';

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onReturnToSite }) => {
  const { logout, leads, settings } = useAdmin();
  const [activeTab, setActiveTab] = useState<TabType>('leads');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const newLeadsCount = leads.filter((l) => l.status === 'New').length;

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case 'leads': return <LeadsManager />;
      case 'services': return <ServicesManager />;
      case 'portfolio': return <PortfolioManager />;
      case 'settings': return <SettingsManager />;
      default: return <LeadsManager />;
    }
  };

  const navItems = [
    { id: 'leads' as TabType, label: 'Leads & Inquiries', icon: Users, badge: newLeadsCount },
    { id: 'services' as TabType, label: 'Flyer Services', icon: Layers },
    { id: 'portfolio' as TabType, label: 'Portfolio Projects', icon: FolderKanban },
    { id: 'settings' as TabType, label: 'Business Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row font-sans selection:bg-sky-500 selection:text-white">
      
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0 p-5 justify-between">
        <div className="space-y-6">
          {/* Logo & Header */}
          <div className="flex items-center gap-3 pb-5 border-b border-slate-800">
            <DGLogo size={34} />
            <div>
              <div className="font-extrabold text-sm text-white tracking-tight uppercase">
                DE-GRAFT
              </div>
              <div className="text-[10px] font-mono text-sky-400 tracking-wider uppercase font-semibold">
                Admin Console
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-sky-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-sky-950 text-sky-300 font-mono font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="space-y-3 pt-6 border-t border-slate-800">
          <button
            onClick={onReturnToSite}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Live Website</span>
          </button>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Top Header */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <DGLogo size={28} />
          <span className="font-bold text-xs uppercase text-white">De-Graft Admin</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onReturnToSite}
            className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 rounded-lg text-slate-300"
          >
            Live Site
          </button>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-1.5 text-slate-300 bg-slate-800 rounded-lg"
          >
            {mobileSidebarOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileSidebarOpen && (
        <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileSidebarOpen(false);
                }}
                className={`w-full flex items-center justify-between p-2.5 rounded-lg text-xs font-semibold ${
                  activeTab === item.id ? 'bg-sky-600 text-white' : 'text-slate-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded-full bg-slate-950 text-sky-400">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex justify-between">
            <button onClick={onReturnToSite} className="text-xs text-slate-400">Back to Live Site</button>
            <button onClick={logout} className="text-xs text-rose-400">Sign Out</button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Desktop Bar */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-slate-900/60 border-b border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Admin Workspace</span>
            <span>/</span>
            <span className="text-white font-semibold capitalize">
              {activeTab === 'leads' ? 'Inquiries & Leads' : activeTab}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onReturnToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Website</span>
            </button>

            <div className="flex items-center gap-2.5 pl-4 border-l border-slate-800">
              <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                QD
              </div>
              <div className="text-right">
                <div className="text-xs font-bold text-white leading-none">
                  {settings.founderName}
                </div>
                <div className="text-[10px] text-sky-400 leading-tight">
                  Super Admin
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Tab Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {renderActiveTabContent()}
        </main>
      </div>

    </div>
  );
};
