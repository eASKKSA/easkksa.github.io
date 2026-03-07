"use client";
import { Analytics } from "@vercel/analytics/next";

function hasAnalyticsConsent(): boolean {
  if (typeof document === "undefined") return false;
  return document.cookie
    .split(";")
    .some((c) => c.trim() === "cookie_consent=true");
}

export default function AnalyticsWithConsent() {
  return (
    <Analytics
      beforeSend={(event) => (hasAnalyticsConsent() ? event : null)}
    />
  );
}
