import type { CSSProperties } from "react";

const FeatureCard: React.FC<{
  feature: Feature;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}> = ({ feature, className = "", headingLevel = "h3" }) => {
  const HeadingTag = headingLevel;
  const animationStyle = {
    "--content-enter-delay": "0.2s",
    "--content-enter-duration": "0.6s",
  } as CSSProperties;

  return (
    <div
      data-viewport-reveal=""
      data-reveal-threshold={0.2}
      data-reveal-state="idle"
      style={animationStyle}
      className={`rounded-xl p-8 text-center border shadow-lg dark:bg-[#2a2a2a]/60 dark:backdrop-blur-sm dark:hover:bg-[#363636]/60 dark:border-gray-700/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/50 ${className}`}
    >
      <div className="mb-6 flex justify-center">{feature.icon}</div>

      <HeadingTag className="text-xl md:text-2xl font-bold text-primary mb-4">
        {feature.title}
      </HeadingTag>

      <p className="leading-relaxed dark:text-gray-300 text-center text-gray-600 text-sm md:text-base">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;
