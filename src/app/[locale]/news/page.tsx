import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";

const ASKKSANews = dynamic(() => import("@/components/news/askksa-news"));
const FacebookEmbed = dynamic(
  () => import("@/components/news/facebook-section"),
);
const InstagramLink = dynamic(
  () => import("@/components/news/instagram-section"),
);
const YouTubeLink = dynamic(() => import("@/components/news/youtube-section"));

export async function generateMetadata({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>): Promise<Metadata> {
  const { locale } = await params;
  return await metadata(locale);
}

export default async function NewsPage({
  params,
}: Readonly<{
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;
  const t = await getTranslations("News");

  return (
    <>
      <Container blur withBubbles>
        <h1 className="text-center">{t("title")}</h1>

        {/* ASKKSA News */}
        <Container>
          <ASKKSANews
            title="Notícias ASKKSA"
            subtitle="Menções da nossa associação na imprensa"
            readMore={t("readMore")}
          />
        </Container>

        {/* Facebook Embed */}
        <Container className="relative overflow-hidden rounded-2xl p-8 bg-gradient-to-tr from-blue-400/10 via-blue-500/10 to-blue-600/10 ring-1 ring-inset ring-blue-500/10 dark:ring-blue-500/30">
          <FacebookEmbed />
        </Container>

        {/* Instagram Link */}
        <Container>
          <InstagramLink />
        </Container>

        {/* YouTube Link */}
        <Container>
          <YouTubeLink />
        </Container>
      </Container>
      <MetadataLDJSON jsonLd={await jsonLd(t, locale)} />
    </>
  );
}
