import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Zap, LineChart, Layers } from 'lucide-react';

const reasons = [
  {
    icon: <TrendingUp className="w-5 h-5" />,
    title: "Generate Qualified Leads",
    description: "A premium website with a conversion-focused form system brings you better enquiries — not just more traffic.",
  },
  {
    icon: <Users className="w-5 h-5" />,
    title: "Build Genuine Trust",
    description: "Visitors decide within seconds. A professional, well-structured website signals that you take your business seriously.",
  },
  {
    icon: <Clock className="w-5 h-5" />,
    title: "Reduce Manual Work",
    description: "Automation handles lead logging, notifications, and confirmations so you can spend your time closing jobs — not chasing paperwork.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Improve Response Times",
    description: "Instant notifications mean you can respond to new enquiries within minutes — before a competitor does.",
  },
  {
    icon: <LineChart className="w-5 h-5" />,
    title: "Increase Conversions",
    description: "Every element — copy, layout, CTAs — is designed to turn a visitor into a genuine lead for your business.",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "Support Long-Term Growth",
    description: "Your website is built to scale. Add new services, service areas, or automations as your business expands.",
  },
];

export function WhyInvest() {
  return (
    <section className="py-24 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            THE BIGGER PICTURE
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            A Website Should Be an Investment, Not an Expense
          </h2>
          <p className="text-lg text-foreground/70 font-medium leading-relaxed">
            When built correctly, your website works every hour of every day. It qualifies leads, builds credibility, and handles administrative tasks — without asking for overtime pay.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.09 } } }}
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="group flex gap-5 items-start bg-background border border-border rounded-xl p-6 hover:border-primary/25 hover:shadow-md transition-all duration-300"
            >
              <div className="w-10 h-10 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {reason.icon}
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground mb-2">{reason.title}</h3>
                <p className="text-sm text-foreground/65 font-medium leading-relaxed">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
