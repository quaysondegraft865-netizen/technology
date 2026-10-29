import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, MessageSquare, Phone, AlertCircle, Sparkles } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

interface InteractiveInquiryProps {
  selectedService?: string;
  prefilledDetails?: string;
  prefilledBudget?: string;
}

export const InteractiveInquiry: React.FC<InteractiveInquiryProps> = ({
  selectedService = 'Website Development',
  prefilledDetails = '',
  prefilledBudget = '',
}) => {
  const { addLead, services, settings } = useAdmin();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: selectedService,
    budget: prefilledBudget || 'GH₵12,000 – GH₵25,000',
    details: prefilledDetails || '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [refCode, setRefCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  useEffect(() => {
    if (prefilledDetails) {
      setFormData((prev) => ({ ...prev, details: prefilledDetails }));
    }
  }, [prefilledDetails]);

  useEffect(() => {
    if (prefilledBudget) {
      setFormData((prev) => ({ ...prev, budget: prefilledBudget }));
    }
  }, [prefilledBudget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.details.trim()) {
      setErrorMsg('Please fill in your name, phone number, and a brief description of what you need.');
      return;
    }

    setErrorMsg('');
    const newLead = addLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'Not provided',
      service: formData.service,
      budget: formData.budget,
      details: formData.details,
    });

    setRefCode(newLead.refCode);
    setSubmitted(true);
  };

  return (
    <section id="inquiry" className="py-20 bg-slate-50 border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-[#0A1C36] tracking-tight">
            Start Your Software Project
          </h2>
          <p className="mt-2 text-slate-600 text-sm max-w-xl mx-auto">
            Tell us about your idea or business system requirements. {settings.founderName} will personally review your brief and advise on the most practical implementation.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-6 sm:p-10">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-[#0A1C36] mb-2">
                Thank You, {formData.name}!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
                Your message has been received with project reference{' '}
                <strong className="text-blue-600 font-mono">{refCode}</strong>. 
                We will contact you via phone or email within 24 hours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${settings.whatsappNumber}?text=Hello%20${encodeURIComponent(settings.founderName)},%20I%20just%20submitted%20project%20inquiry%20${refCode}%20for%20${encodeURIComponent(formData.service)}%20(Budget:%20${encodeURIComponent(formData.budget)}).`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Follow Up on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: '',
                      phone: '',
                      email: '',
                      service: 'Website Development',
                      budget: 'GH₵12,000 – GH₵25,000',
                      details: '',
                    });
                  }}
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Your Name <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Isaac Osei"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Phone Number (Call / WhatsApp) <span className="text-blue-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 024XXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. yourname@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Service Required
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                  >
                    {services.map((srv) => (
                      <option key={srv.id} value={srv.title}>
                        {srv.title}
                      </option>
                    ))}
                    <option value="Complete Custom Software Solution">
                      Complete Custom Software Solution (Multi-service)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Budget Target (Ghana Cedis)
                  </label>
                  <select
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 bg-white"
                  >
                    <option value="GH₵5,000 – GH₵12,000">GH₵5,000 – GH₵12,000</option>
                    <option value="GH₵12,000 – GH₵25,000">GH₵12,000 – GH₵25,000</option>
                    <option value="GH₵25,000 – GH₵50,000">GH₵25,000 – GH₵50,000</option>
                    <option value="GH₵50,000+">GH₵50,000+</option>
                    <option value="Flexible / Negotiable">Flexible / Negotiable</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Project Details or Questions <span className="text-blue-600">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us what you want to build, any features you have in mind, or problems your current system is facing..."
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-slate-900 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-xl bg-[#0A1C36] hover:bg-blue-900 text-white font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-[#00A3FF]" />
                <span>Submit Project Brief to {settings.name}</span>
              </button>

              <div className="flex items-center justify-center gap-6 pt-3 text-xs text-slate-500">
                <a href={`tel:${settings.phone}`} className="flex items-center gap-1.5 text-blue-600 hover:underline">
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {settings.phone}</span>
                </a>
                <span>·</span>
                <a href={`https://wa.me/${settings.whatsappNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-emerald-600 hover:underline">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Direct WhatsApp Chat</span>
                </a>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
