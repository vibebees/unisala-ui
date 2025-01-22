import { useEffect } from "react";

export const useScript = (url: string, onload: () => void) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = url;
    script.onload = onload;

    document.head.appendChild(script);

    // Return a cleanup function that removes the script
    return () => {
      document.head.removeChild(script);
    };
  }, [url, onload]);
};