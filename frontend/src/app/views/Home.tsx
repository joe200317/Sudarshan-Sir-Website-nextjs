import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Awards from "@/components/Awards";
import Science from "@/components/Science";
import Testimonials from "@/components/Testimonials";

export default function HomePage() {
  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      <Hero />
      <Stats />
      <About />
      <Services />
      <Awards />
      <Science />
      <Testimonials />
      <CTA />
      <Contact />
    </main>
  );
}
