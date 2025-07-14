import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ASKKSA - Associação Shotokan Kokusai Karate",
    short_name: "ASKKSA",
    description: "Aprenda o autêntico Karaté Shotokan Santo António, Funchal.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#A4262C",
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
