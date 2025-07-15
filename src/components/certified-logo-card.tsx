import Image from "next/image";
import skifCanadaLogo from "@/assets/skif_canada.png";
import skifLogo from "@/assets/skif.png";
import askkmLogo from "@/assets/askkm.webp";
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
      href: "#",
    },
    venezuela: {
      src: venezuelaLogo,
      alt: "Venezuela Logo",
      href: "#",
    },
  };

  const logo = logos[certifiedBy ?? "skifCanada"];
  return (
    <a href={logo.href ?? "#"} rel="noopener noreferrer">
      <Image
        src={logo.src}
        alt={logo.alt}
        className="rounded-full w-8 h-8 object-cover"
      />
    </a>
  );
}
