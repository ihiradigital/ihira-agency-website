import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const points = [
  'Customers can still request quotes',
  'Leads are automatically captured',
  'Your team is notified instantly',
  'Every enquiry is organised',
  'Your business keeps generating opportunities 24/7',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function AlwaysOn() {
  return (
    <section className="py-24 bg-[#172033] relative overflow-hidden">
      <div className="noise-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F10]/40 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            ALWAYS OPEN
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
            Your Website Never Stops Working
          </h2>
          <p className="text-lg text-white/60 font-medium">
            🌙 Even After Business Hours
          </p>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row flex-wrap justify-center items-stretch gap-4 max-w-5xl mx-auto mb-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {points.map((point, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl px-5 py-4 sm:flex-1 sm:min-w-[200px]"
            >
              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="text-white/85 font-medium text-sm">{point}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-center text-lg md:text-xl text-white/70 font-semibold max-w-xl mx-auto leading-relaxed"
        >
          Your business may close for the day. Your website doesn't.
        </motion.p>
      </div>
    </section>
  );
}
