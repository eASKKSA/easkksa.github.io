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
      className={`rounded-[1.5rem] border border-black/10 bg-white/78 p-6 text-center shadow-[0_18px_55px_rgba(28,20,16,0.08)] backdrop-blur-md transition-all duration-200 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[0_24px_70px_rgba(28,20,16,0.13)] md:p-8 dark:border-white/10 dark:bg-[#1b1b1b]/88 dark:hover:border-primary/40 ${className}`}
    >
      <div className="mx-auto mb-6 grid size-12 place-items-center rounded-full bg-primary/10 font-display text-lg font-bold text-primary">
        {feature.icon}
      </div>

      <HeadingTag className="mb-4 text-xl font-bold text-primary md:text-2xl">
        {feature.title}
      </HeadingTag>

      <p className="text-center text-sm leading-relaxed text-stone-600 md:text-base dark:text-stone-300">
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;
