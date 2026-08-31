import Image from "next/image";
import { getTranslations } from "next-intl/server";
import {
  FaBrain,
  FaFistRaised,
  FaHeart,
  FaPeopleArrows,
  FaUserShield,
} from "react-icons/fa";
import { MetadataLDJSON } from "@/app/metadata";
// --- ASSETS ---
import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";
import { jsonLd } from "./metadata";

export { generateMetadata } from "./metadata";

// --- DATA ---
const dojoKunMaxims = [
  { key: "character", icon: <FaUserShield className="text-4xl" /> },
  { key: "sincerity", icon: <FaHeart className="text-4xl" /> },
  { key: "effort", icon: <FaFistRaised className="text-4xl" /> },
  { key: "etiquette", icon: <FaPeopleArrows className="text-4xl" /> },
  { key: "selfControl", icon: <FaBrain className="text-4xl" /> },
];

// --- MAIN PAGE COMPONENT ---
export default async function DojoKunPage({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;
  const t = await getTranslations("DojoKun");

  return (
    <>
      <Container withBubbles blur as="article" initialAnimation>
        <h1 className="text-center">{t("title")}</h1>
        <div className="my-8 grid items-center gap-8 md:grid-cols-2">
          <Image
            src={dojoKunImage}
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

        {/* Maxims Grid */}
        <h2 className="hidden">Máximas</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
      <MetadataLDJSON jsonLd={await jsonLd(locale)} />
    </>
  );
}
