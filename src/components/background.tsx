"use client";

import Image from "next/image";

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20">
      {/* Layer 1: Themed Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100  dark:bg-gradient-to-br dark:from-[#222] dark:via-[#2a2a2a] dark:to-primary" />

      {/* Desktop Dark Image */}
      <Image
        priority
        src="/askksa-background-tiger.svg"
        fill
        sizes="(min-width: 768px) 100vw"
        alt=""
        className="hidden md:block object-cover"
        decoding="async"
        unoptimized
      />

      {/* Mobile Dark Image */}
      <Image
        priority
        src="/askksa-background-tiger-mobile.webp"
        fill
        sizes="(max-width: 767px) 100vw"
        alt=""
        className="block md:hidden object-cover"
        decoding="async"
      />

      {/* Theme-aware overlay for text readability */}
      <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black/40 dark:via-transparent dark:to-black/60 bg-gradient-to-b from-white/80 via-black/40 to-white/40" />
    </div>
  );
};

export default Background;
