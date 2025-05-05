import { useState, useEffect, useRef } from 'react';

type TimeoutId = ReturnType<typeof setTimeout> | null;

export function useDebounceValue<T>(value: T, delay: number): T {
  const [debounceValue, setDebounceValue] = useState<T>(value);
  const timerRef = useRef<TimeoutId>(null);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => setDebounceValue(value), delay);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [value, delay]);

  return debounceValue;
}
