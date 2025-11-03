import { getTranslations } from "next-intl/server";
import { FaYoutube } from "react-icons/fa";

export default async function YouTubeLink() {
  const t = await getTranslations("News.sections.youtube");

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-tr from-red-600/10 via-red-400/10 to-red-300/10 ring-1 ring-red-600/10 dark:ring-red-600/30">
      <span className="absolute -top-6 -left-6 h-28 w-28 rounded-full bg-red-400/20 blur-3xl" />
      <span className="absolute -bottom-6 -right-8 h-32 w-32 rounded-full bg-red-500/20 blur-3xl" />

      <FaYoutube className="text-red-600 text-5xl mx-auto mb-4 drop-shadow" />

      <h4 className="text-center text-xl font-bold text-gray-800 dark:text-white">
        {t("cta.title")}
      </h4>
      <p className="mt-2 mb-6 text-center text-gray-700 dark:text-gray-300">
        {t("cta.description")}
      </p>

      <div className="text-center">
        <a
          href="https://www.youtube.com/results?search_query=ASKKSA+karate+shotokan"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 font-semibold text-white shadow-xl shadow-red-600/30 transition-transform hover:scale-105 hover:bg-red-700 focus-visible:outline-none"
          rel="noopener"
        >
          <FaYoutube />
          {t("cta.button")}
        </a>
      </div>
    </div>
  );
}
