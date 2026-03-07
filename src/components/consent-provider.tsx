"use client";
import { sendGTMEvent } from "@next/third-parties/google";
import { setCookie } from "cookies-next";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
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

const COOKIE_OPTIONS = {
  maxAge: 60 * 60 * 24 * 365,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict" as const,
  path: "/",
};

function persistConsent(given: boolean) {
  setCookie("cookie_consent", given.toString(), COOKIE_OPTIONS);
  updateConsent(given);
  sendGTMEvent({
    event: "consent_action",
    consent_status: given ? "all_granted" : "only_necessary",
  });
}

export default function ConsentProvider({
  initialConsent,
  children,
}: {
  initialConsent: boolean;
  children: ReactNode;
}) {
  const [consentGiven, setConsentGiven] = useState(initialConsent);

  const grantConsent = useCallback(() => {
    try {
      persistConsent(true);
      setConsentGiven(true);
    } catch (error) {
      console.error("Error setting cookie consent:", error);
    }
  }, []);

  const denyConsent = useCallback(() => {
    try {
      persistConsent(false);
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
