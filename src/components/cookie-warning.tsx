"use client";

import { useCallback, useEffect, useState } from "react";
import { getConsentCookie, useConsent } from "@/components/consent-provider";
import { Link } from "@/i18n/navigation";

type CookieWarningProps = {
  labels: {
    ariaLabel: string;
    privacyTitle: string;
    description: string;
    linkText: string;
    acceptAll: string;
    acceptNecessary: string;
  };
};

const CookieWarning = ({ labels }: Readonly<CookieWarningProps>) => {
  const [showBanner, setShowBanner] = useState(true);
  const { grantConsent, denyConsent } = useConsent();

  useEffect(() => {
    const cookieConsent = getConsentCookie();
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
      document.documentElement.dataset.cookieConsent = given.toString();
      setShowBanner(false);
    },
    [grantConsent, denyConsent],
  );

  if (!showBanner) return null;

  return (
    <aside
      data-cookie-banner
      className="fixed bottom-0 w-full bg-gray-50 p-4 z-[10]"
      aria-label={labels.ariaLabel}
    >
      <p className="text-xs md:text-sm text-black/90 text-center!">
        {labels.description}{" "}
        <Link
          href="/privacy-policy"
          prefetch={false}
          className="underline font-semibold hover:opacity-80"
          title={labels.privacyTitle}
        >
          {labels.linkText}.
        </Link>
      </p>
      <div className="gap-4 flex justify-center mt-3">
        <button
          type="button"
          onClick={() => handleCookieAction(true)}
          className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          aria-label={labels.acceptAll}
        >
          {labels.acceptAll}
        </button>
        <button
          type="button"
          onClick={() => handleCookieAction(false)}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          aria-label={labels.acceptNecessary}
        >
          {labels.acceptNecessary}
        </button>
      </div>
    </aside>
  );
};

export default CookieWarning;
