import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  return await metadata(locale);
}

export default async function FAQPage({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations("FAQ");

  const questions = [
    { id: "q1", ...t.raw("questions.q1") },
    { id: "q2", ...t.raw("questions.q2") },
    { id: "q3", ...t.raw("questions.q3") },
    { id: "q4", ...t.raw("questions.q4") },
    { id: "q5", ...t.raw("questions.q5") },
    { id: "q6", ...t.raw("questions.q6") },
    { id: "q7", ...t.raw("questions.q7") },
    { id: "q8", ...t.raw("questions.q8") },
    { id: "q9", ...t.raw("questions.q9") },
    { id: "q10", ...t.raw("questions.q10") },
    { id: "q11", ...t.raw("questions.q11") },
    { id: "q12", ...t.raw("questions.q12") },
  ];

  return (
    <>
      <Container blur withBubbles className="text-center">
        <h1>{t("title")}</h1>
        <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed dark:text-gray-200 text-gray-700">
          {t("subtitle")}
        </p>
      </Container>

      <Container className="max-w-4xl mx-auto">
        <div className="space-y-6">
          {questions.map((item, index) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300"
            >
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-start gap-3">
                <span className="text-primary flex-shrink-0">{index + 1}.</span>
                <span>{item.question}</span>
              </h2>
              <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pl-8">
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>

      <Container className="text-center bg-gradient-to-br from-primary to-[#741b1f] rounded-3xl p-8 md:p-12 text-white shadow-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {locale === "pt-PT" ? "Ainda tem dúvidas?" : "Still have questions?"}
        </h2>
        <p className="text-xl opacity-90 mb-6">
          {locale === "pt-PT"
            ? "Entre em contacto connosco. Teremos todo o prazer em ajudar!"
            : "Get in touch with us. We'll be happy to help!"}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="tel:+351960384090"
            className="px-6 py-3 rounded-lg bg-white text-primary font-semibold shadow-md hover:bg-gray-100 transition"
          >
            📞 (+351) 960 384 090
          </a>
          <a
            href="mailto:direcao@askksa.pt"
            className="px-6 py-3 rounded-lg bg-white text-primary font-semibold shadow-md hover:bg-gray-100 transition"
          >
            ✉️ direcao@askksa.pt
          </a>
        </div>
      </Container>

      <MetadataLDJSON jsonLd={await jsonLd(t, locale)} />
    </>
  );
}
