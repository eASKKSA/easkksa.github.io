"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Defers third-party embeds until the user starts navigating and the placeholder
 * approaches the viewport. This keeps their network and JavaScript cost out of
 * the initial page load while requiring no explicit user action.
 */
export function useDeferredEmbed<T extends HTMLElement>() {
  const targetRef = useRef<T>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const idleWindow = window as unknown as {
      requestIdleCallback?: (
        callback: IdleRequestCallback,
        options?: IdleRequestOptions,
      ) => number;
      cancelIdleCallback?: (handle: number) => void;
    };
    let observer: IntersectionObserver | undefined;
    let idleId: number | undefined;
    let timeoutId: number | undefined;

    const scheduleLoad = () => {
      if (idleWindow.requestIdleCallback) {
        idleId = idleWindow.requestIdleCallback(() => setIsLoaded(true), {
          timeout: 1500,
        });
        return;
      }

      timeoutId = window.setTimeout(() => setIsLoaded(true), 200);
    };

    const observeTarget = () => {
      if (!targetRef.current || observer) return;

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;

          observer?.disconnect();
          scheduleLoad();
        },
        { rootMargin: "200px 0px" },
      );
      observer.observe(targetRef.current);
    };

    if (window.scrollY > 0) {
      observeTarget();
    } else {
      window.addEventListener("scroll", observeTarget, {
        once: true,
        passive: true,
      });
    }

    return () => {
      window.removeEventListener("scroll", observeTarget);
      observer?.disconnect();

      if (idleId !== undefined) idleWindow.cancelIdleCallback?.(idleId);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, []);

  return { isLoaded, targetRef };
}
