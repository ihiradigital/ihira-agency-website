import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Marcus T.",
    role: "Owner, Premier Roofing Solutions",
    quote: "Before working with Ihira Digital, we were missing calls and losing leads we didn't even know existed. Now every form submission lands in my inbox within seconds. The Google Sheets setup alone saves me hours every week.",
    stars: 5,
  },
  {
    name: "Sandra L.",
    role: "Operations Manager, Coastal Home Services",
    quote: "We'd tried two other agencies before. Ihira was different — they actually listened to what our business needed instead of giving us a template. The automation system works exactly as they described.",
    stars: 5,
  },
  {
    name: "Devon R.",
    role: "Founder, Summit Roofing & Exteriors",
    quote: "The emergency lead routing was the feature that sold me. Storm season used to be chaos. Now urgent requests get flagged immediately and we can prioritize our response. It's made a real difference.",
    stars: 5,
  },
  {
    name: "Priya N.",
    role: "Director, Reliable Home Repairs",
    quote: "The website is genuinely the best investment we've made this year. It looks professional, it loads fast, and the contact form actually converts. We've had more qualified enquiries in two months than in the previous six.",
    stars: 5,
  },
];

export function Testimonials() {
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
            CLIENT RESULTS
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-foreground tracking-tight mb-6">
            What Clients Say
          </h2>
          <p className="text-lg text-foreground/70 font-medium">
            Real outcomes from business owners who invested in a system, not just a website.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background border border-border rounded-xl p-8 flex flex-col gap-5 hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-foreground/75 font-medium leading-relaxed text-[15px] flex-grow">
                "{t.quote}"
              </blockquote>
              <div className="pt-4 border-t border-border">
                <div className="font-bold text-foreground text-sm">{t.name}</div>
                <div className="text-foreground/50 text-xs font-medium mt-0.5">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
