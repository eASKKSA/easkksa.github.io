"use client";

import { useState, useEffect } from "react";
import {
  FaNewspaper,
  FaExternalLinkAlt,
  FaSearch,
  FaCalendarAlt,
  FaSortAmountDown,
} from "react-icons/fa";
import { useTranslations } from "next-intl";

interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  pubDateTimestamp: number;
  source: string;
}

interface ASKKSANewsProps {
  title: string;
  subtitle: string;
  readMore: string;
}

export default function ASKKSANews({
  title,
  subtitle,
  readMore,
}: Readonly<ASKKSANewsProps>) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const t = useTranslations("News.sections.askksa");
  const timeT = useTranslations("News.timeLabels");

  useEffect(() => {
    async function fetchNews() {
      try {
        const response = await fetch("/api/askksa-news");
        if (response.ok) {
          const data = await response.json();
          setNews(data);
        }
      } catch (error) {
        console.error("Erro ao buscar notícias ASKKSA:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  // Função para formatar data de forma mais amigável
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) {
      return timeT("fewMinutes");
    } else if (diffInHours < 24) {
      return `Há ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`;
    } else if (diffInHours < 48) {
      return timeT("yesterday");
    } else {
      return date.toLocaleDateString("pt-PT", {
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    }
  };

  if (loading) {
    return (
      <div>
        <div className="flex items-center gap-3 mb-6">
          <FaNewspaper className="text-primary text-2xl" />
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {t("title")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FaSearch className="text-primary text-2xl" />
          <div>
            <h3 className="text-xl font-bold text-gray-800 dark:text-white">
              {title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400">{subtitle}</p>
          </div>
        </div>
      </div>

      {news.length === 0 ? (
        <div className="text-center p-8 bg-gradient-to-br from-primary/5 to-primary/10 rounded-lg border border-primary/20">
          <FaNewspaper className="text-4xl text-primary/60 mx-auto mb-4" />
          <h4 className="text-lg font-bold text-gray-800 dark:text-white mb-2">
            {t("noNews.title")}
          </h4>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {t("noNews.message")}
          </p>
          <a
            href="https://news.google.com/search?q=ASKKSA&hl=pt-PT&gl=PT&ceid=PT%3Apt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            <FaSearch />
            {t("noNews.button")}
          </a>
        </div>
      ) : (
        <div className="space-y-1!">
          {news.map((item, index) => (
            <article
              key={index}
              className="p-6 bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition-all duration-300 hover:border-primary/30"
            >
              <div className="flex justify-between items-start mb-3">
                <h4 className="text-lg font-bold text-gray-800 dark:text-white line-clamp-2 flex-1">
                  {item.title}
                </h4>
                <div className="flex flex-col space-y-1">
                  <div className="flex items-center gap-1 text-xs text-gray-500 ml-4 bg-gray-50 dark:bg-gray-700 px-2 py-1 rounded-full">
                    <FaCalendarAlt />
                    {formatDate(item.pubDate)}
                  </div>
                  {index === 0 && (
                    <span className="text-xs flex self-end bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 px-2 py-1 rounded-full font-medium">
                      {t("mostRecent")}
                    </span>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                {item.description}
              </p>

              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    {item.source}
                  </span>
                </div>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
                >
                  <span>{readMore}</span>
                  <FaExternalLinkAlt className="text-sm" />
                </a>
              </div>
            </article>
          ))}

          {/* Link para mais notícias */}
          <div className="text-center pt-4">
            <a
              href="https://news.google.com/search?q=ASKKSA&hl=pt-PT&gl=PT&ceid=PT%3Apt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              <FaSearch />
              {t("seeMore")}
            </a>
          </div>

          {/* Indicador de ordenação */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-2">
            <FaSortAmountDown className="inline mr-2" />
            {t("sortInfo")}
          </div>
        </div>
      )}
    </div>
  );
}
