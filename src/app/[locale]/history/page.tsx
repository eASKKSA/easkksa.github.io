import { Metadata } from "next";
import Image from "next/image";

import historyBannerUrl from "@/assets/masters-of-karate.jpg";
import Article from "@/components/article";
import { getTranslations } from "next-intl/server";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("History");
  return {
    title: t("meta.title"),
    description: t("meta.description"),
    keywords: t("meta.keywords"),
  };
}

export default async function HistoryPage() {
  const t = await getTranslations("History");
  return (
    <Article sectionBlur withBubbles>
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
                fill
                sizes="(max-width: 768px) 100vw, 128px"
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
          <p dangerouslySetInnerHTML={{ __html: t.raw("origins.matsumura") }} />
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
    </Article>
  );
}
