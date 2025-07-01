import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import {
  FaHandshake,
  FaShieldAlt,
  FaBalanceScale,
  FaHeart,
  FaBrain,
  FaExclamationTriangle,
  FaInfinity,
  FaHandPaper,
  FaThinkPeaks,
  FaEye,
  FaRunning,
  FaUsers,
  FaSeedling,
  FaLightbulb,
  FaFistRaised,
  FaGraduationCap,
  FaUserCheck,
} from "react-icons/fa";
import { GiWaterDrop, GiMirrorMirror, GiCrossedSwords } from "react-icons/gi";

// --- ASSETS ---
import nijuKunImage from "@/assets/philosofy/principios.gif";

// --- METADATA ---
export const metadata: Metadata = {
  title:
    "Niju Kun - 20 Princípios | Gichin Funakoshi | ASKKSA Shotokan Madeira",
  description:
    "Conheça os 20 princípios fundamentais do Karaté Shotokan (Niju Kun) desenvolvidos pelo Sensei Gichin Funakoshi. Filosofia e ensinamentos para a vida. ASKKSA Funchal, Madeira.",
  keywords: [
    "Niju Kun",
    "20 Princípios Karaté",
    "Gichin Funakoshi",
    "Filosofia Karaté",
    "ASKKSA",
    "Shotokan",
    "Ensinamentos",
    "Princípios Fundamentais",
    "Karaté Tradicional",
    "Funchal",
    "Madeira",
  ],
};

// --- DATA ---
const nijuKunPrinciples = [
  { key: "greeting", icon: <FaHandshake /> },
  { key: "noOffense", icon: <FaShieldAlt /> },
  { key: "justice", icon: <FaBalanceScale /> },
  { key: "selfKnowledge", icon: <GiMirrorMirror /> },
  { key: "spiritDevelopment", icon: <FaHeart /> },
  { key: "mentalControl", icon: <FaBrain /> },
  { key: "negligence", icon: <FaExclamationTriangle /> },
  { key: "lifeLongTraining", icon: <FaInfinity /> },
  { key: "applyKarate", icon: <FaHandPaper /> },
  { key: "hotWater", icon: <GiWaterDrop /> },
  { key: "notBeDefeated", icon: <FaThinkPeaks /> },
  { key: "strengthWeakness", icon: <FaEye /> },
  { key: "moveWithOpponent", icon: <FaRunning /> },
  { key: "sharpSwords", icon: <GiCrossedSwords /> },
  { key: "millionOpponents", icon: <FaUsers /> },
  { key: "artificialToNatural", icon: <FaSeedling /> },
  { key: "correctPractice", icon: <FaLightbulb /> },
  { key: "forceControl", icon: <FaFistRaised /> },
  { key: "studyPractice", icon: <FaGraduationCap /> },
  { key: "thinkCarefully", icon: <FaUserCheck /> },
];

// --- MAIN PAGE COMPONENT ---
export default async function NijuKunPage() {
  const t = await getTranslations("NijuKun");

  return (
    <Container withBubbles blur as="article">
      {/* Header Section */}
      <h1 className="text-center">{t("title")}</h1>
      <div className="max-w-3xl mx-auto my-8">
        <Image
          src={nijuKunImage}
          alt="Niju Kun - 20 Princípios de Gichin Funakoshi"
          className="rounded-lg shadow-lg mx-auto"
          width={600}
          height={400}
          priority
        />
      </div>
      <p className="text-xl my-6">{t("introduction")}</p>
      <p className="text-lg my-6">{t("description")}</p>

      {/* Principles Grid */}
      <h2 className="hidden">Princípios</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
        {nijuKunPrinciples.map((principle) => (
          <FeatureCard
            key={principle.key}
            feature={{
              id: principle.key,
              title: t(`principles.${principle.key}.title`),
              description: t(`principles.${principle.key}.description`),
              icon: principle.icon,
            }}
          />
        ))}
      </div>

      {/* Footer Section */}
      <div className="mt-16 text-center">
        <div className="rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4">{t("footer.title")}</h2>
          <p>{t("footer.message")}</p>
        </div>
      </div>
    </Container>
  );
}
