import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";

import {
  FaCrown,
  FaHandshake,
  FaGem,
  FaHeart,
  FaBalanceScale,
  FaPray,
} from "react-icons/fa";
import { GiLion, GiSelfLove, GiPrayer } from "react-icons/gi";

// --- ASSETS ---
import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";

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
          <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
            <Image
              src={ethicalCodeImage}
              alt="Código de Ética Bushido"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
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
