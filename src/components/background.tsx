"use client";

import Image from "next/image";

const Background: React.FC = () => {
  return (
    <div className="background-container">
      {/* Layer 1: Themed Gradient Overlay */}
      <div className="background-overlay" />

      {/* Desktop Dark Image */}
      <Image
        priority
        src="/askksa-background-tiger.svg"
        fill
        sizes="(min-width: 768px) 100vw"
        alt=""
        className="hidden md:block object-cover"
      />

      {/* Mobile Dark Image */}
      <Image
        priority
        src="/askksa-background-tiger-mobile.webp"
        fill
        sizes="(max-width: 767px) 100vw"
        alt=""
        className="block md:hidden object-cover"
      />

      {/* Theme-aware overlay for text readability */}
      <div className="background-overlay-text" />
    </div>
  );
};

export default Background;
