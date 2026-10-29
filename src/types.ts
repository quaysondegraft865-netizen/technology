export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  icon: 'website' | 'mobile' | 'software' | 'database' | 'uiux' | 'consulting';
  deliverables: string[];
  techStack: string[];
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  impact: string;
  stack: string[];
}

export type LeadStatus = 'New' | 'Contacted' | 'In Discovery' | 'Proposal Sent' | 'Won / Active' | 'Closed';

export interface LeadInquiry {
  id: string;
  refCode: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  details: string;
  status: LeadStatus;
  createdAt: string;
  estimatedBudget?: string;
  internalNotes?: string[];
  milestoneProgress?: number; // 0 to 100
  currentMilestone?: string;
  estimatedCompletionDate?: string;
  paymentStatus?: 'Pending Deposit' | 'Deposit Paid' | 'Milestone 2 Active' | 'Fully Settled';
}

export interface CompanySettings {
  name: string;
  tagline: string;
  motto: string;
  vision: string;
  phone: string;
  email: string;
  whatsappNumber: string;
  location: string;
  founderName: string;
  founderTitle: string;
  secretaryName: string;
  secretaryTitle: string;
  secretaryLocation?: string;
  secretaryPhone?: string;
  secretaryImagePath: string;
  availabilityNotice: string;
  isAcceptingProjects: boolean;
}

export interface CostCalculatorConfig {
  serviceTypes: string[];
  platform: 'web' | 'mobile' | 'both' | 'system';
  complexity: 'standard' | 'growth' | 'enterprise';
  features: string[];
  timeline: 'standard' | 'express';
}
