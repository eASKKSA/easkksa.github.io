"use client";
import { Analytics } from "@vercel/analytics/next";
import { useConsent } from "@/components/consent-provider";
import { useLatest } from "@/lib/use-latest";

export default function AnalyticsWithConsent() {
  const { consentGiven } = useConsent();
  const consentRef = useLatest(consentGiven);

  return (
    <Analytics beforeSend={(event) => (consentRef.current ? event : null)} />
  );
}
