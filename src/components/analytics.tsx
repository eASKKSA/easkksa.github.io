"use client";
import { Analytics } from "@vercel/analytics/next";

// Evaluated once per component mount — cookie doesn't change between events.
let _consentCache: boolean | null = null;
function hasAnalyticsConsent(): boolean {
  if (_consentCache !== null) return _consentCache;
  if (typeof document === "undefined") return false;
  _consentCache = document.cookie
    .split(";")
    .some((c) => c.trim() === "cookie_consent=true");
  return _consentCache;
}

export default function AnalyticsWithConsent() {
  return (
    <Analytics
      beforeSend={(event) => (hasAnalyticsConsent() ? event : null)}
    />
  );
}
