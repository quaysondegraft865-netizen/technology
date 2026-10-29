import React, { useState } from 'react';
import { Cpu, Server, Database, Smartphone, Globe, Shield, Terminal, Zap } from 'lucide-react';

export const TechArchitectureExplorer: React.FC = () => {
  const [activeTier, setActiveTier] = useState<'frontend' | 'mobile' | 'backend' | 'database' | 'ghana'>('backend');

  const tiers = [
    { id: 'backend', label: 'Backend & APIs', icon: Server },
    { id: 'frontend', label: 'Web Applications', icon: Globe },
    { id: 'mobile', label: 'Mobile Engineering', icon: Smartphone },
    { id: 'database', label: 'Database & Caching', icon: Database },
    { id: 'ghana', label: 'Ghana Payments & SMS', icon: Zap },
  ];

  return (
    <section id="architecture" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-14">
          <div className="text-xs font-bold text-[#0066CC] uppercase tracking-wider mb-1">
            Engineering Rigor
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0A1C36] tracking-tight">
            Production-Grade System Architecture
          </h2>
          <div className="w-16 h-1 bg-[#0066CC] mt-2 rounded-full" />
          <p className="mt-3 text-slate-600 text-sm max-w-2xl leading-relaxed">
            We don't use fragile low-code tools. Every software system engineered by De-Graft Technologies 
            relies on hardened, industry-standard stacks designed for high concurrency, zero data loss, and effortless scaling.
          </p>
        </div>

        {/* Tier Selector Buttons */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {tiers.map((t) => {
            const Icon = t.icon;
            const isSelected = activeTier === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTier(t.id as any)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#0A1C36] text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#00A3FF]' : 'text-blue-600'}`} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Tier Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 sm:p-8">
          {activeTier === 'backend' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Microservices & API Gateway</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Decoupled Node.js and Express API services with JWT token authentication, rate limiting, and CORS security.
                </p>
                <div className="text-[11px] font-mono text-blue-600">TypeScript · Node.js · Express</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Background Job Processing</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Asynchronous workers for automated daily payroll calculations, inventory deductions, and scheduled report dispatch.
                </p>
                <div className="text-[11px] font-mono text-blue-600">BullMQ · Redis Workers · Cron</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Containerization & DevOps</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Docker containerized environments ensuring seamless migration between cloud VPS instances (DigitalOcean, AWS, GCP).
                </p>
                <div className="text-[11px] font-mono text-blue-600">Docker · Nginx Reverse Proxy · CI/CD</div>
              </div>
            </div>
          )}

          {activeTier === 'frontend' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Modern React & Next.js</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Server-side rendering and static optimization for sub-second page loads and top Google Search rankings.
                </p>
                <div className="text-[11px] font-mono text-blue-600">React 19 · Next.js · TypeScript</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Responsive Across All Viewports</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Mobile-first layouts tested extensively on small Android smartphones, iPads, and large 4K desktop screens.
                </p>
                <div className="text-[11px] font-mono text-blue-600">Tailwind CSS · CSS Grid · Fluid Typography</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Interactive Admin Portals</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Clean internal dashboards for business owners with sorting, date filtering, and instant CSV/PDF export.
                </p>
                <div className="text-[11px] font-mono text-blue-600">Data Tables · Tabular Numerals · Charts</div>
              </div>
            </div>
          )}

          {activeTier === 'mobile' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Cross-Platform Efficiency</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Single codebase delivery for both Apple App Store and Google Play Store without compromising native speed.
                </p>
                <div className="text-[11px] font-mono text-blue-600">React Native · Flutter · Expo</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Offline Data Storage</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Local SQLite database caching allows riders, drivers, and field agents to work without internet and auto-sync when online.
                </p>
                <div className="text-[11px] font-mono text-blue-600">WatermelonDB · SQLite · Background Sync</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Device Hardware Integration</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  High-speed barcode scanning, camera receipt capture, GPS location streaming, and biometric fingerprint sign-in.
                </p>
                <div className="text-[11px] font-mono text-blue-600">Vision Camera · Geolocation · FaceID/Biometrics</div>
              </div>
            </div>
          )}

          {activeTier === 'database' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">PostgreSQL Relational Storage</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Normalized 3NF relational schemas, foreign key integrity, and compound indexes preventing slow queries.
                </p>
                <div className="text-[11px] font-mono text-blue-600">PostgreSQL 16 · Prisma / Drizzle ORM</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Sub-Millisecond Redis Cache</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  In-memory caching of active sessions, product catalogs, and token blacklists to eliminate unnecessary database load.
                </p>
                <div className="text-[11px] font-mono text-blue-600">Redis · Memory Store · Key-Value TTL</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Disaster Recovery & Encryption</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Automated nightly encrypted off-site backups with point-in-time restore to guarantee zero data loss.
                </p>
                <div className="text-[11px] font-mono text-blue-600">AES-256 · WAL Archiving · AWS S3 Snapshots</div>
              </div>
            </div>
          )}

          {activeTier === 'ghana' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Mobile Money Webhooks</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Real-time payment triggers for MTN Mobile Money, Telecel Cash, and AT Money with automated instant receipt generation.
                </p>
                <div className="text-[11px] font-mono text-blue-600">Paystack Ghana · Hubtel · MTN MoMo API</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Bulk SMS & OTP Verification</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Instant 4-digit SMS verification for customer logins and automated dispatch SMS alerts to customers and couriers.
                </p>
                <div className="text-[11px] font-mono text-blue-600">Arkesel · Hubtel SMS · Twilio</div>
              </div>

              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-sm font-bold text-[#0A1C36] mb-2">Local Currency Formatting & VAT</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  Compliant Ghana Revenue Authority (GRA) invoice structures, automated NHIL/GETFund calculations, and cedi formatting.
                </p>
                <div className="text-[11px] font-mono text-blue-600">GRA E-VAT Spec · Currency Formatter · PDF Kit</div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
