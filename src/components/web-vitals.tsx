"use client";
import { useReportWebVitals } from "next/web-vitals";
import { useEffect, useRef } from "react";
import { useConsent } from "@/components/consent-provider";

export default function WebVitals() {
  const { consentGiven } = useConsent();
  const consentRef = useRef(consentGiven);
  useEffect(() => {
    consentRef.current = consentGiven;
  }, [consentGiven]);

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
