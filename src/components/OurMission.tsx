import React from 'react';
import { motion } from 'framer-motion';

export function OurMission() {
  return (
    <section className="py-24 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <div className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-bold tracking-wide mb-6">
            OUR MISSION
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            Our Mission
          </h2>
          <p className="text-lg text-foreground/70 font-medium leading-relaxed mb-4">
            We believe every business deserves a premium online presence that does more than look beautiful.
          </p>
          <p className="text-lg text-foreground/70 font-medium leading-relaxed">
            Every website we build is designed to generate trust, automate repetitive work, and help businesses grow with confidence.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
