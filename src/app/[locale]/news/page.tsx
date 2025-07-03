import { getTranslations } from "next-intl/server";
import Container from "@/components/container";
import { jsonLd, metadata } from "./metadata";
import { MetadataLDJSON } from "@/app/metadata";
import FacebookEmbed from "@/components/news/facebook-section";
import InstagramLink from "@/components/news/instagram-section";
import YouTubeLink from "@/components/news/youtube-section";
import ASKKSANews from "@/components/news/askksa-news";

export const generateMetadata = metadata;

export default async function NewsPage() {
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
      <MetadataLDJSON jsonLd={await jsonLd()} />
    </>
  );
}
