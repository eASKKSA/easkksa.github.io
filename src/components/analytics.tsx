"use client";
import { Analytics } from "@vercel/analytics/next";
import { useEffect, useRef } from "react";
import { useConsent } from "@/components/consent-provider";

export default function AnalyticsWithConsent() {
  const { consentGiven } = useConsent();
  // useRef so the beforeSend closure always sees the latest value
  // even though it's called outside React's render cycle.
  const consentRef = useRef(consentGiven);
  useEffect(() => {
    consentRef.current = consentGiven;
  }, [consentGiven]);

  return (
    <Analytics beforeSend={(event) => (consentRef.current ? event : null)} />
  );
}
