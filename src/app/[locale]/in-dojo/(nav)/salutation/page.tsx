import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";

// --- ASSETS ---
import senseiSeizaImage from "@/assets/in-dojo/Sensei_by_VCRC.jpg";

// --- METADATA ---
export const metadata: Metadata = {
  title: "Saudação no Karaté | OSS e Rituais | ASKKSA Shotokan Madeira",
  description:
    "Descubra o significado da saudação no Karaté Shotokan, a palavra OSS e os rituais de início e fim de treino. ASKKSA Funchal, Madeira.",
  keywords: [
    "Saudação Karaté",
    "OSS",
    "Rituais Karaté",
    "SEIJITSU",
    "Mokuso",
    "Seiza",
    "ASKKSA",
    "Shotokan",
    "Funchal",
    "Madeira",
    "Dojo",
    "Etiqueta Karaté",
  ],
};

// --- MAIN PAGE COMPONENT ---
export default async function SalutationPage() {
  const t = await getTranslations("Salutation");

  return (
    <Container blur withBubbles as="article">
      <h1 className="text-center">{t("title")}</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center py-6">
        <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
          <Image
            src={senseiSeizaImage}
            alt="Código de Ética Bushido"
            fill
            sizes="20-vw"
            className="object-contain"
            priority
          />
        </div>
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
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("oss.origin")}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("oss.creation")}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("oss.importance")}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("oss.meaning")}
        </p>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {t("oss.spirit")}
        </p>
      </Container>
      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("rituals.title")}
        </h2>
        <h3 className="text-2xl font-bold mb-8">{t("rituals.start.title")}</h3>
        <div className="space-y-3 mb-8">
          {Array.from({ length: 6 }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className="flex items-start gap-3 px-2 py-1 rounded-lg dark:bg-primary/20"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                {step}
              </span>
              <div className="flex-1">
                <p className="font-bold text-blue-800 dark:text-blue-200">
                  {t(`rituals.start.steps.${step - 1}.command`)}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {t(`rituals.end.steps.${step - 1}.meaning`)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <h3 className="text-2xl font-bold mb-8">{t("rituals.end.title")}</h3>
        <div className="space-y-3">
          {Array.from({ length: 10 }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className="flex items-start gap-3 px-2 py-1 rounded-lg dark:bg-primary/20"
            >
              <span className="flex-shrink-0 w-6 h-6 bg-primary text-white text-sm font-bold rounded-full flex items-center justify-center">
                {step}
              </span>
              <div className="flex-1">
                <p className="font-bold text-blue-800 dark:text-blue-200">
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
    </Container>
  );
}
