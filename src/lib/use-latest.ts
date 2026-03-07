import { useRef } from "react";

/**
 * Returns a ref that always holds the latest value.
 * Updated synchronously during render so consumers always see the current
 * value — even in callbacks created outside React's render cycle.
 */
export function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
