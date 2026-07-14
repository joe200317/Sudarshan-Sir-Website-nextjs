import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import CTA from "@/components/CTA";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F0E8]">
      <Navbar />
      <Hero />
      <CTA />
      <Contact />
      <Footer />
    </main>
  );
}
