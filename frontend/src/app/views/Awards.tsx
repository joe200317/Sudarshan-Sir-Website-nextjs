import PageHero from "@/components/PageHero";
import Awards from "@/components/Awards";
import CTA from "@/components/CTA";

export default function AwardsPage() {
  return (
    <main className="bg-[#050505] text-[#F5F0E8]">
      <PageHero
        eyebrow="Awards"
        title={
          <>
            Recognition earned through{" "}
            <span className="text-gradient-gold">results</span>
          </>
        }
        description="National and international awards that follow real transformation — workshops, books, and breakthroughs that changed how people think."
      />
      <Awards />
      <CTA />
    </main>
  );
}
