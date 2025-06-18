"use client";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const Section: React.FC<{
  children: React.ReactNode;
  className?: string;
  sectionBlur?: boolean;
  withBubbles?: boolean;
}> = ({
  children,
  className = "",
  sectionBlur = false,
  withBubbles = false,
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={`${hasIntersected ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className} ${sectionBlur ? "section-blur" : ""}`}
    >
      {children}
      {sectionBlur && withBubbles && (
        <>
          {/* Decorative elements with your colors */}
          <div className="section-top-bubble" />
          <div className="section-bottom-bubble" />
        </>
      )}
    </section>
  );
};

export default Section;
