"use client";
import { sendGTMEvent } from "@next/third-parties/google";
import type { ReactNode } from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { updateConsent } from "@/lib/gtm";

type ConsentContextValue = {
  consentGiven: boolean;
  grantConsent: () => void;
  denyConsent: () => void;
};

const ConsentContext = createContext<ConsentContextValue | undefined>(
  undefined,
);

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error("useConsent must be used within a ConsentProvider");
  }
  return context;
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export function getConsentCookie(): string | undefined {
  const prefix = "cookie_consent=";
  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(prefix));
  return cookie ? decodeURIComponent(cookie.slice(prefix.length)) : undefined;
}

function setConsentCookie(given: boolean) {
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  // biome-ignore lint/suspicious/noDocumentCookie: synchronous support is required across target browsers
  document.cookie = `cookie_consent=${given}; Max-Age=${COOKIE_MAX_AGE}; Path=/; SameSite=Strict${secure}`;
}

function recordConsentDecision(given: boolean) {
  setConsentCookie(given);
  updateConsent(given);
  sendGTMEvent({
    event: "consent_action",
    consent_status: given ? "all_granted" : "only_necessary",
  });
}

export default function ConsentProvider({ children }: { children: ReactNode }) {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    const storedConsent = getConsentCookie();
    if (storedConsent === "true") {
      setConsentGiven(true);
    }
  }, []);

  const grantConsent = useCallback(() => {
    try {
      recordConsentDecision(true);
      setConsentGiven(true);
    } catch (error) {
      console.error("Error setting cookie consent:", error);
    }
  }, []);

  const denyConsent = useCallback(() => {
    try {
      recordConsentDecision(false);
      setConsentGiven(false);
    } catch (error) {
      console.error("Error setting cookie consent:", error);
    }
  }, []);

  const value = useMemo(
    () => ({ consentGiven, grantConsent, denyConsent }),
    [consentGiven, grantConsent, denyConsent],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}
