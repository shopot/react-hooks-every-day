import { useRef, useCallback } from 'react';

type TimeoutId = ReturnType<typeof setTimeout> | null;

export const useDebounceCallback = <T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  const timeoutRef = useRef<TimeoutId>(null);
  const callbackRef = useRef(callback);

  callbackRef.current = callback;

  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  );

  return debouncedFn;
};
