import { notFound } from "next/navigation";
import TTT_1Day, { TTT_1DAY } from "@/components/workshop/TTT_1Day";
import LC_4Day, { LC_4DAY } from "@/components/workshop/LC_4Day";
import { API_BASE } from "@/lib/api";
import { isWorkshopProgramSlug } from "@/data/workshop-programs";

async function getWorkshopProgramSlug(slug: string) {
  try {
    const res = await fetch(
      `${API_BASE}/api/workshops/by-slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 30 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as {
      workshop?: { programSlug?: string };
    };
    return data.workshop?.programSlug ?? null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programSlug = await getWorkshopProgramSlug(slug);
  if (programSlug === TTT_1DAY.slug) {
    return { title: `${TTT_1DAY.programName} | Sudarshan Sabat` };
  }
  if (programSlug === LC_4DAY.slug) {
    return { title: `${LC_4DAY.programName} | Sudarshan Sabat` };
  }
  return { title: "Workshop" };
}

export default async function WorkshopSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programSlug = await getWorkshopProgramSlug(slug);
  if (!programSlug || !isWorkshopProgramSlug(programSlug)) notFound();

  if (programSlug === "train-the-trainer-1-day") return <TTT_1Day />;
  if (programSlug === "life-counselling-4-day") return <LC_4Day />;

  notFound();
}
