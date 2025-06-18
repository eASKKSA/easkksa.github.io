import Link from "next/link";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Metadata } from "next";
import Section from "@/components/section";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "NotFound" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
  };
}

export default function NotFound() {
  const t = useTranslations("NotFound");

  return (
    <Section
      sectionBlur
      withBubbles
      className=" max-w-4xl mx-auto text-center space-y-8"
    >
      {/* Error Code */}
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">
          404
        </h1>
        <div className="w-24 h-1 bg-primary mx-auto rounded-full"></div>
      </div>

      {/* Error Message */}
      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          {t("title")}
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          {t("description")}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <Link href="/" className="not-found-button-container">
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          {t("actions.returnHome")}
        </Link>
      </div>

      {/* Additional Help */}
      <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {t("help.text")}{" "}
          <Link
            href="/contact"
            className="text-primary hover:text-primary underline"
          >
            {t("help.contactLink")}
          </Link>
        </p>
      </div>
    </Section>
  );
}
