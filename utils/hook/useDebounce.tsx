"use client"

import { useCallback } from "react";

const useDebounce = (callback: any, delay: number = 1000) => {
  const debouncedCallback = useCallback(
    (...args: any) => {
      const timer = setTimeout(() => {
        callback(...args);
      }, delay);

      return () => {
        clearTimeout(timer);
      };
    },
    [callback, delay]
  );

  return debouncedCallback;
};

export default useDebounce;
