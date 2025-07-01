import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import {
  FaUserShield,
  FaHeart,
  FaFistRaised,
  FaPeopleArrows,
  FaBrain,
} from "react-icons/fa";

// --- ASSETS ---
import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";

// --- METADATA ---
export const metadata: Metadata = {
  title: "Dojo Kun - 5 Máximas | Gichin Funakoshi | ASKKSA Shotokan Madeira",
  description:
    "Conheça as 5 máximas fundamentais do Dojo Kun desenvolvidas pelo Sensei Gichin Funakoshi para todos os praticantes de Karaté. Princípios essenciais para o dojo. ASKKSA Funchal, Madeira.",
  keywords: [
    "Dojo Kun",
    "5 Máximas Karaté",
    "Gichin Funakoshi",
    "Filosofia Dojo",
    "ASKKSA",
    "Shotokan",
    "Mandamentos Dojo",
    "Princípios Dojo",
    "Karaté Tradicional",
    "Funchal",
    "Madeira",
  ],
};

// --- DATA ---
const dojoKunMaxims = [
  { key: "character", icon: <FaUserShield /> },
  { key: "sincerity", icon: <FaHeart /> },
  { key: "effort", icon: <FaFistRaised /> },
  { key: "etiquette", icon: <FaPeopleArrows /> },
  { key: "selfControl", icon: <FaBrain /> },
];

// --- MAIN PAGE COMPONENT ---
export default async function DojoKunPage() {
  const t = await getTranslations("DojoKun");

  return (
    <Container withBubbles blur as="article">
      <h1 className="text-center">{t("title")}</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center py-6">
        <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
          <Image
            src={dojoKunImage}
            alt="Dojo Kun - 5 Máximas de Gichin Funakoshi"
            fill
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
  );
}
