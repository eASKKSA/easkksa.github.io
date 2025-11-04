import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
// --- ASSETS ---
import graduationsImage from "@/assets/in-dojo/graduacoes.jpg";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";

export const generateMetadata = metadata;

// --- MAIN PAGE COMPONENT ---
export default async function GraduationsPage() {
  const t = await getTranslations("Graduations");

  return (
    <>
      <Container blur withBubbles as="article">
        <h1 className="text-center">{t("title")}</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center py-6">
          <Image
            src={graduationsImage}
            alt="Sistema de Graduações do Karaté - Kyu e Dan"
            height={500}
            className="object-contain rounded-xl shadow-lg mx-auto"
            fetchPriority="high"
            priority
          />
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("introduction")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("system.title")}
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <span className="text-blue-600 dark:text-blue-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("system.founder")}
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <span className="text-blue-600 dark:text-blue-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("system.purpose")}
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <span className="text-blue-600 dark:text-blue-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("system.motivation")}
              </p>
            </div>
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("symbolism.title")}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-center">
            {t("symbolism.description")}
          </p>
          <div className="space-y-4 max-w-2xl mx-auto">
            <div className="flex items-center gap-4 px-6 py-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-10 bg-white border-2 border-gray-300 rounded shadow-sm"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("symbolism.white")}
              </p>
            </div>
            <div className="flex items-center gap-4 px-6 py-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600">
              <div className="w-16 h-10 bg-black rounded shadow-sm"></div>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("symbolism.black")}
              </p>
            </div>
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("colors.title")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600">
              <div className="w-14 h-9 bg-white border-2 border-gray-300 rounded shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {t("colors.white")}
              </span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700">
              <div className="w-14 h-9 bg-yellow-400 rounded shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {t("colors.yellow")}
              </span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-700">
              <div className="w-14 h-9 bg-orange-500 rounded shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {t("colors.orange")}
              </span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700">
              <div className="w-14 h-9 bg-green-500 rounded shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {t("colors.green")}
              </span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700">
              <div className="w-14 h-9 bg-blue-500 rounded shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {t("colors.blue")}
              </span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700">
              <div className="w-14 h-9 bg-amber-800 rounded shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {t("colors.brown")}
              </span>
            </div>
            <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-600 md:col-span-2">
              <div className="w-14 h-9 bg-black rounded shadow-sm"></div>
              <span className="text-gray-700 dark:text-gray-300 font-medium">
                {t("colors.black")}
              </span>
            </div>
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("kyu.title")}
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <span className="text-purple-600 dark:text-purple-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("kyu.description")}
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20">
              <span className="text-purple-600 dark:text-purple-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("kyu.order")}
              </p>
            </div>
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("dan.title")}
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-8 text-center max-w-4xl mx-auto">
            {t("dan.description")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((dan) => (
              <div
                key={dan}
                className="flex items-center gap-4 px-4 py-3 rounded-lg bg-gray-900 dark:bg-black border border-gray-700"
              >
                <div className="w-14 h-9 bg-black border border-gray-600 rounded flex items-center justify-center shadow-sm">
                  <span className="text-white text-sm font-bold">{dan}º</span>
                </div>
                <span className="text-white font-medium text-sm">
                  {t(`dan.${dan}`)}
                </span>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("timeline.title")}
          </h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
              <span className="text-indigo-600 dark:text-indigo-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("timeline.description")}
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
              <span className="text-indigo-600 dark:text-indigo-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("timeline.journey")}
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
              <span className="text-indigo-600 dark:text-indigo-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("timeline.mastery")}
              </p>
            </div>
          </div>
        </Container>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
