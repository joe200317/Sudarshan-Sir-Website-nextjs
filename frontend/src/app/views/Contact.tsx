import PageHero from "@/components/PageHero";
import Contact from "@/components/Contact";
import CTA from "@/components/CTA";

export default function ContactPage() {
  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Start your{" "}
            <span className="text-gradient-gold">transformation</span>
          </>
        }
        description="Book a session, ask a question, or explore how elite mind training can fit your goals. Reach out — responses within 24 hours."
      />
      <CTA />
      <Contact />
    </main>
  );
}
