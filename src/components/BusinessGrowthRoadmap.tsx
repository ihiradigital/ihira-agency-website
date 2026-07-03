import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Search, Palette, Bot, Rocket, TrendingUp, Target } from 'lucide-react';

const steps = [
  {
    icon: <Phone className="w-6 h-6" />,
    title: 'Free Strategy Call',
    description: 'We learn about your business, your customers, and what growth looks like for you.',
    color: 'bg-primary/10 text-primary',
    border: 'border-primary/20',
  },
  {
    icon: <Search className="w-6 h-6" />,
    title: 'Business Discovery',
    description: 'We map your ideal customer journey and define what your website needs to achieve.',
    color: 'bg-secondary/10 text-secondary',
    border: 'border-secondary/20',
  },
  {
    icon: <Palette className="w-6 h-6" />,
    title: 'Premium Website Design',
    description: 'We craft a handcrafted, conversion-focused website that reflects your brand.',
    color: 'bg-primary/10 text-primary',
    border: 'border-primary/20',
  },
  {
    icon: <Bot className="w-6 h-6" />,
    title: 'AI Automation & Lead Capture',
    description: 'We connect intelligent forms, instant notifications, and CRM logging into one system.',
    color: 'bg-secondary/10 text-secondary',
    border: 'border-secondary/20',
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: 'Website Launch',
    description: 'We deploy your website and confirm every automation and integration is live.',
    color: 'bg-primary/10 text-primary',
    border: 'border-primary/20',
  },
  {
    icon: <TrendingUp className="w-6 h-6" />,
    title: 'Generate More Leads & Grow Your Business',
    description: 'Your website starts working around the clock — attracting, converting, and growing.',
    color: 'bg-secondary/10 text-secondary',
    border: 'border-secondary/20',
  },
];

export function BusinessGrowthRoadmap() {
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
            THE JOURNEY
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Your Business Growth Roadmap
          </h2>
          <p className="text-lg text-foreground/70 font-medium leading-relaxed">
            Every successful business follows a process. Here's how we take your business from simply having an online presence to having a website that actively generates opportunities.
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto mb-14">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`flex items-start gap-5 bg-background border ${step.border} rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${step.color} border ${step.border}`}>
                  {step.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-1">
                    Step {index + 1}: {step.title}
                  </h3>
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

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto text-center bg-background border border-primary/25 rounded-2xl p-8 shadow-sm"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
            <Target className="w-7 h-7 text-primary" />
          </div>
          <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Goal Achieved</p>
          <p className="text-foreground/75 font-medium leading-relaxed">
            A website that works 24/7 to attract, impress, and convert customers — so you can focus on running and growing your business.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
