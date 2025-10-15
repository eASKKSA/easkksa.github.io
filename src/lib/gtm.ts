import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Update Google Consent Mode v2
 * Uses gtag directly for consent (as per Google's specification)
 */
export function updateConsent(consentGiven: boolean) {
  // IMPORTANT: Use gtag directly for consent updates
  // The consent command is special and doesn't work as a regular event
  if (typeof (globalThis as typeof window).gtag === "function") {
    (globalThis as typeof window).gtag("consent", "update", {
      ad_storage: consentGiven ? "granted" : "denied",
      ad_user_data: consentGiven ? "granted" : "denied",
      ad_personalization: consentGiven ? "granted" : "denied",
      analytics_storage: consentGiven ? "granted" : "denied",
      personalization_storage: consentGiven ? "granted" : "denied",
    });
  }

  // Send a regular event to track the consent action
  sendGTMEvent({
    event: "consent_updated",
    consent_status: consentGiven ? "granted" : "denied",
  });
}
