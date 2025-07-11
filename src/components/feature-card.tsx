"use client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const FeatureCard: React.FC<{
  feature: Feature;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}> = ({ feature, className, headingLevel = "h3" }) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const HeadingTag = headingLevel;

  return (
    <div
      ref={ref}
      className={`rounded-xl p-8 text-center transition-all duration-500 transform border shadow-lg ${
        hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } dark:bg-[#2a2a2a]/60 dark:backdrop-blur-sm dark:hover:bg-[#363636]/60 dark:border-gray-700/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/50 ${className}`}
      style={{ transitionDelay: "200ms" }}
    >
      <div className="mb-6 flex justify-center">{feature.icon}</div>
      <HeadingTag className="text-xl md:text-2xl font-bold text-primary mb-4">
        {feature.title}
      </HeadingTag>
      <p
        className={`leading-relaxed dark:text-gray-300 text-center text-gray-600 text-sm md:text-base`}
      >
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;
