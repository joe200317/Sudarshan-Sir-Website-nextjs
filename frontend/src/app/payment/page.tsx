import type { Metadata } from "next";
import PaymentPage from "@/app/views/Payment";

export const metadata: Metadata = {
  title: "Payment — Sudarshan Sabat",
  description: "Secure payment to Sudarshan Sabat powered by Razorpay.",
};

export default function Payment() {
  return <PaymentPage />;
}
