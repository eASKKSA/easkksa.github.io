import { FaFacebook } from "react-icons/fa";
import { getTranslations } from "next-intl/server";

export default async function FacebookEmbed() {
  const t = await getTranslations("News.sections.facebook");
  return (
    <>
      <div className="block lg:hidden">
        {/* Versão Mobile - Só CTA */}
        <span className="absolute top-4 left-4 h-16 w-16 rounded-full bg-blue-500/20 blur-2xl" />
        <span className="absolute bottom-4 right-4 h-20 w-20 rounded-full bg-blue-500/20 blur-3xl" />

        <div className="relative z-10 text-center space-y-4">
          <FaFacebook className="text-blue-500 text-5xl mx-auto drop-shadow" />

          <h4 className="text-lg font-bold text-gray-800 dark:text-white">
            {t("cta.title")}
          </h4>

          <p className="text-sm text-gray-700 dark:text-gray-300">
            {t("description")}
          </p>

          <div className="flex flex-col gap-3 pt-2">
            <a
              href="https://www.facebook.com/ASKKSA.MADEIRA/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            >
              <FaFacebook />
              {t("cta.button")}
            </a>

            <a
              href="https://www.facebook.com/ASKKSA.MADEIRA/posts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
            >
              {t("cta.link")} →
            </a>
          </div>
        </div>
      </div>
      <div className="space-y-6 hidden lg:block">
        {/* Versão Desktop - Com Embed */}
        <div className="hidden lg:flex gap-8">
          {/* Iframe Facebook */}
          <div className="flex overflow-hidden rounded-xl shadow-lg border bg-transparent border-gray-200 dark:border-gray-700">
            <iframe
              src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FASKKSA.MADEIRA&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId"
              className="w-[500px] h-[600px]"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              title="Feed Facebook ASKKSA"
              loading="lazy"
            />
          </div>

          {/* Conteúdo lateral */}
          <div className="flex-[1] relative content-center">
            <span className="absolute top-4 left-4 h-24 w-24 rounded-full bg-blue-500/20 blur-2xl" />
            <span className="absolute bottom-4 right-4 h-32 w-32 rounded-full bg-blue-500/20 blur-3xl" />

            <div className="relative z-10 text-center space-y-4">
              <FaFacebook className="text-blue-500 text-5xl mx-auto drop-shadow" />

              <h4 className="text-xl font-bold text-gray-800 dark:text-white">
                {t("cta.title")}
              </h4>

              <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("description")}
              </p>

              <div className="pt-2">
                <a
                  href="https://www.facebook.com/ASKKSA.MADEIRA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:scale-105 hover:bg-blue-700"
                >
                  <FaFacebook />
                  {t("viewMore")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
