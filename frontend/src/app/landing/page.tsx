import type { Metadata } from "next";
import TTT_1Day, { TTT_1DAY } from "@/components/workshop/TTT_1Day";

export const metadata: Metadata = {
  title: `${TTT_1DAY.programName} | Sudarshan Sabat`,
  description:
    "Unlock the secrets to wealth, fame & high income. Live Train The Trainer seminar with Sudarshan Sabat — 1 day intensive in Pune.",
  robots: { index: false, follow: false },
};

export default function LandingPage() {
  return <TTT_1Day />;
}
