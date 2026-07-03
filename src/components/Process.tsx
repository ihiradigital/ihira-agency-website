import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Free Strategy Call',
    description: 'We discuss your business goals, target customers, competitors, and what success looks like for you.',
  },
  {
    number: '02',
    title: 'Business Discovery',
    description: 'We define your website structure, messaging strategy, automation flows, and conversion priorities.',
  },
  {
    number: '03',
    title: 'Design',
    description: 'We craft a premium interface that earns visitor trust and represents your business professionally.',
  },
  {
    number: '04',
    title: 'Development',
    description: 'We build a fast, responsive, SEO-ready website with a secure backend and solid technical foundations.',
  },
  {
    number: '05',
    title: 'AI Automation',
    description: 'We connect your lead capture, CRM integration, and instant notifications into one seamless workflow.',
  },
  {
    number: '06',
    title: 'Testing',
    description: 'We verify responsiveness, forms, load speed, accessibility, and user experience across all devices.',
  },
  {
    number: '07',
    title: 'Launch',
    description: 'We deploy your website and confirm every automation, notification, and integration is live and working.',
  },
  {
    number: '08',
    title: 'Growth & Optimisation',
    description: 'We continue improving performance, SEO, and conversion rates as your business grows.',
  },
];

export function Process() {
  return (
    <section id="process" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-20"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            HOW WE WORK
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            From Strategy Call to Launch — a Clear Process
          </h2>
          <p className="text-lg text-foreground/70 font-medium">
            No guesswork. No surprises. Every step is structured so you always know what's happening and what comes next.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              viewport={{ once: true }}
              className="flex flex-col items-center sm:items-start text-center sm:text-left"
            >
              <div className="w-16 h-16 bg-card border border-border rounded-full flex items-center justify-center mb-5 shadow-sm flex-shrink-0">
                <span className="text-2xl font-extrabold text-primary">{step.number}</span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">{step.title}</h3>
              <p className="text-foreground/65 text-sm font-medium leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
