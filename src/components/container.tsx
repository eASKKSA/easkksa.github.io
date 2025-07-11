// components/FadeInContainer.tsx
"use client";

import { ReactNode } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import clsx from "clsx";

type FadeInContainerProps = {
  children: ReactNode;
  className?: string;
  blur?: boolean;
  withBubbles?: boolean;
  as?: "section" | "article" | "div";
  treshold?: number;
  skipAnimation?: boolean;
};

const Container: React.FC<FadeInContainerProps> = ({
  children,
  className,
  blur = false,
  withBubbles = false,
  as: Component = "section",
  treshold = 0,
  skipAnimation = false,
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: treshold,
    triggerOnce: true,
  });

  const containerClass = clsx(
    !skipAnimation && !hasIntersected && "opacity-0 translate-y-8",
    blur &&
      "relative rounded-3xl p-8 md:p-16 overflow-hidden backdrop-blur-sm border dark:bg-gradient-to-r dark:from-[#222]/90 dark:via-[#2a2a2a]/80 dark:to-[#222]/90 dark:border-gray-700/50 bg-gradient-to-r from-white/90 via-gray-50/80 to-white/90 border-gray-200/50",
    className,
  );

  return (
    <Component ref={ref} className={containerClass}>
      {children}
      {blur && withBubbles && (
        <>
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full -translate-x-16 -translate-y-16" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full translate-x-24 translate-y-24" />
        </>
      )}
    </Component>
  );
};

export default Container;
