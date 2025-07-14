import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";

import mainLogo from "@/app/icon.svg";

export const generateMetadata = metadata;

export default async function DojoRulesPage() {
  const t = await getTranslations("DojoRules");

  return (
    <>
      <Container blur withBubbles as="article">
        <h1 className="text-center">{t("title")}</h1>
        <div className="grid md:grid-cols-2 gap-8 items-center py-6">
          <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
            <Image
              src={mainLogo}
              alt="ASKKSA - Regras do Dojo"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
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
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <span className="text-blue-600 dark:text-blue-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("responsibility.rule1")}
              </p>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20">
              <span className="text-blue-600 dark:text-blue-400 text-xl">
                •
              </span>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("responsibility.rule2")}
              </p>
            </div>
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("hygiene.title")}
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 4 }, (_, i) => i + 1).map((ruleNumber) => (
              <div
                key={ruleNumber}
                className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20"
              >
                <span className="text-green-600 dark:text-green-400 text-xl">
                  •
                </span>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`hygiene.rule${ruleNumber}`)}
                </p>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("entrance.title")}
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => i + 1).map((ruleNumber) => (
              <div
                key={ruleNumber}
                className="flex items-start gap-3 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20"
              >
                <span className="text-purple-600 dark:text-purple-400 text-xl">
                  •
                </span>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`entrance.rule${ruleNumber}`)}
                </p>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("behavior.title")}
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 6 }, (_, i) => i + 1).map((ruleNumber) => (
              <div
                key={ruleNumber}
                className="flex items-start gap-3 p-4 rounded-lg bg-orange-50 dark:bg-orange-900/20"
              >
                <span className="text-orange-600 dark:text-orange-400 text-xl">
                  •
                </span>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`behavior.rule${ruleNumber}`)}
                </p>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("instructors.title")}
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => i + 1).map((ruleNumber) => (
              <div
                key={ruleNumber}
                className="flex items-start gap-3 p-4 rounded-lg bg-red-50 dark:bg-red-900/20"
              >
                <span className="text-red-600 dark:text-red-400 text-xl">
                  •
                </span>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`instructors.rule${ruleNumber}`)}
                </p>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("training.title")}
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 7 }, (_, i) => i + 1).map((ruleNumber) => (
              <div
                key={ruleNumber}
                className="flex items-start gap-3 p-4 rounded-lg bg-indigo-50 dark:bg-indigo-900/20"
              >
                <span className="text-indigo-600 dark:text-indigo-400 text-xl">
                  •
                </span>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`training.rule${ruleNumber}`)}
                </p>
              </div>
            ))}
          </div>
        </Container>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8">
            {t("practical.title")}
          </h2>
          <div className="space-y-4">
            {Array.from({ length: 3 }, (_, i) => i + 1).map((ruleNumber) => (
              <div
                key={ruleNumber}
                className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50"
              >
                <span className="text-gray-600 dark:text-gray-400 text-xl">
                  •
                </span>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t(`practical.rule${ruleNumber}`)}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
