type Locale = "en" | "pt-PT";

// Google Tag Manager and Consent Mode v2 types
declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (
      command: "consent" | "config" | "event" | "get" | "set",
      targetOrAction: string,
      parameters?: Record<string, unknown>
    ) => void;
  }
}
