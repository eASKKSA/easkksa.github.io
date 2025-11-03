import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
// --- ASSETS ---
import senseiSeizaImage from "@/assets/in-dojo/Sensei_Seiza.jpeg";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";

export const generateMetadata = metadata;

// --- MAIN PAGE COMPONENT ---
export default async function SalutationPage() {
  const t = await getTranslations("Salutation");

  return (
    <>
      <Container blur withBubbles as="article">
        <h1 className="text-center">{t("title")}</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center py-6">
          <Image
            src={senseiSeizaImage}
            alt="Sensei em posição Seiza - Saudação no Karaté"
            height={500}
            className="object-contain rounded-xl shadow-lg mx-auto"
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
            {t("oss.title")}
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("oss.origin")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("oss.creation")}
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border-l-4 border-red-500 my-4">
              <p className="text-lg text-red-800 dark:text-red-200 leading-relaxed font-medium">
                {t("oss.importance")}
              </p>
            </div>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
              {t("oss.meaning")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
              {t("oss.spirit")}
            </p>
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("rituals.title")}
          </h2>

          {/* Ritual de Início */}
          <h3 className="text-2xl font-bold mb-8">
            {t("rituals.start.title")}
          </h3>
          <div className="space-y-3 mb-8">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 px-4 py-3 rounded-lg bg-blue-50 dark:bg-blue-900/20"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {step}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-blue-800 dark:text-blue-200">
                    {t(`rituals.start.steps.${step - 1}.command`)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t(`rituals.start.steps.${step - 1}.meaning`)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Ritual de Fim */}
          <h3 className="text-2xl font-bold mb-8">{t("rituals.end.title")}</h3>
          <div className="space-y-3">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((step) => (
              <div
                key={step}
                className="flex items-start gap-3 px-4 py-3 rounded-lg bg-green-50 dark:bg-green-900/20"
              >
                <span className="flex-shrink-0 w-8 h-8 bg-green-600 dark:bg-green-500 text-white text-sm font-bold rounded-full flex items-center justify-center">
                  {step}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-green-800 dark:text-green-200">
                    {t(`rituals.end.steps.${step - 1}.command`)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {t(`rituals.end.steps.${step - 1}.meaning`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>

        {/* Saudação Formal */}
        <Container>
          <div className="text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {t("salutation.title")}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("salutation.text")}
            </p>
          </div>
        </Container>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
