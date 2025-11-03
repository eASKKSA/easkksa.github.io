import Image from "next/image";
import askkmLogo from "@/assets/askkm.webp";
import skifLogo from "@/assets/skif.png";
import skifCanadaLogo from "@/assets/skif_canada.png";
import venezuelaLogo from "@/assets/venezuela.webp";

export default function CertifiedLogoCard({
  certifiedBy,
}: Readonly<{
  certifiedBy: BlackBelt["certifiedBy"];
}>) {
  const logos = {
    skifCanada: {
      src: skifCanadaLogo,
      alt: "SKIF Canada Logo",
      href: "https://www.facebook.com/SKIFCanada/",
    },
    skif: {
      src: skifLogo,
      alt: "SKIF Logo",
      href: "https://www.skifworld.com",
    },
    askkm: {
      src: askkmLogo,
      alt: "ASKKM Logo",
      href: null,
    },
    venezuela: {
      src: venezuelaLogo,
      alt: "Venezuela Logo",
      href: null,
    },
  };

  const logo = logos[certifiedBy ?? "skifCanada"];

  const imageElement = (
    <Image
      src={logo.src}
      alt={logo.alt}
      className="rounded-full w-8 h-8 object-cover"
    />
  );

  return logo.href ? (
    <a href={logo.href} target="_blank" rel="noopener noreferrer">
      {imageElement}
    </a>
  ) : (
    imageElement
  );
}
