import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
import dachisImage from "@/assets/style-ski/dachis.gif";
import maosPesImage from "@/assets/style-ski/maospes.gif";
import tecnicasPernasImage from "@/assets/style-ski/TecnicasPernas2.jpg";
// --- ASSETS ---
import shotokanTopImage from "@/assets/style-ski/top.jpg";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import { getShotokanKatas } from "./data";
import { jsonLd, metadata } from "./metadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  return await metadata(locale);
}

// --- MAIN PAGE COMPONENT ---
export default async function ShotokanKatasPage({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations("ShotokanKatas");
  const shotokanKatas = getShotokanKatas();

  return (
    <>
      <Container withBubbles blur as="article" initialAnimation>
        <h1 className="mx-auto max-w-5xl text-balance text-center">
          {t("title")}
        </h1>
        <div className="page-intro-gap mx-auto mb-8 max-w-3xl">
          <Image
            src={shotokanTopImage}
            alt="Shotokan Karate-Do International Federation"
            className="mx-auto mb-6 h-auto w-full max-w-[600px] rounded-[1.5rem] border border-black/10 shadow-xl dark:border-white/10"
            sizes="(max-width: 768px) calc(100vw - 4rem), 600px"
            quality={60}
            fetchPriority="high"
            priority
          />
        </div>
        <p className="text-xl mb-6 text-center!">{t("introduction")}</p>
        <p className="text-lg mb-6">{t("description")}</p>

        {/* Katas Grid */}
        <h2 className="text-3xl font-bold text-center mb-8">
          {locale === "ja" ? "形" : "Katas"}
        </h2>
        <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {shotokanKatas.map((kata, index) => (
            <FeatureCard
              key={kata}
              feature={{
                id: kata,
                title: t(`katas.${kata}.name`),
                description: t(`katas.${kata}.meaning`),
                icon: <span>{String(index + 1).padStart(2, "0")}</span>,
              }}
            />
          ))}
        </div>

        {/* Technical Images Section */}
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("techniques.title")}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-[1.5rem] border border-black/10 bg-white/65 p-5 text-center backdrop-blur-sm dark:border-white/10 dark:bg-[#1b1b1b]/75">
            <Image
              src={dachisImage}
              alt={t("techniques.positions.title")}
              className="mx-auto mb-5 h-auto w-full max-w-[400px] rounded-xl shadow-lg"
              sizes="(max-width: 768px) calc(100vw - 4rem), (max-width: 1200px) 50vw, 33vw"
              quality={60}
            />
            <h3 className="text-xl font-semibold">
              {t("techniques.positions.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("techniques.positions.description")}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-black/10 bg-white/65 p-5 text-center backdrop-blur-sm dark:border-white/10 dark:bg-[#1b1b1b]/75">
            <Image
              src={tecnicasPernasImage}
              alt={t("techniques.legs.title")}
              className="mx-auto mb-5 h-auto w-full max-w-[400px] rounded-xl shadow-lg"
              sizes="(max-width: 768px) calc(100vw - 4rem), (max-width: 1200px) 50vw, 33vw"
              quality={60}
            />
            <h3 className="text-xl font-semibold">
              {t("techniques.legs.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("techniques.legs.description")}
            </p>
          </div>
          <div className="rounded-[1.5rem] border border-black/10 bg-white/65 p-5 text-center backdrop-blur-sm md:col-span-2 lg:col-span-1 dark:border-white/10 dark:bg-[#1b1b1b]/75">
            <Image
              src={maosPesImage}
              alt={t("techniques.handsFeet.title")}
              className="mx-auto mb-5 h-auto w-full max-w-[400px] rounded-xl shadow-lg"
              sizes="(max-width: 768px) calc(100vw - 4rem), (max-width: 1200px) 50vw, 33vw"
              quality={60}
            />
            <h3 className="text-xl font-semibold">
              {t("techniques.handsFeet.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("techniques.handsFeet.description")}
            </p>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <div className="rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">{t("footer.title")}</h2>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {t("footer.message")}
            </p>
          </div>
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(t, locale)} />
    </>
  );
}
