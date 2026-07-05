import React from 'react';

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || 'https://calendly.com/ihiradigital/free-website-strategy-call';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] text-white pt-20 pb-10 border-t border-white/8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="mb-6">
              <img
                src="/ihira-logo.png"
                alt="Ihira Digital Operations"
                className="h-16 w-auto object-contain"
              />
            </div>
            <p className="text-white/50 font-medium max-w-sm mb-6 leading-relaxed text-sm">
              Premium websites and AI-powered automation systems for ambitious local service businesses. We build digital systems that generate leads and support long-term growth.
            </p>
            <a href="mailto:hello@ihiradigital.in" className="text-white font-bold hover:text-primary transition-colors text-sm">
              hello@ihiradigital.in
            </a>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-6">Navigation</h4>
            <ul className="space-y-3">
              {[
                { label: 'Services', href: '#services' },
                { label: 'Roofing Demo', href: '#demo' },
                { label: 'Process', href: '#process' },
                { label: 'Pricing', href: '#pricing' },
                { label: 'FAQ', href: '#faq' },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-white/55 hover:text-white font-medium transition-colors text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/40 mb-6">Get Started</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/55 hover:text-white font-medium transition-colors text-sm"
                >
                  Book Free Strategy Call
                </a>
              </li>
              <li>
                <a href="#proposal" className="text-white/55 hover:text-white font-medium transition-colors text-sm">
                  Request a Custom Proposal
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/55 hover:text-white font-medium transition-colors text-sm">
                  Ask a Question
                </a>
              </li>
              <li>
                <a href="/privacy-policy" className="text-white/55 hover:text-white font-medium transition-colors text-sm">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms-and-conditions" className="text-white/55 hover:text-white font-medium transition-colors text-sm">
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a href="/cookie-policy" className="text-white/55 hover:text-white font-medium transition-colors text-sm">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="termly-display-preferences text-white/55 hover:text-white font-medium transition-colors text-sm"
                  onClick={(e) => e.preventDefault()}
                >
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/35 text-sm font-medium">
            &copy; {new Date().getFullYear()} Ihira Digital Operations. All rights reserved.
          </p>
          <p className="text-white/25 text-xs font-medium">
            Premium Websites · AI Automation · Lead Generation
          </p>
        </div>
      </div>
    </footer>
  );
}
