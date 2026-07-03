import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, Zap, Database, Bell, Mail, Star } from 'lucide-react';

const steps = [
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Visitor Submits an Enquiry",
    description: "A potential customer fills out your contact or proposal form — from any device, at any time.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Automatic Validation",
    description: "Our system filters out spam and duplicate submissions before anything reaches your inbox.",
    color: "bg-secondary/10 text-secondary",
    border: "border-secondary/20",
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: "AI Automation Triggered",
    description: "A smart workflow activates instantly — routing the lead, categorising it, and preparing the right response.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: <Database className="w-6 h-6" />,
    title: "Lead Saved to Your CRM",
    description: "Every enquiry is automatically logged and organised — name, service, timestamp — so nothing slips through.",
    color: "bg-secondary/10 text-secondary",
    border: "border-secondary/20",
  },
  {
    icon: <Bell className="w-6 h-6" />,
    title: "You're Notified Instantly",
    description: "You receive an immediate notification with the full enquiry details so you can respond while the lead is warm.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Customer Receives Confirmation",
    description: "Your customer automatically gets a professional response — building trust from the very first touchpoint.",
    color: "bg-secondary/10 text-secondary",
    border: "border-secondary/20",
  },
  {
    icon: <Star className="w-6 h-6" />,
    title: "High-Value Leads Prioritised",
    description: "Urgent and high-value requests are automatically flagged and fast-tracked so your best opportunities are never delayed.",
    color: "bg-primary/10 text-primary",
    border: "border-primary/20",
  },
];

export function AutomationShowcase() {
  return (
    <section id="automation" className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Every Lead Handled. Nothing Missed.
          </h2>
          <p className="text-lg text-foreground/70 font-medium leading-relaxed">
            From the moment a visitor submits an enquiry to the instant you're notified — your entire lead process runs automatically while you focus on running your business.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`flex items-start gap-5 bg-card border ${step.border} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color} border ${step.border}`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                  <p className="text-foreground/65 font-medium text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>

              {index < steps.length - 1 && (
                <motion.div
                  initial={{ scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.08 + 0.3 }}
                  viewport={{ once: true }}
                  className="w-px h-6 bg-border mx-auto my-1 origin-top"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
