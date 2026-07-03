import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ihiradigital/free-website-strategy-call';

const plans = [
  {
    name: 'Essential Website',
    price: '$1,500',
    priceNote: 'Starting at',
    bestFor: 'Businesses launching or establishing their first professional online presence.',
    description: 'A premium, mobile-first website that presents your business professionally and starts generating enquiries.',
    features: [
      'Premium custom website',
      'Mobile-first design',
      'Contact form',
      'Local SEO foundation',
      'Speed optimisation',
      'Google Maps integration',
      'Secure hosting setup',
      'Launch support',
    ],
    cta: 'Request a Custom Proposal',
    ctaType: 'proposal' as const,
    highlight: false,
  },
  {
    name: 'Growth Website System',
    price: '$2,500',
    priceNote: 'Starting at',
    bestFor: 'Established businesses ready to replace manual lead management with automated systems.',
    description: 'The complete lead generation system — premium design combined with intelligent automation that works for your business 24/7.',
    badge: 'Most Popular',
    features: [
      'Everything in Essential',
      'AI Lead Capture System',
      'Business Automation',
      'CRM Integration',
      'Instant Lead Notifications',
      'Customer Confirmation System',
      'High-Value Lead Prioritisation',
      'Before & After Showcase',
      'Premium Motion Animations',
      'Conversion Optimisation',
    ],
    cta: 'Book Free Strategy Call',
    ctaType: 'call' as const,
    highlight: true,
  },
  {
    name: 'Enterprise Growth System',
    price: 'Custom Quote',
    priceNote: '',
    bestFor: 'Growing businesses that need advanced automation, multiple locations, or custom integrations.',
    description: 'A fully bespoke digital system built around your business model, team structure, and long-term growth goals.',
    features: [
      'Everything in Growth',
      'Multi-location websites',
      'Advanced Automation',
      'Custom CRM Integration',
      'Custom Workflows',
      'Scalable Architecture',
      'Monthly Optimisation',
      'Priority Support',
      'Strategic Consulting',
    ],
    cta: 'Request a Custom Proposal',
    ctaType: 'proposal' as const,
    highlight: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            PACKAGES
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Invest in a System That Pays for Itself
          </h2>
          <p className="text-lg text-foreground/70 font-medium leading-relaxed">
            Every package is a starting point. Final pricing depends on your scope, automation requirements, and business goals — which is why we begin with a free strategy call.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative rounded-2xl p-8 flex flex-col ${
                plan.highlight
                  ? 'bg-[#0A1018] border border-white/10 shadow-2xl lg:-translate-y-4'
                  : 'bg-background border border-border shadow-sm'
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                  {plan.badge}
                </div>
              )}

              <div className="mb-2 pb-6 border-b border-white/10">
                <h3 className={`text-xl font-bold mb-3 ${plan.highlight ? 'text-white' : 'text-foreground'}`}>
                  {plan.name}
                </h3>
                {plan.priceNote && (
                  <p className={`text-xs font-bold uppercase tracking-wider mb-1 ${plan.highlight ? 'text-white/40' : 'text-foreground/40'}`}>
                    {plan.priceNote}
                  </p>
                )}
                <div className={`text-4xl font-extrabold tracking-tight ${plan.highlight ? 'text-white' : 'text-foreground'}`}>
                  {plan.price}
                </div>
              </div>

              <p className={`text-xs font-bold uppercase tracking-wider mb-2 mt-4 ${plan.highlight ? 'text-primary/80' : 'text-primary'}`}>
                Best for
              </p>
              <p className={`text-sm font-medium leading-relaxed mb-5 ${plan.highlight ? 'text-white/60' : 'text-foreground/60'}`}>
                {plan.bestFor}
              </p>

              <p className={`text-sm font-medium leading-relaxed mb-6 ${plan.highlight ? 'text-white/55' : 'text-foreground/55'}`}>
                {plan.description}
              </p>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 text-primary`} />
                    <span className={`text-sm font-medium ${plan.highlight ? 'text-white/80' : 'text-foreground/75'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {plan.ctaType === 'call' ? (
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-full block py-3.5 font-bold rounded text-center transition-all text-sm ${
                    plan.highlight
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(181_87%_43%/0.3)] hover:shadow-[0_0_30px_hsl(181_87%_43%/0.5)]'
                      : 'border-2 border-primary text-primary hover:bg-primary/5'
                  }`}
                >
                  {plan.cta}
                </a>
              ) : (
                <a
                  href="#proposal"
                  className={`w-full block py-3.5 font-bold rounded text-center transition-all text-sm ${
                    plan.highlight
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_hsl(181_87%_43%/0.3)] hover:shadow-[0_0_30px_hsl(181_87%_43%/0.5)]'
                      : 'border-2 border-primary text-primary hover:bg-primary/5'
                  }`}
                >
                  {plan.cta}
                </a>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-12 bg-background border border-border rounded-xl p-6 text-center"
        >
          <h4 className="font-bold text-foreground mb-2 text-sm uppercase tracking-wide">Every project starts with a free strategy call</h4>
          <p className="text-foreground/55 text-sm font-medium">
            We discuss your goals, recommend the right solution, and provide clear pricing — no obligation, no pressure.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
