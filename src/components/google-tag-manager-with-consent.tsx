"use client";

import { GoogleTagManager } from "@next/third-parties/google";
import { useConsent } from "@/components/consent-provider";

export default function GoogleTagManagerWithConsent({
  gtmId,
}: Readonly<{ gtmId: string }>) {
  const { consentGiven } = useConsent();

  if (!consentGiven) return null;

  return <GoogleTagManager gtmId={gtmId} />;
}
