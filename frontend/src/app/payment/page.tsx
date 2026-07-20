import type { Metadata } from "next";
import PaymentPage from "@/app/views/Payment";

export const metadata: Metadata = {
  title: "Payment — Sudarshan Sabat",
  description: "Secure payment to Sudarshan Sabat powered by Razorpay.",
  robots: { index: false, follow: false },
};

export default function Payment() {
  return <PaymentPage />;
}
