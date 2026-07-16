import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Awards from "@/components/Awards";
import Science from "@/components/Science";
import Testimonials from "@/components/Testimonials";
import HomeAmbient from "@/components/home/HomeAmbient";
import SectionReveal from "@/components/home/SectionReveal";
import SectionDivider from "@/components/home/SectionDivider";

export default function HomePage() {
  return (
    <main className="relative bg-[#050505] text-[#F5F0E8] overflow-x-hidden">
      <HomeAmbient />
      <div className="relative z-10">
        <Hero />
        <SectionDivider />
        <SectionReveal>
          <Stats />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <About />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Services />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Awards />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Science />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Testimonials />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <CTA />
        </SectionReveal>
      </div>
    </main>
  );
}
