import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import Section from "@/components/container";

// --- ASSETS ---
import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";
import principlesImage from "@/assets/philosofy/principios.gif";
import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";

// --- METADATA ---
export const metadata: Metadata = {
  title: "Filosofia do Karaté | ASKKSA Shotokan Madeira",
  description:
    "Descubra a filosofia do Karaté Shotokan através do Bushido, Niju Kun e Dojo Kun. Princípios milenares de disciplina, respeito e autocontrole.",
  keywords: [
    "Filosofia Karaté",
    "Bushido",
    "Niju Kun",
    "Dojo Kun",
    "Sensei Funakoshi",
    "Princípios Karaté",
    "ASKKSA",
    "Shotokan",
    "Funchal",
    "Madeira",
  ],
};

// --- DATA ---
const philosophySections = [
  {
    title: "Código de Ética - Bushido",
    description:
      "Os nove princípios éticos inspirados no código dos Samurais: honra, lealdade, sinceridade, coragem, bondade, modéstia, justiça, respeito e autocontrolo.",
    image: ethicalCodeImage,
    href: "/filosofia/bushido",
    principlesCount: "9 Princípios",
  },
  {
    title: "Niju Kun - 20 Princípios",
    description:
      "Os vinte princípios desenvolvidos por Sensei Gichin Funakoshi que constituem a base filosófica de todos os praticantes de Karaté.",
    image: principlesImage,
    href: "/filosofia/niju-kun",
    principlesCount: "20 Princípios",
  },
  {
    title: "Dojo Kun - 5 Máximas",
    description:
      "As cinco máximas fundamentais de Sensei Funakoshi para todos aqueles que entram num local de treino, o Dojo.",
    image: dojoKunImage,
    href: "/filosofia/dojo-kun",
    principlesCount: "5 Máximas",
  },
];

// --- MAIN PAGE COMPONENT ---
export default async function PhilosophyPage() {
  const t = await getTranslations("Philosophy");

  return (
    <>
      {/* Hero Section */}
      <Section blur withBubbles>
        <h1 className="text-5xl font-bold mb-8 text-gray-900 dark:text-white text-center">
          {t("title")}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed text-center">
          {t("introduction")}
        </p>
      </Section>

      {/* Philosophy Sections */}
      <Section>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {philosophySections.map((section, index) => (
              <Link key={index} href={section.href} className="group">
                <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-700">
                  <div className="relative h-48">
                    <Image
                      src={section.image}
                      alt={section.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                      {section.principlesCount}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                      {section.description}
                    </p>
                    <span className="text-primary font-medium text-sm group-hover:underline">
                      Explorar →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Additional Context */}
          <div className="mt-16 max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              A Importância da Filosofia no Karaté
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              A filosofia do Karaté não se limita apenas às técnicas físicas,
              mas engloba um código moral e ético que orienta o praticante tanto
              dentro como fora do dojo. Estes ensinamentos milenares formam a
              base do desenvolvimento pessoal e espiritual de cada karateka.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
