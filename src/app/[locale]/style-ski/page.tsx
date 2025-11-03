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
      <Container withBubbles blur as="article">
        <h1 className="text-center">{t("title")}</h1>
        <div className="max-w-3xl mx-auto mb-8">
          <Image
            src={shotokanTopImage}
            alt="Shotokan Karate-Do International Federation"
            className="rounded-lg shadow-lg mx-auto mb-6"
            width={600}
            height={200}
            priority
          />
        </div>
        <p className="text-xl mb-6 text-center!">{t("introduction")}</p>
        <p className="text-lg mb-6">{t("description")}</p>

        {/* Katas Grid */}
        <h2 className="text-3xl font-bold text-center mb-8">Katas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {shotokanKatas.map((kata) => (
            <FeatureCard
              key={kata}
              feature={{
                id: kata,
                title: t(`katas.${kata}.name`),
                description: t(`katas.${kata}.meaning`),
                icon: <span className="text-3xl">🥋</span>,
              }}
            />
          ))}
        </div>

        {/* Technical Images Section */}
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("techniques.title")}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="text-center">
            <Image
              src={dachisImage}
              alt="Posições (Dachi) do Karaté Shotokan"
              className="rounded-lg shadow-lg mx-auto mb-4"
              width={400}
              height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <h3 className="text-xl font-semibold">
              {t("techniques.positions.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("techniques.positions.description")}
            </p>
          </div>
          <div className="text-center">
            <Image
              src={tecnicasPernasImage}
              alt="Técnicas de Pernas do Karaté Shotokan"
              className="rounded-lg shadow-lg mx-auto mb-4"
              width={400}
              height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <h3 className="text-xl font-semibold">
              {t("techniques.legs.title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              {t("techniques.legs.description")}
            </p>
          </div>
          <div className="text-center md:col-span-2 lg:col-span-1">
            <Image
              src={maosPesImage}
              alt="Técnicas de Mãos e Pés do Karaté Shotokan"
              className="rounded-lg shadow-lg mx-auto mb-4"
              width={400}
              height={500}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
