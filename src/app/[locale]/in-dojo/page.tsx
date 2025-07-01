import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    // --- Basic Metadata ---
    keywords: [
      "Karate",
      "Shotokan",
      "ASKKSA",
      "Artes Marciais",
      "Dojo",
      "Funchal",
      "Madeira",
      "Karate para Crianças",
      "Karate para Adultos",
    ],
  };
}

export default async function Page() {
  return <p>Ola</p>;
}
