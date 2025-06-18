// components/CookieWarning.tsx
"use client";

import { useState, useEffect } from "react";
import { setCookie, hasCookie } from "cookies-next";
import { Link } from "@/i18n/navigation";

const CookieWarning = () => {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Show the banner only if no consent cookie has been set
    if (!hasCookie("cookie_consent")) {
      setShowBanner(true);
    }
  }, []);

  const handleAcceptAll = () => {
    setCookie("cookie_consent", "true", { maxAge: 60 * 60 * 24 * 365 });
    setShowBanner(false);
    window.location.reload();
  };

  const handleAcceptEssential = () => {
    setCookie("cookie_consent", "false", { maxAge: 60 * 60 * 24 * 365 });
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <aside className="cookie-container">
      <div className="max-w-4xl mx-auto">
        <span>
          Este sítio utiliza cookies para facilitar a navegação e obter
          estatísticas de utilização. Poderá consultar a nossa Política de
          Privacidade{" "}
        </span>
        <Link
          href="/privacy-policy" // Use Link for internal navigation
          className="underline font-semibold hover:opacity-80"
          title="Política de Privacidade."
        >
          aqui.
        </Link>
        <div className="cookie-button-container">
          <button
            type="button"
            onClick={handleAcceptAll}
            className="bg-primary hover:bg-opacity-90 cookie-button"
          >
            Aceitar todos os Cookies
          </button>
          <button
            type="button"
            onClick={handleAcceptEssential}
            className="bg-gray-600 hover:bg-gray-500 cookie-button"
          >
            Aceitar apenas os cookies essenciais
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieWarning;
