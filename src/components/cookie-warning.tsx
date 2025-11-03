"use client";

import { getCookie, setCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { Link } from "@/i18n/navigation";
import { updateConsent } from "@/lib/gtm";

const CookieWarning = () => {
  const t = useTranslations("CookieWarning");
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const cookieConsent = getCookie("cookie_consent");

    if (cookieConsent === undefined) {
      // No cookie exists, show banner
      setShowBanner(true);
    } else {
      // Cookie exists, restore consent state
      const consentGiven = cookieConsent === "true";
      updateConsent(consentGiven);
      setShowBanner(false);
    }
  }, []);

  const handleCookieAction = useCallback((consentGiven: boolean) => {
    try {
      setCookie("cookie_consent", consentGiven.toString(), {
        maxAge: 60 * 60 * 24 * 365, // 1 year
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      });

      // Update Google Consent Mode v2
      updateConsent(consentGiven);

      // Hide banner immediately for a snappy user experience.
      setShowBanner(false);

      // Refresh the page when accepting all cookies to ensure tracking starts
      if (consentGiven) {
        globalThis.location.reload();
      }
    } catch (error) {
      console.error("Error setting cookie consent:", error);
      // Still hide the banner on error to prevent it from getting stuck.
      setShowBanner(false);
    }
  }, []);

  if (!showBanner) return null;

  return (
    <aside
      className="fixed bottom-0 w-full bg-gray-50 p-4 z-[10]"
      aria-label="Cookie consent"
    >
      <p className="text-xs md:text-sm text-black/90 text-center!">
        {t("description")}{" "}
        <Link
          href="/privacy-policy"
          className="underline font-semibold hover:opacity-80"
          title="Política de Privacidade."
        >
          {t("linkText")}.
        </Link>
      </p>
      <div className="gap-4 flex justify-center mt-3">
        <button
          type="button"
          onClick={() => handleCookieAction(true)}
          className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          aria-label={t("acceptAll")}
        >
          {t("acceptAll")}
        </button>
        <button
          type="button"
          onClick={() => handleCookieAction(false)}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          aria-label="Aceitar apenas cookies essenciais"
        >
          {t("acceptNecessary")}
        </button>
      </div>
    </aside>
  );
};

export default CookieWarning;
