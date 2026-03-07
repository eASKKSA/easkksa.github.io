"use client";
import { useReportWebVitals } from "next/web-vitals";
import { useConsent } from "@/components/consent-provider";
import { useLatest } from "@/lib/use-latest";

export default function WebVitals() {
  const { consentGiven } = useConsent();
  const consentRef = useLatest(consentGiven);

  useReportWebVitals((metric) => {
    if (!consentRef.current) return;
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
