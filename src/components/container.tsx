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
};

const Container: React.FC<FadeInContainerProps> = ({
  children,
  className,
  blur = false,
  withBubbles = false,
  as: Component = "section",
}) => {
  const { ref, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerClass = clsx(
    !hasIntersected && "opacity-0 translate-y-8",
    blur && "section-blur",
    className,
  );

  return (
    <Component ref={ref} className={containerClass}>
      {children}
      {blur && withBubbles && (
        <>
          <div className="section-top-bubble" />
          <div className="section-bottom-bubble" />
        </>
      )}
    </Component>
  );
};

export default Container;
