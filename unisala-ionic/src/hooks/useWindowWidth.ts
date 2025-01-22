import { useEffect, useState } from "react";

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(width <= 768);

  const handleResize = () => {
    setWidth(window.innerWidth);
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return { width, isMobile };
};

export default useWindowWidth;
