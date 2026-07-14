import PageHero from "@/components/PageHero";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";

export default function TestimonialsPage() {
  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      <PageHero
        eyebrow="Testimonials"
        title={
          <>
            Voices of those who{" "}
            <span className="text-gradient-gold">trained their minds</span>
          </>
        }
        description="Leaders, athletes, entrepreneurs, and scientists share how mind training changed their focus, resilience, and results."
      />
      <Testimonials />
      <CTA />
    </main>
  );
}
