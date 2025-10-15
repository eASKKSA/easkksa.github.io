import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Update Google Consent Mode v2
 * Uses gtag to update consent - the GTM template automatically pushes events to dataLayer
 */
export function updateConsent(consentGiven: boolean) {
  // Use gtag to update consent
  // The GTM template will automatically push gtm_consent_update event to dataLayer
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: consentGiven ? "granted" : "denied",
      ad_user_data: consentGiven ? "granted" : "denied",
      ad_personalization: consentGiven ? "granted" : "denied",
      analytics_storage: consentGiven ? "granted" : "denied",
      personalization_storage: consentGiven ? "granted" : "denied",
    });
  }

  // Track the consent action as a separate event for analytics
  sendGTMEvent({
    event: "consent_action",
    consent_status: consentGiven ? "all_granted" : "only_necessary",
  });
}
