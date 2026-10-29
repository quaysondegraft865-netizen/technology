import React, { createContext, useContext, useState, useEffect } from 'react';
import { LeadInquiry, LeadStatus, ServiceItem, PortfolioProject, CompanySettings } from '../types';
import { INITIAL_LEADS, INITIAL_COMPANY_SETTINGS } from '../data/initialAdminData';
import { SERVICES_LIST as DEFAULT_SERVICES, PORTFOLIO_PROJECTS as DEFAULT_PORTFOLIO } from '../data/companyData';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (pass: string) => boolean;
  logout: () => void;
  leads: LeadInquiry[];
  addLead: (leadData: { name: string; phone: string; email: string; service: string; details: string; budget?: string }) => LeadInquiry;
  updateLeadStatus: (id: string, status: LeadStatus) => void;
  updateLeadMilestone: (id: string, progress: number, currentMilestone: string, paymentStatus?: LeadInquiry['paymentStatus']) => void;
  addLeadNote: (id: string, note: string) => void;
  deleteLead: (id: string) => void;
  services: ServiceItem[];
  updateService: (updated: ServiceItem) => void;
  portfolio: PortfolioProject[];
  addPortfolioProject: (proj: Omit<PortfolioProject, 'id'>) => void;
  updatePortfolioProject: (proj: PortfolioProject) => void;
  deletePortfolioProject: (id: string) => void;
  settings: CompanySettings;
  updateSettings: (newSettings: Partial<CompanySettings>) => void;
  resetToDefaults: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

const STORAGE_KEYS = {
  AUTH: 'degraft_admin_auth',
  LEADS: 'degraft_admin_leads_v3',
  SERVICES: 'degraft_admin_services_v3',
  PORTFOLIO: 'degraft_admin_portfolio_v3',
  SETTINGS: 'degraft_admin_settings_v4',
};

const DEFAULT_PASSWORD = 'degraft2026';

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  const [leads, setLeads] = useState<LeadInquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_LEADS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_SERVICES;
  });

  const [portfolio, setPortfolio] = useState<PortfolioProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PORTFOLIO);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return DEFAULT_PORTFOLIO;
  });

  const [settings, setSettings] = useState<CompanySettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_COMPANY_SETTINGS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PORTFOLIO, JSON.stringify(portfolio));
  }, [portfolio]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  }, [settings]);

  const login = (pass: string): boolean => {
    if (pass.trim() === DEFAULT_PASSWORD || pass.trim().toLowerCase() === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem(STORAGE_KEYS.AUTH, 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem(STORAGE_KEYS.AUTH);
  };

  const addLead = (leadData: { name: string; phone: string; email: string; service: string; details: string; budget?: string }): LeadInquiry => {
    const code = `DGT-${Math.floor(1000 + Math.random() * 9000)}`;
    const newLead: LeadInquiry = {
      id: `lead-${Date.now()}`,
      refCode: code,
      name: leadData.name,
      phone: leadData.phone,
      email: leadData.email,
      service: leadData.service,
      details: leadData.details,
      status: 'New',
      createdAt: new Date().toISOString(),
      estimatedBudget: leadData.budget || 'To Be Evaluated',
      milestoneProgress: 10,
      currentMilestone: 'Phase 1: Project Scope Intake & Discovery Assessment',
      paymentStatus: 'Pending Deposit',
      internalNotes: ['Inbound lead created via website.']
    };
    setLeads((prev) => [newLead, ...prev]);
    return newLead;
  };

  const updateLeadStatus = (id: string, status: LeadStatus) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const updateLeadMilestone = (id: string, progress: number, currentMilestone: string, paymentStatus?: LeadInquiry['paymentStatus']) => {
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          return {
            ...l,
            milestoneProgress: progress,
            currentMilestone,
            ...(paymentStatus ? { paymentStatus } : {})
          };
        }
        return l;
      })
    );
  };

  const addLeadNote = (id: string, note: string) => {
    if (!note.trim()) return;
    setLeads((prev) =>
      prev.map((l) => {
        if (l.id === id) {
          const notes = l.internalNotes || [];
          return {
            ...l,
            internalNotes: [...notes, `[${new Date().toLocaleDateString()}] ${note}`]
          };
        }
        return l;
      })
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const updateService = (updated: ServiceItem) => {
    setServices((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
  };

  const addPortfolioProject = (proj: Omit<PortfolioProject, 'id'>) => {
    const newProj: PortfolioProject = {
      ...proj,
      id: `project-${Date.now()}`
    };
    setPortfolio((prev) => [newProj, ...prev]);
  };

  const updatePortfolioProject = (proj: PortfolioProject) => {
    setPortfolio((prev) => prev.map((p) => (p.id === proj.id ? proj : p)));
  };

  const deletePortfolioProject = (id: string) => {
    setPortfolio((prev) => prev.filter((p) => p.id !== id));
  };

  const updateSettings = (newSettings: Partial<CompanySettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setLeads(INITIAL_LEADS);
    setServices(DEFAULT_SERVICES);
    setPortfolio(DEFAULT_PORTFOLIO);
    setSettings(INITIAL_COMPANY_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.LEADS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PORTFOLIO);
    localStorage.removeItem(STORAGE_KEYS.SETTINGS);
  };

  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        leads,
        addLead,
        updateLeadStatus,
        updateLeadMilestone,
        addLeadNote,
        deleteLead,
        services,
        updateService,
        portfolio,
        addPortfolioProject,
        updatePortfolioProject,
        deletePortfolioProject,
        settings,
        updateSettings,
        resetToDefaults,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
