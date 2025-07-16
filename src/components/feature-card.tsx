"use client";

import { motion } from "motion/react";

const FeatureCard: React.FC<{
  feature: Feature;
  className?: string;
  headingLevel?: "h2" | "h3" | "h4";
}> = ({ feature, className = "", headingLevel = "h3" }) => {
  const HeadingTag = headingLevel;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      variants={{
        hidden: { opacity: 0, y: 32 },
        visible: { opacity: 1, y: 0 },
      }}
      className={`rounded-xl p-8 text-center border shadow-lg dark:bg-[#2a2a2a]/60 dark:backdrop-blur-sm dark:hover:bg-[#363636]/60 dark:border-gray-700/50 bg-white/60 backdrop-blur-sm hover:bg-white/80 border-gray-200/50 ${className}`}
    >
      <div className="mb-6 flex justify-center">{feature.icon}</div>

      <HeadingTag className="text-xl md:text-2xl font-bold text-primary mb-4">
        {feature.title}
      </HeadingTag>

      <p className="leading-relaxed dark:text-gray-300 text-center text-gray-600 text-sm md:text-base">
        {feature.description}
      </p>
    </motion.div>
  );
};

export default FeatureCard;
