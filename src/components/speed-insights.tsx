"use client";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useConsent } from "@/components/consent-provider";

export default function SpeedInsightsWithConsent() {
  const { consentGiven } = useConsent();
  return consentGiven ? <SpeedInsights /> : null;
}
