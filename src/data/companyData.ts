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

export const COMPANY_INFO = {
  name: 'DE-GRAFT TECHNOLOGIES',
  brandShort: 'De-Graft',
  tagline: 'INNOVATION | SOLUTIONS | IMPACT',
  motto: 'Code Build Innovate',
  vision: 'Your Vision . Our Technology',
  headline: 'Turning Your Ideas Into Powerful Software',
  subheadline: 'Custom Solutions for a Smarter Tomorrow.',
  phone: '0248614163',
  phoneFormatted: '+233 24 861 4163',
  phoneTel: 'tel:0248614163',
  email: 'quaysondegraft865@gmail.com',
  emailMailto: 'mailto:quaysondegraft865@gmail.com',
  whatsappUrl: 'https://wa.me/233248614163?text=Hello%20De-Graft%20Technologies,%20I%20would%20like%20to%20discuss%20a%20software%20project.',
  location: 'Accra, Ghana',
  founderName: 'Quayson De-Graft',
  founderTitle: 'Founder & Principal Software Engineer',
  flyerImagePath: '/assets/aistudio/file_00000000a87481f49d1d1132cb9be1ab_7ac527e1.jpg',
  secretaryName: 'Mr. George Blay',
  secretaryTitle: 'Company Secretary & Executive Administration',
  secretaryLocation: 'Half Assini, Western Region, Ghana',
  secretaryPhone: '0551402188',
  secretaryPhoneFormatted: '+233 55 140 2188',
  secretaryImagePath: '/assets/aistudio/IMG-20261026-WA0029_b23e3555.jpg',
  about: 'De-Graft Technologies is a software engineering and IT consulting firm founded by Quayson De-Graft. We build custom websites, iOS and Android mobile apps, robust database architectures, and business software systems designed to solve concrete operational challenges.'
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'website-development',
    title: 'Website Development',
    shortDesc: 'Modern, responsive and high-performing websites.',
    fullDesc: 'We develop fast, secure, and search-optimized web applications tailored for businesses, organizations, and individuals. Built with modern web standards to look great on any phone, tablet, or laptop.',
    icon: 'website',
    deliverables: [
      'Custom Responsive Websites',
      'Corporate Portals & Landing Pages',
      'Content Management & Admin Dashboards',
      'E-commerce & Payment Gateways (MoMo / Card)'
    ],
    techStack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js']
  },
  {
    id: 'mobile-app-development',
    title: 'Mobile App Development',
    shortDesc: 'iOS & Android apps for your business or idea.',
    fullDesc: 'Custom cross-platform and native mobile apps built for both iPhones and Android phones. We handle the entire process from initial screen design to App Store and Google Play deployment.',
    icon: 'mobile',
    deliverables: [
      'iOS & Android Mobile Applications',
      'Offline Data Storage & Sync',
      'Push Notifications & Alerts',
      'Play Store & App Store Deployment'
    ],
    techStack: ['React Native', 'Flutter', 'Firebase', 'REST APIs']
  },
  {
    id: 'software-systems',
    title: 'Software Systems',
    shortDesc: 'Custom software solutions for your unique needs.',
    fullDesc: 'Tailor-made management systems that automate everyday business workflows, manage customer records, track sales, and eliminate manual paperwork.',
    icon: 'software',
    deliverables: [
      'Custom ERP & Inventory Management',
      'Point-of-Sale (POS) & Billing Systems',
      'School & Hospital Management Portals',
      'Automated PDF Reports & Receipt Generators'
    ],
    techStack: ['Node.js', 'Express', 'Python', 'PostgreSQL', 'Docker']
  },
  {
    id: 'database-design',
    title: 'Database Design',
    shortDesc: 'Secure, scalable and efficient database solutions.',
    fullDesc: 'Well-structured databases engineered for speed, data accuracy, and absolute security. We ensure your business data is protected with automated backups and scalable architecture.',
    icon: 'database',
    deliverables: [
      'Relational Database Modeling',
      'Query Optimization & Indexing',
      'Automated Daily Cloud Backups',
      'Data Migration & Encryption'
    ],
    techStack: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis']
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    shortDesc: 'User-friendly designs that deliver results.',
    fullDesc: 'Clean, intuitive user interfaces that customers find effortless to use. We design complete wireframes and interactive prototypes in Figma before writing a single line of code.',
    icon: 'uiux',
    deliverables: [
      'Interactive Figma Prototypes',
      'User Flow Diagrams & Wireframes',
      'Design Systems & Component Kits',
      'Mobile & Desktop Screen Layouts'
    ],
    techStack: ['Figma', 'Prototyping', 'Design Systems', 'WCAG Accessibility']
  },
  {
    id: 'it-consulting',
    title: 'IT Consulting',
    shortDesc: 'Expert advice to help you grow and scale.',
    fullDesc: 'Practical, honest technology advice to help businesses make the right investments, modernize legacy processes, choose reliable tools, and protect their systems.',
    icon: 'consulting',
    deliverables: [
      'Technical Architecture Reviews',
      'Cloud Hosting & Domain Setup',
      'Cybersecurity & Backup Audits',
      'Software Team Training & Technical Strategy'
    ],
    techStack: ['Cloud Setup', 'AWS / DigitalOcean', 'DevOps', 'IT Security']
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'project-1',
    title: 'Enterprise Inventory & Sales Dispatch Engine',
    category: 'Software Systems & Database',
    client: 'Wholesale & Logistics Distributor',
    description: 'A multi-branch stock tracking and sales invoicing platform replacing paper logbooks and manual spreadsheets.',
    impact: 'Automated receipt generation and real-time stock deductions across 4 branch warehouses.',
    stack: ['Custom Web App', 'PostgreSQL', 'Barcode Scanner', 'SMS Alerts']
  },
  {
    id: 'project-2',
    title: 'MediCare Clinic & Diagnostic Portal',
    category: 'Website & UI/UX Design',
    client: 'Private Healthcare Network',
    description: 'A patient booking and medical report retrieval system enabling clients to schedule doctor visits and receive lab test results on their phones.',
    impact: 'Reduced clinic reception wait times and eliminated lost physical lab papers.',
    stack: ['React', 'Next.js', 'Secure Database', 'Mobile Responsive']
  },
  {
    id: 'project-3',
    title: 'UrbanGo On-Demand Courier Mobile App',
    category: 'Mobile App Development',
    client: 'City Courier & Delivery Service',
    description: 'A cross-platform app for package booking, live motorcycle driver dispatch, and instant Mobile Money payment settlement.',
    impact: 'Enables customers to track parcel deliveries live with automated delivery SMS updates.',
    stack: ['React Native', 'Mobile Money API', 'Live Maps', 'Firebase']
  }
];
