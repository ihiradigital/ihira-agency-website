import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const badges = [
  'Mobile Optimized',
  'SEO Ready',
  'AI Lead Automation',
  'Lightning Fast',
  'Secure & Reliable',
  'CRM & Form Integration',
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function TrustStrip() {
  return (
    <section className="py-14 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {badges.map((badge, index) => (
            <motion.span
              key={index}
              variants={itemVariants}
              className="flex items-center gap-2 text-sm font-bold text-foreground/60"
            >
              <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
