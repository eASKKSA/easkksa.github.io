import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import FeatureCard from "@/components/feature-card";

// --- ASSETS ---
import ethicalCodeImage from "@/assets/philosofy/codigo-etica-karate.jpg";

// --- METADATA ---
export const metadata: Metadata = {
  title: "Código de Ética Bushido | Filosofia Karaté | ASKKSA Shotokan Madeira",
  description:
    "Descubra o código de ética Bushido no Karaté Shotokan. Os 9 princípios samurai: honra, lealdade, coragem, justiça, respeito. ASKKSA Funchal, Madeira.",
  keywords: [
    "Bushido",
    "Código Ética Karaté",
    "Princípios Samurai",
    "Filosofia Karaté",
    "ASKKSA",
    "Shotokan",
    "Honra",
    "Lealdade",
    "Coragem",
    "Justiça",
    "Respeito",
    "Funchal",
    "Madeira",
  ],
};

// --- DATA ---
const principlesData = [
  { key: "honor", icon: "👑" },
  { key: "loyalty", icon: "🤝" },
  { key: "sincerity", icon: "💎" },
  { key: "courage", icon: "🦁" },
  { key: "kindness", icon: "❤️" },
  { key: "modesty", icon: "🙏" },
  { key: "justice", icon: "⚖️" },
  { key: "respect", icon: "🫡" },
  { key: "selfControl", icon: "🧘" },
];

const relatedPages = [
  {
    title: "Niju Kun - 20 Princípios",
    description:
      "Os princípios fundamentais de Sensei Funakoshi para a prática do Karaté",
    href: "/filosofia/niju-kun",
  },
  {
    title: "Dojo Kun - 5 Máximas",
    description: "As máximas essenciais para todos que entram no dojo",
    href: "/filosofia/dojo-kun",
  },
];

// --- MAIN PAGE COMPONENT ---
export default async function BushidoPage() {
  const t = await getTranslations("Bushido");

  return (
    <>
      {/* Breadcrumb */}
      <div className="container mx-auto px-4">
        <nav aria-label="Breadcrumb">
          <ol className="flex space-x-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              <Link href="/" className="hover:text-primary">
                Início
              </Link>
            </li>
            <li>{">"}</li>
            <li>
              <Link href="/filosofia" className="hover:text-primary">
                Filosofia
              </Link>
            </li>
            <li>{">"}</li>
            <li className="text-gray-900 dark:text-white font-medium">
              Bushido
            </li>
          </ol>
        </nav>
      </div>

      <Container blur withBubbles>
        <h1 className="text-center">{t("title")}</h1>

        <div className="grid md:grid-cols-2 gap-8 items-center py-6">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src={ethicalCodeImage}
              alt="Código de Ética Bushido"
              fill
              className="object-cover"
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
          {principlesData.map((principle, index) => (
            <FeatureCard
              key={principle.key}
              feature={{
                id: principle.key,
                title: t(`principles.${principle.key}.name`),
                description: `${t(`principles.${principle.key}.japanese`)} - ${t(`principles.${principle.key}.description`)}`,
                icon: <span className="text-3xl">{principle.icon}</span>,
              }}
              index={index}
            />
          ))}
        </div>
      </Container>

      {/* Related Philosophy Links */}
      <Container>
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center text-gray-900 dark:text-white">
              Explore Mais Filosofia
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {relatedPages.map((page, index) => (
                <Link
                  key={index}
                  href={page.href}
                  className="block p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:border-red-600 transition-all bg-white dark:bg-gray-800"
                >
                  <h3 className="font-bold text-lg mb-2 text-gray-900 dark:text-white">
                    {page.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {page.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}
