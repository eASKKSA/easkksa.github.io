import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  FaBalanceScale,
  FaCrown,
  FaGem,
  FaHandshake,
  FaHeart,
  FaPray,
} from "react-icons/fa";
import { GiLion, GiPrayer, GiSelfLove } from "react-icons/gi";
import { MetadataLDJSON } from "@/app/metadata";
// --- ASSETS ---
import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import { jsonLd } from "./metadata";

export { generateMetadata } from "./metadata";

// --- DATA ---
const principlesData = [
  { key: "honor", icon: <FaCrown className="text-3xl" /> },
  { key: "loyalty", icon: <FaHandshake className="text-3xl" /> },
  { key: "sincerity", icon: <FaGem className="text-3xl" /> },
  { key: "courage", icon: <GiLion className="text-3xl" /> },
  { key: "kindness", icon: <FaHeart className="text-3xl" /> },
  { key: "modesty", icon: <FaPray className="text-3xl" /> },
  { key: "justice", icon: <FaBalanceScale className="text-3xl" /> },
  { key: "respect", icon: <GiPrayer className="text-3xl" /> },
  { key: "selfControl", icon: <GiSelfLove className="text-3xl" /> },
];

// --- MAIN PAGE COMPONENT ---
export default async function BushidoPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const t = await getTranslations("Bushido");

  return (
    <>
      <Container blur withBubbles as="article" initialAnimation>
        <h1 className="text-center">{t("title")}</h1>
        <div className="my-8 grid items-center gap-8 md:grid-cols-2">
          <Image
            src={ethicalCodeImage}
            alt={t("title")}
            sizes="(max-width: 768px) calc(100vw - 4rem), 500px"
            quality={60}
            className="w-full max-w-[500px] h-auto object-contain rounded-xl shadow-lg mx-auto"
            fetchPriority="high"
            priority
          />
          <div className="text-left space-y-4">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("introduction")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {principlesData.map((principle) => (
            <FeatureCard
              key={principle.key}
              headingLevel="h2"
              feature={{
                id: principle.key,
                title: t(`principles.${principle.key}.name`),
                description: `${t(`principles.${principle.key}.japanese`)} - ${t(`principles.${principle.key}.description`)}`,
                icon: <span className="text-3xl">{principle.icon}</span>,
              }}
            />
          ))}
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(locale)} />
    </>
  );
}
