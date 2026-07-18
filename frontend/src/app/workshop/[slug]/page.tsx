import { notFound } from "next/navigation";
import TTT_1Day, { TTT_1DAY } from "@/components/workshop/TTT_1Day";
import LC_4Day, { LC_4DAY } from "@/components/workshop/LC_4Day";
import MetaPixelClient from "@/components/workshop/MetaPixelClient";
import { API_BASE } from "@/lib/api";
import { isWorkshopProgramSlug } from "@/data/workshop-programs";
import type { WorkshopBookingInfo } from "@/data/reserve-spot";

type WorkshopPayload = {
  slug: string;
  programSlug: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  fees: number | null;
  includePayment: boolean;
  imageUrl?: string;
  metaPixelCode?: string;
  program?: { title?: string };
};

async function getWorkshop(slug: string) {
  try {
    const res = await fetch(
      `${API_BASE}/api/workshops/by-slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: 30 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as { workshop?: WorkshopPayload };
    return data.workshop ?? null;
  } catch {
    return null;
  }
}

function toBookingInfo(w: WorkshopPayload): WorkshopBookingInfo {
  return {
    slug: w.slug,
    programSlug: w.programSlug,
    programTitle:
      w.program?.title ||
      (w.programSlug === TTT_1DAY.slug
        ? TTT_1DAY.programName
        : w.programSlug === LC_4DAY.slug
          ? LC_4DAY.programName
          : w.programSlug),
    startDate: w.startDate || "",
    endDate: w.endDate || "",
    location: w.location || "",
    fees: w.fees,
    includePayment: Boolean(w.includePayment),
    imageUrl: w.imageUrl || "",
    metaPixelCode: w.metaPixelCode || "",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workshop = await getWorkshop(slug);
  const programSlug = workshop?.programSlug;
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
  const workshop = await getWorkshop(slug);
  if (
    !workshop?.programSlug ||
    !isWorkshopProgramSlug(workshop.programSlug)
  ) {
    notFound();
  }

  const booking = toBookingInfo(workshop);
  const pixelCode = workshop.metaPixelCode || "";

  const landing =
    workshop.programSlug === "train-the-trainer-1-day" ? (
      <TTT_1Day workshop={booking} />
    ) : workshop.programSlug === "life-counselling-4-day" ? (
      <LC_4Day workshop={booking} />
    ) : null;

  if (!landing) notFound();

  return (
    <>
      {pixelCode ? <MetaPixelClient code={pixelCode} /> : null}
      {landing}
    </>
  );
}
