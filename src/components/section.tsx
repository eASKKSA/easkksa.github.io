"use client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`transition-all duration-700 ${
        hasIntersected
          ? "opacity-100 transform translate-y-0"
          : "opacity-0 transform translate-y-8"
      } ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
