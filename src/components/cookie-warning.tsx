"use client";

import { getCookie } from "cookies-next";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";
import { useConsent } from "@/components/consent-provider";
import { Link } from "@/i18n/navigation";

const CookieWarning = () => {
  const t = useTranslations("CookieWarning");
  const [showBanner, setShowBanner] = useState(false);
  const { grantConsent, denyConsent } = useConsent();

  useEffect(() => {
    const cookieConsent = getCookie("cookie_consent");
    // Show banner only when the user hasn't made a choice yet.
    setShowBanner(cookieConsent === undefined);
  }, []);

  const handleCookieAction = useCallback(
    (given: boolean) => {
      if (given) {
        grantConsent();
      } else {
        denyConsent();
      }
      setShowBanner(false);
    },
    [grantConsent, denyConsent],
  );

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
