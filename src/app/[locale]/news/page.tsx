import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";
import {
  FaTools,
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

export const generateMetadata = metadata;

// --- MAIN PAGE COMPONENT ---
export default async function NewsPage() {
  const t = await getTranslations("News");

  return (
    <>
      <Container blur withBubbles as="article">
        <h1 className="text-center">{t("title")}</h1>

        <div className="grid md:grid-cols-2 gap-8 items-center py-6">
          <div className="relative h-64 md:h-88 rounded-lg overflow-hidden">
            <Image
              src="/askksa_logo.svg"
              alt="ASKKSA - Notícias em Manutenção"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <FaTools className="text-primary text-3xl" />
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                {t("maintenance.title")}
              </h2>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
              {t("maintenance.subtitle")}
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {t("maintenance.description")}
            </p>
          </div>
        </div>

        <Container>
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
            {t("maintenance.contact.title")}
          </h2>
          <p className="text-lg text-center text-gray-700 dark:text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
            {t("maintenance.contact.description")}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("maintenance.contact.social")}
              </h3>
              <div className="flex justify-center gap-6">
                <a
                  href="https://www.facebook.com/ASKKSA.MADEIRA"
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebook className="text-2xl" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/askksa_madeira/"
                  className="flex items-center gap-2 text-pink-600 hover:text-pink-800 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="text-2xl" />
                  <span>Instagram</span>
                </a>
              </div>
            </div>

            <div className="text-center p-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600">
              <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                {t("maintenance.contact.direct")}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                  <FaEnvelope className="text-primary" />
                  <span>direcao@askksa.pt</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-700 dark:text-gray-300">
                  <FaPhone className="text-primary" />
                  <span>+351 960 384 090</span>
                </div>
              </div>
            </div>
          </div>
        </Container>

        <Container>
          <div className="text-center p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
            <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
              {t("maintenance.return.title")}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6 max-w-3xl mx-auto">
              {t("maintenance.return.message")}
            </p>
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold text-lg shadow-lg">
              <span>{t("oss")}</span>
            </div>
          </div>
        </Container>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
