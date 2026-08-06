import clsx from "clsx";
import type { CSSProperties, ElementType, ReactNode } from "react";

type FadeInContainerProps = {
  children: ReactNode;
  className?: string;
  blur?: boolean;
  withBubbles?: boolean;
  as?: "section" | "article" | "div";
  threshold?: number;
  initialAnimation?: boolean;
  skipAnimation?: boolean;
  delay?: number;
  duration?: number;
};

const FadeInContainer: React.FC<FadeInContainerProps> = ({
  children,
  className,
  blur = false,
  withBubbles = false,
  as: Component = "section",
  threshold = 0,
  initialAnimation = false,
  skipAnimation = false,
  delay = 0,
  duration = 0.3,
}) => {
  const containerClass = clsx(
    blur &&
      "relative rounded-3xl p-8 md:p-16 overflow-hidden backdrop-blur-sm border dark:bg-gradient-to-r dark:from-[#222]/90 dark:via-[#2a2a2a]/80 dark:to-[#222]/90 dark:border-gray-700/50 bg-gradient-to-r from-white/90 via-gray-50/80 to-white/90 border-gray-200/50",
    initialAnimation && !skipAnimation && "animate-content-enter",
    !skipAnimation && !initialAnimation && "viewport-reveal",
    className,
  );

  const animationStyle = skipAnimation
    ? undefined
    : ({
        "--content-enter-delay": `${delay}s`,
        "--content-enter-duration": `${duration}s`,
      } as CSSProperties);

  const Element = Component as ElementType;

  return (
    <Element
      className={containerClass}
      style={animationStyle}
      data-viewport-reveal={
        !skipAnimation && !initialAnimation ? "" : undefined
      }
      data-reveal-threshold={
        !skipAnimation && !initialAnimation ? threshold : undefined
      }
      data-reveal-state={
        !skipAnimation && !initialAnimation ? "idle" : undefined
      }
    >
      {children}
      {blur && withBubbles && <Bubbles />}
    </Element>
  );
};

function Bubbles() {
  return (
    <>
      <div className="absolute top-0 left-0 w-32 h-32 bg-primary/20 rounded-full -translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/10 rounded-full translate-x-24 translate-y-24" />
    </>
  );
}

export default FadeInContainer;
