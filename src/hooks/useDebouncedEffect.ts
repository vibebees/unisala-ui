import { useEffect, useRef } from "react";

/*


Type Definition for timeoutRef:
Updated: Changed to ReturnType<typeof setTimeout>.
Reason:In a browser context, which is the typical environment for React applications, the setTimeout function returns a numeric identifier.
 This update makes the hook more versatile and corrects the type mismatch that could lead to issues in strict TypeScript configurations.
*/
export const useDebouncedEffect = (
  effect: () => void,
  deps: any,
  delay: number
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => effect(), delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line
  }, [...(deps || []), delay]);
};
