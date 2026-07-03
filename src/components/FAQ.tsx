import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Do you only work with roofing contractors?",
    answer: "Roofing is a core focus because we understand the industry — seasonal demand, urgent jobs, and intense local competition. But our systems work equally well for HVAC, plumbing, landscaping, remodeling, and any local service business that relies on enquiries. If customers search for you online and you want more of them to make contact, we can help.",
  },
  {
    question: "Can you redesign my existing website?",
    answer: "Yes — redesigns are one of our most common projects. Many business owners have a website that looks acceptable but isn't generating enquiries. We audit what you currently have, identify where it's losing visitors, and rebuild it with a focus on speed, mobile experience, and lead conversion. You keep your domain and branding — we improve everything underneath.",
  },
  {
    question: "Do your packages include lead automation?",
    answer: "Yes. Our Growth Website System and Enterprise packages include AI-powered automation that handles instant lead notifications, CRM logging, customer confirmation messages, and high-value lead prioritisation — all without any manual effort on your part. The Essential package includes a contact form and can be upgraded to include automation at any stage.",
  },
  {
    question: "Will I be notified the moment someone submits an enquiry?",
    answer: "Yes — that's one of the most important parts of what we build. The moment a visitor submits a form, you receive an instant notification with their full details. High-value or urgent requests are automatically flagged so you can follow up before a competitor does. Your customer also receives a professional confirmation immediately, which builds trust from the very first touchpoint.",
  },
  {
    question: "Are new leads automatically saved and organised?",
    answer: "Yes. Every enquiry is automatically logged and organised in your CRM — name, contact details, service requested, and timestamp. No manual data entry, no leads getting lost in an inbox. You and your team can access and review every enquiry from any device, at any time.",
  },
  {
    question: "Do you provide ongoing website maintenance?",
    answer: "Yes. After launch, we offer care plan packages covering hosting management, security updates, performance monitoring, and content changes. Most business owners don't want to think about their website once it's live — our care plans make sure it keeps performing without you having to manage it.",
  },
  {
    question: "How long does a project usually take?",
    answer: "Most projects are complete within 2 to 4 weeks. A standard website with automation typically takes 2 to 3 weeks. More complex builds — multi-location, custom integrations, or advanced workflows — may take 4 to 6 weeks. We'll give you a clear, realistic timeline during our free strategy call before anything begins.",
  },
  {
    question: "Can you build websites for businesses outside roofing?",
    answer: "Absolutely. Our process works for any local service business where customers search online and request quotes or consultations. We've worked with businesses in HVAC, plumbing, remodeling, landscaping, and general contracting. The underlying problem is the same — turning website visitors into paying customers — and our systems solve it across industries.",
  },
  {
    question: "Do you optimise for SEO and AI search?",
    answer: "Yes — on both fronts. Every website is built with clean structure, proper heading hierarchy, schema markup, and optimised metadata so traditional search engines understand your business from day one. We also structure content so AI search tools and answer engines can accurately represent your services when local customers ask them questions.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            FAQ
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-foreground/70 font-medium">
            Everything you need to know about working with Ihira Digital.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="border border-border rounded-xl overflow-hidden bg-background"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-base text-foreground pr-6 leading-snug">{faq.question}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 flex-shrink-0 ${
                      isOpen ? 'bg-primary text-white' : 'bg-muted text-foreground'
                    }`}
                  >
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 text-foreground/70 font-medium leading-relaxed text-sm">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
