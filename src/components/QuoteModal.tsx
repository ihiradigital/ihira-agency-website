import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2 } from 'lucide-react';
import { createPortal } from 'react-dom';
import { PhoneInput } from '@/components/PhoneInput';

interface QuoteModalProps {
  triggerClassName?: string;
  triggerText?: string;
}

export function QuoteModal({ triggerClassName, triggerText = 'Get a Quote' }: QuoteModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    websiteUrl: '',
    industry: 'Roofing',
    serviceInterestedIn: 'Growth Package',
    budget: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    const honeypot = (document.getElementById('modal_website_url_hp') as HTMLInputElement)?.value;
    if (honeypot) {
      setStatus('success');
      return;
    }

    try {
      const res = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStatus('idle');
      setFormData({
        fullName: '', businessName: '', email: '', phone: '', websiteUrl: '', industry: 'Roofing', serviceInterestedIn: 'Growth Package', budget: '', message: ''
      });
    }, 300);
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-card w-full max-w-2xl rounded-2xl shadow-2xl relative z-10 overflow-hidden my-auto border border-border flex flex-col max-h-[90vh]"
          >
            <div className="flex justify-between items-center p-6 border-b border-border bg-background sticky top-0 z-20">
              <h3 className="text-2xl font-bold text-foreground">Get a Custom Quote</h3>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-muted rounded-full transition-colors text-foreground/70 hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              {status === 'success' ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-2xl font-bold text-foreground mb-2">Quote Request Sent!</h4>
                  <p className="text-foreground/70 font-medium max-w-md mx-auto mb-8">
                    Thanks for reaching out. We've received your details and will get back to you within 24 hours with a custom strategy.
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-8 py-3 bg-primary text-white font-bold rounded hover:bg-primary/90 transition-colors"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="text" id="modal_website_url_hp" style={{ display: 'none' }} aria-hidden="true" tabIndex={-1} autoComplete="off" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground">Full Name *</label>
                      <input required type="text" className="w-full bg-background border border-input rounded-md px-3 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground">Business Name *</label>
                      <input required type="text" className="w-full bg-background border border-input rounded-md px-3 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none" value={formData.businessName} onChange={e => setFormData({...formData, businessName: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground">Email Address *</label>
                      <input required type="email" className="w-full bg-background border border-input rounded-md px-3 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="qm-phone" className="text-sm font-bold text-foreground">Phone Number</label>
                      <PhoneInput
                        id="qm-phone"
                        theme="light"
                        size="sm"
                        value={formData.phone}
                        onChange={(val) => setFormData({ ...formData, phone: val })}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-foreground">Current Website URL (optional)</label>
                    <input type="url" placeholder="https://" className="w-full bg-background border border-input rounded-md px-3 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none" value={formData.websiteUrl} onChange={e => setFormData({...formData, websiteUrl: e.target.value})} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground">Service Interested In</label>
                      <select className="w-full bg-background border border-input rounded-md px-3 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none" value={formData.serviceInterestedIn} onChange={e => setFormData({...formData, serviceInterestedIn: e.target.value})}>
                        <option>Starter Website</option>
                        <option>Growth Package</option>
                        <option>Custom CRM Integration</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-sm font-bold text-foreground">Estimated Budget</label>
                      <select className="w-full bg-background border border-input rounded-md px-3 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
                        <option value="">Select a range...</option>
                        <option>$1,500 - $3,000</option>
                        <option>$3,000 - $5,000</option>
                        <option>$5,000+</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-bold text-foreground">Project Details *</label>
                    <textarea required rows={3} className="w-full bg-background border border-input rounded-md px-3 py-2.5 focus:ring-2 focus:ring-primary/50 outline-none resize-none" placeholder="Tell us about your goals..." value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                  </div>

                  {status === 'error' && (
                    <div className="text-red-500 text-sm font-bold">Failed to submit. Please try again.</div>
                  )}

                  <div className="pt-4 border-t border-border flex justify-end gap-3 sticky bottom-0 bg-card py-2">
                    <button type="button" onClick={closeModal} className="px-5 py-2.5 text-foreground font-bold hover:bg-muted rounded-md transition-colors">
                      Cancel
                    </button>
                    <button type="submit" disabled={status === 'loading'} className="px-6 py-2.5 bg-primary text-white font-bold rounded-md hover:bg-primary/90 transition-colors flex items-center gap-2 disabled:opacity-70">
                      {status === 'loading' ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</> : 'Request Quote'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={triggerClassName || "text-primary hover:underline font-bold"}
      >
        {triggerText}
      </button>
      {isOpen && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}
