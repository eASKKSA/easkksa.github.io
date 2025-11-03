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
import { jsonLd, metadata } from "./metadata";

export const generateMetadata = metadata;

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
export default async function BushidoPage() {
  const t = await getTranslations("Bushido");

  return (
    <>
      <Container blur withBubbles as="article">
        <h1 className="text-center">{t("title")}</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center py-6">
          <Image
            src={ethicalCodeImage}
            alt="Código de Ética Bushido"
            height={500}
            className="object-contain rounded-xl shadow-lg mx-auto"
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
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
