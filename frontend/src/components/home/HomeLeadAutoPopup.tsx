"use client";

import { useEffect, useState } from "react";
import HomeLeadModal from "@/components/home/HomeLeadModal";

/** Auto-opens the lead form 5 minutes after the visitor lands on the home page. */
const DELAY_MS = 5 * 60 * 1000;

export default function HomeLeadAutoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  return <HomeLeadModal open={open} onClose={() => setOpen(false)} />;
}
