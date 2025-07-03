import { XMLParser } from "fast-xml-parser";

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  pubDateTS: number;
  source: string;
}

export async function getASKKSANews(): Promise<NewsItem[]> {
  const url =
    "https://news.google.com/rss/search?q=ASKKSA&hl=pt-PT&gl=PT&ceid=PT:pt";

  /* 1.  Buscar RSS e converter para JSON */
  const xml = await fetch(url).then((r) => r.text());
  const rss = new XMLParser({ ignoreAttributes: false }).parse(xml);
  const raw = Array.isArray(rss.rss.channel.item)
    ? rss.rss.channel.item
    : [rss.rss.channel.item];

  /* 2.  Mapear cada item */
  const mapped = raw.map((it: NewsItem) => {
    /* Data de publicação (fallback: agora) */
    const dateObj = new Date(it.pubDate ?? Date.now());

    return {
      title: it.title,
      link: it.link,
      pubDate: dateObj.toISOString(),
      pubDateTS: dateObj.getTime(),
      source: "Google News",
    } satisfies NewsItem;
  });

  /* 3.  Ordenar (mais recentes primeiro) */
  mapped.sort((a: NewsItem, b: NewsItem) => b.pubDateTS - a.pubDateTS);

  /* 4.  Devolver apenas os 5 mais recentes */
  return mapped.slice(0, 5);
}
