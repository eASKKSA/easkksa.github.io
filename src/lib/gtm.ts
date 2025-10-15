import { sendGTMEvent } from "@next/third-parties/google";

/**
 * Update Google Consent Mode v2
 * Pushes consent update directly to dataLayer - the GTM template handles the rest
 */
export function updateConsent(consentGiven: boolean) {
  // Push consent update directly to dataLayer
  // The GTM template will intercept this and update consent accordingly
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({
      event: "consent_update",
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
