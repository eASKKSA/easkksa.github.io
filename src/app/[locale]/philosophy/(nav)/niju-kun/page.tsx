import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";

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

export const generateMetadata = metadata;

// --- DATA ---
const nijuKunPrinciples = [
  { key: "greeting", icon: <FaHandshake className="text-4xl" /> },
  { key: "noOffense", icon: <FaShieldAlt className="text-4xl" /> },
  { key: "justice", icon: <FaBalanceScale className="text-4xl" /> },
  { key: "selfKnowledge", icon: <GiMirrorMirror className="text-4xl" /> },
  { key: "spiritDevelopment", icon: <FaHeart className="text-4xl" /> },
  { key: "mentalControl", icon: <FaBrain className="text-4xl" /> },
  { key: "negligence", icon: <FaExclamationTriangle className="text-4xl" /> },
  { key: "lifeLongTraining", icon: <FaInfinity className="text-4xl" /> },
  { key: "applyKarate", icon: <FaHandPaper className="text-4xl" /> },
  { key: "hotWater", icon: <GiWaterDrop className="text-4xl" /> },
  { key: "notBeDefeated", icon: <FaThinkPeaks className="text-4xl" /> },
  { key: "strengthWeakness", icon: <FaEye className="text-4xl" /> },
  { key: "moveWithOpponent", icon: <FaRunning className="text-4xl" /> },
  { key: "sharpSwords", icon: <GiCrossedSwords className="text-4xl" /> },
  { key: "millionOpponents", icon: <FaUsers className="text-4xl" /> },
  { key: "artificialToNatural", icon: <FaSeedling className="text-4xl" /> },
  { key: "correctPractice", icon: <FaLightbulb className="text-4xl" /> },
  { key: "forceControl", icon: <FaFistRaised className="text-4xl" /> },
  { key: "studyPractice", icon: <FaGraduationCap className="text-4xl" /> },
  { key: "thinkCarefully", icon: <FaUserCheck className="text-4xl" /> },
];

// --- MAIN PAGE COMPONENT ---
export default async function NijuKunPage() {
  const t = await getTranslations("NijuKun");

  return (
    <>
      <Container withBubbles blur as="article">
        {/* Header Section */}
        <h1 className="text-center">{t("title")}</h1>
        <Image
          src={nijuKunImage}
          alt="Niju Kun - 20 Princípios de Gichin Funakoshi"
          height={500}
          className="object-contain rounded-xl shadow-lg mx-auto"
          priority
        />
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
              className="p-2!"
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
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
