"use client";

import { FaFacebook } from "react-icons/fa";
import { useConsent } from "@/components/consent-provider";
import { useDeferredEmbed } from "@/lib/use-deferred-embed";

const facebookEmbedUrl =
  "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FASKKSA.MADEIRA&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId";

export default function FacebookPageEmbed({
  loadingLabel,
  consentLabel,
  openLabel,
}: Readonly<{
  loadingLabel: string;
  consentLabel: string;
  openLabel: string;
}>) {
  const { consentGiven } = useConsent();
  const { isLoaded, targetRef } = useDeferredEmbed<HTMLDivElement>();

  if (consentGiven && isLoaded) {
    return (
      <iframe
        src={facebookEmbedUrl}
        className="h-[600px] w-[500px]"
        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
        title="ASKKSA Facebook"
        loading="lazy"
      />
    );
  }

  return (
    <div
      ref={targetRef}
      className="flex h-[600px] w-[500px] flex-col items-center justify-center gap-5 bg-gray-50 px-8 text-center dark:bg-gray-800"
    >
      <FaFacebook aria-hidden="true" className="text-6xl text-blue-600" />
      <p
        className="text-center! text-sm text-gray-600 dark:text-gray-300"
        role="status"
      >
        {consentGiven ? loadingLabel : consentLabel}
      </p>
      {!consentGiven && (
        <a
          href="https://www.facebook.com/ASKKSA.MADEIRA/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          {openLabel}
        </a>
      )}
    </div>
  );
}
