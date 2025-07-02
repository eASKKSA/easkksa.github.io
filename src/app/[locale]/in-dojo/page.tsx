import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Section from "@/components/container";

// --- ASSETS ---
import senseiSeizaImage from "@/assets/in-dojo/Sensei_by_VCRC.jpg";
import gradesImage from "@/assets/in-dojo/graduacoes.jpg";
import dojoKunImage from "@/assets/philosofy/dojo-kun.jpg";
import { Link } from "@/i18n/navigation";

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
const inDojoSections = [
  {
    title: "Saudação",
    description:
      "A saudação no Karaté é uma expressão da sinceridade (SEIJITSU) que faz parte do código ético da arte marcial. Ela é um sinal dum karateca que não oculta os seus ideais e sentimentos e consegue ser ele próprio.",
    image: senseiSeizaImage,
    href: "/in-dojo/salutation" as const,
  },
  {
    title: "Regras",
    description:
      "O Dojo é o local onde os ensinamentos da arte marcial são passados aos praticantes, como tal deve ser um local onde a seriedade e o respeito imperam.",
    image: gradesImage,
    href: "/in-dojo/rules" as const,
    principlesCount: "20 Princípios",
  },
  {
    title: "Vocabulário",
    description:
      "Visto que o Karaté é uma arte marcial de origem japonesa é natural que muitos dos termos utilizados no Dojo, sejam japoneses.",
    image: dojoKunImage,
    href: "/in-dojo/vocabulary" as const,
  },
  {
    title: "Graduações",
    description:
      "As artes marciais provenientes do Japão e Okinawa, apresentam uma variedade de títulos e classes de graduações.",
    image: gradesImage,
    href: "/in-dojo/grades" as const,
    principlesCount: "5 Máximas",
  },
];

// --- MAIN PAGE COMPONENT ---
export default async function InDojoPage() {
  const t = await getTranslations("InDojo");

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
      <Section>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mx-auto">
          {inDojoSections.map((section, index) => (
            <Link key={index} href={section.href} className="group">
              <article className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 h-full border border-gray-200 dark:border-gray-700">
                <div className="relative h-48">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
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
            A filosofia do Karaté não se limita apenas às técnicas físicas, mas
            engloba um código moral e ético que orienta o praticante tanto
            dentro como fora do dojo. Estes ensinamentos milenares formam a base
            do desenvolvimento pessoal e espiritual de cada karateka.
          </p>
        </div>
      </Section>
    </>
  );
}
