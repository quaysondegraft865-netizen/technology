import { LeadInquiry, CompanySettings } from '../types';

export const INITIAL_LEADS: LeadInquiry[] = [
  {
    id: 'lead-1',
    refCode: 'DGT-7104',
    name: 'Kofi Mensah',
    phone: '0244192837',
    email: 'k.mensah@apexhaulage.com',
    service: 'Software Systems',
    details: 'We operate 28 haulage trucks between Tema Port and Kumasi. We need a custom web dispatch platform to track waybills, driver daily fuel allocations, and generate automated PDF invoices.',
    status: 'Won / Active',
    createdAt: '2026-10-20T14:32:00Z',
    estimatedBudget: 'GH₵38,000',
    milestoneProgress: 65,
    currentMilestone: 'Phase 3: Dispatch API & PostgreSQL Waybill Schema',
    estimatedCompletionDate: 'Nov 18, 2026',
    paymentStatus: 'Deposit Paid',
    internalNotes: [
      'Mobilization 50% deposit received via MoMo Merchant.',
      'Waybill QR scanner testing completed successfully on Samsung test tablet.'
    ]
  },
  {
    id: 'lead-2',
    refCode: 'DGT-8491',
    name: 'Dr. Evelyn Baah',
    phone: '0501827364',
    email: 'dr.baah@mediviewclinic.org',
    service: 'Website Development',
    details: 'Need a modern responsive clinic booking website with WhatsApp integration, online doctor appointment slots, and lab result download portal.',
    status: 'In Discovery',
    createdAt: '2026-10-28T09:15:00Z',
    estimatedBudget: 'GH₵18,500',
    milestoneProgress: 25,
    currentMilestone: 'Phase 1: Wireframing & Patient User Journey in Figma',
    estimatedCompletionDate: 'Nov 28, 2026',
    paymentStatus: 'Pending Deposit',
    internalNotes: [
      'Inbound inquiry submitted from the website.',
      'Secretary scheduled discovery call for Thursday afternoon.'
    ]
  },
  {
    id: 'lead-3',
    refCode: 'DGT-6239',
    name: 'Nana Yaw Ampofo',
    phone: '0277382910',
    email: 'nanayaw@ghanafreshmarket.com',
    service: 'Mobile App Development',
    details: 'We want an iOS and Android grocery delivery app for East Legon and Airport Residential areas. Must support Mobile Money (MTN MoMo / Telecel Cash) instant payment.',
    status: 'Proposal Sent',
    createdAt: '2026-10-25T11:40:00Z',
    estimatedBudget: 'GH₵45,000',
    milestoneProgress: 15,
    currentMilestone: 'Phase 1: Architecture Review & MoMo Payment Specs',
    estimatedCompletionDate: 'Dec 15, 2026',
    paymentStatus: 'Pending Deposit',
    internalNotes: [
      'Sent formal proposal PDF with 6-week milestone breakdown.',
      'Client scheduled a review call for Thursday 10am.'
    ]
  },
  {
    id: 'lead-4',
    refCode: 'DGT-5112',
    name: 'Samuel Darko',
    phone: '0243918274',
    email: 'samuel.darko@gmail.com',
    service: 'Database Design',
    details: 'Our current MySQL database slows down heavily during monthly payroll processing (over 12,000 records). Need schema optimization and index tuning.',
    status: 'Won / Active',
    createdAt: '2026-10-18T16:20:00Z',
    estimatedBudget: 'GH₵12,000',
    milestoneProgress: 100,
    currentMilestone: 'Phase 4: Final Sign-off & Automated Nightly Backup Deployed',
    estimatedCompletionDate: 'Oct 26, 2026',
    paymentStatus: 'Fully Settled',
    internalNotes: [
      'Completed schema audit. Created compound indexes on employee_id and payroll_cycle.',
      'Query execution dropped from 14s to 120ms.',
      'Final milestone signed off and balance paid in full.'
    ]
  }
];

export const INITIAL_COMPANY_SETTINGS: CompanySettings = {
  name: 'DE-GRAFT TECHNOLOGIES',
  tagline: 'INNOVATION | SOLUTIONS | IMPACT',
  motto: 'Code Build Innovate',
  vision: 'Your Vision . Our Technology',
  phone: '0248614163',
  email: 'quaysondegraft865@gmail.com',
  whatsappNumber: '233248614163',
  location: 'Accra, Ghana',
  founderName: 'Quayson De-Graft',
  founderTitle: 'Founder & Principal Software Engineer',
  secretaryName: 'Mr. George Blay',
  secretaryTitle: 'Company Secretary & Executive Administration',
  secretaryLocation: 'Half Assini, Western Region, Ghana',
  secretaryPhone: '0551402188',
  secretaryImagePath: '/assets/aistudio/IMG-20261026-WA0029_b23e3555.jpg',
  availabilityNotice: 'Available for Q4/Q1 Projects',
  isAcceptingProjects: true
};
