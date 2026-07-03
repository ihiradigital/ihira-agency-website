import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Loader2, Mail, Clock, CheckCircle2, ExternalLink } from 'lucide-react';
import { PhoneInput } from '@/components/PhoneInput';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ihiradigital/free-website-strategy-call';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    businessName: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const honeypot = (document.getElementById('website_url_hp') as HTMLInputElement)?.value;
    if (honeypot) {
      setStatus('success');
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          formType: 'Ask a Question',
          pageUrl: window.location.href,
        }),
      });
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', businessName: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            CONTACT
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Ask a Question
          </h2>
          <p className="text-lg text-foreground/65 font-medium">
            Have a question about our services, pricing, or process? Send us a message and we'll get back to you within 24 hours.
          </p>
        </motion.div>

        <div className="bg-card border border-card-border rounded-2xl overflow-hidden shadow-sm flex flex-col lg:flex-row max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:w-5/12 bg-[#0A1018] p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#172033]/70 to-transparent pointer-events-none" />
            <div className="noise-bg opacity-10" />

            <div className="relative z-10">
              <h3 className="text-2xl font-extrabold text-white mb-8 leading-snug">
                Get in Touch
              </h3>

              <div className="space-y-7 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/45 text-xs font-bold uppercase tracking-wide mb-1">Email</p>
                    <a href="mailto:hello@ihiradigital.in" className="text-white font-semibold hover:text-primary transition-colors text-sm">
                      hello@ihiradigital.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-white/45 text-xs font-bold uppercase tracking-wide mb-1">Response Time</p>
                    <p className="text-white font-semibold text-sm">Within 24 Hours</p>
                    <p className="text-white/40 text-xs font-medium mt-0.5">Monday – Saturday</p>
                  </div>
                </div>
              </div>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 w-full justify-center py-3.5 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-all shadow-[0_0_15px_hsl(181_87%_43%/0.25)] hover:shadow-[0_0_25px_hsl(181_87%_43%/0.4)] text-sm"
              >
                Book Free Strategy Call <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            <div className="relative z-10 mt-10 pt-8 border-t border-white/10">
              <ul className="space-y-2">
                {['No obligation', 'Clear and jargon-free', 'Response within 24 hours'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-white/55 text-sm font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:w-7/12 p-10 lg:p-14"
          >
            <h3 className="text-xl font-bold text-foreground mb-8">Send a Message</h3>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-green-50 border border-green-200 text-green-800 p-8 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="text-xl font-bold mb-2">Message Received</h4>
                <p className="text-sm font-medium leading-relaxed">
                  ✅ Thanks! We've received your message and will get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-6 text-sm font-bold text-green-800 underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <input
                  type="text"
                  id="website_url_hp"
                  name="website_url_hp"
                  style={{ display: 'none' }}
                  aria-hidden="true"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-name" className="text-sm font-bold text-foreground">
                      Name <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      id="contact-name"
                      type="text"
                      className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-businessName" className="text-sm font-bold text-foreground">
                      Business Name <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      id="contact-businessName"
                      type="text"
                      className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="Your business"
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label htmlFor="contact-email" className="text-sm font-bold text-foreground">
                      Email <span className="text-primary">*</span>
                    </label>
                    <input
                      required
                      id="contact-email"
                      type="email"
                      className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="contact-phone" className="text-sm font-bold text-foreground">
                      Phone
                    </label>
                    <PhoneInput
                      id="contact-phone"
                      theme="light"
                      value={formData.phone}
                      onChange={(val) => setFormData({ ...formData, phone: val })}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="contact-message" className="text-sm font-bold text-foreground">
                    Message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    required
                    id="contact-message"
                    rows={5}
                    className="w-full bg-background border border-input rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors resize-none"
                    placeholder="What would you like to know?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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
                  className="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-sm shadow-sm hover:shadow-md transform hover:-translate-y-0.5"
                >
                  {status === 'loading' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
