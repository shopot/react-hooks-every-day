import { useEffect, useState, useRef, RefObject } from 'react';

type Size = { width: number; height: number };
type Callback = (size: Size) => void;

export function useResizeObserver<T extends HTMLElement>(ref: RefObject<T>, callback?: Callback): Size {
  const [size, setSize] = useState<Size>({ width: 0, height: 0 });
  const callbackRef = useRef<Callback | undefined>(callback);

  // Update callback ref if it changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;

        setSize((prev) => {
          if (prev.width !== width || prev.height !== height) {
            const newSize = { width, height };

            if (callbackRef.current) {
              callbackRef.current(newSize);
            }

            return newSize;
          }

          return prev;
        });
      }
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [ref]);

  return size;
}
