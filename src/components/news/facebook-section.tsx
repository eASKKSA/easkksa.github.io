import { getTranslations } from "next-intl/server";
import { FaFacebook } from "react-icons/fa";
import TrackableLink from "@/components/trackable-link";

export default async function FacebookLink() {
  const t = await getTranslations("News.sections.facebook");

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-tr from-blue-600/10 via-blue-400/10 to-blue-300/10 ring-1 ring-inset ring-blue-500/10 dark:ring-blue-500/30">
      <span className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-blue-400/20 blur-2xl" />
      <span className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />

      <FaFacebook className="text-blue-500 text-5xl mx-auto mb-4 drop-shadow" />

      <h2 className="text-center text-xl font-bold text-gray-800 dark:text-white">
        {t("cta.title")}
      </h2>
      <p className="mt-2 mb-6 text-center text-gray-700 dark:text-gray-300">
        {t("description")}
      </p>

      <div className="text-center">
        <TrackableLink
          href="https://www.facebook.com/ASKKSA.MADEIRA/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-xl shadow-blue-600/30 transition-transform hover:scale-105 hover:bg-blue-700 focus-visible:outline-none"
          rel="noopener"
          gtmEvent="social_click"
          gtmParams={{ platform: "facebook" }}
        >
          <FaFacebook />
          {t("cta.button")}
        </TrackableLink>
      </div>
    </div>
  );
}
