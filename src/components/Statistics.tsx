import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const stats = [
  { value: 50, suffix: '+', label: 'Premium Websites', description: 'Built for local service businesses' },
  { value: 100, suffix: '+', label: 'Automation Workflows', description: 'Connecting leads to owners instantly' },
  { value: 99, suffix: '%', label: 'Client Satisfaction', description: 'From strategy call to launch' },
  { value: 24, suffix: '/7', label: 'Lead Capture', description: 'Your site works while you sleep' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!inView) return;
    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-5xl md:text-6xl font-extrabold text-foreground tracking-tight tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function Statistics() {
  return (
    <section className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="mb-3">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base font-bold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-foreground/55 font-medium">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
