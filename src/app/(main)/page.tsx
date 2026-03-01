import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import FeatureSection from '@/components/landing/FeatureSection';
import StatsSection from '@/components/landing/StatsSection';
import FaqSection from '@/components/landing/FaqSection';
import ClosingCta from '@/components/landing/ClosingCta';
import ScrollReveal from '@/components/shared/ScrollReveal';

export default function Home() {
  return (
    <main className="flex flex-col pt-16">
      <section id="beranda" className="scroll-mt-24">
        <HeroSection />
      </section>
      
      <ScrollReveal id="tentang" className="scroll-mt-24 bg-slate-900">
        <AboutSection />
      </ScrollReveal>
      
      <ScrollReveal id="fitur" className="scroll-mt-24 bg-slate-950">
        <FeatureSection />
      </ScrollReveal>
      
      <ScrollReveal id="statistik" className="scroll-mt-24 bg-slate-900">
        <StatsSection />
      </ScrollReveal>
      
      <ScrollReveal id="faq" className="scroll-mt-24 bg-slate-950">
        <FaqSection />
      </ScrollReveal>
      
      <ScrollReveal className="bg-slate-900">
        <ClosingCta />
      </ScrollReveal>
    </main>
  );
}