"use client";

import { useState, useEffect, useCallback } from "react";
import { setCookie, hasCookie } from "cookies-next";
import { Link } from "@/i18n/navigation";

const CookieWarning = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Move cookie check to useEffect to avoid blocking renders
  useEffect(() => {
    const checkCookieConsent = () => {
      try {
        // Use requestAnimationFrame to ensure this runs after critical content
        requestAnimationFrame(() => {
          if (!hasCookie("cookie_consent")) {
            setShowBanner(true);
          }
        });
      } catch (error) {
        console.error("Error checking cookie consent:", error);
        // Show banner on error as fallback
        setShowBanner(true);
      }
    };

    // Only run after DOM is ready
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", checkCookieConsent);
      return () =>
        document.removeEventListener("DOMContentLoaded", checkCookieConsent);
    } else {
      checkCookieConsent();
    }
  }, []);

  const handleCookieAction = useCallback(
    async (acceptAll: boolean) => {
      if (isProcessing) return; // Prevent double-clicks

      setIsProcessing(true);

      try {
        // Set cookie with optimized options
        setCookie("cookie_consent", acceptAll ? "true" : "false", {
          maxAge: 60 * 60 * 24 * 365, // 1 year
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/", // Ensure cookie is available site-wide
        });

        // Update Google Analytics consent (if available)
        if (typeof window !== "undefined" && window.gtag) {
          window.gtag("consent", "update", {
            analytics_storage: acceptAll ? "granted" : "denied",
            ad_storage: acceptAll ? "granted" : "denied",
          });
        }

        // Hide banner immediately for better UX
        setShowBanner(false);
      } catch (error) {
        console.error("Error setting cookie consent:", error);
        // Still hide banner even on error to prevent infinite showing
        setShowBanner(false);
      } finally {
        setIsProcessing(false);
      }
    },
    [isProcessing],
  );

  const handleAcceptAll = useCallback(() => {
    handleCookieAction(true);
  }, [handleCookieAction]);

  const handleAcceptEssential = useCallback(() => {
    handleCookieAction(false);
  }, [handleCookieAction]);

  // Don't render if banner shouldn't be shown
  if (!showBanner) return null;

  return (
    <aside
      className="fixed bottom-0 w-full bg-gray-50 p-4 z-[10]"
      aria-label="Cookie consent"
    >
      <p className="text-xs md:text-sm text-black/90 text-center!">
        Este sítio utiliza cookies para facilitar a navegação e obter
        estatísticas de utilização. Poderá consultar a nossa Política de
        Privacidade{" "}
        <Link
          href="/privacy-policy"
          className="underline font-semibold hover:opacity-80"
          title="Política de Privacidade."
        >
          aqui.
        </Link>
      </p>
      <div className="gap-4 flex justify-center mt-3">
        <button
          type="button"
          onClick={handleAcceptAll}
          className="bg-primary hover:bg-opacity-90 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          aria-label="Aceitar todos os cookies"
        >
          Aceitar todos os Cookies
        </button>
        <button
          type="button"
          onClick={handleAcceptEssential}
          className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors cursor-pointer"
          aria-label="Aceitar apenas cookies essenciais"
        >
          Aceitar apenas os cookies essenciais
        </button>
      </div>
    </aside>
  );
};

export default CookieWarning;
