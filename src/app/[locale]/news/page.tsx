import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { MetadataLDJSON } from "@/app/metadata";
import Container from "@/components/container";
import ASKKSANews from "@/components/news/askksa-news";
import FacebookEmbed from "@/components/news/facebook-section";
import InstagramLink from "@/components/news/instagram-section";
import YouTubeLink from "@/components/news/youtube-section";
import { jsonLd, metadata } from "./metadata";

export const revalidate = 3600;

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
      <Container blur withBubbles initialAnimation>
        <h1 className="text-center">{t("title")}</h1>

        {/* ASKKSA News */}
        <Container className="page-intro-gap">
          <ASKKSANews
            title={t("sections.askksa.title")}
            subtitle={t("sections.askksa.subtitle")}
            readMore={t("readMore")}
            locale={locale}
          />
        </Container>

        {/* Facebook Embed */}
        <Container className="relative overflow-hidden rounded-[1.5rem] border border-primary/15 bg-primary/5 p-8 dark:border-primary/25 dark:bg-primary/10">
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
