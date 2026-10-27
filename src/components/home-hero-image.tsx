import { getImageProps } from "next/image";
import { preload } from "react-dom";
import heroImage from "@/assets/in-dojo/Sensei_Seiza.jpeg";

const phoneMedia = "(width < 40rem)";
const phoneSizes = "calc(100vw - 5rem)";

export default function HomeHeroImage({ alt }: Readonly<{ alt: string }>) {
  const { props } = getImageProps({
    src: heroImage,
    alt,
    fill: true,
    loading: "eager",
    fetchPriority: "high",
    quality: 60,
    sizes:
      "(max-width: 639px) calc(100vw - 5rem), (max-width: 1023px) calc(100vw - 9rem), (max-width: 1279px) 45vw, 600px",
    className: "object-cover",
  });
  // Bound phone downloads even at 3x/4x DPR; larger screens retain the full set.
  const phoneSrcSet = props.srcSet
    ?.split(", ")
    .filter((candidate) => Number.parseInt(candidate.split(" ")[1], 10) <= 640)
    .join(", ");

  preload(props.src, {
    as: "image",
    imageSrcSet: phoneSrcSet,
    imageSizes: phoneSizes,
    media: phoneMedia,
    fetchPriority: "high",
  });
  preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
    media: "(width >= 40rem)",
    fetchPriority: "high",
  });

  return (
    <picture>
      <source media={phoneMedia} srcSet={phoneSrcSet} sizes={phoneSizes} />
      <img {...props} alt={alt} />
    </picture>
  );
}
