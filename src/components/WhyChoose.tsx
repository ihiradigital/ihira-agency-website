import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const traditional = [
  "Generic templates",
  "No automation",
  "Slow delivery",
  "Limited support",
  "Built to exist",
];

const ihira = [
  "Fully customized",
  "AI-powered automation",
  "Premium user experience",
  "Fast turnaround",
  "Ongoing support",
  "Built to generate business",
];

export function WhyChoose() {
  return (
    <section id="why-choose" className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            THE DIFFERENCE
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Why Businesses Choose Ihira Digital Operations
          </h2>
          <p className="text-lg text-foreground/70 font-medium">
            Most business websites are digital brochures. They look presentable, but they do nothing to grow your business. The gap between a brochure and a lead generation system is the difference between a quiet phone and a full calendar.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-background border border-border rounded-2xl p-8"
          >
            <h3 className="text-sm font-bold text-foreground/40 mb-6 pb-4 border-b border-border tracking-widest uppercase">
              Traditional Websites
            </h3>
            <ul className="space-y-4">
              {traditional.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                    <X className="w-3 h-3 text-red-500" />
                  </div>
                  <span className="text-foreground/55 font-medium text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-[#0A1018] border border-white/10 rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-sm font-bold text-white mb-6 pb-4 border-b border-white/10 tracking-widest uppercase">
              Ihira Digital Operations
            </h3>
            <ul className="space-y-4">
              {ihira.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-white/85 font-medium text-sm">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <a
            href="#pricing"
            onClick={() => trackEvent('whychoose_see_packages')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-all shadow-sm hover:shadow-[0_0_16px_hsl(181_87%_43%/0.3)] transform hover:-translate-y-0.5"
          >
            See Our Packages
          </a>
        </motion.div>
      </div>
    </section>
  );
}
