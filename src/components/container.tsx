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
      "relative overflow-hidden rounded-[2rem] border border-black/10 bg-white/78 p-7 shadow-[0_24px_80px_rgba(28,20,16,0.08)] backdrop-blur-md md:p-12 lg:p-16 dark:border-white/10 dark:bg-[#1b1b1b]/88",
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
