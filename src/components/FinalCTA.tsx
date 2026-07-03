import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ihiradigital/free-website-strategy-call';

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#0F0F10] relative overflow-hidden">
      <div className="noise-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-[#172033]/80 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/15 border border-primary/20 text-primary rounded-full text-xs font-bold tracking-widest mb-8 uppercase">
            Ready to Get Started?
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight mb-6 leading-tight">
            Your Website Should Be Working for You — Not Just Sitting There
          </h2>
          <p className="text-lg text-white/55 font-medium mb-10 leading-relaxed max-w-2xl mx-auto">
            Book a free strategy call and let's discuss exactly what your business needs. We'll give you a clear plan and honest recommendations — no obligation, no pressure.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('finalcta_book_call')}
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground font-bold rounded hover:bg-primary/90 transition-all shadow-[0_0_24px_hsl(181_87%_43%/0.25)] hover:shadow-[0_0_36px_hsl(181_87%_43%/0.45)] transform hover:-translate-y-0.5 text-center flex items-center justify-center gap-2"
            >
              Book Free Strategy Call <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#proposal"
              onClick={() => trackEvent('finalcta_request_proposal')}
              className="w-full sm:w-auto px-8 py-4 border-2 border-white/25 text-white font-bold rounded hover:bg-white/8 transition-all text-center"
            >
              Request a Custom Proposal
            </a>
          </div>

          <p className="mt-8 text-white/35 text-sm font-medium">
            No automated quotes. Every proposal is personally reviewed and tailored to your business.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
