import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Stats from "@/components/Stats";
import About from "@/components/About";
import Services from "@/components/Services";
import Awards from "@/components/Awards";
import Science from "@/components/Science";
import Testimonials from "@/components/Testimonials";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F0E8]">
      <Navbar />
      <Hero />
      <CTA />
      <Stats />
      <About />
      <Services />
      <Awards />
      <Science />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
