import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";

export const metadata: Metadata = {
  title: "Regras do Dojo | Etiqueta e Conduta | ASKKSA Shotokan Madeira",
  description:
    "Conheça as regras de conduta e etiqueta do dojo de Karaté Shotokan. Comportamento, respeito e tradições japonesas. ASKKSA Funchal, Madeira.",
  keywords: [
    "Regras Dojo",
    "Etiqueta Karaté",
    "Conduta Dojo",
    "Respeito",
    "Tradições Japonesas",
    "ASKKSA",
    "Shotokan",
    "Funchal",
    "Madeira",
    "Sensei",
    "Comportamento Karaté",
  ],
};

export default async function DojoRulesPage() {
  const t = await getTranslations("DojoRules");

  return (
    <Container blur withBubbles as="article">
      <h1 className="text-center">{t("title")}</h1>
      <div className="grid md:grid-cols-2 gap-8 items-center py-6">
        <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
          <Image
            src="/askksa_logo.svg"
            alt="Regras do Dojo"
            fill
            sizes="20-vw"
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("introduction")}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            {t("description")}
          </p>
        </div>
      </div>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("responsibility.title")}
        </h2>
        <div className="space-y-4">
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("responsibility.rule1")}
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
            • {t("responsibility.rule2")}
          </p>
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("hygiene.title")}
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 4 }, (_, i) => i + 1).map((ruleNumber) => (
            <p
              key={ruleNumber}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              • {t(`hygiene.rule${ruleNumber}`)}
            </p>
          ))}
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("entrance.title")}
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => i + 1).map((ruleNumber) => (
            <p
              key={ruleNumber}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              • {t(`entrance.rule${ruleNumber}`)}
            </p>
          ))}
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("behavior.title")}
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 6 }, (_, i) => i + 1).map((ruleNumber) => (
            <p
              key={ruleNumber}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              • {t(`behavior.rule${ruleNumber}`)}
            </p>
          ))}
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("instructors.title")}
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => i + 1).map((ruleNumber) => (
            <p
              key={ruleNumber}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              • {t(`instructors.rule${ruleNumber}`)}
            </p>
          ))}
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("training.title")}
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((ruleNumber) => (
            <p
              key={ruleNumber}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              • {t(`training.rule${ruleNumber}`)}
            </p>
          ))}
        </div>
      </Container>

      <Container>
        <h2 className="text-3xl font-bold text-center mb-8">
          {t("practical.title")}
        </h2>
        <div className="space-y-4">
          {Array.from({ length: 3 }, (_, i) => i + 1).map((ruleNumber) => (
            <p
              key={ruleNumber}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              • {t(`practical.rule${ruleNumber}`)}
            </p>
          ))}
        </div>
      </Container>
    </Container>
  );
}
