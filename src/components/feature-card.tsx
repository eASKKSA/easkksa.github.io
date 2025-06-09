"use client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const FeatureCard: React.FC<{
  feature: Feature;
  index: number;
}> = ({ feature, index }) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`rounded-xl p-8 text-center transition-all duration-500 transform border shadow-lg ${
        hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } dark:bg-[#2a2a2a]/60 dark:backdrop-blur-sm dark:hover:bg-[#363636]/60 dark:border-gray-700/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/50`}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="text-6xl mb-6">{feature.icon}</div>
      <h3 className="text-2xl font-bold text-[#a4262c] mb-4">
        {feature.title}
      </h3>
      <p className={`leading-relaxed dark:text-gray-300 text-gray-600`}>
        {feature.description}
      </p>
    </div>
  );
};

export default FeatureCard;
