import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProgramDetail from "@/components/ProgramDetail";
import { getAllProgramSlugs, getProgram } from "@/data/programs";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProgramSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Program Not Found" };
  return {
    title: `${program.title} — Mind Trainer`,
    description: program.tagline,
  };
}

export default async function ProgramPage({ params }: Props) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();
  return <ProgramDetail program={program} />;
}
