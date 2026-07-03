import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Services } from '@/components/Services';
import { RoofingDemo } from '@/components/RoofingDemo';
import { AutomationShowcase } from '@/components/AutomationShowcase';
import { BusinessResults } from '@/components/BusinessResults';
import { WhyChoose } from '@/components/WhyChoose';
import { OurMission } from '@/components/OurMission';
import { Process } from '@/components/Process';
import { BusinessGrowthRoadmap } from '@/components/BusinessGrowthRoadmap';
import { BusinessImpact } from '@/components/BusinessImpact';
import { AlwaysOn } from '@/components/AlwaysOn';
import { Statistics } from '@/components/Statistics';
import { Testimonials } from '@/components/Testimonials';
import { Pricing } from '@/components/Pricing';
import { WhyInvest } from '@/components/WhyInvest';
import { PriorityService } from '@/components/PriorityService';
import { Contact } from '@/components/Contact';
import { TrustStrip } from '@/components/TrustStrip';
import { TrustGuarantees } from '@/components/TrustGuarantees';
import { FAQ } from '@/components/FAQ';
import { FinalCTA } from '@/components/FinalCTA';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main id="main-content">
        <Hero />
        <Services />
        <RoofingDemo />
        <AutomationShowcase />
        <BusinessResults />
        <WhyChoose />
        <OurMission />
        <Process />
        <BusinessGrowthRoadmap />
        <BusinessImpact />
        <AlwaysOn />
        <Statistics />
        <Testimonials />
        <Pricing />
        <WhyInvest />
        <PriorityService />
        <Contact />
        <TrustStrip />
        <TrustGuarantees />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
