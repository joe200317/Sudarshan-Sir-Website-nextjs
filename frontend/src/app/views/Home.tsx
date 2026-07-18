import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Stats from "@/components/Stats";
import About from "@/components/About";
import WhoShouldJoin from "@/components/WhoShouldJoin";
import PromoBanner from "@/components/PromoBanner";
import Services from "@/components/Services";
import Founder from "@/components/Founder";
import Awards from "@/components/Awards";
import Testimonials from "@/components/Testimonials";
import GalleryPreview from "@/components/GalleryPreview";
import Blog from "@/components/Blog";
import FAQ from "@/components/FAQ";
import HomeAmbient from "@/components/home/HomeAmbient";
import SectionReveal from "@/components/home/SectionReveal";
import SectionDivider from "@/components/home/SectionDivider";

export default function HomePage() {
  return (
    <main className="relative bg-[#050505] text-[#F5F0E8]">
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
          <WhoShouldJoin />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <PromoBanner />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Services />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Founder />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Awards />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Testimonials />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <GalleryPreview />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <Blog />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <FAQ />
        </SectionReveal>
        <SectionDivider />
        <SectionReveal delay={0.05}>
          <CTA />
        </SectionReveal>
      </div>
    </main>
  );
}
