import React from 'react';
import { motion } from 'framer-motion';
import { X, CheckCircle2 } from 'lucide-react';

const before = [
  'Visitors leave quickly',
  'Hard to build trust',
  'Missed enquiries',
  'Manual follow-ups',
  'Lost opportunities',
];

const after = [
  'Visitors stay longer',
  'More quote requests',
  'Better first impressions',
  'Faster customer responses',
  'Automated lead management',
  'More qualified customers',
  'More time to focus on your business',
];

export function BusinessImpact() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            THE TRANSFORMATION
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            What Changes After Your Website Goes Live?
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-14">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-card border border-border rounded-2xl p-8"
          >
            <h3 className="text-sm font-bold text-foreground/40 mb-6 pb-4 border-b border-border tracking-widest uppercase">
              Before
            </h3>
            <ul className="space-y-4">
              {before.map((item, i) => (
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
              After
            </h3>
            <ul className="space-y-4">
              {after.map((item, i) => (
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

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-lg md:text-xl text-foreground/70 font-semibold max-w-2xl mx-auto leading-relaxed"
        >
          Your website shouldn't just exist online. It should become one of the hardest-working members of your business.
        </motion.p>
      </div>
    </section>
  );
}
