import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { PhoneInput } from '@/components/PhoneInput';

interface FormData {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  websiteUrl: string;
  industry: string;
  serviceInterestedIn: string;
  budget: string;
  message: string;
}

const initialForm: FormData = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  websiteUrl: '',
  industry: '',
  serviceInterestedIn: '',
  budget: '',
  message: '',
};

const inputClass =
  'w-full bg-background border border-input rounded-md px-4 py-3 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors text-sm font-medium';

const labelClass = 'block text-sm font-bold text-foreground mb-1.5';

export function QuoteForm() {
  const [formData, setFormData] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const set = (key: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const honeypot = (document.getElementById('quote_form_hp') as HTMLInputElement)?.value;
    if (honeypot) { setStatus('success'); return; }
    setStatus('loading');
    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setStatus('success');
        setFormData(initialForm);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="quote" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            GET A QUOTE
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Tell Us About Your Project
          </h2>
          <p className="text-lg text-foreground/70 font-medium">
            Complete the short form below and we'll recommend the best solution for your business. No obligation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto bg-card border border-card-border rounded-2xl p-8 md:p-12 shadow-sm"
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-10"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">Request Received</h3>
              <p className="text-foreground/70 font-medium max-w-md mx-auto mb-8 leading-relaxed">
                Thank you. We've successfully received your project request. Our team will review your requirements and contact you shortly.
              </p>
              <button
                onClick={() => setStatus('idle')}
                className="px-8 py-3 bg-primary text-white font-bold rounded hover:bg-primary/90 transition-colors"
              >
                Submit Another Request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              <input type="text" id="quote_form_hp" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} autoComplete="off" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="qf-fullName" className={labelClass}>
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="qf-fullName"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={set('fullName')}
                  />
                </div>
                <div>
                  <label htmlFor="qf-businessName" className={labelClass}>
                    Business Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="qf-businessName"
                    type="text"
                    required
                    className={inputClass}
                    placeholder="Your business name"
                    value={formData.businessName}
                    onChange={set('businessName')}
                  />
                </div>
                <div>
                  <label htmlFor="qf-email" className={labelClass}>
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="qf-email"
                    type="email"
                    required
                    className={inputClass}
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={set('email')}
                  />
                </div>
                <div>
                  <label htmlFor="qf-phone" className={labelClass}>Phone Number</label>
                  <PhoneInput
                    id="qf-phone"
                    theme="light"
                    value={formData.phone}
                    onChange={(val) => setFormData((prev) => ({ ...prev, phone: val }))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="qf-websiteUrl" className={labelClass}>Current Website URL</label>
                  <input
                    id="qf-websiteUrl"
                    type="url"
                    className={inputClass}
                    placeholder="https://yoursite.com (optional)"
                    value={formData.websiteUrl}
                    onChange={set('websiteUrl')}
                  />
                </div>
                <div>
                  <label htmlFor="qf-industry" className={labelClass}>Industry</label>
                  <input
                    id="qf-industry"
                    type="text"
                    className={inputClass}
                    placeholder="e.g. Roofing, HVAC, Plumbing"
                    value={formData.industry}
                    onChange={set('industry')}
                  />
                </div>
                <div>
                  <label htmlFor="qf-service" className={labelClass}>
                    Service Interested In <span className="text-primary">*</span>
                  </label>
                  <select
                    id="qf-service"
                    required
                    className={inputClass}
                    value={formData.serviceInterestedIn}
                    onChange={set('serviceInterestedIn')}
                  >
                    <option value="">Select a service…</option>
                    <option>Premium Website</option>
                    <option>Website Redesign</option>
                    <option>Website + Automation</option>
                    <option>Lead Automation Only</option>
                    <option>Website Care Plan</option>
                    <option>Not Sure Yet</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="qf-budget" className={labelClass}>Budget Range</label>
                  <select
                    id="qf-budget"
                    className={inputClass}
                    value={formData.budget}
                    onChange={set('budget')}
                  >
                    <option value="">Select a range…</option>
                    <option>$1,500–$2,500</option>
                    <option>$2,500–$5,000</option>
                    <option>$5,000+</option>
                    <option>Let's Discuss</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="qf-message" className={labelClass}>
                  Project Details <span className="text-primary">*</span>
                </label>
                <textarea
                  id="qf-message"
                  required
                  rows={5}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your business goals, current digital presence, and what you'd like to achieve…"
                  value={formData.message}
                  onChange={set('message')}
                />
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-medium">
                  Something went wrong. Please try again or email us at{' '}
                  <a href="mailto:hello@ihiradigital.in" className="underline font-bold">hello@ihiradigital.in</a>.
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-4 bg-primary text-white font-bold rounded hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                aria-label="Submit project request"
              >
                {status === 'loading' ? (
                  <><Loader2 className="w-5 h-5 animate-spin" /> Sending Request…</>
                ) : (
                  'Send My Project Request'
                )}
              </button>

              <p className="text-center text-xs text-foreground/45 font-medium">
                Required fields are marked <span className="text-primary">*</span>. We respond within 24 hours.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
