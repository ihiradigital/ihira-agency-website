import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { trackEvent } from '@/lib/analytics';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ihiradigital/free-website-strategy-call';

const navLinks = [
  { name: 'Services', href: '#services' },
  { name: 'Demo', href: '#demo' },
  { name: 'Process', href: '#process' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => { if (window.innerWidth >= 768) setMobileMenuOpen(false); };
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[rgba(10,10,10,0.95)] backdrop-blur-md border-b border-white/8 py-3 shadow-sm'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <a
          href="#"
          className="flex items-center gap-3 group z-50 relative"
          aria-label="Ihira Digital Operations — home"
        >
          <img
            src="/ihira-logo.png"
            alt="Ihira Digital Operations"
            className="h-10 w-auto object-contain"
            style={{ minWidth: 40 }}
          />
        </a>

        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6" role="list">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded ${
                    scrolled ? 'text-white/70 hover:text-white' : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('navbar_book_call')}
            className="bg-primary text-primary-foreground px-5 py-2.5 rounded text-sm font-semibold hover:bg-primary/90 transition-all shadow-sm hover:shadow-[0_0_16px_hsl(181_87%_43%/0.4)] transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            aria-label="Book a free strategy call"
          >
            Book Free Strategy Call
          </a>
        </nav>

        <button
          className="md:hidden z-50 relative p-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav"
        >
          {mobileMenuOpen ? (
            <X className="text-white" size={22} />
          ) : (
            <Menu className="text-white" size={22} />
          )}
        </button>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              id="mobile-nav"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute top-0 left-0 w-full bg-[#0A0A0A] border-b border-white/10 shadow-xl py-20 px-6 flex flex-col gap-5 md:hidden z-40"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <ul className="flex flex-col gap-1" role="list">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block text-base font-semibold text-white/80 hover:text-white py-3 border-b border-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="bg-primary text-primary-foreground px-6 py-4 rounded text-center font-bold text-base mt-2 hover:bg-primary/90 transition-colors min-h-[48px] flex items-center justify-center"
              >
                Book Free Strategy Call
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
