/**
 * Update Google Consent Mode v2.
 * Only updates the gtag consent state — does NOT fire a GTM event.
 * Call this from the consent restore path (page load) and from user interactions.
 * Fire the `consent_action` GTM event separately only on active user choice.
 */
export function updateConsent(consentGiven: boolean) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      ad_storage: consentGiven ? "granted" : "denied",
      ad_user_data: consentGiven ? "granted" : "denied",
      ad_personalization: consentGiven ? "granted" : "denied",
      analytics_storage: consentGiven ? "granted" : "denied",
      personalization_storage: consentGiven ? "granted" : "denied",
    });
  }
}
