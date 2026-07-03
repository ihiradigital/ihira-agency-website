import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, ArrowRight, Activity, ShieldCheck, Globe } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ihiradigital/free-website-strategy-call';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0F0F10] pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#172033]/40 to-[#0F0F10]" />
        <div className="noise-bg opacity-10" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/15 blur-[120px] rounded-[100%] opacity-40 mix-blend-screen pointer-events-none" />
      </div>

      <div className="container relative z-10 mx-auto px-6 py-20 md:py-32 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/15 border border-primary/25 text-primary rounded-full text-xs font-bold tracking-widest mb-8 uppercase"
        >
          Premium Websites · AI Automation · Lead Generation
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight mb-6">
            Your Website Should Be{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
              Generating Leads
            </span>{' '}
            While You Work
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-lg md:text-xl text-white/65 mb-4 leading-relaxed font-medium">
            Most local business websites look fine but do nothing. We build premium websites with AI-powered automation that capture enquiries, notify you instantly, and convert visitors into paying customers — 24/7.
          </p>
          <p className="text-sm md:text-base text-primary/80 font-semibold mb-10">
            Every website is custom-built around your business—not adapted from a generic template.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-16 w-full sm:w-auto"
        >
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('hero_book_call')}
            className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded shadow-[0_0_24px_hsl(181_87%_43%/0.3)] hover:shadow-[0_0_36px_hsl(181_87%_43%/0.5)] transition-all flex items-center justify-center gap-2 transform hover:-translate-y-1"
          >
            Book Free Strategy Call <ArrowRight className="w-5 h-5" />
          </a>
          <a
            href="#demo"
            onClick={() => trackEvent('hero_view_demo')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold rounded hover:bg-white/5 transition-all flex items-center justify-center"
          >
            View Roofing Demo
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="w-full max-w-5xl border-t border-white/10 pt-8 mt-4"
        >
          <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm font-medium text-white/45">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-primary" /> Conversion-Focused Design
            </span>
            <span className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-primary" /> AI Lead Automation
            </span>
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" /> Instant Lead Notifications
            </span>
            <span className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-primary" /> Local SEO Ready
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-primary" /> Built for Local Businesses
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
