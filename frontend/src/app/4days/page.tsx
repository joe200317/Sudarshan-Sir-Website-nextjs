import type { Metadata } from "next";
import LC_4Day, { LC_4DAY } from "@/components/workshop/LC_4Day";

export const metadata: Metadata = {
  title: `${LC_4DAY.programName} | Sudarshan Sabat`,
  description:
    "A 4-day intensive Life Counselling program for self-discovery, emotional clarity, and life mastery. Mumbai · 15–16 July 2026 · Fees ₹500.",
  robots: { index: false, follow: false },
};

export default function FourDaysPage() {
  return <LC_4Day />;
}
