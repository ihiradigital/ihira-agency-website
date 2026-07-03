import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Lock, Smartphone, Search, Brain, Gauge, Zap, MessageSquare, LifeBuoy } from 'lucide-react';

const guarantees = [
  {
    icon: <Palette className="w-5 h-5" />,
    title: "Premium Handcrafted Design",
    description: "No templates. Every website is designed from scratch to reflect your brand and attract your ideal customers.",
  },
  {
    icon: <Lock className="w-5 h-5" />,
    title: "Secure by Default",
    description: "Forms, automations, and data flows are built on a hardened backend. Sensitive credentials are never exposed.",
  },
  {
    icon: <Smartphone className="w-5 h-5" />,
    title: "Mobile-First Development",
    description: "Designed for the phone first. Your website works perfectly on every device — from 320px to 4K screens.",
  },
  {
    icon: <Search className="w-5 h-5" />,
    title: "SEO-Ready Websites",
    description: "Built with semantic HTML, structured data, and optimised metadata so search engines understand your business from day one.",
  },
  {
    icon: <Brain className="w-5 h-5" />,
    title: "AI-Powered Automation",
    description: "Your lead workflows, notifications, and CRM integrations are fully automated — no manual effort required.",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Fast Loading",
    description: "Optimised for Core Web Vitals — your website loads quickly on all connections, reducing bounce rates and improving rankings.",
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: "Instant Lead Notifications",
    description: "Every new enquiry reaches you within seconds — giving you the best chance to respond before a competitor does.",
  },
  {
    icon: <MessageSquare className="w-5 h-5" />,
    title: "Transparent Communication",
    description: "You always know what's being built and why. No jargon. No surprises. Regular updates throughout every project.",
  },
  {
    icon: <LifeBuoy className="w-5 h-5" />,
    title: "Ongoing Support",
    description: "After launch, we remain available for maintenance, updates, and improvements. Your success doesn't stop at go-live.",
  },
];

export function TrustGuarantees() {
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
            OUR STANDARDS
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            What You Can Expect From Every Project
          </h2>
          <p className="text-lg text-foreground/70 font-medium">
            We take on a limited number of clients each month so every project receives the attention it deserves.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.07 } } }}
        >
          {guarantees.map((item, index) => (
            <motion.div
              key={index}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
              className="group flex items-start gap-4 bg-card border border-card-border rounded-xl p-5 hover:border-primary/25 hover:shadow-md transition-all duration-300"
            >
              <div className="w-9 h-9 bg-primary/10 text-primary rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {item.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-xs text-foreground/60 font-medium leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
