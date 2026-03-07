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

const ConsentContext = createContext<ConsentContextValue>({
  consentGiven: false,
  grantConsent: () => {},
  denyConsent: () => {},
});

export function useConsent() {
  return useContext(ConsentContext);
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
    } catch (error) {
      console.error("Error setting cookie consent:", error);
    }
    setConsentGiven(true);
  }, []);

  const denyConsent = useCallback(() => {
    try {
      persistConsent(false);
    } catch (error) {
      console.error("Error setting cookie consent:", error);
    }
    setConsentGiven(false);
  }, []);

  const value = useMemo(
    () => ({ consentGiven, grantConsent, denyConsent }),
    [consentGiven, grantConsent, denyConsent],
  );

  return (
    <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
  );
}
