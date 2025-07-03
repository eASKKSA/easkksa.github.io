import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";

import {
  FaUserShield,
  FaHeart,
  FaFistRaised,
  FaPeopleArrows,
  FaBrain,
} from "react-icons/fa";

// --- ASSETS ---
import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";

export const generateMetadata = metadata;

// --- DATA ---
const dojoKunMaxims = [
  { key: "character", icon: <FaUserShield className="text-4xl" /> },
  { key: "sincerity", icon: <FaHeart className="text-4xl" /> },
  { key: "effort", icon: <FaFistRaised className="text-4xl" /> },
  { key: "etiquette", icon: <FaPeopleArrows className="text-4xl" /> },
  { key: "selfControl", icon: <FaBrain className="text-4xl" /> },
];

// --- MAIN PAGE COMPONENT ---
export default async function DojoKunPage() {
  const t = await getTranslations("DojoKun");

  return (
    <>
      <Container withBubbles blur as="article">
        <h1 className="text-center">{t("title")}</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center py-6">
          <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
            <Image
              src={dojoKunImage}
              alt="Dojo Kun - 5 Máximas de Gichin Funakoshi"
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

        {/* Maxims Grid */}
        <h2 className="hidden">Máximas</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {dojoKunMaxims.map((maxim) => (
            <FeatureCard
              key={maxim.key}
              feature={{
                id: maxim.key,
                title: t(`maxims.${maxim.key}.title`),
                description: t(`maxims.${maxim.key}.description`),
                icon: maxim.icon,
              }}
              className="p-2!"
            />
          ))}
        </div>

        {/* Footer Section */}
        <div className="mt-16 text-center">
          <div className="rounded-lg p-8">
            <h2 className="text-2xl font-semibold mb-4">{t("footer.title")}</h2>
            <p className="leading-relaxed">{t("footer.message")}</p>
          </div>
        </div>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
