import React from 'react';
import { motion, Variants } from 'framer-motion';

const results = [
  {
    emoji: '📈',
    title: 'Generate More Qualified Leads',
    description: 'Turn casual visitors into serious enquiries who are ready to work with you.',
  },
  {
    emoji: '🤝',
    title: 'Build Trust Before The First Call',
    description: 'A premium website reassures customers before they\u2019ve even spoken to you.',
  },
  {
    emoji: '⚡',
    title: 'Respond Faster To Customers',
    description: 'Instant notifications mean you never miss a warm lead again.',
  },
  {
    emoji: '🤖',
    title: 'Automate Lead Management',
    description: 'Every enquiry is captured, organised, and ready for you \u2014 automatically.',
  },
  {
    emoji: '📱',
    title: 'Better Mobile Experience',
    description: 'Most visitors arrive on mobile. Your site is built to convert them there first.',
  },
  {
    emoji: '🚀',
    title: 'Increase Customer Conversions',
    description: 'Every element is designed to turn visitors into paying customers.',
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function BusinessResults() {
  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            BUSINESS IMPACT
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            More Than Just A Beautiful Website
          </h2>
          <p className="text-lg text-foreground/70 font-medium leading-relaxed">
            Every website we build is strategically designed to attract more customers, build trust, automate repetitive work, and convert more visitors into paying clients.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {results.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-background border border-border p-7 rounded-xl hover:shadow-lg hover:border-primary/25 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 text-2xl group-hover:bg-primary/15 transition-colors duration-300">
                {item.emoji}
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 leading-snug">{item.title}</h3>
              <p className="text-foreground/65 leading-relaxed text-sm font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
