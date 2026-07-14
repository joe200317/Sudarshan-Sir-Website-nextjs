import PageHero from "@/components/PageHero";
import Services from "@/components/Services";
import Science from "@/components/Science";
import CTA from "@/components/CTA";

export default function ProgramsPage() {
  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      <PageHero
        eyebrow="Programs"
        title={
          <>
            Training that{" "}
            <span className="text-gradient-gold">rewires performance</span>
          </>
        }
        description="Cognitive enhancement, peak performance, mental direction, and emotional resilience — programs built for leaders, athletes, and high achievers."
      />
      <Services />
      <Science />
      <CTA />
    </main>
  );
}
