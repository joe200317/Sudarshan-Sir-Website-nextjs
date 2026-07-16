import { notFound } from "next/navigation";
import ThankYou from "@/components/workshop/ThankYou";
import MetaPixel from "@/components/workshop/MetaPixel";
import MetaPixelClient from "@/components/workshop/MetaPixelClient";
import { TTT_1DAY } from "@/components/workshop/TTT_1Day";
import { LC_4DAY } from "@/components/workshop/LC_4Day";
import { API_BASE } from "@/lib/api";
import { isWorkshopProgramSlug } from "@/data/workshop-programs";

type WorkshopPayload = {
  slug: string;
  programSlug: string;
  fees: number | null;
  includePayment: boolean;
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const workshop = await getWorkshop(slug);
  const title =
    workshop?.program?.title ||
    (workshop?.programSlug === TTT_1DAY.slug
      ? TTT_1DAY.programName
      : workshop?.programSlug === LC_4DAY.slug
        ? LC_4DAY.programName
        : "Workshop");
  return { title: `Thank you | ${title}` };
}

export default async function WorkshopThankYouPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ paid?: string }>;
}) {
  const { slug } = await params;
  const { paid: paidParam } = await searchParams;
  const workshop = await getWorkshop(slug);

  if (
    !workshop?.programSlug ||
    !isWorkshopProgramSlug(workshop.programSlug)
  ) {
    notFound();
  }

  const programTitle =
    workshop.program?.title ||
    (workshop.programSlug === TTT_1DAY.slug
      ? TTT_1DAY.programName
      : workshop.programSlug === LC_4DAY.slug
        ? LC_4DAY.programName
        : workshop.programSlug);

  const paid = paidParam === "1" || paidParam === "true";
  const pixelCode = workshop.metaPixelCode || "";

  return (
    <>
      {pixelCode ? (
        <>
          <MetaPixel code={pixelCode} />
          <MetaPixelClient code={pixelCode} />
        </>
      ) : null}
      <ThankYou
        programTitle={programTitle}
        programSlug={workshop.programSlug}
        workshopSlug={workshop.slug}
        paid={paid}
        fees={workshop.fees}
      />
    </>
  );
}
