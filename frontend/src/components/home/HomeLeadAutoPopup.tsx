"use client";

import { useEffect, useState } from "react";
import HomeLeadModal from "@/components/home/HomeLeadModal";

/** Re-open delay after the visitor closes the popup without submitting. */
const REOPEN_DELAY_MS = 60 * 1000;

/**
 * Auto-opens the lead form as soon as the visitor lands on the home page.
 * If they close it without submitting, it pops back up 1 minute later.
 */
export default function HomeLeadAutoPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  function handleClose() {
    setOpen(false);
    setTimeout(() => setOpen(true), REOPEN_DELAY_MS);
  }

  return <HomeLeadModal open={open} onClose={handleClose} />;
}
