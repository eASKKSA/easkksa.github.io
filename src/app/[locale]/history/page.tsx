import { Metadata } from "next";
import Image from "next/image";

import { PageAnimationWrapper } from "@/components/page-animation-wrapper";
import historyBannerUrl from "@/assets/masters-of-karate.jpg";
import Article from "@/components/article";
import { useTranslations } from "next-intl";

export const metadata: Metadata = {
  title: "História do Karate | ASKKSA",
  description:
    "Descubra a rica história do Karate-do, desde as suas origens em Okinawa até à sua modernização e popularização como uma arte marcial japonesa de renome mundial.",
  keywords: [
    "História do Karate",
    "Karate-do",
    "Budo",
    "Gichin Funakoshi",
    "Shotokan",
    "Kihon",
    "Kumite",
    "Kata",
    "Okinawa",
    "ASKKSA",
  ],
};

// --- MAIN PAGE COMPONENT ---

export default function HistoryPage() {
  const t = useTranslations("History");
  return (
    <PageAnimationWrapper>
      <Article className="relative text-justify rounded-3xl p-12 md:p-16 overflow-hidden backdrop-blur-sm border dark:bg-gradient-to-r dark:from-[#222]/90 dark:via-[#2a2a2a]/80 dark:to-[#222]/90 dark:border-gray-700/50 bg-gradient-to-r from-white/90 via-gray-50/80 to-white/90 border-gray-200/50">
        <div className="max-w-4xl mx-auto">
          {/* Main Title */}
          <h1 className="text-center">{t("title")}</h1>

          {/* Banner Image and Introduction - Side by Side */}
          <div className="mb-12 flex flex-col lg:flex-row lg:items-start lg:gap-8">
            {/* Introduction Text - Left Side */}
            <div className="flex-1 lg:pr-4">
              <p
                className="text-lg leading-8 text-gray-600 dark:text-gray-300"
                dangerouslySetInnerHTML={{ __html: t.raw("introduction.text") }}
              />
            </div>

            {/* Banner Image - Right Side */}
            <div className="flex-shrink-0 mt-6 lg:mt-0">
              <div className="h-52 w-96 relative mx-auto lg:mx-0">
                <Image
                  src={historyBannerUrl}
                  alt="Mestres Fundadores do Karate"
                  layout="fill"
                  className="rounded-xl object-cover shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Core Pillars */}
          <div className="mt-10 mb-12 p-6 bg-primary/20 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
              {t("threePillars.title")}
            </h2>
            <p className="mb-4 text-gray-600 dark:text-gray-300">
              {t("threePillars.subtitle")}
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-200">
              <li
                dangerouslySetInnerHTML={{
                  __html: `${t.raw("threePillars.kihon.title")} ${t("threePillars.kihon.description")}`,
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: `${t.raw("threePillars.kumite.title")} ${t("threePillars.kumite.description")}`,
                }}
              />
              <li
                dangerouslySetInnerHTML={{
                  __html: `${t.raw("threePillars.kata.title")} ${t("threePillars.kata.description")}`,
                }}
              />
            </ul>
          </div>

          {/* Origins */}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {t("origins.title")}
          </h2>
          <div className="space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            <p dangerouslySetInnerHTML={{ __html: t.raw("origins.content") }} />
            <p
              dangerouslySetInnerHTML={{ __html: t.raw("origins.matsumura") }}
            />
          </div>

          {/* Modernization */}
          <h2 className="mt-12 text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
            {t("modernization.title")}
          </h2>
          <div className="space-y-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            <p>{t("modernization.funakoshi")}</p>
            <p
              dangerouslySetInnerHTML={{
                __html: t.raw("modernization.transition"),
              }}
            />
          </div>
        </div>

        <div className="absolute top-0 left-0 w-32 h-32 bg-[#a4262c]/20 rounded-full -translate-x-16 -translate-y-16" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#a4262c]/10 rounded-full translate-x-24 translate-y-24" />
      </Article>
    </PageAnimationWrapper>
  );
}
