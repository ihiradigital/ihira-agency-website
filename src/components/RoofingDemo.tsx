import React from 'react';
import { motion, Variants } from 'framer-motion';
import { CheckCircle2, Monitor, Tablet, Smartphone } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ihiradigital/free-website-strategy-call';
const LIVE_DEMO_URL = 'https://ihira-website-template.vercel.app/';

const features = [
  'Premium Conversion-Focused Design',
  'Before & After Gallery',
  'Proposal Request Form',
  'AI Lead Automation',
  'CRM Integration',
  'Instant Business Notifications',
  'Customer Confirmation Emails',
  'Mobile Optimised',
  'Local SEO Ready',
  'Fast Loading',
];

const trustBadges = [
  'Fully Custom Designed',
  'Mobile Optimized',
  'AI Lead Automation',
  'CRM & Form Integration',
  'SEO Ready',
  'Fast Loading',
];

const badgeContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
};

const badgeItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export function RoofingDemo() {
  return (
    <section id="demo" className="py-24 bg-[#172033] relative overflow-hidden">
      <div className="noise-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F0F10]/40 to-transparent pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[300px] bg-primary/15 blur-[110px] rounded-[100%] opacity-40 mix-blend-screen pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/20 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            LIVE DEMO
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Experience a Live Roofing Website Tailored to Your Business
          </h2>
          <p className="text-lg text-white/65 font-medium leading-relaxed mb-4">
            Explore a fully functional roofing website built to demonstrate the premium quality, modern design, smooth animations, AI automation, lead generation system, and user experience we deliver.
          </p>
          <p className="text-lg text-white/65 font-medium leading-relaxed mb-4">
            This is a real, live roofing website showcasing the standard of work your business can expect.
          </p>
          <p className="text-lg text-white/65 font-medium leading-relaxed">
            Every aspect—including your branding, logo, colors, services, images, content, testimonials, contact information, lead forms, AI automations, CRM integrations, and customer journey—will be completely customized to match your own business and goals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="relative max-w-6xl mx-auto rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_60px_rgba(0,0,0,0.25)] p-8 md:p-12 overflow-hidden"
        >
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/25 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary/20 blur-[100px] rounded-full pointer-events-none" />

          <div className="relative flex flex-col lg:flex-row items-center gap-14">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="lg:w-5/12"
            >
              <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-6">
                What's included in the demo
              </h3>
              <ul className="space-y-3 mb-10">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3 text-white/80 font-medium"
                  >
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </motion.li>
                ))}
              </ul>

              <div className="flex flex-col gap-3">
                <a
                  href={LIVE_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('roofingdemo_explore_live_demo')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded shadow-[0_0_24px_hsl(181_87%_43%/0.3)] hover:shadow-[0_0_36px_hsl(181_87%_43%/0.5)] transition-all transform hover:-translate-y-0.5 text-sm w-full sm:w-auto"
                  aria-label="Explore the live roofing demo website in a new tab"
                >
                  🚀 Explore Live Demo
                </a>
                <p className="text-sm text-white/45 font-medium leading-relaxed">
                  You're viewing a live roofing example.
                  <br />
                  Your final website will be built specifically for your business, branding, services, customers, and goals.
                </p>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('roofingdemo_book_call')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 border-white/30 text-white font-bold rounded hover:bg-white/10 transition-all text-sm w-full sm:w-auto mt-2"
                >
                  Book Free Strategy Call
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="lg:w-7/12 w-full"
            >
              <div className="relative flex items-end justify-center gap-4">
                <div className="flex-1 max-w-sm">
                  <div className="rounded-xl overflow-hidden border border-white/15 bg-[#0F0F10] shadow-2xl">
                    <div className="h-7 bg-[#1a1a1a] flex items-center px-3 gap-1.5 border-b border-white/10">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                      <div className="mx-auto w-32 h-3.5 bg-white/10 rounded-full" />
                    </div>
                    <div className="aspect-[16/10] bg-gradient-to-br from-gray-800 to-gray-900 p-4 flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <div className="w-16 h-4 bg-white/20 rounded" />
                        <div className="flex gap-2">
                          <div className="w-8 h-3 bg-white/10 rounded" />
                          <div className="w-8 h-3 bg-white/10 rounded" />
                          <div className="w-16 h-3 bg-primary/60 rounded" />
                        </div>
                      </div>
                      <div className="flex-1 grid grid-cols-2 gap-3 mt-2">
                        <div className="flex flex-col gap-2">
                          <div className="w-3/4 h-4 bg-white/30 rounded" />
                          <div className="w-full h-3 bg-white/15 rounded" />
                          <div className="w-2/3 h-3 bg-white/15 rounded" />
                          <div className="w-20 h-7 bg-primary/70 rounded mt-2" />
                        </div>
                        <div className="bg-white/5 rounded-lg p-3 flex flex-col gap-2">
                          <div className="w-full h-5 bg-white/10 rounded" />
                          <div className="w-full h-5 bg-white/10 rounded" />
                          <div className="w-full h-7 bg-primary/60 rounded mt-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <Monitor className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-white/40 text-xs font-medium">Desktop</span>
                  </div>
                </div>

                <div className="w-28 hidden sm:block">
                  <div className="rounded-xl overflow-hidden border-2 border-white/15 bg-[#0F0F10] shadow-xl">
                    <div className="h-4 bg-[#1a1a1a] flex items-center justify-center border-b border-white/10">
                      <div className="w-6 h-1.5 bg-white/20 rounded-full" />
                    </div>
                    <div className="aspect-[3/4] bg-gradient-to-br from-gray-800 to-gray-900 p-3 flex flex-col gap-2">
                      <div className="w-full h-3 bg-white/20 rounded" />
                      <div className="w-3/4 h-3 bg-white/15 rounded" />
                      <div className="w-1/2 h-5 bg-primary/60 rounded mt-1" />
                      <div className="flex-1 bg-white/5 rounded mt-1 p-2 flex flex-col gap-1.5">
                        <div className="w-full h-3 bg-white/10 rounded" />
                        <div className="w-full h-3 bg-white/10 rounded" />
                        <div className="w-full h-5 bg-primary/50 rounded mt-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Tablet className="w-3 h-3 text-white/40" />
                    <span className="text-white/40 text-[10px] font-medium">Tablet</span>
                  </div>
                </div>

                <div className="w-20">
                  <div className="rounded-2xl overflow-hidden border-2 border-white/15 bg-[#0F0F10] shadow-xl">
                    <div className="h-5 bg-[#1a1a1a] flex items-center justify-center border-b border-white/10">
                      <div className="w-8 h-1.5 bg-white/20 rounded-full" />
                    </div>
                    <div className="aspect-[9/16] bg-gradient-to-br from-gray-800 to-gray-900 p-2 flex flex-col gap-1.5">
                      <div className="w-full h-2.5 bg-white/15 rounded" />
                      <div className="w-2/3 h-2.5 bg-white/10 rounded" />
                      <div className="w-1/2 h-4 bg-primary/60 rounded mt-1" />
                      <div className="flex-1 bg-white/5 rounded mt-1 p-1.5 flex flex-col gap-1">
                        <div className="w-full h-2 bg-white/10 rounded" />
                        <div className="w-full h-2 bg-white/10 rounded" />
                        <div className="w-full h-4 bg-primary/50 rounded mt-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Smartphone className="w-3 h-3 text-white/40" />
                    <span className="text-white/40 text-[10px] font-medium">Mobile</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="relative flex flex-wrap justify-center items-center gap-x-8 gap-y-4 mt-12 pt-8 border-t border-white/10"
            variants={badgeContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {trustBadges.map((badge, index) => (
              <motion.span
                key={index}
                variants={badgeItemVariants}
                whileHover={{ y: -2 }}
                className="flex items-center gap-2 text-sm font-bold text-white/70 hover:text-white transition-colors duration-300"
              >
                <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                {badge}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
