import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Laptop, RefreshCw, Zap, Workflow, Bell, BarChart2, MapPin, Shield } from 'lucide-react';

const services = [
  {
    icon: <Laptop className="w-6 h-6" />,
    title: "Premium Website Design",
    description: "Visitors judge your business in seconds. We build handcrafted, fast-loading websites that earn trust and turn first-time visitors into qualified enquiries.",
  },
  {
    icon: <RefreshCw className="w-6 h-6" />,
    title: "Website Redesign",
    description: "An outdated site costs you customers daily. We rebuild it into a modern, mobile-first system designed to convert — without losing your existing search rankings.",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI Lead Capture Systems",
    description: "Most visitors leave without making contact. Our intelligent forms and smart CTAs capture those leads — and route them to you before a competitor responds.",
  },
  {
    icon: <Workflow className="w-6 h-6" />,
    title: "Business Automation",
    description: "Manual follow-up costs you hours every week. We automate your lead workflows so every enquiry is handled, logged, and responded to without lifting a finger.",
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "Instant Lead Notifications",
    description: "Speed wins business. The moment a visitor submits an enquiry, you receive an instant notification — so you can respond while the lead is still warm.",
  },
  {
    icon: <BarChart2 className="w-6 h-6" />,
    title: "CRM Integration",
    description: "Disorganised leads get lost. Every enquiry is automatically logged and organised so you always have a clear view of your pipeline — from anywhere.",
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Local SEO Foundation",
    description: "If customers can't find you in local search, you're invisible. Every website we build is structured to help your business rank and get discovered.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Ongoing Website Care",
    description: "A neglected website breaks, slows down, and falls behind. We handle hosting, security, and performance so your site keeps delivering results long-term.",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export function Services() {
  return (
    <section id="services" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            WHAT WE DO
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Stop Losing Business to a Website That Doesn't Work
          </h2>
          <p className="text-lg text-foreground/70 font-medium leading-relaxed">
            We build premium websites and AI-powered automation systems that turn your online presence into a consistent source of qualified leads — so your business grows while you focus on the work.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-card border border-card-border p-7 rounded-xl hover:shadow-lg hover:border-primary/25 hover:-translate-y-1 transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-base font-bold text-foreground mb-2 leading-snug">{service.title}</h3>
              <p className="text-foreground/65 leading-relaxed text-sm font-medium">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
