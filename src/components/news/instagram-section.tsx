import { FaInstagram } from "react-icons/fa";
import { getTranslations } from "next-intl/server";

export default async function InstagramLink() {
  const t = await getTranslations("News.sections.instagram");

  return (
    <div className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-tr from-pink-500/10 via-purple-500/10 to-purple-600/10 ring-1 ring-inset ring-pink-500/10 dark:ring-pink-500/30">
      {/* bolhas decorativas */}
      <span className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-pink-400/20 blur-2xl" />
      <span className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-purple-500/20 blur-3xl" />

      <FaInstagram className="text-pink-500 text-5xl mx-auto mb-4 drop-shadow" />

      <h4 className="text-center text-xl font-bold text-gray-800 dark:text-white">
        {t("cta.username")}
      </h4>
      <p className="mt-2 mb-6 text-center text-gray-700 dark:text-gray-300">
        {t("cta.description")}
      </p>

      <div className="text-center">
        <a
          href="https://www.instagram.com/askksa_madeira/"
          target="_blank"
          className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-6 py-3 font-semibold text-white shadow-xl shadow-pink-600/30 transition-transform hover:scale-105 hover:bg-pink-700 focus-visible:outline-none"
        >
          <FaInstagram />
          {t("cta.button")}
        </a>
      </div>
    </div>
  );
}
