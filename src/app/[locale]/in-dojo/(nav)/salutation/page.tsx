import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
// --- ASSETS ---
import senseiSeizaImage from "@/assets/in-dojo/Sensei_Seiza.jpeg";
import Container from "@/components/container";
import { jsonLd } from "./metadata";

export { generateMetadata } from "./metadata";

// --- MAIN PAGE COMPONENT ---
export default async function SalutationPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const t = await getTranslations("Salutation");

  return (
    <>
      <Container blur withBubbles as="article" initialAnimation>
        <h1 className="text-center">{t("title")}</h1>
        <div className="my-8 grid items-center gap-8 md:grid-cols-2">
          <Image
            src={senseiSeizaImage}
            alt={t("title")}
            width={500}
            height={500}
            sizes="(max-width: 768px) calc(100vw - 4rem), 500px"
            quality={60}
            className="w-full max-w-[500px] h-auto object-contain rounded-xl shadow-lg mx-auto"
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
                className="flex items-start gap-3 rounded-xl bg-primary/5 px-4 py-3 dark:bg-primary/10"
              >
                <span className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                  {step}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-primary">
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
                className="flex items-start gap-3 rounded-xl bg-gold/10 px-4 py-3 dark:bg-gold/10"
              >
                <span className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-gold text-sm font-bold text-ink">
                  {step}
                </span>
                <div className="flex-1">
                  <p className="font-bold text-amber-800 dark:text-gold">
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
      <MetadataLDJSON jsonLd={await jsonLd(locale)} />
    </>
  );
}
