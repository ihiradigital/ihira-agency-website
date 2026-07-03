import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Loader2, CheckCircle2, Zap, Clock, Shield,
  Phone, MessageSquare, Mail,
} from 'lucide-react';
import { PhoneInput } from '@/components/PhoneInput';

const INDUSTRIES = [
  'Roofing', 'Plumbing', 'HVAC', 'Electrical', 'Landscaping',
  'Painting', 'Concrete', 'Solar', 'Pest Control', 'Cleaning',
  'Remodeling', 'Garage Doors', 'Windows & Doors', 'Other',
];

const SERVICES = [
  'New Website',
  'Website Redesign',
  'Website + Automation',
  'Lead Generation System',
  'CRM Integration',
  'Ongoing Care Plan',
  'Not Sure Yet',
];

const TIMELINE_OPTIONS = ['ASAP', 'Within 2–4 Weeks', 'Within 1–2 Months', 'Just Exploring'];

const BUDGET_OPTIONS = ['Under $1,000', '$1,000–$2,500', '$2,500–$5,000', '$5,000+'];

const CONTACT_METHODS = [
  { value: 'Call', label: 'Call', Icon: Phone },
  { value: 'SMS', label: 'SMS', Icon: MessageSquare },
  { value: 'Email', label: 'Email', Icon: Mail },
] as const;

type ContactValue = 'Call' | 'SMS' | 'Email';

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  industry: string;
  serviceNeeded: string;
  projectTimeline: string;
  message: string;
  budget: string;
  preferredContact: ContactValue | '';
}

const blank: FormState = {
  fullName: '',
  businessName: '',
  email: '',
  phone: '',
  industry: '',
  serviceNeeded: '',
  projectTimeline: '',
  message: '',
  budget: '',
  preferredContact: '',
};

const fieldCls =
  'w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 ' +
  'focus:outline-none focus:ring-2 focus:ring-primary/60 focus:border-primary/60 transition-colors text-sm font-medium';

const labelCls = 'block text-xs font-bold uppercase tracking-widest text-white/50 mb-2';

export function PriorityService() {
  const [form, setForm] = useState<FormState>(blank);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const set = <K extends keyof FormState>(key: K) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hp = (document.getElementById('ps_hp') as HTMLInputElement)?.value;
    if (hp) { setStatus('success'); return; }

    if (!form.preferredContact) {
      setErrorMsg('Please select a preferred contact method.');
      return;
    }

    setErrorMsg('');
    setStatus('loading');

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: form.fullName,
          businessName: form.businessName,
          email: form.email,
          phone: form.phone,
          industry: form.industry,
          serviceNeeded: form.serviceNeeded,
          projectTimeline: form.projectTimeline,
          message: form.message,
          budget: form.budget,
          preferredContact: form.preferredContact,
          source: 'proposal-section',
          pageUrl: window.location.href,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setForm(blank);
      } else {
        const body = await res.json().catch(() => ({}));
        setErrorMsg((body as { error?: string }).error ?? 'Something went wrong. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection and try again.');
      setStatus('error');
    }
  };

  return (
    <section id="proposal" className="py-24 bg-[#0A1018] relative overflow-hidden">
      <div className="noise-bg opacity-[0.06]" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-[#172033]/40 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/15 border border-primary/20 text-primary rounded-full text-xs font-bold tracking-widest mb-6 uppercase">
            GET STARTED
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Request a Custom Proposal
          </h2>
          <p className="text-lg text-white/55 font-medium leading-relaxed">
            Tell us about your business, project goals, and automation requirements. We'll personally review your project and prepare a tailored proposal based on your business needs.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 max-w-6xl mx-auto">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="lg:w-5/12 flex flex-col gap-6"
          >
            <div className="rounded-2xl border border-white/8 bg-white/3 p-8 space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                What happens after you submit
              </p>
              {[
                {
                  Icon: Zap,
                  color: 'text-primary',
                  bg: 'bg-primary/10',
                  title: 'Confirmation Within Minutes',
                  desc: "We'll confirm receipt immediately — no waiting, no silence.",
                },
                {
                  Icon: Clock,
                  color: 'text-amber-400',
                  bg: 'bg-amber-400/10',
                  title: 'Personal Review Within 24 Hours',
                  desc: 'A real person reviews your project and prepares a tailored action plan.',
                },
                {
                  Icon: Shield,
                  color: 'text-emerald-400',
                  bg: 'bg-emerald-400/10',
                  title: 'No Automated Quotes',
                  desc: "Every proposal is personally reviewed. You'll receive recommendations tailored specifically to your business.",
                },
              ].map(({ Icon, color, bg, title, desc }, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className={`w-9 h-9 rounded-lg ${bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                    <Icon className={`w-4 h-4 ${color}`} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white mb-0.5">{title}</p>
                    <p className="text-xs text-white/45 font-medium leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-white/8 bg-white/3 p-8">
              <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">
                Industries we serve
              </p>
              <div className="flex flex-wrap gap-2">
                {INDUSTRIES.filter((i) => i !== 'Other').map((ind) => (
                  <span
                    key={ind}
                    className="px-2.5 py-1 rounded-md bg-white/6 border border-white/8 text-white/55 text-xs font-medium"
                  >
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </motion.aside>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="lg:w-7/12"
          >
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10 shadow-2xl">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-10"
                  >
                    <div className="w-16 h-16 bg-emerald-500/15 rounded-full flex items-center justify-center mx-auto mb-6 ring-1 ring-emerald-400/30">
                      <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-extrabold text-white mb-3">Proposal Request Received</h3>
                    <p className="text-white/55 font-medium max-w-sm mx-auto mb-8 leading-relaxed text-sm">
                      🎉 Thanks! Your custom proposal request has been received. We'll personally review your project and get back to you soon.
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="px-8 py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors text-sm"
                    >
                      Submit Another Request
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    <input
                      type="text"
                      id="ps_hp"
                      style={{ display: 'none' }}
                      aria-hidden="true"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="ps-fullName" className={labelCls}>
                          Name <span className="text-primary normal-case tracking-normal">*</span>
                        </label>
                        <input
                          id="ps-fullName"
                          type="text"
                          required
                          className={fieldCls}
                          placeholder="Your full name"
                          value={form.fullName}
                          onChange={set('fullName')}
                        />
                      </div>
                      <div>
                        <label htmlFor="ps-businessName" className={labelCls}>
                          Business Name <span className="text-primary normal-case tracking-normal">*</span>
                        </label>
                        <input
                          id="ps-businessName"
                          type="text"
                          required
                          className={fieldCls}
                          placeholder="Your business name"
                          value={form.businessName}
                          onChange={set('businessName')}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="ps-email" className={labelCls}>
                          Email <span className="text-primary normal-case tracking-normal">*</span>
                        </label>
                        <input
                          id="ps-email"
                          type="email"
                          required
                          className={fieldCls}
                          placeholder="you@example.com"
                          value={form.email}
                          onChange={set('email')}
                        />
                      </div>
                      <div>
                        <label htmlFor="ps-phone" className={labelCls}>
                          Phone <span className="text-primary normal-case tracking-normal">*</span>
                        </label>
                        <PhoneInput
                          id="ps-phone"
                          theme="dark"
                          required
                          value={form.phone}
                          onChange={(val) => setForm((prev) => ({ ...prev, phone: val }))}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="ps-industry" className={labelCls}>
                          Industry <span className="text-primary normal-case tracking-normal">*</span>
                        </label>
                        <select
                          id="ps-industry"
                          required
                          className={fieldCls}
                          value={form.industry}
                          onChange={set('industry')}
                        >
                          <option value="">Select industry…</option>
                          {INDUSTRIES.map((ind) => (
                            <option key={ind}>{ind}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="ps-serviceNeeded" className={labelCls}>
                          Service Needed <span className="text-primary normal-case tracking-normal">*</span>
                        </label>
                        <select
                          id="ps-serviceNeeded"
                          required
                          className={fieldCls}
                          value={form.serviceNeeded}
                          onChange={set('serviceNeeded')}
                        >
                          <option value="">Select service…</option>
                          {SERVICES.map((svc) => (
                            <option key={svc}>{svc}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ps-timeline" className={labelCls}>
                        Project Timeline <span className="text-primary normal-case tracking-normal">*</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {TIMELINE_OPTIONS.map((opt) => {
                          const isActive = form.projectTimeline === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setForm((prev) => ({ ...prev, projectTimeline: opt }))}
                              className={`py-2.5 px-2 rounded-lg border-2 transition-all text-center cursor-pointer text-xs font-bold ${
                                isActive
                                  ? 'border-primary bg-primary/15 text-primary'
                                  : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/70'
                              }`}
                              aria-pressed={isActive}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="ps-message" className={labelCls}>
                        Project Details <span className="text-primary normal-case tracking-normal">*</span>
                      </label>
                      <textarea
                        id="ps-message"
                        required
                        rows={4}
                        className={`${fieldCls} resize-none`}
                        placeholder="Describe your business goals, current situation, and what you'd like to achieve…"
                        value={form.message}
                        onChange={set('message')}
                      />
                    </div>

                    <div>
                      <label className={labelCls}>
                        Estimated Budget <span className="text-white/30 normal-case tracking-normal text-xs font-medium ml-1">(Optional)</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {BUDGET_OPTIONS.map((opt) => {
                          const isActive = form.budget === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => setForm((prev) => ({ ...prev, budget: isActive ? '' : opt }))}
                              className={`py-2.5 px-2 rounded-lg border-2 transition-all text-center cursor-pointer text-xs font-bold ${
                                isActive
                                  ? 'border-primary bg-primary/15 text-primary'
                                  : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/70'
                              }`}
                              aria-pressed={isActive}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <fieldset>
                      <legend className={labelCls}>
                        Preferred Contact Method <span className="text-primary normal-case tracking-normal">*</span>
                      </legend>
                      <div className="flex gap-3">
                        {CONTACT_METHODS.map(({ value, label, Icon }) => {
                          const isActive = form.preferredContact === value;
                          return (
                            <button
                              key={value}
                              type="button"
                              onClick={() => setForm((prev) => ({ ...prev, preferredContact: value }))}
                              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 transition-all text-sm font-bold cursor-pointer ${
                                isActive
                                  ? 'border-primary bg-primary/15 text-primary'
                                  : 'border-white/10 text-white/50 hover:border-white/25 hover:text-white/70'
                              }`}
                              aria-pressed={isActive}
                            >
                              <Icon className="w-4 h-4 flex-shrink-0" />
                              {label}
                            </button>
                          );
                        })}
                      </div>
                    </fieldset>

                    {(status === 'error' || errorMsg) && (
                      <motion.p
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm font-medium"
                      >
                        {errorMsg || 'Something went wrong. Please try again.'}
                      </motion.p>
                    )}

                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full py-4 bg-primary text-primary-foreground font-extrabold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_24px_hsl(181_87%_43%/0.2)] hover:shadow-[0_0_36px_hsl(181_87%_43%/0.4)] transform hover:-translate-y-0.5 text-sm"
                      aria-label="Submit proposal request"
                    >
                      {status === 'loading' ? (
                        <><Loader2 className="w-5 h-5 animate-spin" /> Submitting…</>
                      ) : (
                        <><Zap className="w-4 h-4" /> Send Proposal Request</>
                      )}
                    </button>

                    <p className="text-center text-xs text-white/25 font-medium">
                      Required fields marked <span className="text-primary">*</span>. We respond within 24 hours.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
