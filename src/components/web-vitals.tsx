"use client";
import { useReportWebVitals } from "next/web-vitals";

function hasAnalyticsConsent(): boolean {
  return (
    typeof document !== "undefined" &&
    document.cookie.split(";").some((c) => c.trim() === "cookie_consent=true")
  );
}

export default function WebVitals() {
  useReportWebVitals((metric) => {
    if (!hasAnalyticsConsent()) return;
    if (typeof window !== "undefined" && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: "web_vitals",
        metric_name: metric.name,
        metric_value: Math.round(
          metric.name === "CLS" ? metric.value * 1000 : metric.value,
        ),
        metric_id: metric.id,
        metric_rating: metric.rating,
        non_interaction: true,
      });
    }
  });

  return null;
}
