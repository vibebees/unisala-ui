import { useEffect, useRef } from "react";

export const useDebouncedEffect = (
  effect: () => void,
  deps: any,
  delay: number
) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => effect(), delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [...(deps || []), delay]);
};
